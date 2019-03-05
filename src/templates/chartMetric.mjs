import { html } from "https://unpkg.com/lit-html@0.10.0/lit-html.js";

const firstClassList = "button is-primary is-selected";
const otherClassList = "button";

// This is a lit-html template function.
export const chartMetricTemplate = (
  chartId,
  { metrics = ["Count", "Score"] } = {}
) =>
  html`
    <div>
      <span>Metric:</span>
      <div class="buttons has-addons" style="display:inline-flex">
        ${metrics.map(
          (metric, i) =>
            html`
              <span class="${i === 0 ? firstClassList : otherClassList}">
                ${metric}
              </span>
            `
        )}
      </div>
    </div>
  `;
