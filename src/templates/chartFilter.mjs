import { html } from "https://unpkg.com/lit-html@0.10.0/lit-html.js";

// This is a lit-html template function.
export const chartFilterTemplate = (
  chartId,
  {
    filters = [
      {
        id: "type-filter-dropdown",
        label: "Type",
        options: [
          { value: "Completed", text: "completed" },
          { value: "Watching", text: "watching" },
          { value: "Dropped", text: "dropped" }
        ]
      },
      {
        id: "status-filter-dropdown",
        label: "Status",
        options: [
          { value: "TV", text: "tv" },
          { value: "Movie", text: "movie" },
          { value: "ONA", text: "ona" }
        ]
      }
    ]
  } = {}
) =>
  html`
    <span>Filters:</span>
    ${filters.map(
      ({ id, label, options }) => html`
        <div
          class="dropdown"
          id="${id}-${chartId}"
          style="vertical-align:middle"
        >
          <div class="dropdown-trigger">
            <button
              class="button is-primary is-outlined"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              ${label}
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              ${options.map(
                ({ text, value }) =>
                  html`
                    <a class="dropdown-item" data-value=${value}>${text}</a>
                  `
              )}
            </div>
          </div>
        </div>
      `
    )}
  `;
