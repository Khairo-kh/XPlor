import { Connection, clusterApiUrl } from "@solana/web3.js";
import React, { useEffect } from "react";
import { ClusterStats } from "../models/types";

import useClusterStatsStore from "stores/useClusterStatsStore";

export default function ClusterCard() {
  const {
    absoluteSlot,
    blockHeight,
    blockTime,
    currentEpoch,
    epochProgress,
    setStats,
  } = useClusterStatsStore((state) => state);

  useEffect(() => {
    fetchClusterStats();
  }, []);

  async function fetchClusterStats() {
    // Connecting to solana devnet
    const url = clusterApiUrl("devnet");
    const connection = new Connection(url);

    // querying for some data of interest
    const epochInfo = await connection.getEpochInfo();
    const blockTime = await connection.getBlockTime(epochInfo.absoluteSlot);
    const { blockHeight, absoluteSlot } = epochInfo;
    const currentEpoch = epochInfo.epoch.toString();
    const { slotIndex, slotsInEpoch } = epochInfo;
    const epochProgress = ((100 * slotIndex) / slotsInEpoch).toFixed(1) + "%";

    // saving the data to state store
    if (blockTime) {
      const clusterData: ClusterStats = {
        absoluteSlot,
        blockHeight,
        blockTime: blockTime * 1000,
        currentEpoch,
        epochProgress,
      };
      setStats(clusterData);
    }
  }

  // TODO: Styler and format the component properly
  return (
    <div>
      <div>Slot: {absoluteSlot}</div>
      {blockHeight && <div> Block height: {blockHeight}</div>}
      <div>Block Time: {new Date(blockTime).toDateString()}</div>
      <div>Current Epoch: {currentEpoch}</div>
      <div>Epoch progress: {epochProgress}</div>
    </div>
  );
}
