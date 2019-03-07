import { anilist } from "../providers/anilist.mjs";
import { updateChart, filterChart } from "./chart.mjs";
import { updateInsights } from "./insights.mjs";
import { metricReducer } from "../reducers/metricReducer.mjs";

function updateCharts(rawData) {
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
  for (let i = 0; i < parsedMyData.length; i += 1) {
    const datum = parsedMyData[i];
    anilist(datum.id).then(d => {
      data.push({ ...datum, ...d });
      debouncedUpdateCharts(data);
    });
  }
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
