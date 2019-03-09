import { chartFilterTemplate } from "./filter.mjs";
import { chartMetricTemplate } from "./metric.mjs";
import { getElement, addElement } from "../helper.mjs";
import {
  watching,
  completed,
  onHold,
  dropped,
  planToWatch
} from "../../modules/providers/constants.mjs";

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
  addElement(chartFilterTemplate, filters, chartId, state);
  addElement(chartMetricTemplate, metrics, chartId, state);
};
