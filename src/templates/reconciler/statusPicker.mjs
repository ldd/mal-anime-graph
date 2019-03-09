import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";

export const statusPickerTemplate = ({ state = {}, clickHandler } = {}) => html`
    <div class="column">
      <div class="box">
          ${Object.entries(state.statuses).map(
            ([status, isChecked]) => html`
              <div class="field">
                <input
                  class="is-checkradio has-no-border"
                  id="exampleCheckboxNoBorderDefault"
                  type="checkbox"
                  name="exampleCheckboxNoBorderDefault"
                  checked="${isChecked}"
                  on-click=${() => clickHandler(status, isChecked)}
                />
                <label for="exampleCheckboxNoBorderDefault">
                  ${status}
                </label>
              </div>
            `
          )}
        </div>
      </div>
  </div>
`;
