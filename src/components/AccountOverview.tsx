import { PublicKey } from "@solana/web3.js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import React, { useEffect } from "react";
import { DataDetails } from "models/types";

import useQueryStore from "stores/useQueryStore";
import useAccountStore from "stores/useAccountStore";
import AccountDetails from "./AccountDetails";
import AccountHistory from "./AccountHistory";
import { VStack } from "@chakra-ui/react";

export default function AccountOverview() {
  const { searchType, searchValue } = useQueryStore((state) => state);
  const { lamports, pubkey, details, setData } = useAccountStore(
    (state) => state
  );
  let publicKey: PublicKey | undefined;

  useEffect(() => {
    getData();
  }, [searchValue]);

  async function getData() {
    const url = clusterApiUrl("devnet");
    const connection = new Connection(url, "finalized");

    try {
      if (searchValue) {
        publicKey = new PublicKey(searchValue);
        const result = (await connection.getParsedAccountInfo(publicKey)).value;

        let lamports, details;
        if (result === null) {
          lamports = 0;
        } else {
          lamports = result.lamports;

          let space: number;
          if (!("parsed" in result.data)) {
            space = result.data.length;
          } else {
            space = result.data.space;
          }

          let data: DataDetails | undefined;
          if ("parsed" in result.data) {
            data = {
              program: result.data.program,
              parsed: result.data.parsed,
            };
            details = {
              space,
              executable: result.executable,
              owner: result.owner,
              data,
            };
          } else {
            details = {
              space,
              executable: result.executable,
              owner: result.owner,
            };
          }
        }
        setData({ pubkey: publicKey, lamports, details });
      }
    } catch (err) {}
  }

  return (
    <>
      {!pubkey ? (
        <p>Not valid pubkey</p>
      ) : (
          <div className='flex flex-col gap-y-4 mt-4'>
            <h1>Account Details</h1>
            <AccountDetails data={{ pubkey, lamports, details }} />
            <h1>History</h1>
            <AccountHistory pubkey={pubkey} />
          </div>
      )}
    </>
  );
}
