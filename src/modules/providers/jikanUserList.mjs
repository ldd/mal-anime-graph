import { sleep } from "../utils.mjs";
import { BASE_URL, RATE_LIMIT, RATE_LIMIT_T } from "./myAnimeList.mjs";
import { parseMalStatus } from "./constants.mjs";

let counter = 0;
async function fetchUserDataByPage(page = 1, variables = {}) {
  const { userId = "1", status = "all" } = variables;
  counter += 1;
  await sleep(Math.floor(counter / RATE_LIMIT) * RATE_LIMIT_T);
  const rawData = await fetch(
    `${BASE_URL}/user/${userId}/animelist/${status}/${page}`
  );
  const data = await rawData.json();
  return data;
}

function parseUserData(data = []) {
  return data.map(node => ({
    id: node.mal_id,
    score: node.score,
    title: node.title,
    type: node.type,
    status: parseMalStatus(node.watching_status),
    episodes: node.total_episodes,
    episodesWatched: node.watched_episodes,
    // INFO: this means that rewatches are not accounted for
    timesWatched: 1
  }));
}

// recursive function to continuously fetch list pages
// (lists limited to 300 entries per page)
// reference: https://jikan.docs.apiary.io/#reference/0/user
async function fetchUserData(page = 1, ...args) {
  const { anime: data = [] } = (await fetchUserDataByPage(page, ...args)) || {};
  if (data.length === 300) {
    return data.concat(await fetchUserData(page + 1, ...args));
  }
  return data;
}

export async function processUserData(...args) {
  const myData = await fetchUserData(1, ...args);
  return parseUserData(myData);
}
