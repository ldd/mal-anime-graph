import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";
import { processUserData as malUserData } from "../modules/providers/jikanUserList.mjs";
import { processUserData as aniUserData } from "../modules/providers/anilistUserList.mjs";
import { getElement, addElement } from "./helper.mjs";

const providerClickHandler = (event, { state }) => {
  if (state.provider !== "ANILIST") {
    event.target.textContent = "ANILIST";
    state.provider = "ANILIST";
    event.target.className = "button is-dark";
  } else {
    event.target.textContent = "MAL";
    state.provider = "MAL";
    event.target.className = "button is-info";
  }
};

const formClickHandler = (event, { state: { provider } }) => {
  const userInput = document.getElementById("user-list-selection-input") || {};
  const user = userInput.value;
  if (user && user.length > 2) {
    const userSubmitButton = event.target;
    userSubmitButton.classList.add("is-loading");
    const processUserData = provider === "MAL" ? malUserData : aniUserData;
    processUserData(userInput.value).then(data => {
      userSubmitButton.classList.remove("is-loading");
      localStorage.setItem("malProcessedData", JSON.stringify(data));
      window.location.href = "./charts.html";
    });
  }
  event.stopPropagation();
  event.preventDefault();
};
// This is a lit-html template function.
export const userListSelectionTemplate = ({
  state = { provider: "MAL" }
} = {}) => {
  return html`
    <div class="control">
      <button
        class="button is-info"
        id="user-list-selection-provider"
        on-click=${e => providerClickHandler(e, { state })}
      >
        MAL
      </button>
    </div>
    <div class="control">
      <input
        aria-label="username"
        placeholder="USERNAME"
        class="input"
        type="text"
        id="user-list-selection-input"
      />
    </div>
    <div class="control">
      <button
        class="button is-primary"
        type="submit"
        id="user-list-selection-submit"
        on-click=${e => formClickHandler(e, { state })}
      >
        SUBMIT
      </button>
    </div>
  `;
};

export const addUserListSelection = (...args) => {
  const parent = getElement("user-list-selection", "div", "field has-addons");
  addElement(userListSelectionTemplate, parent, ...args);
};
