import { getPercentage, getDisplayValue } from "../utils.mjs";

const chartMap = new Map();
const isSmall = window.innerWidth < 500;

function getOptions(type, attribute = "season", metric = "count") {
  // update options
  const entryType = metric === "duration" ? "min" : "entries";
  let text = "";
  if (metric === "count") text = "Total count";
  if (metric === "duration") text = "Total minutes";
  if (metric === "score") text = "Average score";
  text = `${text} of anime watched by ${attribute}`;
  if (type !== "pie") {
    return {
      responsive: true,
      elements: {
        line: {
          borderDash: [11, 4],
          fill: false,
          borderColor: "gray"
        }
      },
      legend: { display: false },
      scales: {
        xAxes: [
          {
            ticks: { maxTicksLimit: isSmall ? 5 : 10 },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false
            },
            ticks: { precision: 0, beginAtZero: true }
          }
        ]
      }
    };
  }
  if (type === "pie") {
    return {
      responsive: true,
      title: { display: true, text },
      legend: { position: "left" },
      tooltips: {
        callbacks: {
          label({ datasetIndex, index }, { datasets }) {
            const { data } = datasets[datasetIndex];
            const total = data.reduce((sum, n) => sum + n, 0);
            const entry = data[index];
            const percentage = getPercentage(entry, total, "");
            return `${percentage}% (${getDisplayValue(entry)} ${entryType})`;
          }
        }
      }
    };
  }
  return null;
}
function getColors(type) {
  if (type === "pie")
    return [
      "rgba(63, 195, 128, 0.9)",
      "rgba(44, 130, 201, 0.9)",
      "rgba(210, 77, 87, 1)",
      "rgba(255, 148, 120, 1)"
    ];
  return "gray";
}
export function createChart({
  id = "myChart",
  type = "line",
  labels = ["", "", ""],
  data = [5, 5, 5]
} = {}) {
  const parent = document.getElementById(`chart-container-${id}`);
  // return early if id is not found
  if (parent === null) return null;

  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.style.minWidth = "0px";
  parent.appendChild(canvas);

  const context = canvas.getContext("2d");
  const myChart = new Chart(context, {
    type,
    data: {
      labels,
      datasets: [
        {
          label: "Number of anime watched by year",
          data,
          backgroundColor: getColors(type),
          borderWidth: 1
        }
      ]
    },
    options: getOptions(type)
  });
  chartMap.set(id, myChart);
  return myChart;
}

function updateData(chart, labels, data) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
}

function updateConfig(chart, labels) {
  if (!Number.isNaN(labels[0])) {
    if (labels.length < 6) {
      if (chart.config.type === "line") {
        chart.config = { ...chart.config, type: "bar" };
      }
    } else {
      chart.config = { ...chart.config, type: "line" };
    }
  }
}

export function updateChart({ id, metric, labels = [], data = [] } = {}) {
  const chart = chartMap.get(id);
  if (chart && chart.data) {
    updateData(chart, labels, data);
    updateConfig(chart, labels);
    const [attribute] = id.split("-");
    chart.options = getOptions(chart.config.type, attribute, metric);
    chart.update();
  }
}

export const filterChart = updateChart;
