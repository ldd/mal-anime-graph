import { processSampleData } from "./modules/providers/malUserList.mjs";
import { createChart } from "./modules/chart.mjs";
import { processCharts } from "./modules/something.mjs";
import { addNavbar, addFooter } from "./templates/helper.mjs";
import { addChartOptions } from "./templates/chartOptions.mjs";
import {
  addChartInsights,
  updateChartInsights
} from "./templates/chartInsights.mjs";

async function main() {
  let data = JSON.parse(localStorage.getItem("malProcessedData"));
  if (!data || data === "null" || data === "undefined") {
    data = await processSampleData();
  }
  const total = data.filter(({ score }) => score > 0).length;
  const insights = data.reduce(
    (dic, n) => ({
      ...dic,
      score:
        Math.floor((((dic.score || 0) * total + n.score) / total) * 100) / 100,
      episodesWatched: (dic.episodesWatched || 0) + n.episodesWatched
    }),
    { score: 0, episodesWatched: 0 }
  );
  updateChartInsights(insights);
  return processCharts(data);
}
document.addEventListener("DOMContentLoaded", () => {
  addNavbar();
  addFooter();
  addChartInsights();
  createChart({ id: "years-count" });
  createChart({ id: "seasons-duration", type: "pie" });
  createChart({ id: "seasons-count", type: "pie" });
  addChartOptions("years-count");
  addChartOptions("seasons-duration");
  addChartOptions("seasons-count");
  setTimeout(main, 0);
});
