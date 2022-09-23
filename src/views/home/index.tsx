// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
import Head from "next/head";
import { ContextProvider } from "contexts/ContextProvider";
import { AppBar } from "components/AppBar";
import ClusterCard from "components/ClusterCard";
import SolanaPriceCard from "../../components/SolanaPriceCard";
import SearchBar from "components/SearchBar";

export const HomeView: FC = ({}) => {
  return (
    <>
      <div className="flex flex-col h-screen bg-black">
        <div className="w-full flex  mt-5 mx-auto justify-center">
          <SearchBar />
        </div>
        <div
          className="flex align-center  w-3/4  "
          style={{ margin: "30px auto" }}
        >
          <SolanaPriceCard />

          {/* <SupplyDataCard/> */}
        </div>
        <ClusterCard />
      </div>
    </>
  );
};
