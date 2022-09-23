import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useEffect } from "react";
import Moment from "react-moment";
import { Table, Tbody, Tr, Td, Heading, VStack } from "@chakra-ui/react";
import useAccountHistoryStore from "stores/useAccountHistoryStore";

export default function AccountHistory({ pubkey }: { pubkey: PublicKey }) {
  const { fetched, setFetched } = useAccountHistoryStore((state) => state);

  useEffect(() => {
    fetchHistory();
  }, [pubkey]);

  async function fetchHistory() {
    const url = clusterApiUrl("devnet");
    // todo: setup a central point to initialize one connection instance only
    const connection = new Connection(url);
    const fetched = await connection.getConfirmedSignaturesForAddress2(pubkey, {
      limit: 20,
    });
    setFetched(fetched);
  }

  return (
    <VStack my="2" w="100%" align="start" rounded="lg" bg="#6b7280" borderRadius={5} p={5}>
      {fetched ? (
        <>
          <Table variant="simple">
            <Tbody>
              {fetched.map((item, i) => (
                <Tr key={i}>
                  <Td fontSize="sm">{item.signature.substr(0, 20)}...</Td>

                  <Td isNumeric>
                    {item?.blockTime ? (
                      <Moment date={item.blockTime * 1000} fromNow />
                    ) : (
                      ""
                    )}
                  </Td>
                  <Td>{item?.err ? "Failed" : "Success"}</Td>
                  <Td>{item?.memo ? item.memo : ""}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <p> No History </p>
      )}
    </VStack>
  );
}
