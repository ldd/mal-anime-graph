import { chartFilterTemplate } from "./chartFilter.mjs";
import { chartMetricTemplate } from "./chartMetric.mjs";
import { getElement, addElement } from "./helper.mjs";

export const addChartOptions = (chartId, ...args) => {
  const parent = getElement(
    `chart-options-${chartId}`,
    "div",
    "columns is-vcentered"
  );
  // add filters
  const filters = getElement(
    `chart-options-filter-${chartId}`,
    "div",
    "",
    parent
  );
  addElement(chartFilterTemplate, filters, chartId, ...args);

  // add metrics
  const metrics = getElement(
    `chart-options-metrics-${chartId}`,
    "div",
    "",
    parent
  );
  addElement(chartMetricTemplate, metrics, chartId, ...args);
};
