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
    <div className='flex w-full align-center justify-around' style={{color:'black'}}>
      
      <div className='flex flex-col bg-white p-5 rounded-sm ' style={{color:'black'}}>
        <h2 className="text-sm" style={{color:'gray'}}>SOL Price</h2>
        <h4 className="text-3xl text-green-500">{solanaInfo?.price}</h4>
        <h2 className="text-sm" style={{color:'gray'}}>{solanaInfo?.priceChange24}</h2>
        
      </div>
      <div className='flex flex-col bg-white p-5 rounded-sm ' style={{color:'black'}}>
        <h2 className="text-sm" style={{color:'gray'}}>Market Cap</h2>
        <h4 className="text-3xl text-green-500">{formatter.format(solanaInfo?.marketCap)}</h4>
        <h2 className="text-sm" style={{color:'gray'}}>Rank #{formatter.format(solanaInfo?.marketCapRank)}</h2>
        
      </div>
      <div className='flex flex-col bg-white p-5 rounded-sm justify-between' style={{color:'black'}}>
        <h2 className="text-sm" style={{color:'gray'}}>Volume</h2>
        <h4 className="text-3xl text-green-500">{formatter.format(solanaInfo?.volume24)}</h4>
        <h2 className="text-sm" style={{color:'gray'}}>Last Update</h2>
        <h4 className="text-green-500">{solanaInfo?.updatedAt.toDateString()}</h4>
      </div>
      {/* <div>Market Cap: {formatter.format(solanaInfo?.marketCap)}</div> */}
      {/* <div>Market Cap Rank: {formatter.format(solanaInfo?.marketCapRank)}</div> */}
      {/* <div>Solana Price: {solanaInfo?.price}</div>
      <div>Solana Price change %: {solanaInfo?.priceChange24}</div> */}
      {/* <div>volume: {formatter.format(solanaInfo?.volume24)}</div>
      <div>updated at: {solanaInfo?.updatedAt.toDateString()}</div> */}
    </div>
  );
}
