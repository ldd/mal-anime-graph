import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";
import { getElement, addElement } from "../helper.mjs";

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
        <p class="heading">PREFERRED GENRE</p>
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
    // make sure parent and child have different id
    const parent = getElement(`chart-insights-${key}`, "p", "title");
    addElement(insightTemplate, parent, `${key}-label`, value);
  });
};
