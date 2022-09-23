import create, { State } from "zustand";
import { VoteAccountStatus } from "@solana/web3.js";

interface UseVoteAccountStore extends VoteAccountStatus, State {
  setVoteAccounts: (status: VoteAccountStatus) => void;
}

const useVoteAccountStore = create<UseVoteAccountStore>((set, _get) => ({
  current: [],
  delinquent: [],
  setVoteAccounts(status) {
    set({ current: [...status.current], delinquent: [...status.delinquent] });
  },
}));

export default useVoteAccountStore;
