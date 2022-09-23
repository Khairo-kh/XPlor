import { Connection, clusterApiUrl } from "@solana/web3.js";
import React, { useEffect } from "react";
import { ClusterStats } from "../models/types";

import useClusterStatsStore from "stores/useClusterStatsStore";
import { Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";

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
    absoluteSlot && (
      <VStack>
        <Table className="border-collapse border  w-3/4 ml-auto mr-auto border-green-500 p-5">
          <Thead>
            <Tr>
              <Th className="text-center text-green-500 text-xl">{""}</Th>
              <Th className="text-center text-green-500 text-xl">
                Live Cluster Stats
              </Th>
              <Th className="text-center text-green-500 text-xl">{""}</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr className="border-green-500">
              <Td className="p-4 text-left">Slot</Td>
              <Td>{""}</Td>
              <Td>{absoluteSlot}</Td>
            </Tr>
            <Tr>
              {blockHeight && <Td className="p-4 text-left">Block Height</Td>}
              <Td>{""}</Td>
              <Td>{blockHeight}</Td>
            </Tr>
            <Tr>
              <Td className="p-4 text-left">Block Time</Td>
              <Td>{""}</Td>
              <Td>{new Date(blockTime).toDateString()}</Td>
            </Tr>
            <Tr>
              <Td className="p-4 text-left">Current Epoch</Td>
              <Td>{""}</Td>
              <Td>{currentEpoch}</Td>
            </Tr>
            <Tr>
              <Td className="p-4 text-left">Epoch progress</Td>
              <Td>{""}</Td>
              <Td>{epochProgress}</Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    )
  );
}
