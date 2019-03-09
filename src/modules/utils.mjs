export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function get(node, p) {
  return node.getElementsByTagName(p)[0].textContent;
}

export async function fetchToLocalStorage(id, fetcher, parser) {
  const item = localStorage.getItem(id);
  if (!item || item === "undefined" || item === "null") {
    const response = await fetcher(id);
    try {
      const data = parser(response);
      if (data.id) {
        localStorage.setItem(id, JSON.stringify(data));
        return data;
      }
      return response;
    } catch (e) {
      // console.error(e);
      return {};
    }
  } else {
    return JSON.parse(localStorage.getItem(id));
  }
}

export function getSeason(month = 0) {
  if (month < 3) return "WINTER";
  if (month < 6) return "SPRING";
  if (month < 9) return "SUMMER";
  return "FALL";
}

export function getPercentage(numerator, denominator, sign = "%") {
  return `${((numerator / denominator) * 100).toFixed(2)}${sign}`;
}

export function getDisplayValue(n) {
  return parseFloat(n.toFixed(2));
}
