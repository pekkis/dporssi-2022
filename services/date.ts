import { DateTime } from "luxon";

export const formatDate = (dateStr: string | DateTime) => {
  const dateObj = createDate(dateStr);

  return dateObj.setLocale("fi").toLocaleString();
};

export const createDate = (dateStr: string | DateTime) => {
  if (dateStr instanceof DateTime) {
    return dateStr;
  }

  return DateTime.fromISO(dateStr).setLocale("fi").setZone("Europe/Helsinki");
};
