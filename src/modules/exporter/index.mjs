import { malXMLString } from "./malExporter.mjs";
import { processUserData as processMalUserData } from "../providers/jikanUserList.mjs";
import { processUserData as processAniUserData } from "../providers/anilistUserList.mjs";
import { watching, aniStatuses } from "../providers/constants.mjs";
import { updateNotification } from "../../templates/common/notification.mjs";

// https://stackoverflow.com/a/30832210
function saveFile({ data, filename = "list.xml", type = "text/xml" } = {}) {
  const file = new Blob([data], { type });
  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

export function exportFile({ userId, data = [], filename } = {}) {
  const xmlString = malXMLString({ userId, data });
  saveFile({ data: xmlString, filename });
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

      // found differences in episodes watched
      if (entry.episodesWatched < otherEntry.episodesWatched) {
        malDifferences.push(entry);
      } else if (entry.episodesWatched > otherEntry.episodesWatched) {
        anilistDifferences.push(otherEntry);
      }

      // found differences in score
      // TODO: prompt the user to include these values
      if (Math.abs(entry.score - otherEntry.score) > 0.1) {
        malDifferences.push(entry);
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

export async function exportUserListData(malId, aniId = malId) {
  updateNotification({ length: 0, expectedLength: 2 });
  const promiseMalData = processMalUserData({
    userId: malId,
    status: watching
  });
  const promisedAniData = processAniUserData({
    userId: aniId,
    status: aniStatuses.watching
  });
  const malData = await promiseMalData;
  updateNotification({ length: 1, expectedLength: 2 });
  const aniData = await promisedAniData;
  updateNotification({ length: 2, expectedLength: 2 });

  const [malDiff, aniDiff] = getDifferences(malData, aniData);
  if (malDiff && malDiff.length) {
    exportFile({ userId: malId, data: malDiff, filename: "for-mal.xml" });
  }
  if (aniDiff && aniDiff.length) {
    exportFile({ userId: aniId, data: malDiff, filename: "for-ani.xml" });
  }
}
