import { FC, memo, useDeferredValue } from "react";
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
        <div className="mb-4 flex place-items-center justify-start">
          Hakuehdot
          <div className="ml-4 text-base">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFiltersOpen(!filtersOpen);
              }}
            >
              {text}
              <Icon className="inline ml-1" />
            </a>
          </div>
        </div>
      </SubHeading>

      <div>
        {filtersOpen && (
          <div className="my-4">
            <Filters />
          </div>
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
