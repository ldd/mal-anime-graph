import { chartFilterTemplate } from "./chartFilter.mjs";
import { chartMetricTemplate } from "./chartMetric.mjs";
import { getElement, addElement } from "./helper.mjs";

export const addChartOptions = (
  chartId,
  state = {
    metric: "count",
    filters: [
      {
        id: "type",
        label: "Type",
        options: {
          TV: { label: "TV", selected: true },
          Movie: { label: "Movie", selected: true },
          ONA: { label: "ONA", selected: true },
          OVA: { label: "OVA", selected: true },
          Special: { label: "Special", selected: true }
        },
        filter: (data, innerState) =>
          innerState[data.type] && innerState[data.type].selected !== false
      },
      {
        id: "status",
        label: "Status",
        options: {
          Completed: { label: "Completed", selected: true },
          Watching: { label: "Watching", selected: true },
          Dropped: { label: "Dropped", selected: true }
        },
        filter: (data, innerState) =>
          innerState[data.status] && innerState[data.status].selected !== false
      }
    ]
  }
) => {
  const parent = getElement(
    `chart-options-${chartId}`,
    "div",
    "columns is-vcentered"
  );
  const filters = getElement(
    `chart-options-filter-${chartId}`,
    "div",
    "",
    parent
  );
  const metrics = getElement(
    `chart-options-metrics-${chartId}`,
    "div",
    "",
    parent
  );
  // add filters & metrics
  addElement(chartFilterTemplate, filters, chartId, state);
  addElement(chartMetricTemplate, metrics, chartId, state);
};
