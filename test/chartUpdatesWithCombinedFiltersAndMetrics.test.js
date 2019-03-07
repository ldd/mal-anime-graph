import { filterChart } from "../src/modules/visualizations/chart.mjs";
import { updateByFilter } from "../src/modules/visualizations/chartHelper.mjs";

jest.mock("../src/modules/visualizations/chart.mjs");

describe("metricReducer", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    filterChart.mockClear();
  });

  test("1 entry, 1 filter", () => {
    updateByFilter("years", { metric: "count" });
    expect(filterChart).toHaveBeenCalledWith({ data: [], id: "years", labels: [] });
    expect(filterChart).toHaveBeenCalledTimes(1);

    const filters = [{ filter: () => true }];
    updateByFilter("years", { metric: "count", filters });
    expect(filterChart).toHaveBeenCalledWith({ data: [], id: "years", labels: [] });
    expect(filterChart).toHaveBeenCalledTimes(2);
  });
  test("1 entry, 1 simple filter", () => {
    const data = [{ type: "TV", startDate: { year: 2017 } }];
    const filters = [{ filter: () => true }];
    updateByFilter("years", { metric: "count", filters }, data);
    expect(filterChart).toHaveBeenCalledWith({ data: [1], id: "years", labels: ["2017"] });
    expect(filterChart).toHaveBeenCalledTimes(1);
  });
  test("1 entry, 1 filter", () => {
    const data = [{ type: "TV", startDate: { year: 2017 } }];
    const filters = [{ filter: ({ type }) => type !== "TV" }];
    updateByFilter("years", { metric: "count", filters }, data);
    expect(filterChart).toHaveBeenCalledWith({ data: [], id: "years", labels: [] });
    expect(filterChart).toHaveBeenCalledTimes(1);
  });
  test("2 entries, 2 filters", () => {
    const data = [{ type: "TV", startDate: { year: 2019 } }, { type: "OVA", startDate: { year: 2017 } }];
    const filters = [{ filter: () => true }, { filter: ({ type }) => type !== "OVA" }];
    updateByFilter("years", { metric: "count", filters }, data);
    expect(filterChart).toHaveBeenCalledWith({ data: [1], id: "years", labels: ["2019"] });
    expect(filterChart).toHaveBeenCalledTimes(1);
  });
  test("many entries, many filters", () => {
    const data = [
      { type: "TV", startDate: { year: 2014 } },
      { type: "OVA", startDate: { year: 2017 } },
      { type: "ONA", startDate: { year: 2018 } },
      { type: "TV", startDate: { year: 2018 } },
      { type: "OVA", startDate: { year: 2019 } }
    ];
    const filters = [
      { filter: ({ type }) => type !== "OVA" },
      { filter: ({ startDate: { year } }) => year < 2019 },
      { filter: ({ startDate: { year } }) => year > 2014 }
    ];
    updateByFilter("years", { metric: "count", filters }, data);
    expect(filterChart).toHaveBeenCalledWith({ data: [2], id: "years", labels: ["2018"] });
    expect(filterChart).toHaveBeenCalledTimes(1);
  });
  test("[score] many entries, many filters", () => {
    const data = [
      { type: "TV", startDate: { year: 2014 }, score: 8 },
      { type: "OVA", startDate: { year: 2016 }, score: 9 },
      { type: "ONA", startDate: { year: 2017 }, score: 8 },
      { type: "TV", startDate: { year: 2017 }, score: 7 },
      { type: "TV", startDate: { year: 2018 }, score: 5 },
      { type: "TV", startDate: { year: 2018 }, score: 9 },
      { type: "OVA", startDate: { year: 2019 }, score: 0 }
    ];
    const filters = [
      { filter: ({ type }) => type !== "OVA" },
      { filter: ({ score }) => score > 0 },
      { filter: ({ startDate: { year } }) => year > 2014 }
    ];
    updateByFilter("years", { metric: "score", filters }, data);
    expect(filterChart).toHaveBeenCalledWith({ data: [7.5, 7], id: "years", labels: ["2017", "2018"] });
    expect(filterChart).toHaveBeenCalledTimes(1);
  });
});
