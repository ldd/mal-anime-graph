import { chartFilterTemplate } from "./filter.mjs";
import { chartMetricTemplate } from "./metric.mjs";
import { addNotification } from "../notification.mjs";
import { addChartInsights } from "./insights.mjs";
import { getElement, addElement, addNavbar, addFooter } from "../helper.mjs";
import {
  watching,
  completed,
  onHold,
  dropped,
  planToWatch
} from "../../modules/providers/constants.mjs";
import {
  updateByFilter,
  updateByMetric
} from "../../modules/visualizations/chartHelper.mjs";

const filterClickHandler = (e, { state, index, chartId } = {}) => {
  const innerState = state.filters[index].options;
  if (e.target.tagName === "BUTTON") {
    e.target.parentNode.parentNode.classList.toggle("is-active");
  } else {
    e.target.classList.toggle("is-active");
    const { value } = e.target.dataset;
    innerState[value].selected = !innerState[value].selected;
    updateByFilter(chartId, state);
  }
};

const metricClickHandler = (e, { state, chartId } = {}) => {
  Array.from(e.target.parentNode.children).forEach(option => {
    if (e.target === option) {
      option.classList.add("is-primary");
      option.classList.add("is-selected");
      const { value } = option.dataset;
      state.metric = value;
      updateByMetric(chartId, state);
    } else {
      option.classList.remove("is-primary");
      option.classList.remove("is-selected");
    }
  });
};

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
          Watching: { label: watching, selected: true },
          Completed: { label: completed, selected: true },
          OnHold: { label: onHold, selected: true },
          Dropped: { label: dropped, selected: true },
          PLanToWatch: { label: planToWatch, selected: true }
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
  addElement(chartFilterTemplate, filters, state, {
    chartId,
    clickHandler: filterClickHandler
  });
  addElement(chartMetricTemplate, metrics, state, {
    chartId,
    clickHandler: metricClickHandler
  });
};

export function addCharts() {
  addNavbar();
  addFooter();
  addChartInsights();
  addNotification();
  addChartOptions("years-count");
  addChartOptions("seasons-duration");
  addChartOptions("seasons-count");
}
