import {Metadata} from "../../logic/utils/get-mints"
import { AccountInfo } from '@solana/web3.js';

export type StringPublicKey = string;

export interface ParsedAccountBase {
    data: any
    info: any; // TODO: change to unknown
  }
  
  export interface ParsedAccount<T> extends ParsedAccountBase {
    info: T;
  }

export interface MetaState {
    metadata: ParsedAccount<Metadata>[];
  }

  export interface MetaContextState extends MetaState {
    isLoading: boolean;
    pullAllMetadata: () => void;
  }