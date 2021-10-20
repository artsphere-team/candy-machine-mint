import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AccountInfo } from "@solana/web3.js";
import React, { useContext, useState } from "react";
import { getMints } from "../../logic/utils/get-mints";
import { MetaContextState, MetaState } from "./types";
import { AccountInfo as TokenAccountInfo} from '@solana/spl-token';

var fetchingData = false

export const getEmptyMetaState = (): MetaState => ({
    metadata: [],
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

  var { metadata} = useMeta();

  var [state, setState] = useState([]as any)//<MetaState>(getEmptyMetaState());
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const wallet = useAnchorWallet();

  let url = "https://api.mainnet-beta.solana.com"

  //console.log("META")

  async function update() {
      
      if (wallet && !fetchingData) {
        console.log("UPDATE", fetchingData)
        fetchingData = true
        var metadata = await getMints(wallet.publicKey.toBase58(), url);

        setMetadataLoaded(true)
        setisLoading(false)

        setState((current: any) => ({
          ...current,
          metadata}))
        console.log("nextstate", metadata, isLoading)
        //console.log("STATE", nextState)
      }
      
  }


  if (!metadataLoaded && metadata.length < 1) {

    if (!fetchingData)
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