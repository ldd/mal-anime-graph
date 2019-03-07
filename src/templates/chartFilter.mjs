import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";
import { updateByFilter } from "../modules/visualizations/chartHelper.mjs";

const ID_BASE = "filter-dropdown";

const clickHandler = (e, { state, chartId, filter } = {}) => {
  // e.stopPropagation();
  if (e.target.tagName === "BUTTON") {
    e.target.parentNode.parentNode.classList.toggle("is-active");
  } else {
    e.target.classList.toggle("is-active");
    const { value } = e.target.dataset;
    if (state[value] === undefined) state[value] = false;
    else state[value] = !state[value];
    updateByFilter(chartId, data => filter(data, state));
  }
};

// This is a lit-html template function.
export const chartFilterTemplate = (
  chartId,
  {
    state = { type: {}, status: {} },
    filters = [
      {
        id: "type",
        label: "Type",
        options: [
          { value: "TV", text: "tv" },
          { value: "Movie", text: "movie" },
          { value: "ONA", text: "ona" }
        ],
        filter: (data, innerState) => innerState[data.type] !== false
      },
      {
        id: "status",
        label: "Status",
        options: [
          { value: "Completed", text: "completed" },
          { value: "Watching", text: "watching" },
          { value: "Dropped", text: "dropped" }
        ],
        filter: (data, innerState) => innerState[data.status] !== false
      }
    ]
  } = {}
) => {
  return html`
    <div class="column">
      <span>Filters:</span>
      ${filters.map(
        ({ id, label, options, filter }) => html`
          <div
            class="dropdown"
            id="${id}-${ID_BASE}-${chartId}"
            style="vertical-align:middle"
            on-click=${e =>
              clickHandler(e, { state: state[id], chartId, filter })}
          >
            <div class="dropdown-trigger">
              <button
                class="button is-primary is-outlined"
                aria-haspopup="true"
                aria-controls="${id}-${ID_BASE}-${chartId}"
              >
                ${label}
              </button>
            </div>
            <div class="dropdown-menu" role="menu">
              <div class="dropdown-content">
                ${options.map(
                  // weird syntax for data-value described here:
                  // https://github.com/Polymer/lit-html/issues/194#issuecomment-345482860
                  ({ text, value }) =>
                    html`
                      <a class="dropdown-item is-active" data-value$=${value}>
                        ${text}
                      </a>
                    `
                )}
              </div>
            </div>
          </div>
        `
      )}
    </div>
  `;
};
