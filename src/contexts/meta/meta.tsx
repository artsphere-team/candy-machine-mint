import React, { useContext } from "react";
import { MetaContextState, MetaState } from "./types";

export const getEmptyMetaState = (): MetaState => ({
    metadata: []
  });

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
  