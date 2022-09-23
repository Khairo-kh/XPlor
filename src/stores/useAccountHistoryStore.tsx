import create, { State } from "zustand";
import { ConfirmedSignatureInfo } from "@solana/web3.js";

interface UseAccountHistoryStore extends State {
  fetched: ConfirmedSignatureInfo[];
  setFetched: (data: ConfirmedSignatureInfo[]) => void;
}

const useAccountHistoryStore = create<UseAccountHistoryStore>((set, _get) => ({
  fetched: null,
  setFetched(data) {
    set({ fetched: [...data] });
  },
}));

export default useAccountHistoryStore;
