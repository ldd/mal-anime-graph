import { createFileSelectors } from "./modules/file.mjs";
import { processUserData } from "./modules/providers/jikanUserList.mjs";
import { addNavbar, addFooter } from "./templates/helper.mjs";

function setupForm() {
  const userInput = document.getElementById("user-selection-input");
  const userSubmitButton = document.getElementById("user-selection-submit");
  userSubmitButton.addEventListener("click", event => {
    const user = userInput.value;
    if (user && user.length > 2) {
      userSubmitButton.classList.add("is-loading");
      processUserData(userInput.value).then(data => {
        userSubmitButton.classList.remove("is-loading");
        localStorage.setItem("malProcessedData", JSON.stringify(data));
        window.location.href = "./charts.html";
      });
    }
    event.stopPropagation();
    event.preventDefault();
  });
}
window.onload = () => {
  addNavbar();
  addFooter();
  createFileSelectors();
  setupForm();
};
