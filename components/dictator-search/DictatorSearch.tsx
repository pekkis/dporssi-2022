/** @jsx jsx */
import { FC, memo } from "react";
import { Box, Flex, Link, jsx } from "theme-ui";
import { Dictator } from "../../types";
import DictatorGrid from "../dictator/DictatorGrid";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useDebounce } from "use-debounce";

import Filters from "./Filters";
import {
  Highlighter,
  highlights,
  PossibleHighlights,
  PossibleSortrados,
  Sortrado,
  sortrados
} from "./service";
import SubHeading from "../SubHeading";
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

  const [params] = useDebounce(filters, 1000);

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
  }, [params]);

  const Icon = filtersOpen ? FaAngleUp : FaAngleDown;
  const text = filtersOpen ? "piilota" : "näytä";

  return (
    <Box>
      <SubHeading>
        <Flex
          sx={{
            mb: 3,
            placeItems: "center",
            justifyContent: "start"
          }}
        >
          Hakuehdot
          <Box sx={{ ml: 3, fontSize: 2 }}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFiltersOpen(!filtersOpen);
              }}
            >
              {text}
              <Icon />
            </Link>
          </Box>
        </Flex>
      </SubHeading>

      <Box>
        {filtersOpen && (
          <Box my={3}>
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
