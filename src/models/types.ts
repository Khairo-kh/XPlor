export type EndpointTypes = "mainnet" | "devnet" | "localnet";

export interface CoinInfo {
  price: number;
  volume24: number;
  marketCap: number;
  priceChange24: number;
  marketCapRank: number;
  updatedAt: Date;
}

export interface CoinInfoResult {
  market_data: {
    current_price: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_24h: number;
    market_cap_rank: number;
  };
  last_updated: string;
}

export interface ClusterStats {
  absoluteSlot: number;
  blockHeight: number | undefined;
  blockTime: number;
  currentEpoch: string;
  epochProgress: string;
};
