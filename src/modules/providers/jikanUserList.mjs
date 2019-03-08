import { sleep } from "../utils.mjs";
import { BASE_URL, RATE_LIMIT, RATE_LIMIT_T } from "./myAnimeList.mjs";
import {
  watching,
  completed,
  onHold,
  dropped,
  planToWatch
} from "./constants.mjs";

let counter = 0;
async function fetchUserDataByPage(userId, page = 1) {
  counter += 1;
  await sleep(Math.floor(counter / RATE_LIMIT) * RATE_LIMIT_T);
  const rawData = await fetch(
    `${BASE_URL}/user/${userId}/animelist/all/${page}`
  );
  const data = await rawData.json();
  return data;
}

function getStatus(status) {
  switch (status) {
    case 1:
      return watching;
    case 2:
      return completed;
    case 3:
      return onHold;
    case 4:
      return dropped;
    case 6:
      return planToWatch;
    default:
      return "";
  }
}
function parseUserData(data = []) {
  return data.map(node => ({
    id: node.mal_id,
    score: node.score,
    title: node.title,
    type: node.type,
    status: getStatus(node.watching_status),
    episodes: node.total_episodes,
    episodesWatched: node.watched_episodes,
    // INFO: this means that rewatches are not accounted for
    timesWatched: 1
  }));
}

// recursive function to continuously fetch list pages
// (lists limited to 300 entries per page)
// reference: https://jikan.docs.apiary.io/#reference/0/user
async function fetchUserData(userId, page = 1) {
  const { anime: data = [] } = (await fetchUserDataByPage(userId, page)) || {};
  if (data.length === 300) {
    return data.concat(await fetchUserData(userId, page + 1));
  }
  return data;
}

export async function processUserData(userId) {
  const myData = await fetchUserData(userId);
  return parseUserData(myData);
}
