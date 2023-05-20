import { DateTime } from "luxon";
import { filter, last } from "ramda";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  getAge,
  getReignDuration,
  sortByAge,
  sortByCanonicalRanking,
  sortByReignDuration,
  sortBySortName,
  sortByListedAt,
  sortByUpdatedAt,
  getAgeInPower,
  sortByAgeInPower
} from "../../services/dictator";
import { Dictator } from "../../types";
import ExtraInfoBox from "./ExtraInfoBox";

export type Highlighter = (d: Dictator) => boolean;

export const highlights: Record<PossibleHighlights, Highlighter> = {
  solidary: () => true,
  alive: (dictator: Dictator) => {
    if (!dictator.lifespan) {
      return false;
    }

    if (dictator.lifespan.end) {
      return false;
    }

    return true;
  },
  inPower: (dictator: Dictator) => {
    if (!dictator.reignsCollection.items) {
      return false;
    }
    const lastReign = last(dictator.reignsCollection.items);

    if (!lastReign?.end) {
      return true;
    }

    return false;
  }
};

export type PossibleSortrados =
  | "name"
  | "listedAt"
  | "updatedAt"
  | "reignDuration"
  | "ranking"
  | "age"
  | "ageInPower";

export type PossibleHighlights = "solidary" | "inPower" | "alive";

export type ExtraInfoComponent = ({
  dictator
}: {
  dictator: Dictator;
}) => ReactElement | null;

export type Sortrado = {
  sorter: (list: readonly Dictator[]) => Dictator[];
  filter: (d: Dictator) => boolean;
  ExtraInfo: ExtraInfoComponent;
};

export const sortrados: Record<PossibleSortrados, Sortrado> = {
  name: {
    sorter: sortBySortName,
    filter: () => true,
    ExtraInfo: (): ReactElement | null => {
      return null;
    }
  },
  listedAt: {
    sorter: sortByListedAt,
    filter: (d) => !!d.listedAt,
    ExtraInfo: ({ dictator }): ReactElement | null => {
      if (!dictator.listedAt) {
        return null;
      }

      const d = DateTime.fromISO(dictator.listedAt);

      return (
        <ExtraInfoBox>
          {d
            .setLocale(process.env.NEXT_PUBLIC_LOCALE as string)
            .toLocaleString()}
        </ExtraInfoBox>
      );
    }
  },
  updatedAt: {
    sorter: sortByUpdatedAt,
    filter: (d) => !!d.majorStoryUpdateAt,
    ExtraInfo: ({ dictator }: { dictator: Dictator }): ReactElement | null => {
      if (!dictator.majorStoryUpdateAt) {
        return null;
      }

      const d = DateTime.fromISO(dictator.majorStoryUpdateAt);
      return (
        <ExtraInfoBox>
          {d
            .setLocale(process.env.NEXT_PUBLIC_LOCALE as string)
            .toLocaleString()}
        </ExtraInfoBox>
      );
    }
  },
  reignDuration: {
    sorter: sortByReignDuration,
    filter: () => true,
    ExtraInfo: ({ dictator }) => {
      const duration = getReignDuration(dictator);

      return <ExtraInfoBox>{Math.floor(duration)} päivää</ExtraInfoBox>;
    }
  },
  ageInPower: {
    sorter: sortByAgeInPower,
    filter: () => true,
    ExtraInfo: ({ dictator }) => {
      const age = getAgeInPower(dictator, "years");

      const { t } = useTranslation();
      return (
        <ExtraInfoBox>{t("dictatorAge", { age: age.years })}</ExtraInfoBox>
      );
    }
  },
  ranking: {
    sorter: sortByCanonicalRanking,
    filter: (d) => !!d.canonicalRanking,
    ExtraInfo: ({}) => {
      return null;
    }
  },
  age: {
    sorter: sortByAge,
    filter: () => true,
    ExtraInfo: ({ dictator }) => {
      const age = getAge(dictator, "years");
      const { t } = useTranslation();
      return (
        <ExtraInfoBox>{t("dictatorAge", { age: age.years })}</ExtraInfoBox>
      );
    }
  }
};
