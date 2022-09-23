import { PublicKey } from "@solana/web3.js";

export type EndpointTypes = "mainnet" | "devnet" | "localnet";

export interface DataDetails {
  program: string;
  parsed: {
    info: {
      decimals?: number;
      freezeAuthority?: string;
      isInitialized?: boolean;
      mintAuthority?: string;
      supply?: string;
      isNative?: false;
      mint?: string;
      owner?: string;
      state?: string;
      tokenAmount?: {
        amount: string;
        decimals: number;
        uiAmount: number;
        uiAmountString: string;
      };
    };
    type: string;
  };
}

export interface SearchQuery {
  searchValue?: string;
  searchType?: string;
}

export interface AddressDetails {
  pubkey: PublicKey;
  lamports: number;
  details?: {
    space: number;
    executable: boolean;
    owner: PublicKey;
    data?: DataDetails;
  };
}

export type Confirmations = number | "max";
export type Timestamp = number | "unavailable";

export type TransactionData = {
  signature: string;
  info: {
    slot: number;
    timestamp: Timestamp;
    confirmations: Confirmations;
    confirmationStatus: "processed" | "confirmed" | "finalized" | undefined;
    result: {
      err: string | {} | null;
    };
  } | null;



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
