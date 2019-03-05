import { anilist } from "./providers/anilist.mjs";
import { updateChart, filterChart } from "./chart.mjs";

function processAllData(data) {
  return data.reduce(
    (
      dic,
      {
        startDate: { year },
        season,
        score = 0,
        duration = 0,
        timesWatched = 1,
        episodes = 0,
        episodesWatched = 0
      } = {}
    ) => {
      const totalDuration =
        duration * episodesWatched * 1 +
        duration * episodes * (timesWatched - 1);
      return {
        years: {
          count: {
            ...dic.years.count,
            [year]: (dic.years.count[year] || 0) + 1
          },
          duration: {
            ...dic.years.duration,
            [year]: (dic.years.duration[year] || 0) + totalDuration
          },
          score: {
            ...dic.years.score,
            [year]: (dic.years.score[year] || 0) + score
          }
        },
        seasons: {
          count: {
            ...dic.seasons.count,
            [season]: (dic.seasons.count[season] || 0) + 1
          },
          duration: {
            ...dic.seasons.duration,
            [season]: (dic.seasons.duration[season] || 0) + totalDuration
          },
          score: {
            ...dic.seasons.score,
            [season]: (dic.seasons.score[season] || 0) + score
          }
        }
      };
    },
    {
      years: { count: {}, duration: {}, score: {} },
      seasons: { count: {}, duration: {}, score: {} }
    }
  );
}

function updateCharts(data) {
  Object.entries(data).forEach(([id, attributes]) => {
    Object.entries(attributes).forEach(([attributeKey, metrics]) => {
      const labels = Object.keys(metrics);
      const innerData = Object.values(metrics);
      updateChart({ id: `${id}-${attributeKey}`, labels, data: innerData });
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
