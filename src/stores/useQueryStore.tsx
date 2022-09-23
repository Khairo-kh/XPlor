import create, { State } from "zustand";
import { SearchQuery } from "../models/types";

interface UseQueryStore extends SearchQuery, State {
  setQuery: (query: string) => void;
  setType: (type: string) => void;
}

const useQueryStore = create<UseQueryStore>((set, _get) => ({
  searchType: "",
  searchValue: "",
  setQuery(query) {
    set((field) => {
      field.searchValue = query;
    });
  },
  setType(type) {
    set((field) => {
      field.searchType = type;
    });
  },
}));

export default useQueryStore;
