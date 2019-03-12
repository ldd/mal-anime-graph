import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";
import { ifDefined } from "https://unpkg.com/lit-html@1.0.0/directives/if-defined.js?module";
import { malStatuses } from "../../modules/providers/constants.mjs";

export const statusPickerTemplate = ({ state = {}, clickHandler } = {}) => html`
    <div class="column">
      <div class="box">
          ${Object.entries(state.statuses).map(
            ([status, isChecked]) => html`
              <div class="field">
                <input
                  class="is-checkradio has-no-border"
                  id="${`reconciler-status-${status}-checkbox`}"
                  type="checkbox"
                  name="exampleCheckboxNoBorderDefault"
                  checked="${ifDefined(isChecked ? "checked" : undefined)}"
                  @click=${() => clickHandler(status, isChecked)}
                />
                <label for="${`reconciler-status-${status}-checkbox`}">
                  ${malStatuses[status]}
                </label>
              </div>
            `
          )}
        </div>
      </div>
  </div>
`;
