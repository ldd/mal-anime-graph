import { watching } from "../providers/constants.mjs";

const buildAnimeEntry = ({
  id = "",
  episodesWatched = "",
  timesWatched = 1,
  score = 0,
  status = watching,
  tags = "",
  // storage = "",
  // priority = "",
  watchStartDate = "0000-00-00",
  watchEndDate = "0000-00-00"
} = {}) => `
<anime>
  <series_animedb_id>${id}</series_animedb_id>
  <my_id>0</my_id>
  <my_watched_episodes>${episodesWatched}</my_watched_episodes>
  <my_start_date>${watchStartDate}</my_start_date>
  <my_finish_date>${watchEndDate}</my_finish_date>
  <my_rated></my_rated>
  <my_score>${Math.round(score)}</my_score>
  <my_dvd></my_dvd>
  <my_storage></my_storage>
  <my_status>${status}</my_status>
  <my_comments><![CDATA[]]></my_comments>
  <my_times_watched>${Math.max(0, timesWatched - 1)}</my_times_watched>
  <my_rewatch_value></my_rewatch_value>
  <my_tags><![CDATA[${tags}]]></my_tags>
  <my_rewatching>0</my_rewatching>
  <my_rewatching_ep>0</my_rewatching_ep>
  <update_on_import>1</update_on_import>
</anime>
`;

const buildUserInfo = ({ id }) => `<myinfo>
  <user_id>${id}</user_id>
  <user_name>ldd</user_name>
  <user_export_type>1</user_export_type>
</myinfo>
`;

const buildXML = (...children) => `<?xml version="1.0" encoding="UTF-8" ?>
  <myanimelist>
    ${children.join("\n")}
  </myanimelist>
`;

export function malXMLString({ userId, data = [] } = {}) {
  const userInfo = buildUserInfo({ id: userId });
  const animeList = data.map(buildAnimeEntry).join("\n");
  const xmlString = buildXML(userInfo, animeList);
  return xmlString;
}
