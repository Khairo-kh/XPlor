import create, { State } from "zustand";
import { CoinInfo } from "../models/types";

interface UseSolanaPriceStore extends State {
  solanaInfo: CoinInfo;
  setSolanaInfo: (solanaInfo: CoinInfo) => void;
}

const useSolanaPriceStore = create<UseSolanaPriceStore>((set, _get) => ({
  setSolanaInfo(solanaInfo) {
    set({ solanaInfo });
  },
  solanaInfo: null,
}));

export default useSolanaPriceStore;
