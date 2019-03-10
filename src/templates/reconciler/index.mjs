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
      clickHandler: () => {
        let malUsername;
        let aniUsername;
        if (state.simpleUsername) {
          malUsername = document.getElementById("common-username-input").value;
          aniUsername = malUsername;
        } else {
          malUsername = document.getElementById("MAL-username-input").value;
          aniUsername = document.getElementById("ANILIST-username-input").value;
        }
        exportUserListData(malUsername, aniUsername);
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
