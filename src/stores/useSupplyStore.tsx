import create, { State } from "zustand";
import { Supply } from "@solana/web3.js";

interface UseSupplyStore extends Supply, State {
  setSupply: (supplyInfo: Supply) => void;
}

const useSupplyStore = create<UseSupplyStore>((set, _get) => ({
  circulating: 0,
  nonCirculating: 0,
  nonCirculatingAccounts: [],
  total: 0,
  setSupply(supplyInfo) {
    set({
      circulating: supplyInfo.circulating,
      nonCirculating: supplyInfo.nonCirculating,
      nonCirculatingAccounts: [...supplyInfo.nonCirculatingAccounts],
      total: supplyInfo.total,
    });
  },
}));

export default useSupplyStore;
