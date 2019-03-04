import { processSampleData } from "./modules/providers/malUserList.mjs";
import { createChart } from "./modules/chart.mjs";
import { processCharts } from "./modules/something.mjs";

async function main() {
  let data = JSON.parse(localStorage.getItem("malProcessedData"));
  if (!data || data === "null" || data === "undefined") {
    data = await processSampleData();
  }
  return processCharts(data);
}

window.onload = () => {
  createChart({ id: "years" });
  createChart({ id: "seasons", type: "pie" });
  createChart({ id: "seasonMinutes", type: "pie" });
  main();
};
