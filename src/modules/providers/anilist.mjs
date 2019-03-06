import { fetchToLocalStorage, getSeason, sleep } from "../utils.mjs";
import { fetchById as malFetchById, malParser } from "./myAnimeList.mjs";

export const BASE_URL = "https://graphql.anilist.co";
// https://anilist.gitbook.io/anilist-apiv2-docs/overview/rate-limiting
export const RATE_LIMIT = 90;
export const RATE_LIMIT_T = 65 * 1000;

// https://anilist.github.io/ApiV2-GraphQL-Docs/media.doc.html
const defaultQuery = `
      query ($id: Int) {
        Media (id: $id, type: ANIME) {
          id
          genres
          studios{
            edges{node{id,name}}
          }
          duration
          season
          startDate {
              year
              month
              day
          }
          endDate {
              year
              month
              day
          }
        }
      }
    `;

export function makeRequest(id = 1, query = defaultQuery) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ query, variables: { id } })
  };
}

let counter = 0;
async function fetchById(animeId = 1) {
  counter += 1;
  await sleep(Math.floor(counter / RATE_LIMIT) * RATE_LIMIT_T);
  let response = await fetch(BASE_URL, makeRequest(animeId));
  if (response.ok && response.status - 200 < 99) {
    return response.json();
  }
  // too many requests
  if (response.status === 429) {
    await sleep(RATE_LIMIT_T);
    response = await fetch(BASE_URL, makeRequest(animeId));
    return response.json();
  }

  // not found in anilist db, attempt to get it from other sources.
  if (response.status === 404) {
    response = await malFetchById(animeId);
    return { data: { Media: malParser(response) } };
  }
  return null;
}

function anilistParser(data = {}) {
  const { data: { Media } = {} } = data;
  // force a season value
  Media.season = Media.season || getSeason(Media.startDate.month);
  // force studios revaluation only if the response used edges
  if (Media.studios.edges) {
    Media.studios = (Media.studios.edges || []).map(({ node = {} }) => node);
  }
  return Media;
}

export async function anilist(id) {
  return fetchToLocalStorage(id, fetchById, anilistParser);
}
