import create, { State } from "zustand";
import { TransactionData } from "../models/types";

interface UseTransactionStore extends TransactionData, State {
  setTranData: (tData: TransactionData) => void;
}

const useTransactionStore = create<UseTransactionStore>((set, _get) => ({
  info: null,
  signature: "",
  setTranData(tData) {
    set({ info: tData.info, signature: tData.signature });
  },
}));

export default useTransactionStore;
