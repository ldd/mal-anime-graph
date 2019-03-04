import { createFileSelectors } from "./modules/file.mjs";
import { processUserData } from "./modules/providers/jikanUserList.mjs";

function setupForm() {
  const userInput = document.getElementById("user-selection-input");
  const userSubmitButton = document.getElementById("user-selection-submit");
  userSubmitButton.addEventListener("click", event => {
    const user = userInput.value;
    if (user && user.length > 2) {
      processUserData(userInput.value).then(data => {
        localStorage.setItem("malProcessedData", JSON.stringify(data));
        window.location.href = "./charts.html";
      });
    }
    event.stopPropagation();
    event.preventDefault();
  });
}
window.onload = () => {
  createFileSelectors();
  setupForm();
};
