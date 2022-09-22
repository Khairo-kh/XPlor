import { useState } from "react";
import React, { useEffect } from "react";
import { Supply, Connection, clusterApiUrl } from "@solana/web3.js";
import useSupplyStore from "../stores/useSupplyStore";
import useVoteAccountStore from "stores/useVoteAccountStore";
import { lamportsToSol } from "utils/helper";

export default function SupplyDataCard() {
  // getting values from state store
  const {
    circulating,
    nonCirculating,
    nonCirculatingAccounts,
    total,
    setSupply,
  } = useSupplyStore((state) => state);

  const { current, delinquent, setVoteAccounts } = useVoteAccountStore(
    (state) => state
  );

  const fetchSupply = async () => {
    // connecting to solana devnet and retirving values
    const url = clusterApiUrl("devnet");
    const connection = new Connection(url, "finalized");
    const supply: Supply = (await connection.getSupply()).value;
    const voteAccounts = await connection.getVoteAccounts();

    // saving values to state
    setSupply(supply);
    setVoteAccounts(voteAccounts);
  };

  // calculating some values that we might wanna display
  const delinquentStake = React.useMemo(() => {
    if (delinquent) {
      return delinquent.reduce(
        (prev, current) => prev + current.activatedStake,
        0
      );
    }
  }, [delinquent]);

  const activeStake = React.useMemo(() => {
    if (delinquentStake) {
      return (
        current.reduce((prev, current) => prev + current.activatedStake, 0) +
        delinquentStake
      );
    }
  }, [delinquentStake]);

  let delinquentStakePercentage: string;
  if (delinquentStake && activeStake) {
    console.log({ delinquentStake, activeStake });
    delinquentStakePercentage = ((delinquentStake / activeStake) * 100).toFixed(
      2
    );
  }

  useEffect(() => {
    fetchSupply();
  }, []);

  // TODO: create a polished UI component to display the data below

  return activeStake ? (
    <div>
      <div>Active Stake: {lamportsToSol(activeStake)}</div>
      <div>Delinquent Stake %: {delinquentStakePercentage}</div>
      <div>Circulating Supply: {lamportsToSol(circulating)}</div>
      <div>Non-Circulating Supply: {lamportsToSol(nonCirculating)}</div>
    </div>
  ) : (
    <div>loading ...</div>
  );
}
