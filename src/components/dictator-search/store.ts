import { create } from "zustand";
import { PossibleHighlights, PossibleSortrados } from "./service";

type FilterType = {
  name: string;
  sortBy: PossibleSortrados;
  highlight: PossibleHighlights;
};

type SearchState = {
  filters: FilterType;
  setFilter: <K extends keyof FilterType>(
    name: K,
    value: FilterType[K]
  ) => void;
};

const useStore = create<SearchState>((set) => ({
  filters: {
    name: "",
    sortBy: "name",
    highlight: "solidary"
  },

  setFilter: (name, value) => {
    set((state) => ({ filters: { ...state.filters, [name]: value } }));
  }
}));

export default useStore;
