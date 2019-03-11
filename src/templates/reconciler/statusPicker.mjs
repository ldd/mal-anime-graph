import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";

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
                  @click=${() => clickHandler(status, isChecked)}
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
