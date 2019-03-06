import { createFileSelectors } from "./modules/file.mjs";
import { addNavbar, addFooter } from "./templates/helper.mjs";
import { addUserListSelection } from "./templates/userListSelection.mjs";

document.addEventListener("DOMContentLoaded", () => {
  addNavbar();
  addFooter();
  createFileSelectors();
  addUserListSelection();
});
