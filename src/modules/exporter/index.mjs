import { malXMLString } from "./malExporter.mjs";
import { processUserData as processMal } from "../providers/jikanUserList.mjs";
import { processUserData as processAni } from "../providers/anilistUserList.mjs";
import {
  aniStatuses,
  jikanStatuses,
  reverseMalStatuses
} from "../providers/constants.mjs";
import {
  updateNotification,
  updateNotificationDanger
} from "../../templates/common/notification.mjs";

// https://stackoverflow.com/a/30832210
// note: a is explicitly not removed to guarantee compatibility with some browsers
const a = document.createElement("a");
a.style = "display:none";

function saveFile({
  data,
  filename = "list.xml",
  type = "text/plain;charset=utf-8"
} = {}) {
  const file = new Blob([data], { type });
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

export function exportFile({ userId, data = [], filename } = {}) {
  const xmlString = malXMLString({ userId, data });
  saveFile({ data: xmlString, filename });
}

// entry is the base object to be expanded
// and overwritten with newData's data
function mergeEntry(entry, newData) {
  return {
    ...entry,
    episodesWatched: newData.episodesWatched || entry.episodesWatched,
    score: newData.score || entry.score,
    watchStartDate: newData.watchStartDate || entry.watchStartDate,
    watchEndDate: newData.watchEndDate || entry.watchEndDate
  };
}

export function getDifferences(malData, aniData = malData) {
  // find inconsistencies
  const malDic = {};
  for (let index = 0; index < malData.length; index += 1) {
    const entry = malData[index];
    malDic[entry.id] = entry;
  }
  const differences = [[], []];
  const malDifferences = differences[0];
  const anilistDifferences = differences[1];
  for (let index = 0; index < aniData.length; index += 1) {
    const entry = aniData[index];
    // entry found, deep personal compare
    if (malDic[entry.id]) {
      const otherEntry = malDic[entry.id];

      // found differences in score
      // TODO: prompt the user to include these values
      if (Math.abs(entry.score - otherEntry.score) > 0.1) {
        anilistDifferences.push(otherEntry);
        malDifferences.push(mergeEntry(otherEntry, entry));
      }
      // found differences in episodes watched
      else if (entry.episodesWatched < otherEntry.episodesWatched) {
        malDifferences.push(mergeEntry(otherEntry, entry));
      } else if (entry.episodesWatched > otherEntry.episodesWatched) {
        anilistDifferences.push(otherEntry);
      }
    }
    // not found, add
    else {
      malDifferences.push(entry);
    }
  }
  return differences;
}

export async function exportUserListData(malId, aniId = malId, statuses) {
  // use a simple strategy: if only 1 status is selected, just process that one
  // otherwise, process all and filter out the ones you don't need!
  const selectedStatuses = Object.entries(statuses).filter(
    ([, isActive]) => isActive
  );
  let status = null;
  if (selectedStatuses.length === 1) {
    [[status]] = selectedStatuses;
  }
  updateNotification({ length: 0, expectedLength: 2 });
  const promisedMalData = processMal({
    userId: malId,
    status: jikanStatuses[status]
  });
  const promisedAniData = processAni({
    userId: aniId,
    status: aniStatuses[status]
  });
  let aniData = await promisedAniData;
  if (aniData && aniData.length) {
    updateNotification({ length: 1, expectedLength: 2 });
  } else {
    updateNotificationDanger({ text: "No user data found =/ " });
  }
  let malData = await promisedMalData;
  if (malData && malData.length) {
    updateNotification({ length: 2, expectedLength: 2 });
  } else {
    updateNotificationDanger({ text: "No user data found =/ " });
  }
  // filter out statuses we talked about earlier
  if (selectedStatuses.length > 1) {
    aniData = aniData.filter(
      ({ status: animeStatus }) => statuses[reverseMalStatuses[animeStatus]]
    );
    malData = malData.filter(
      ({ status: animeStatus }) => statuses[reverseMalStatuses[animeStatus]]
    );
  }

  const [malDiff, aniDiff] = getDifferences(malData, aniData);
  if (malDiff && malDiff.length) {
    exportFile({ userId: malId, data: malDiff, filename: "for-ani.xml" });
  }
  if (aniDiff && aniDiff.length) {
    exportFile({ userId: aniId, data: aniDiff, filename: "for-mal.xml" });
  }
}
