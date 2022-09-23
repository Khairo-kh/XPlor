import React, { useEffect } from "react";
import { AddressDetails } from "models/types";
import { VStack, Heading, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import useAccountDetailsStore from "stores/useAccountDetailsStore";

export default function AccountDetails({ data }: { data?: AddressDetails }) {
  const { dataDetails, setDataDetails } = useAccountDetailsStore(
    (state) => state
  );

  useEffect(() => {
    setDataDetails(data?.details?.data);
  }, [data]);
  const isToken =
    dataDetails?.program === "spl-token" && dataDetails?.parsed.type === "mint";

  if (isToken) {
    return (
      <VStack
        my="2"
        w="100%"
        align="start"
        background="white"
        rounded="lg"
        p="4"
        bg="#6b7280"
      >
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>Address</Td>
              <Td isNumeric>{data?.pubkey.toBase58()}</Td>
            </Tr>
            <Tr>
              <Td>Current Supply</Td>
              <Td isNumeric>{dataDetails?.parsed.info.supply}</Td>
            </Tr>
            <Tr>
              <Td>Mint Authority</Td>
              <Td isNumeric>{dataDetails?.parsed.info.mintAuthority}</Td>
            </Tr>
            <Tr>
              <Td>Decimals</Td>
              <Td isNumeric>{dataDetails?.parsed.info.decimals}</Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    );
  }

  return (
    <VStack
      my="2"
      w="100%"
      align="start"
      rounded="lg"
      bg="#6b7280"
      borderRadius={5}
      p={5}
    >
      <Heading size="md">Account</Heading>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>Address:</Td>
            <Td isNumeric>{data?.pubkey.toBase58()}</Td>
          </Tr>
          <Tr>
            <Td>Mint:</Td>
            <Td isNumeric>{dataDetails?.parsed?.info?.mint}</Td>
          </Tr>
          <Tr>
            <Td>Owner:</Td>
            <Td isNumeric>{dataDetails?.parsed?.info?.owner}</Td>
          </Tr>
          <Tr>
            <Td>State:</Td>
            <Td isNumeric>{dataDetails?.parsed?.info?.state}</Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
}
