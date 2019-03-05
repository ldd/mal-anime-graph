import { chartFilterTemplate } from "./chartFilter.mjs";
import { chartMetricTemplate } from "./chartMetric.mjs";
import { getElement, addElement } from "./helper.mjs";

function addChartOptionsEvents(chartId) {
  [
    `type-filter-dropdown-${chartId}`,
    `status-filter-dropdown-${chartId}`
  ].forEach(id => {
    const dropdown = document.getElementById(id);
    if (dropdown) {
      dropdown.addEventListener("click", e => {
        e.stopPropagation();
        if (e.target.tagName === "BUTTON") {
          dropdown.classList.toggle("is-active");
        } else {
          e.target.classList.toggle("is-active");
          //     console.log(e.target.dataset.value);
        }
      });
    }
  });
}

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
  addChartOptionsEvents(chartId);
};
