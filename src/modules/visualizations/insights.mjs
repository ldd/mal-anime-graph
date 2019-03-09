import { updateChartInsights } from "../../templates/charts/insights.mjs";
import { updateNotification } from "../../templates/notification.mjs";

const maxReducer = (max, [key, value]) =>
  max.value > value ? max : { key, value };

export function updateInsights(rawData, attribute) {
  const { key } = Object.entries(rawData).reduce(maxReducer);
  switch (attribute) {
    case "count":
      updateChartInsights({ mostWatchedGenre: key });
      break;
    case "score":
      updateChartInsights({ preferedGenre: key });
      break;
    default:
      // nothing to do here!
      break;
  }
}

export function updateNotifications(length, expectedLength) {
  updateNotification(length, expectedLength);
}
