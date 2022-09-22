export type EndpointTypes = 'mainnet' | 'devnet' | 'localnet'

export interface ClusterStats {
  absoluteSlot: number;
  blockHeight: number | undefined;
  blockTime: number;
  currentEpoch: string;
  epochProgress: string;
};
