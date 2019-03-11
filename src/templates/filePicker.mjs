import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";
import { parseMyData } from "../modules/providers/malUserList.mjs";
import { getElement, addElement } from "./helper.mjs";

const reader = new FileReader();

// note: this handler will not trigger if the file is the same
// so there's no need to check md5sum differences here
reader.onloadend = () => {
  const parsedMyData = parseMyData(reader.result);
  localStorage.setItem("malProcessedData", JSON.stringify(parsedMyData));
  localStorage.removeItem("userlist_info");
  window.location.href = "./charts.html";
};

const dropHandler = event => {
  const container = event.dataTransfer || event.target;
  reader.readAsText(container.files[0]);
  event.stopPropagation();
  event.preventDefault();
};

const voidHandler = event => {
  event.stopPropagation();
  event.preventDefault();
};

const filePickerTemplate = () => html`
  <div class="box" @drop=${dropHandler} @dragover=${voidHandler}>
    <div class="file-box" draggable="true">
      <p>Drop your XML here</p>
    </div>
    <div class="file is-primary has-name">
      <label class="file-label">
        <input
          type="file"
          id="file-selection-input"
          class="file-input"
          name="resume"
          @change=${dropHandler}
        />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            CHOOSE A FILE…
          </span>
        </span>
        <span class="file-name">
          sample_mal_userlist.xml
        </span>
      </label>
    </div>
  </div>
`;
export function addFilePicker() {
  const parent = getElement("file-selection-container", "div", "column");
  addElement(filePickerTemplate, parent);
}
