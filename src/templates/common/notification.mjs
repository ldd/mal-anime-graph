import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";
import { ifDefined } from "https://unpkg.com/lit-html@1.0.0/directives/if-defined.js?module";
import { getElement, addElement } from "../helper.mjs";

let closeHandler = () => {};

const progressTemplate = ({ progressValue, type }) => {
  const progressType = type === "" ? "is-success" : "is-danger";
  return html`
    <progress
      class="progress ${progressType}"
      value="${ifDefined(progressValue)}"
      max="100"
    >
      ${progressValue}%
    </progress>
  `;
};

const notificationTemplate = (state = {}, config = {}) => {
  const { isActive = true, length, expectedLength } = state;
  const { type = "", text: doneText = "Done!" } = config;
  let text = "Processing...";
  let progressValue;
  if (length && expectedLength > 0) {
    progressValue = Math.round((length / expectedLength) * 100);
    text =
      progressValue < 100
        ? `Fetching (${length}/${expectedLength}) entries`
        : doneText;
  }
  return isActive
    ? html`
        <div id="notification-progress" class="notification ${type} is-small">
          <button class="delete" @click=${closeHandler}></button>
          <p style="margin-bottom:0.5em">${text}</p>
          ${progressTemplate({ progressValue, type })}
        </div>
      `
    : html``;
};

export function addNotification() {
  const parent = getElement("notification-container", "div", "");
  addElement(notificationTemplate, parent);
}

export function updateNotification({
  length,
  expectedLength,
  isActive = true,
  text,
  type
} = {}) {
  const parent = getElement("notification-container", "div", "");
  addElement(
    notificationTemplate,
    parent,
    {
      isActive,
      length,
      expectedLength
    },
    { type, text }
  );
}

export function updateNotificationDanger({ text, isActive = true } = {}) {
  const parent = getElement("notification-container", "div", "");
  addElement(
    notificationTemplate,
    parent,
    {
      isActive,
      length: 1,
      expectedLength: 1
    },
    { type: "is-danger", text }
  );
}

closeHandler = () => {
  // we reset length and expectedLength to 0 so nothing funny happens when
  // displaying notifications again
  updateNotification({ length: 0, expectedLength: 0, isActive: false });
};
