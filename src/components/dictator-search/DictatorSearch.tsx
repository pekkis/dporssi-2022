import { FC, memo, useDeferredValue } from "react";
import { Box } from "@/components/styled/Box";
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
import { filterToggleHeader, toggleLink } from "./DictatorSearch.css";

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
    const sortrado = sortrados[params.sortBy];
    const filteredDictators = dictators.filter(sortrado.filter).filter((d) => {
      if (!params.name) {
        return true;
      }

      return d.name.toLowerCase().includes(params.name.toLowerCase());
    });
    const sortedDictators = sortrado.sorter(filteredDictators);
    return [sortedDictators, sortrado, highlights[params.highlight]];
  }, [params, dictators]);

  const Icon = filtersOpen ? FaAngleUp : FaAngleDown;
  const text = filtersOpen ? "piilota" : "näytä";

  return (
    <div>
      <SubHeading>
        <div className={filterToggleHeader}>
          Hakuehdot
          <a
            href="#"
            className={toggleLink}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFiltersOpen(!filtersOpen);
            }}
          >
            {text}
            <Icon />
          </a>
        </div>
      </SubHeading>

      <div>
        {filtersOpen && (
          <Box my="3">
            <Filters />
          </Box>
        )}

        <SubHeading>{filteredDictators.length} diktaattoria</SubHeading>

        <DictatorGrid
          dictators={filteredDictators}
          extraInfo={sortrado.ExtraInfo}
          fadeOutIf={highlighter}
        />
      </div>
    </div>
  );
};

export default memo(DictatorSearch);
