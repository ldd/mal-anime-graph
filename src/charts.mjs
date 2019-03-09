import { processSampleData } from "./modules/providers/malUserList.mjs";
import { processUserData as malUserData } from "./modules/providers/jikanUserList.mjs";
import { processUserData as aniUserData } from "./modules/providers/anilistUserList.mjs";
import { createChart } from "./modules/visualizations/chart.mjs";
import { processCharts } from "./modules/visualizations/chartHelper.mjs";
import { updateChartInsights } from "./templates/charts/insights.mjs";
import { addCharts } from "./templates/charts/index.mjs";

async function main() {
  let data = JSON.parse(localStorage.getItem("malProcessedData"));

  const { forceUpdate = false, userId, provider } =
    JSON.parse(localStorage.getItem("userlist_info")) || {};
  if (forceUpdate) {
    const processUserData = provider === "MAL" ? malUserData : aniUserData;
    data = await processUserData(userId);
  }
  if (!data) {
    data = await processSampleData();
  }
  data = data.filter(({ score }) => score > 0);

  const { score, episodesWatched } = data.reduce(
    (dic, n) => ({
      ...dic,
      score: dic.score + n.score,
      episodesWatched: (dic.episodesWatched || 0) + n.episodesWatched
    }),
    { score: 0, episodesWatched: 0 }
  );
  const total = data.length || 1; // 1 to avoid displaying NaN
  updateChartInsights({ score: (score / total).toFixed(2), episodesWatched });
  return processCharts(data);
}
let FLAG = false;
document.addEventListener("DOMContentLoaded", () => {
  addCharts();
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
