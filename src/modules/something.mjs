import { anilist } from "./providers/anilist.mjs";
import { updateChart } from "./chart.mjs";

function processAllData(data) {
  return data.reduce(
    (dic, { startDate: { year }, season, duration = 0 } = {}) => {
      return {
        ...dic,
        years: { ...dic.years, [year]: (dic.years[year] || 0) + 1 },
        seasons: { ...dic.seasons, [season]: (dic.seasons[season] || 0) + 1 },
        seasonMinutes: {
          ...dic.seasonMinutes,
          [season]: (dic.seasonMinutes[season] || 0) + duration
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

export async function processCharts(parsedMyData) {
  const data = [];
  for (let i = 0; i < parsedMyData.length; i += 1) {
    const datum = parsedMyData[i];
    anilist(datum.id).then(d => {
      data.push({ ...datum, ...d });
      debouncedUpdateCharts(processAllData(data));
    });
  }
}
