import { html } from "https://unpkg.com/lit-html@0.10.0/lit-html.js";
import { getElement, addElement } from "./helper.mjs";

const insightTemplate = (label, value) => html`
  <p
    class="title"
    style="${value.length > 8 ? "word-break: keep-all" : ""}"
    id="chart-insights-${label}"
  >
    ${value}
  </p>
`;
export const chartInsightsTemplate = ({
  score = 0.0,
  episodesWatched = 0,
  preferedGenre = "--",
  mostWatchedGenre = "--"
} = {}) =>
  html`
    <div class="columns">
      <div class="column">
        <p class="heading">AVERAGE SCORE</p>
        ${insightTemplate("score", score)}
      </div>
      <div class="column">
        <p class="heading">EPISODES WATCHED</p>
        ${insightTemplate("episodesWatched", episodesWatched)}
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p class="heading">PREFERED GENRE</p>
        ${insightTemplate("preferedGenre", preferedGenre)}
      </div>
      <div class="column">
        <p class="heading">MOST WATCHED GENRE</p>
        ${insightTemplate("mostWatchedGenre", mostWatchedGenre)}
      </div>
    </div>
  `;

export const addChartInsights = (...args) => {
  const parent = getElement("chart-container-insights", "div", "column");
  addElement(chartInsightsTemplate, parent, ...args);
};

export const updateChartInsights = entries => {
  Object.entries(entries).forEach(([key, value]) => {
    const parent = getElement(`chart-insights-${key}`, "p", "title");
    addElement(insightTemplate, parent, key, value);
  });
};
