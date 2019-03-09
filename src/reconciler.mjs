import { addNavbar, addFooter } from "./templates/helper.mjs";
import { addReconciler } from "./templates/reconciler/index.mjs";

document.addEventListener("DOMContentLoaded", () => {
  addNavbar();
  addFooter();
  addReconciler();
});
