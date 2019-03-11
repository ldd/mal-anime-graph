import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";

const ID_BASE = "filter-dropdown";

// This is a lit-html template function.
export const chartFilterTemplate = (
  state = {
    filters: []
  },
  { chartId, clickHandler } = {}
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
            @click=${e => clickHandler(e, { state, index, chartId })}
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
                      <a class="dropdown-item is-active" data-value=${optionId}>
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
