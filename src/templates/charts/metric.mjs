import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";

const firstClassList = "button is-primary is-selected";
const otherClassList = "button";

// This is a lit-html template function.
export const chartMetricTemplate = (
  state = { metric: "count" },
  {
    chartId,
    clickHandler,
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
        on-click=${e => clickHandler(e, { state, chartId })}
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
