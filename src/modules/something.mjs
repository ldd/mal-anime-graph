import { anilist } from "./providers/anilist.mjs";
import { updateChart, filterChart } from "./chart.mjs";
import { updateInsights } from "./insights.mjs";

export function processAllData(data = []) {
  return data.reduce(
    (
      dic,
      {
        score = 0,
        episodes = 0,
        episodesWatched = 0,
        timesWatched = 1,
        genres = [],
        // studios = [],
        duration = 0,
        season,
        startDate: { year } = {}
      } = {}
    ) => {
      const totalDuration =
        duration * episodesWatched * 1 +
        duration * episodes * (timesWatched - 1);
      const yearsCount = (dic.years.count[year] || 0) + 1;
      const seasonsCount = (dic.seasons.count[season] || 0) + 1;
      const genreCountMap = genres.reduce((acc, genre) => {
        const genresCount = (acc.count[genre] || 0) + 1;
        return {
          count: { ...acc.count, [genre]: genresCount },
          duration: {
            ...acc.duration,
            [genre]: (acc.duration[genre] || 0) + totalDuration
          },
          score: {
            ...acc.score,
            [genre]:
              ((acc.score[genre] || 0) * (genresCount - 1) + score) /
              genresCount
          }
        };
      }, dic.genres);
      return {
        years: {
          count: {
            ...dic.years.count,
            [year]: yearsCount
          },
          duration: {
            ...dic.years.duration,
            [year]: (dic.years.duration[year] || 0) + totalDuration
          },
          score: {
            ...dic.years.score,
            [year]:
              ((dic.years.score[year] || 0) * (yearsCount - 1) + score) /
              yearsCount
          }
        },
        seasons: {
          count: {
            ...dic.seasons.count,
            [season]: seasonsCount
          },
          duration: {
            ...dic.seasons.duration,
            [season]: (dic.seasons.duration[season] || 0) + totalDuration
          },
          score: {
            ...dic.seasons.score,
            [season]:
              ((dic.seasons.score[season] || 0) * (seasonsCount - 1) + score) /
              seasonsCount
          }
        },
        genres: {
          count: {
            ...dic.genres.count,
            ...genreCountMap.count
          },
          duration: {
            ...dic.genres.duration,
            ...genreCountMap.duration
          },
          score: {
            ...dic.genres.score,
            ...genreCountMap.score
          }
        }
      };
    },
    {
      years: { count: {}, duration: {}, score: {} },
      seasons: { count: {}, duration: {}, score: {} },
      genres: { count: {}, duration: {}, score: {} }
    }
  );
}

function updateCharts(data) {
  Object.entries(data).forEach(([attributeKey, attributes]) => {
    Object.entries(attributes).forEach(([metricKey, metrics]) => {
      const labels = Object.keys(metrics);
      const innerData = Object.values(metrics);
      updateChart({
        id: `${attributeKey}-${metricKey}`,
        labels,
        data: innerData
      });
      if (attributeKey === "genres") {
        updateInsights(metrics, metricKey);
      }
    });
  });
}
const debouncedUpdateCharts = debounce(updateCharts, 250, false);

const data = [];
export async function processCharts(parsedMyData) {
  data.length = 0;
  for (let i = 0; i < parsedMyData.length; i += 1) {
    const datum = parsedMyData[i];
    anilist(datum.id).then(d => {
      data.push({ ...datum, ...d });
      debouncedUpdateCharts(processAllData(data));
    });
  }
}

export function updateByFilter(id, filter = () => true) {
  const allFilteredData = processAllData(data.filter(filter));
  const [attribute, metric] = id.split("-");
  const chartData = allFilteredData[attribute][metric];
  const [labels, innerValues] = [
    Object.keys(chartData),
    Object.values(chartData)
  ];
  filterChart({ id, labels, data: innerValues });
}

export function updateByMetric(id, metric) {
  const allFilteredData = processAllData(data);
  const [attribute] = id.split("-");
  const chartData = allFilteredData[attribute][metric];
  const [labels, innerValues] = [
    Object.keys(chartData),
    Object.values(chartData)
  ];
  filterChart({ id, labels, data: innerValues });
}
