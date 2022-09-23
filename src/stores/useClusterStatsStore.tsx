import create, { State } from "zustand";
import { ClusterStats } from "../models/types";

interface UseClusterStatsStore extends ClusterStats, State {
  setStats: (stats: ClusterStats) => void;
}

const useClusterStatsStore = create<UseClusterStatsStore>((set, _get) => ({
  absoluteSlot: 0,
  blockHeight: 0,
  blockTime: 0,
  currentEpoch: "",
  epochProgress: "",
  setStats(stats) {
    set({
      absoluteSlot: stats.absoluteSlot,
      blockHeight: stats.blockHeight,
      blockTime: stats.blockTime,
      currentEpoch: stats.currentEpoch,
      epochProgress: stats.epochProgress,
    });
  },
}));

export default useClusterStatsStore;
