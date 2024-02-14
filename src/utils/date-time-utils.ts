function formatMsgTime(datetime: string | Date) {
  const dt = datetime instanceof Date ?
    datetime :
    new Date(datetime);

  const fmtStr = dt.toLocaleString(localeRUS, MsgTimeFormat);
  const parts = fmtStr.split(",").map(x => x.trim());
  const now = new Date();

  if (datesEq(dt, now))
    return `${parts[1]}`;
  else
    return `${parts[0]} (${parts[1]})`;
}


function datesEq(dt: Date, dto: Date) {
  return dt.getFullYear() === dto.getFullYear() &&
    dt.getMonth() === dto.getMonth() &&
    dt.getDate() === dto.getDate();
}


function formatDate(datetime: string | Date) {
  const dt = datetime instanceof Date ?
    datetime :
    new Date(datetime);

  const fmtStr = dt.toLocaleString(localeRUS, FullFormat);

  return fmtStr;
}


const localeRUS = "ru";


const FullFormat: Intl.DateTimeFormatOptions = {
  era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timeZone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};


const MsgTimeFormat: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};


export { formatMsgTime, formatDate };

