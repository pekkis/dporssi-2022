import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";
import { FC } from "react";

const SALVALIITTO = DateTime.fromISO("2002-12-09");

const SalivationClock: FC = () => {
  const [diff, setDiff] = useState<Duration>(
    SALVALIITTO.diff(DateTime.utc(), [
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds"
    ])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(
        SALVALIITTO.diff(DateTime.utc(), [
          "years",
          "months",
          "days",
          "hours",
          "minutes",
          "seconds"
        ])
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <strong>{Math.abs(diff.years)}</strong> vuotta,{" "}
      <strong>{Math.abs(diff.months)}</strong> kuukautta,{" "}
      <strong>{Math.abs(diff.days)}</strong> päivää,{" "}
      <strong>{Math.abs(diff.hours)}</strong> tuntia,{" "}
      <strong>{Math.abs(diff.minutes)}</strong> minuuttia ja{" "}
      <strong>{Math.abs(Math.floor(diff.seconds))}</strong> sekuntia
    </>
  );
};

export default SalivationClock;
