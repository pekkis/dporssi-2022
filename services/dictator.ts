import { DateTime, Duration, DurationUnit } from "luxon";
import { sortBy, sortWith, descend, ascend, prop, pipe, toLower } from "ramda";
import { Dictator } from "../types";

export const getReignDuration = (dictator: Dictator): number => {
  return dictator.reignsCollection.items.reduce((a, r) => {
    const reignStart = DateTime.fromISO(r.start);
    const reignEnd = r.end ? DateTime.fromISO(r.end) : DateTime.utc();

    const diff = reignEnd.diff(reignStart, ["days"]);
    return a + diff.days;
  }, 0);
};

export const getAge = (
  dictator: Dictator,
  unit: DurationUnit | DurationUnit[]
): Duration => {
  if (!dictator.lifespan) {
    throw new Error("No lifespan");
  }

  const start = DateTime.fromISO(dictator.lifespan.start);
  const end = dictator.lifespan.end
    ? DateTime.fromISO(dictator.lifespan.end)
    : DateTime.utc();

  return end.diff(start, unit);
};

export const getAgeInPower = (
  dictator: Dictator,
  unit: DurationUnit | DurationUnit[]
): Duration => {
  if (!dictator.reignsCollection.items[0]) {
    throw new Error("No first reign");
  }
  if (!dictator.lifespan) {
    throw new Error("No lifespan");
  }

  const start = DateTime.fromISO(dictator.lifespan.start);

  const end = DateTime.fromISO(dictator.reignsCollection.items[0].start);
  return end.diff(start, unit);
};

export const sortByReignDuration = sortWith<Dictator>([
  descend(getReignDuration),
  ascend(pipe(prop("sortName"), toLower))
]);

export const sortBySortName = sortBy<Dictator>(pipe(prop("sortName"), toLower));

export const sortByCanonicalRanking = sortWith<Dictator>([
  ascend((d: Dictator) => d.canonicalRanking || 999999),
  ascend(pipe(prop("sortName"), toLower))
]);

export const sortByAge = sortWith<Dictator>([
  descend((d: Dictator) => {
    const lifespan = getAge(d, ["years"]);
    return lifespan.years;
  }),
  ascend(pipe(prop("sortName"), toLower))
]);

export const sortByAgeInPower = sortWith<Dictator>([
  ascend((d: Dictator) => {
    const age = getAgeInPower(d, ["years"]);
    return age.years;
  }),
  ascend(pipe(prop("sortName"), toLower))
]);

export const sortByReignStart = sortWith<Dictator>([
  ascend((d: Dictator) => {
    return d.reignsCollection.items[0].start;
  }),
  ascend(pipe(prop("sortName"), toLower))
]);

export const sortByListedAt = sortWith<Dictator>([
  descend((d: Dictator) => {
    const date = d.listedAt
      ? DateTime.fromISO(d.listedAt)
      : DateTime.fromISO("1899-01-01");
    return date;
  }),
  ascend(pipe(prop("sortName"), toLower))
]);

export const sortByUpdatedAt = sortWith<Dictator>([
  descend((d: Dictator) => {
    const date = d.majorStoryUpdateAt
      ? DateTime.fromISO(d.majorStoryUpdateAt)
      : DateTime.fromISO("1899-01-01");
    return date;
  }),
  ascend(pipe(prop("sortName"), toLower))
]);

export const earliestDictator = 1850;
export const latestDictator = DateTime.local().year;
