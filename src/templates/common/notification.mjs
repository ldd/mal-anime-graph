import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";
import { getElement, addElement } from "../helper.mjs";

let closeHandler = () => {};

// TODO: lit-html needs to be updated to better handle conditional attributes
const progressTemplate = value =>
  value
    ? html`
        <progress class="progress is-success" value="${value}" max="100">
          ${value}%
        </progress>
      `
    : html`
        <progress class="progress is-success" max="100"></progress>
      `;

const notificationTemplate = (state = {}) => {
  const { isActive = true, length, expectedLength } = state;
  let progress;
  let text = "Processing...";
  if (length && expectedLength > 0) {
    progress = Math.round((length / expectedLength) * 100);
    text =
      progress < 100
        ? `Fetching (${length}/${expectedLength}) entries`
        : "Done!";
  }
  return isActive
    ? html`
        <div id="notification-progress" class="notification is-small">
          <button class="delete" on-click=${closeHandler}></button>
          <p style="margin-bottom:0.5em">${text}</p>
          ${progressTemplate(progress)}
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
  isActive = true
} = {}) {
  const parent = getElement("notification-container", "div", "");
  addElement(notificationTemplate, parent, {
    isActive,
    length,
    expectedLength
  });
}

closeHandler = () => {
  // we reset length and expectedLength to 0 so nothing funny happens when
  // displaying notifications again
  updateNotification({ length: 0, expectedLength: 0, isActive: false });
};
