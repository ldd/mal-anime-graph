import { sleep } from "../utils.mjs";
import { makeRequest, BASE_URL, RATE_LIMIT, RATE_LIMIT_T } from "./anilist.mjs";
import {
  watching,
  completed,
  onHold,
  dropped,
  planToWatch
} from "./constants.mjs";

// https://anilist.github.io/ApiV2-GraphQL-Docs/media.doc.html
const query = `
query ($userId: String, $status: MediaListStatus) {
  MediaListCollection(userName: $userId, type: ANIME, status: $status ) {
    lists {
      entries {
        status
        score(format: POINT_10)
        progress
        repeat
        media {
          format
          idMal
          title { romaji }
          episodes
        }
      }
    }
  }
}
    `;

let counter = 0;
async function fetchUserData(variables = { userId: "1" }) {
  counter += 1;
  await sleep(Math.floor(counter / RATE_LIMIT) * RATE_LIMIT_T);
  const rawData = await fetch(BASE_URL, makeRequest(variables, query));
  const data = await rawData.json();
  return data;
}

// https://anilist.github.io/ApiV2-GraphQL-Docs/medialiststatus.doc.html
function parseStatus(status) {
  switch (status) {
    case "CURRENT":
      return watching;
    case "PLANNING":
      return planToWatch;
    case "COMPLETED":
      return completed;
    case "DROPPED":
      return dropped;
    case "PAUSED":
      return onHold;
    case "REPEATING":
      return completed;
    default:
      return "";
  }
}

export function parseUserData(data) {
  return data.data.MediaListCollection.lists.flatMap(e => {
    return e.entries.map(node => {
      return {
        id: node.media.idMal,
        score: node.score,
        title: node.media.title.romaji,
        type: node.media.format,
        status: parseStatus(node.status),
        episodes: node.media.episodes,
        episodesWatched: node.progress,
        timesWatched: node.repeat
      };
    });
  });
}

export async function processUserData(...args) {
  const myData = await fetchUserData(...args);
  return parseUserData(myData);
}
