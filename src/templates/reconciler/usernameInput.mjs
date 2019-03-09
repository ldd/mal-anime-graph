import { html } from "https://unpkg.com/lit-html@0.10.0/lit-html.js";

export const checkboxTemplate = ({ clickHandler } = {}) => html`
  <div class="column">
    <div class="field">
      <input
        on-click=${clickHandler}
        class="is-checkradio has-background-color"
        id="exampleCheckbox"
        type="checkbox"
        name="exampleCheckbox"
        checked="checked"
      />
      <label for="exampleCheckbox" style="user-select:none">
        I have the same username
      </label>
    </div>
  </div>
`;
const userInputTemplate = (provider = {}) => html`
  <div class="control">
    <input
      aria-label="username"
      placeholder="USERNAME"
      class="input"
      type="text"
      id="${provider.text}-username-input"
    />
  </div>
`;

export const usernameTemplate = (state = {}) => {
  const { simpleUsername = false, providers = [] } = state;
  return html`
    <div class="column">
      <div class="columns is-vcentered">
        <div class="column">
          ${simpleUsername
            ? html`
                <div class="field" id="user-list-selection">
                  ${userInputTemplate({ text: "common" })}
                </div>
              `
            : providers.map(
                (provider = {}) => html`
                  <div class="field has-addons" id="user-list-selection">
                    <div class="control">
                      <button
                        className="button ${provider.text === "MAL"
                          ? "is-info"
                          : "is-dark"}"
                        id="user-list-selection-provider"
                      >
                        ${provider.text}
                      </button>
                    </div>
                    ${userInputTemplate(provider)}
                  </div>
                `
              )}
        </div>
      </div>
    </div>
  `;
};
