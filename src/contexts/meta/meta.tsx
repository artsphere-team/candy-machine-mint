import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AccountInfo } from "@solana/web3.js";
import React, { useContext, useState } from "react";
import { getMints } from "../../logic/utils/get-mints";
import { MetaContextState, MetaState } from "./types";
import { AccountInfo as TokenAccountInfo} from '@solana/spl-token';

export const getEmptyMetaState = (): MetaState => ({
    metadata: []
  });

export interface TokenAccount {
  pubkey: string;
  account: AccountInfo<Buffer>;
  info: TokenAccountInfo;
}

const MetaContext = React.createContext<MetaContextState>({
    ...getEmptyMetaState(),
    isLoading: false,
    // @ts-ignore
    update: () => [AuctionData, BidderMetadata, BidderPot],
  });

  
export const useMeta = () => {
  const context = useContext(MetaContext);
  return context;
};
  
export function MetaProvider({ children = null as any }) {
  const connection = useConnection();

  var { metadata} = useMeta();

  var [state, setState] = useState([]as any)//<MetaState>(getEmptyMetaState());
  const [page, setPage] = useState(0);
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [lastLength, setLastLength] = useState(0);

  const wallet = useAnchorWallet();

  const [isLoading, setIsLoading] = useState(true);

  let url = "https://api.mainnet-beta.solana.com"

  //console.log("META")

  async function update() {
      //console.log("UPDATE")
      if (wallet) {
        var metadata = await getMints(wallet.publicKey.toBase58(), url);
        setState((current: any) => ({
          ...current,
          metadata}))
        //console.log("nextstate", metadata, state)
        setMetadataLoaded(true)
        //console.log("STATE", nextState)
      }
      
  }


  if (!metadataLoaded && metadata.length < 1) {
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