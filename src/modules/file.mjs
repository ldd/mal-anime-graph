import { parseMyData } from "./providers/malUserList.mjs";

const reader = new FileReader();

// note: this handler will not trigger if the file is the same
// so there's no need to check md5sum differences here
reader.onloadend = () => {
  const parsedMyData = parseMyData(reader.result);
  localStorage.setItem("malProcessedData", JSON.stringify(parsedMyData));
  window.location.href = "./charts.html";
};

function dropHandler(event) {
  const container = event.dataTransfer || event.target;
  reader.readAsText(container.files[0]);
  event.stopPropagation();
  event.preventDefault();
}
export function createFileSelectors() {
  const fileInput = document.getElementById("file-selection-input");
  fileInput.addEventListener("change", dropHandler);

  const box = document.getElementsByClassName("box")[0];
  box.addEventListener("drop", dropHandler);
  box.addEventListener("dragover", event => {
    event.stopPropagation();
    event.preventDefault();
  });
}
