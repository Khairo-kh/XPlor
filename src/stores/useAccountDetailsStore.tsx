import create, { State } from "zustand";
import { DataDetails } from "../models/types";

interface UseAccountDetailsStore extends State {
  dataDetails: DataDetails;
  setDataDetails: (data: DataDetails) => void;
}

const useAccountDetailsStore = create<UseAccountDetailsStore>((set, _get) => ({
  dataDetails: null,
  setDataDetails(data) {
    set({ dataDetails: { ...data } });
  },
}));

export default useAccountDetailsStore;
