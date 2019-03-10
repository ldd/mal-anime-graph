// using strings instead of symbols for easier usage with JSON.parse
export const watching = "Watching";
export const completed = "Completed";
export const onHold = "On Hold";
export const dropped = "Dropped";
export const planToWatch = "Plan to Watch";

export const malStatuses = {
  watching,
  planToWatch,
  completed,
  dropped,
  onHold
};

export const aniStatuses = {
  watching: "CURRENT",
  planToWatch: "PLANNING",
  completed: "COMPLETED",
  dropped: "DROPPED",
  onHold: "PAUSED",
  repeating: "REPEATING"
};

// https://anilist.github.io/ApiV2-GraphQL-Docs/medialiststatus.doc.html
export function parseAniStatus(status) {
  switch (status) {
    case "CURRENT":
      return watching;
    case "PLANNING":
      return planToWatch;
    case "COMPLETED":
      return completed;
    case "DROPPED":
      return dropped;
    case "PAUSED":
      return onHold;
    case "REPEATING":
      return completed;
    default:
      return "";
  }
}

export function parseMalStatus(status) {
  switch (status) {
    case 1:
      return watching;
    case 2:
      return completed;
    case 3:
      return onHold;
    case 4:
      return dropped;
    case 6:
      return planToWatch;
    default:
      return "";
  }
}
