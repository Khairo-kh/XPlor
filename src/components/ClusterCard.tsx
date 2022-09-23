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
    // <div>
    //   <div>Slot: {absoluteSlot}</div>
    //   {blockHeight && <div> Block height: {blockHeight}</div>}
    //   <div>Block Time: {new Date(blockTime).toDateString()}</div>
    //   <div>Current Epoch: {currentEpoch}</div>
    //   <div>Epoch progress: {epochProgress}</div>
    // </div>
     <table className="border-collapse border  w-3/4 ml-auto mr-auto border-green-500 p-5">
      <tr>
        <th className="text-center text-green-500 text-xl">Live Cluster Stats</th>
      </tr>
  <tr className="border-green-500">
     <th className="p-4 text-left">Slot</th>
     <td>{absoluteSlot}</td>
   </tr>
   <tr>
     {blockHeight &&<th className="p-4 text-left">Block Height</th>}
     <td>{blockHeight}</td>
   </tr>
  <tr>
     <th className="p-4 text-left">Block Time</th>
     <td>{new Date(blockTime).toDateString()}</td>
   </tr>
   <tr>
     <th className="p-4 text-left">Current Epoch</th>
     <td>{currentEpoch}</td>
   </tr>
   <tr>
     <th className="p-4 text-left">Epoch progress</th>
     <td>{epochProgress}</td>
   </tr>
 </table>
  );
}
