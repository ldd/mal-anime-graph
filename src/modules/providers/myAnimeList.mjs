import { fetchToLocalStorage, getSeason, sleep } from "../utils.mjs";

// https://jikan.docs.apiary.io/#introduction/information/rate-limiting
export const BASE_URL = "https://api.jikan.moe/v3";
export const RATE_LIMIT = 1;
export const RATE_LIMIT_T = 3 * 1000;

let counter = 0;
export async function fetchById(animeId = 1) {
  counter += 1;
  await sleep(Math.floor(counter / RATE_LIMIT) * RATE_LIMIT_T);
  let response = await fetch(`${BASE_URL}/anime/${animeId}`);
  // too many requests
  if (response.status === 429) {
    await sleep(RATE_LIMIT_T);
    response = await fetch(`${BASE_URL}/anime/${animeId}`);
  }
  return response.json();
}

export function malParser(data = {}) {
  const {
    mal_id: id,
    genres = [],
    studios = [],
    duration,
    aired: { from: dateString = "", prop = {} } = {}
  } = data;
  let { from = {}, to = {} } = prop;
  if (from.month === null || to.month === null) {
    const date = new Date(dateString);
    from = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDay()
    };
    to = from;
  }
  return {
    id,
    genres: genres.map(({ name }) => name),
    studios: studios.map(({ mal_id: malId, name }) => ({ id: malId, name })),
    duration: parseInt(duration, 10),
    season: getSeason(from.month),
    startDate: from,
    endDate: to
  };
}

export async function myAnimeList(id) {
  return fetchToLocalStorage(id, fetchById, malParser);
}
