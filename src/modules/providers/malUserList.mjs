import { get } from "../utils.mjs";

const parser = new DOMParser();

async function fetchSampleData() {
  const rawData = await fetch("./data/animelist_1551466288_-_86889.xml");
  const data = await rawData.text();
  return data;
}

export function parseMyData(data) {
  const xmlDoc = parser.parseFromString(data, "text/xml");
  return Array.from(
    xmlDoc.getElementsByTagName("myanimelist")[0].getElementsByTagName("anime")
  ).map(node => ({
    id: +get(node, "series_animedb_id"),
    score: +get(node, "my_score"),
    title: get(node, "series_title"),
    type: get(node, "series_type"),
    status: get(node, "my_status"),
    episodes: +get(node, "series_episodes"),
    episodes_watched: +get(node, "my_watched_episodes")
  }));
}

export async function processSampleData() {
  const myData = await fetchSampleData();
  return parseMyData(myData);
}
