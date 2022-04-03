import { debounce } from "lodash-es";
import create from "zustand";
import { PossibleHighlights, PossibleSortrados } from "./service";

type FilterType = {
  name: string;
  yearStart: number;
  yearEnd: number;
  sortBy: PossibleSortrados;
  highlight: PossibleHighlights;
};

type SearchState = {
  filters: FilterType;
  results?: FilterType;
  filtersOpen: boolean;
  setFiltersOpen: (isOpen: boolean) => void;
  setFilter: (name: string, value: string) => void;
  setResults: () => void;
};

const useStore = create<SearchState>((set, get) => ({
  filtersOpen: true,
  filters: {
    name: "",
    yearStart: 1800,
    yearEnd: 2021,
    sortBy: "name",
    highlight: "solidary"
  },
  results: undefined,

  setFiltersOpen: (isOpen) => {
    set({ filtersOpen: isOpen });
  },

  setFilter: (name: string, value: string) => {
    set((state) => ({ filters: { ...state.filters, [name]: value } }));

    const { setResults } = get();

    setResults();
  },

  setResults: debounce(() => {
    set((state) => ({
      results: state.filters
    }));
  }, 300)
}));

export default useStore;
