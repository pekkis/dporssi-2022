/** @jsxImportSource theme-ui */

import { DateTime, Duration } from "luxon";
import { useEffect, useRef, useState } from "react";
import { FC } from "react";

const SalivationClock: FC = () => {
  const salvaliittoRef = useRef<DateTime>(DateTime.fromISO("2002-12-09"));

  const [diff, setDiff] = useState<Duration>(
    salvaliittoRef.current.diff(DateTime.utc(), [
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
        salvaliittoRef.current.diff(DateTime.utc(), [
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
