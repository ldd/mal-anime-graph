import { processSampleData } from "./modules/providers/malUserList.mjs";
import { createChart } from "./modules/chart.mjs";
import { processCharts } from "./modules/something.mjs";
import { addNavbar, addFooter } from "./templates/helper.mjs";
import { addChartOptions } from "./templates/chartOptions.mjs";

async function main() {
  let data = JSON.parse(localStorage.getItem("malProcessedData"));
  if (!data || data === "null" || data === "undefined") {
    data = await processSampleData();
  }
  return processCharts(data);
}
document.addEventListener("DOMContentLoaded", () => {
  addNavbar();
  addFooter();
  createChart({ id: "years-count" });
  createChart({ id: "seasons-duration", type: "pie" });
  createChart({ id: "seasons-count", type: "pie" });
  addChartOptions("years-count");
  addChartOptions("seasons-duration");
  addChartOptions("seasons-count");
  main();
});
