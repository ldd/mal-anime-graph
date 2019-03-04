import { sleep } from "../utils.mjs";
import { BASE_URL, RATE_LIMIT, RATE_LIMIT_T } from "./myAnimeList.mjs";

let counter = 0;
async function fetchUserData(userId) {
  counter += 1;
  await sleep(Math.floor(counter / RATE_LIMIT) * RATE_LIMIT_T);
  const rawData = await fetch(`${BASE_URL}/user/${userId}/animelist/all`);
  const data = await rawData.json();
  return data;
}

function getStatus(status) {
  switch (status) {
    case 1:
      return "Watching";
    case 2:
      return "Completed";
    default:
      return "";
  }
}
export function parseUserData(data) {
  return (data.anime || []).map(node => ({
    id: node.mal_id,
    score: node.score,
    title: node.title,
    type: node.type,
    status: getStatus(node.watching_status),
    episodes: node.total_episodes,
    episodes_watched: node.watched_episodes
  }));
}

export async function processUserData(userId) {
  const myData = await fetchUserData(userId);
  return parseUserData(myData);
}
