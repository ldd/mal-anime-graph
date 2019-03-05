import { anilist } from "./providers/anilist.mjs";
import { updateChart, filterChart } from "./chart.mjs";

function processAllData(data) {
  return data.reduce(
    (
      dic,
      {
        startDate: { year },
        season,
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
        ...dic,
        years: { ...dic.years, [year]: (dic.years[year] || 0) + 1 },
        seasons: { ...dic.seasons, [season]: (dic.seasons[season] || 0) + 1 },
        seasonMinutes: {
          ...dic.seasonMinutes,
          [season]: (dic.seasonMinutes[season] || 0) + totalDuration
        }
      };
    },
    { years: {}, seasons: {}, seasonMinutes: {} }
  );
}

function updateCharts(data) {
  const processedKeys = Object.keys(data);
  const processedValues = Object.values(data);
  for (let index = 0; index < processedValues.length; index += 1) {
    const vv = processedValues[index];
    const [labels, innerValues] = [Object.keys(vv), Object.values(vv)];
    updateChart({ id: processedKeys[index], labels, data: innerValues });
  }
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

export function filterChartData(id, filter = () => true) {
  const allFilteredData = processAllData(data.filter(filter));
  const chartData = allFilteredData[id];
  const [labels, innerValues] = [
    Object.keys(chartData),
    Object.values(chartData)
  ];
  filterChart({ id, labels, data: innerValues });
}
