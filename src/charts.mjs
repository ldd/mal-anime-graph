import { processSampleData } from "./modules/providers/malUserList.mjs";
import { createChart } from "./modules/visualizations/chart.mjs";
import { processCharts } from "./modules/visualizations/chartHelper.mjs";
import { addNavbar, addFooter } from "./templates/helper.mjs";
import { addChartOptions } from "./templates/chartOptions.mjs";
import {
  addChartInsights,
  updateChartInsights
} from "./templates/chartInsights.mjs";
import { addNotification } from "./templates/notification.mjs";

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
let FLAG = false;
document.addEventListener("DOMContentLoaded", () => {
  addNavbar();
  addFooter();
  addChartInsights();
  addNotification();
  addChartOptions("years-count");
  addChartOptions("seasons-duration");
  addChartOptions("seasons-count");
  // for a smooth user experience, we will wait until the initial mocked charts load
  // https://www.chartjs.org/docs/latest/configuration/animations.html#animation-callbacks
  Chart.defaults.global.animation.onComplete = () => {
    if (FLAG === false) {
      FLAG = true;
      main();
    }
  };
  createChart({ id: "years-count" });
  createChart({ id: "seasons-duration", type: "pie" });
  createChart({ id: "seasons-count", type: "pie" });
});
