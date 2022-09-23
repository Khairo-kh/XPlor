import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useEffect } from "react";

import { Table, Tbody, Tr, Td, Heading, VStack } from "@chakra-ui/react";
import useQueryStore from "stores/useQueryStore";
import { Confirmations, Timestamp } from "../models/types";
import useTransactionStore from "stores/useTransactionStore";

export default function TransactionDetails() {
  const { setQuery, setType, searchType, searchValue } = useQueryStore(
    (state) => state
  );
  const { info, signature, setTranData } = useTransactionStore(
    (state) => state
  );
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const url = clusterApiUrl("devnet");
    const connection = new Connection(url, "finalized");

    let data;
    try {
      if (searchValue !== undefined) {
        const { value } = await connection.getSignatureStatus(searchValue, {
          searchTransactionHistory: true,
        });

        let info = null;
        if (value !== null) {
          let confirmations: Confirmations;
          if (typeof value.confirmations === "number") {
            confirmations = value.confirmations;
          } else {
            confirmations = "max";
          }

          let blockTime = null;
          try {
            blockTime = await connection.getBlockTime(value.slot);
          } catch (error) {
            console.log(error);
          }
          let timestamp: Timestamp =
            blockTime !== null ? blockTime : "unavailable";

          info = {
            slot: value.slot,
            timestamp,
            confirmations,
            confirmationStatus: value.confirmationStatus,
            result: { err: value.err },
          };
        }
        data = { signature: searchValue, info };
        setTranData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VStack
      my="2"
      w="100%"
      align="start"
      rounded="lg"
      bg="#36b85f"
      borderRadius={5}
      p={5}
    >
      <Heading size="md">Transaction</Heading>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td fontSize="sm">Signature</Td>
            <Td>{searchValue?.substr(0, 20)}...</Td>
          </Tr>
          <Tr>
            <Td fontSize="sm">Result</Td>
            <Td>{info?.result.err ? "Failed" : "Success"}</Td>
          </Tr>
          <Tr>
            <Td fontSize="sm">Timestamp</Td>
            <Td>
              {info?.timestamp !== "unavailable" ? (
                <p>{info?.timestamp}</p>
              ) : (
                <p>Unavailable</p>
              )}
            </Td>
          </Tr>
          <Tr>
            <Td fontSize="sm">Confirmation Status</Td>
            <Td>{info?.confirmationStatus || "Unknown"}</Td>
          </Tr>
          <Tr>
            <Td fontSize="sm">Confirmations</Td>
            <Td>{info?.confirmations}</Td>
          </Tr>
          <Tr>
            <Td fontSize="sm">Block</Td>
            <Td>{info?.slot}</Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
}
