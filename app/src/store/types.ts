import { SyntheticTokens } from './types';
import TransactionReceipt from 'web3/types';
export interface RootState {
    version: string;
}

export interface Network {
    coinbase: string;
    networkData: NetworkData;
    coinbaseReady: boolean;
    web3Ready: boolean;
    web3: any;
    contracts: {
        EMPs: { [key: string]: any };
        syntheticTokens: { [key: string]: any };
        signoToken: any;
    };
    ethReady: boolean;
    userAddress: string;
    sentTransactions: {};
}

export interface NetworkData {
    currentBlock: number;
    network: string;
    networkId: number;
}

export interface SatInfo {
    offense: number;
    defense: number;
}

export interface Sat {
    id: number;
    balance: number;
}

export interface SatsInfo {
    [key: number]: SatInfo;
}
export interface StarInfo {
    systemType: number;
}

export interface GameStorageOperations {
    currentStarLocation: StarPosition | null;
    satsInfo: SatsInfo;
    starsInfo: {
        [key: string]: StarInfo;
    };
    planetsToTokenId: {
        [key: string]: number;
    };
    tokenIdToYield: {
        [key: number]: number;
    };
    boundaries: StarPosition;
}

export interface StarPosition {
    quadrant: number;
    sector: number;
    district: number;
    star: number;
}
export interface EMPS {
    empToTokenAddresses: {
        [key: string]: string;
    }
}
export interface SyntheticTokens {
    [key: string]: SyntheticTokenInfo;
}

export interface SyntheticTokenInfo {
    symbol: string;
    name: string;
}
export interface TreasuryOperations { }
export interface SolarOperations {
    balance: number;
}

export interface PlanetInfo {
    planetYield?: number;
    balance?: number;
    sats?: { [key: number]: Sat };
    dateLocked?: Date;
    tokenId?: number;
    minHold?: number;
}
export interface Planets {
    tokenIdToProxy: {
        [key: number]: string;
    };
    planets: {
        [key: string]: PlanetInfo;
    };
}

export interface FhrOperations {
    balance: number[];
    treasuryApproved: boolean;
}

export interface SatOperations {
    balances: {
        [key: string]: number[];
    };
    treasuryApproved: boolean;
}
export interface Deposit {
    amount: number;
    length: number;
}

export interface UserInterfaceManager {
    isLoading: boolean;
    modal: Modal;
    error: Error;
    success: {
        msg: string;
    };
    localStarPosition: StarPosition;
    planetDiscoveredMessage: string;
    planetDiscoveredHeader: string;
}

export interface Modal {
    show: boolean;
    content: string;
    type: string;
    data?: {
        [key: string]: string | boolean | number;
    };
}
export type Address = string;

export interface TxResult {
    transactionHash?: string;
    transactionIndex?: number;
    blockHash?: string;
    blockNumber?: number;
    from?: string;
    to?: string;
    contractAddress?: string;
    cumulativeGasUsed?: number;
    gasUsed?: number;
    logs?: any[];
    events?: {
        [eventName: string]: EventLog;
    };
    nonce?: number; // non-standard field, returned only through dYdX Sender service
    status?: boolean;
    confirmation?: Promise<TransactionReceipt>;
    gasEstimate?: number;
    gas?: number;
}

export interface EventLog {
    address?: Address;
    blockHash?: Address;
    blockNumber?: number;
    event?: string;
    id?: string;
    logIndex?: number;
    raw?: any;
    returnValues?: any;
    signature?: Address;
    transactionHash?: Address;
    transactionIndex?: number;
    type?: string;
}
