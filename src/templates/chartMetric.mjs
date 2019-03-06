import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";
import { updateByMetric } from "../modules/something.mjs";

const clickHandler = (e, { chartId } = {}) => {
  Array.from(e.target.parentNode.children).forEach(option => {
    if (e.target === option) {
      option.classList.add("is-primary");
      option.classList.add("is-selected");
      const { value } = option.dataset;
      updateByMetric(chartId, value);
    } else {
      option.classList.remove("is-primary");
      option.classList.remove("is-selected");
    }
  });
};

const firstClassList = "button is-primary is-selected";
const otherClassList = "button";

// This is a lit-html template function.
export const chartMetricTemplate = (
  chartId,
  {
    metrics = [
      { id: "count", label: "Count" },
      { id: "duration", label: "Duration" },
      { id: "score", label: "Score" }
    ]
  } = {}
) =>
  html`
    <div class="column">
      <span>Metric:</span>
      <div
        class="buttons has-addons"
        style="display:inline-flex"
        on-click=${e => clickHandler(e, { chartId })}
      >
        ${metrics.map(
          ({ id, label }) =>
            html`
              <span
                className="${chartId.includes(id)
                  ? firstClassList
                  : otherClassList}"
                data-value$=${id}
              >
                ${label}
              </span>
            `
        )}
      </div>
    </div>
  `;
