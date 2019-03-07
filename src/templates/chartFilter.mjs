import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";
import { updateByFilter } from "../modules/visualizations/chartHelper.mjs";

const ID_BASE = "filter-dropdown";

const clickHandler = (e, { state, index, chartId } = {}) => {
  // e.stopPropagation();
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

// This is a lit-html template function.
export const chartFilterTemplate = (
  chartId,
  state = {
    filters: []
  }
) => {
  return html`
    <div class="column">
      <span>Filters:</span>
      ${state.filters.map(
        ({ id, label, options }, index) => html`
          <div
            class="dropdown"
            id="${id}-${ID_BASE}-${chartId}"
            style="vertical-align:middle"
            on-click=${e => clickHandler(e, { state, index, chartId })}
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
                ${Object.entries(options).map(
                  // weird syntax for data-value described here:
                  // https://github.com/Polymer/lit-html/issues/194#issuecomment-345482860
                  ([optionId, { label: optionLabel }]) =>
                    html`
                      <a
                        class="dropdown-item is-active"
                        data-value$=${optionId}
                      >
                        ${optionLabel}
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
