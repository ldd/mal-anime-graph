// templates
import { getElement, addElement } from "../helper.mjs";
import { checkboxTemplate, usernameTemplate } from "./usernameInput.mjs";
import { svgSyncTemplate } from "./svgSync.mjs";
import { titleTemplate } from "../common/title.mjs";
import { statusPickerTemplate } from "./statusPicker.mjs";
import {
  buttonTemplate,
  container,
  columnsTemplate
} from "../common/index.mjs";

// functionality
import { exportUserListData } from "../../modules/exporter/index.mjs";

const submitButtonTemplate = state =>
  buttonTemplate(
    {
      text: "SUBMIT",
      classList: "is-primary is-inverted is-outlined",
      clickHandler: event => {
        const commonElement = document.getElementById("common-username-input");
        const malElement = document.getElementById("MAL-username-input");
        const aniElement = document.getElementById("ANILIST-username-input");
        let malUsername;
        let aniUsername;
        if (state.simpleUsername && commonElement) {
          malUsername = commonElement.value;
          aniUsername = malUsername;
          if (commonElement) commonElement.disabled = true;
        } else {
          malUsername = malElement.value;
          aniUsername = aniElement.value;
          if (malElement) malElement.disabled = true;
          if (aniElement) aniElement.disabled = true;
        }
        event.target.classList.add("is-loading");
        exportUserListData(malUsername, aniUsername).then(() => {
          event.target.classList.remove("is-loading");
          if (commonElement) commonElement.disabled = false;
          if (malElement) malElement.disabled = false;
          if (aniElement) aniElement.disabled = false;
        });
      }
    },
    state
  );

export function addReconciler(
  state = {
    simpleUsername: true,
    providers: [
      { text: "MAL", value: undefined },
      { text: "ANILIST", value: undefined }
    ],
    statuses: { Watching: true }
  }
) {
  const parent = getElement("reconciler-hero", "div", "hero-body");
  addElement(
    container(
      () =>
        titleTemplate({
          title: "Anime Profile Reconciler",
          subtitle: "Reconcile your MAL and anilist profiles!"
        }),
      columnsTemplate({
        classList: "",
        children: [
          () =>
            checkboxTemplate({
              clickHandler: () => {
                state.simpleUsername = !state.simpleUsername;
                addReconciler(state);
              }
            }),
          () => usernameTemplate(state)
        ]
      }),
      columnsTemplate({
        children: [
          () =>
            statusPickerTemplate({
              state,
              clickHandler: (status, isChecked) => {
                state.statuses[status] = !isChecked;
                addReconciler(state);
              }
            })
        ]
      }),
      columnsTemplate({
        classList: "is-mobile is-centered is-vcentered",
        style: "position:relative;justify-content:space-evenly;height:200px",
        children: [
          svgSyncTemplate,
          buttonTemplate,
          () => buttonTemplate({ text: "ANILIST", classList: "is-dark" })
        ]
      }),
      columnsTemplate({
        classList: "is-mobile is-centered is-vcentered",
        children: [() => submitButtonTemplate(state)]
      })
    ),
    parent
  );
}
