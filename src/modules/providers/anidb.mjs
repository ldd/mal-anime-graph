import { sleep, get, fetchToLocalStorage } from "../utils.mjs";

const BASE_URL =
  "http://api.anidb.net:9001/httpapi?request=anime&client=xbmcscrap&clientver=1&protover=1";
const RATE_LIMIT = 9;
const RATE_LIMIT_T = 61 * 1000;

const parser = new DOMParser();
let counter = 0;
export async function fetchById(id) {
  counter += 1;
  await sleep(Math.floor(counter / RATE_LIMIT) * RATE_LIMIT_T);
  const rawData = await fetch(`${BASE_URL}&aid=${id}`);
  const data = await rawData.text();
  const animeData = parser.parseFromString(data, "text/xml");
  return animeData;
}

export function anidbParser(xmlData) {
  return {
    startDate: get(xmlData, "startdate"),
    endDate: get(xmlData, "enddate")
  };
}

export async function anidb(id) {
  return fetchToLocalStorage(id, fetchById, anidbParser);
}
