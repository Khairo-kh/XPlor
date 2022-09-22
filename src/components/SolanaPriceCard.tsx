import { useState } from "react";
import React, { useEffect } from "react";
import { CoinInfoResult } from "../models/types";
import useSolanaPriceStore from "stores/useSolanaPriceStore";

export default function PriceCard() {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const { setSolanaInfo, solanaInfo } = useSolanaPriceStore((state) => state);

  const coinId = "solana";
  useEffect(() => {
    getPrice();
  }, []);

  // Use Coingecko API
  async function getPrice() {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((res) => res.json())
      .then((info: CoinInfoResult) => {
        setSolanaInfo({
          price: info.market_data.current_price.usd,
          volume24: info.market_data.total_volume.usd,
          marketCap: info.market_data.market_cap.usd,
          marketCapRank: info.market_data.market_cap_rank,
          priceChange24: info.market_data.price_change_percentage_24h,
          updatedAt: new Date(info.last_updated),
        });
      })
      .catch((error: any) => {
        console.log("Fetch Failed!");
      });
  }

  // TODO: format values and put them in a styled card
  return (
    <div>
      <div>Market Cap: {formatter.format(solanaInfo?.marketCap)}</div>
      <div>Market Cap Rank: {formatter.format(solanaInfo?.marketCapRank)}</div>
      <div>Solana Price: {solanaInfo?.price}</div>
      <div>Solana Price change %: {solanaInfo?.priceChange24}</div>
      <div>volume: {formatter.format(solanaInfo?.volume24)}</div>
      <div>updated at: {solanaInfo?.updatedAt.toDateString()}</div>
    </div>
  );
}
