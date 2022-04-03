import { DateTime } from "luxon";

export const formatDate = (dateStr: string | DateTime) => {
  const dateObj =
    dateStr instanceof DateTime ? dateStr : DateTime.fromISO(dateStr);
  return dateObj.setLocale("fi").toLocaleString({ locale: "fi" });
};
