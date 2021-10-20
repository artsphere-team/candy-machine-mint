import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AccountInfo } from "@solana/web3.js";
import React, { useContext, useState } from "react";
import { getMints } from "../../logic/utils/get-mints";
import { MetaContextState, MetaState } from "./types";
import { AccountInfo as TokenAccountInfo} from '@solana/spl-token';

var fetchingData = false

export const getEmptyMetaState = (): MetaState => ({
    metadata: [],
    ownedMinerDwarfsMeta: [],
    fetchInProgress: false
  });

export interface TokenAccount {
  pubkey: string;
  account: AccountInfo<Buffer>;
  info: TokenAccountInfo;
}

const MetaContext = React.createContext<MetaContextState>({
    ...getEmptyMetaState(),
    isLoading: true,
    metadataLoaded: false,
    // @ts-ignore
    update: () => [],
  });

  
export const useMeta = () => {
  const context = useContext(MetaContext);
  return context;
};
  
export function MetaProvider({ children = null as any }) {
  const connection = useConnection();

  var { metadata, ownedMinerDwarfsMeta} = useMeta();

  var [state, setState] = useState([]as any)//<MetaState>(getEmptyMetaState());
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [fetchedData, setfetchedData] = useState(false);

  const wallet = useAnchorWallet();

  const ENDPOINTS = [
    {
      name: 'mainnet-beta',
      endpoint: 'https://api.metaplex.solana.com/',
    },
    {
      name: 'mainnet-beta (Solana)',
      endpoint: 'https://api.mainnet-beta.solana.com',
    },
    {
      name: 'mainnet-beta (Serum)',
      endpoint: 'https://solana-api.projectserum.com/',
    },
    {
      name: 'testnet',
      endpoint: 'https://api.testnet.solana.com',
    },
    {
      name: 'devnet',
      endpoint: 'https://api.devnet.solana.com',
    },
  ];

  //console.log("META")

  async function update() {
      
      if (wallet && !fetchingData) {
        console.log("UPDATE", fetchingData)
        fetchingData = true

        var url = ENDPOINTS[0].endpoint
        var metadata = await getMints(wallet.publicKey.toBase58(), url);
        var ownedMinerDwarfsMeta = metadata.filter((m) => m.data.name && m.data.name.includes("Miner"))
        setMetadataLoaded(true)
        setisLoading(false)

        setState((current: any) => ({
          ...current,
          metadata,
          ownedMinerDwarfsMeta}))
        //console.log("STATE", nextState)
      }
      
  }

  if (!metadataLoaded) {

    if (!fetchedData)
      console.log("Updating...")
      update()
  }

  return (
    <MetaContext.Provider
      value={{
        ...state,
        // @ts-ignore
        update,
        isLoading,
      }}
    >
      {children}
    </MetaContext.Provider>
  );

}