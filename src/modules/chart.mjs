const chartMap = new Map();

function getOptions(type) {
  if (type === "bar") {
    return { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } };
  }
  if (type === "pie") {
    return {
      legend: { position: "left" }
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
  return [];
}
export function createChart({
  id = "myChart",
  type = "bar",
  labels = ["", "", ""],
  data = [12, 19, 3]
} = {}) {
  const parent = document.getElementById(`chart-container-${id}`);
  // return early if id is not found
  if (parent === null) return null;

  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.style.maxWidth = "450px";
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

export function updateChart({ id, labels = [], data = [] } = {}) {
  const chart = chartMap.get(id);
  if (chart && chart.data) {
    // update data
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;

    // update options
    const total = data.reduce((sum, n) => sum + n, 0);
    const typeofEntry = id === "seasons-duration" ? "min" : "entries";
    let text = "";
    if (id === "seasons-duration") text = "Minutes of anime watched by season";
    if (id === "seasons-count") text = "Number of anime watched by season";
    chart.options = {
      ...getOptions(chart.config.type),
      title: { display: true, text },
      tooltips: {
        callbacks: {
          label({ datasetIndex, index }, { datasets }) {
            const entry = datasets[datasetIndex].data[index];
            const percentage = Math.floor((entry / total) * 1000) / 10;
            return `${percentage}% (${entry} ${typeofEntry})`;
          }
        }
      }
    };
    chart.update();
  }
}

export function filterChart({ id, labels = [], data = [] } = {}) {
  const chart = chartMap.get(id);
  if (chart && chart.data) {
    // update data
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  }
}
