"use client";

import { FC, memo, useDeferredValue } from "react";
import { Box, cx, Flex, link } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "./DictatorSearch.css";
import { Dictator } from "@/types";
import DictatorGrid from "@/components/dictator/DictatorGrid";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import Filters from "./Filters";
import {
  Highlighter,
  highlights,
  PossibleHighlights,
  PossibleSortrados,
  Sortrado,
  sortrados
} from "./service";
import SubHeading from "@/components/SubHeading";
import { useMemo } from "react";
import { useState } from "react";
import useStore from "./store";

export type DictatorSearchParams = {
  sortBy: PossibleSortrados;
  highlight: PossibleHighlights;
  name?: string;
};

type Props = {
  dictators: Dictator[];
};

const DictatorSearch: FC<Props> = ({ dictators }) => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(true);

  const filters = useStore((store) => store.filters);
  const params = useDeferredValue(filters);

  const [filteredDictators, sortrado, highlighter] = useMemo<
    [Dictator[], Sortrado, Highlighter]
  >(() => {
    const activeSortrado = sortrados[params.sortBy];
    const matching = dictators.filter(activeSortrado.filter).filter((d) => {
      if (!params.name) {
        return true;
      }

      return d.name.toLowerCase().includes(params.name.toLowerCase());
    });
    return [
      activeSortrado.sorter(matching),
      activeSortrado,
      highlights[params.highlight]
    ];
  }, [params, dictators]);

  const Icon = filtersOpen ? FaAngleUp : FaAngleDown;
  const text = filtersOpen ? "piilota" : "näytä";

  return (
    <Box>
      <SubHeading>
        <Flex className={styles.heading}>
          Hakuehdot
          <Box className={styles.toggle}>
            <button
              type="button"
              className={cx(link(), styles.toggleButton)}
              aria-expanded={filtersOpen}
              onClick={() => {
                setFiltersOpen(!filtersOpen);
              }}
            >
              {text}
              <Icon />
            </button>
          </Box>
        </Flex>
      </SubHeading>

      <Box>
        {filtersOpen && (
          <Box className={sprinkles({ my: 3 })}>
            <Filters />
          </Box>
        )}

        <SubHeading>{filteredDictators.length} diktaattoria</SubHeading>

        <DictatorGrid
          dictators={filteredDictators}
          extraInfo={sortrado.ExtraInfo}
          fadeOutIf={highlighter}
        />
      </Box>
    </Box>
  );
};

export default memo(DictatorSearch);
