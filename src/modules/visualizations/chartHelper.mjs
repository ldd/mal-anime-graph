import { anilist } from "../providers/anilist.mjs";
import { updateChart, filterChart } from "./chart.mjs";
import { updateInsights, updateNotifications } from "./insights.mjs";
import { metricReducer } from "../reducers/metricReducer.mjs";

function updateCharts(rawData, length, expectedLength) {
  updateNotifications(length, expectedLength);
  const data = metricReducer(rawData);
  Object.entries(data).forEach(([attributeKey, attributes]) => {
    Object.entries(attributes).forEach(([metricKey, metrics]) => {
      const labels = Object.keys(metrics);
      const innerData = Object.values(metrics);
      updateChart({
        id: `${attributeKey}-${metricKey}`,
        labels,
        data: innerData
      });
      if (attributeKey === "genres") {
        updateInsights(metrics, metricKey);
      }
    });
  });
}
// notice how heavy tasks, like running the metricReducer, are run inside updateCharts
const debouncedUpdateCharts = debounce(updateCharts, 250, false);

const data = [];
export async function processCharts(parsedMyData) {
  data.length = 0;
  const expectedLength = parsedMyData.length;
  // do not `await` on anilist
  // in order to process things in parallel
  const allRequests = parsedMyData.map(datum => [anilist(datum.id), datum]);
  allRequests.forEach(async ([request, datum]) => {
    const response = await request;
    if (typeof response === "function") {
      // not using await on purpose (parallel execution)
      response(datum.id).then(otherData => {
        data.push({ ...datum, ...otherData });
        debouncedUpdateCharts(data, data.length, expectedLength);
      });
    } else {
      data.push({ ...datum, ...response });
      debouncedUpdateCharts(data, data.length, expectedLength);
    }
  });
}

const filterReducer = (A = [], filters = []) =>
  filters.reduce(
    (B, { filter, options }) => B.filter(b => filter(b, options)),
    A
  );

export function updateByFilter(id, { metric, filters }, inputData = data) {
  const allFilteredData = metricReducer(filterReducer(inputData, filters));
  const [attribute] = id.split("-");
  const chartData = allFilteredData[attribute][metric];
  const [labels, innerValues] = [
    Object.keys(chartData),
    Object.values(chartData)
  ];
  filterChart({ id, labels, data: innerValues });
}

export const updateByMetric = updateByFilter;
