import create, { State } from "zustand";
import { AddressDetails } from "../models/types";

interface UseAccountStore extends AddressDetails, State {
  setData: (accountData: AddressDetails) => void;
}

const useAccountStore = create<UseAccountStore>((set, _get) => ({
  lamports: 0,
  pubkey: null,
  details: null,
  data: null,
  setData(accountData) {
    set({
      lamports: accountData.lamports,
      pubkey: accountData.pubkey,
      details: { ...accountData?.details },
    });
  },
}));

export default useAccountStore;
