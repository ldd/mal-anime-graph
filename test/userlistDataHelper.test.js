import { processAllData } from "../src/modules/something.mjs";

describe("processAllData", () => {
  test("no data", () => {
    const processedData = {
      years: { count: {}, duration: {}, score: {} },
      seasons: { count: {}, duration: {}, score: {} },
      genres: { count: {}, duration: {}, score: {} }
    };
    expect(processAllData()).toEqual(processedData);
    expect(processAllData([])).toEqual(processedData);
  });
  test("single entry [season, year]", () => {
    const processedData = {
      years: { count: { 2000: 1 }, duration: { 2000: 0 }, score: { 2000: 0 } },
      seasons: { count: { summer: 1 }, duration: { summer: 0 }, score: { summer: 0 } },
      genres: { count: {}, duration: {}, score: {} }
    };
    expect(processedData).toEqual(processAllData([{ season: "summer", startDate: { year: 2000 } }]));
    expect(processedData).toEqual(processAllData([{ season: "summer", genres: [], startDate: { year: 2000 } }]));
  });
  test("single entry [season, year, genres]", () => {
    const processedData = {
      years: { count: { 2000: 1 }, duration: { 2000: 0 }, score: { 2000: 0 } },
      seasons: { count: { summer: 1 }, duration: { summer: 0 }, score: { summer: 0 } },
      genres: { count: { comedy: 1 }, duration: { comedy: 0 }, score: { comedy: 0 } }
    };
    expect(processedData).toEqual(
      processAllData([{ season: "summer", genres: ["comedy"], startDate: { year: 2000 } }])
    );
  });
  test("single entry [season, year, genres, score]", () => {
    const processedData = {
      years: { count: { 2000: 1 }, duration: { 2000: 0 }, score: { 2000: 5 } },
      seasons: { count: { summer: 1 }, duration: { summer: 0 }, score: { summer: 5 } },
      genres: { count: { comedy: 1 }, duration: { comedy: 0 }, score: { comedy: 5 } }
    };
    expect(processedData).toEqual(
      processAllData([{ season: "summer", genres: ["comedy"], startDate: { year: 2000 }, score: 5 }])
    );
  });
  test("2 entries, no props", () => {
    const processedData = {
      years: { count: { 2000: 2 }, duration: { 2000: 0 }, score: { 2000: 0 } },
      seasons: { count: { summer: 2 }, duration: { summer: 0 }, score: { summer: 0 } },
      genres: { count: { comedy: 2 }, duration: { comedy: 0 }, score: { comedy: 0 } }
    };
    expect(processedData).toEqual(
      processAllData([
        { season: "summer", genres: ["comedy"], startDate: { year: 2000 } },
        { season: "summer", genres: ["comedy"], startDate: { year: 2000 } }
      ])
    );
  });
  test("2 entries, all props", () => {
    const processedData = {
      years: { count: { 2000: 2 }, duration: { 2000: 12 * (17 + 13) }, score: { 2000: 20 } },
      seasons: { count: { summer: 2 }, duration: { summer: 12 * (17 + 13) }, score: { summer: 20 } },
      genres: { count: { comedy: 2 }, duration: { comedy: 12 * (17 + 13) }, score: { comedy: 20 } }
    };
    expect(processedData).toEqual(
      processAllData([
        {
          season: "summer",
          genres: ["comedy"],
          startDate: { year: 2000 },
          score: 27,
          episodes: 12,
          episodesWatched: 12,
          timesWatched: 1,
          duration: 17
        },
        {
          season: "summer",
          genres: ["comedy"],
          startDate: { year: 2000 },
          score: 13,
          episodes: 12,
          episodesWatched: 12,
          timesWatched: 1,
          duration: 13
        }
      ])
    );
  });
});
