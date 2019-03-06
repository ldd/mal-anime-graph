import { createFileSelectors } from "./modules/file.mjs";
import { addNavbar, addFooter } from "./templates/helper.mjs";
import { addUserListSelection } from "./templates/userListSelection.mjs";

window.onload = () => {
  addNavbar();
  addFooter();
  createFileSelectors();
  addUserListSelection();
};
