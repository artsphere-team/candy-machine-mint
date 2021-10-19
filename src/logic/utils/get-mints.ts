
import { deserializeUnchecked } from 'borsh';
import * as anchor from "@project-serum/anchor";
import { PublicKey, AccountInfo } from "@solana/web3.js";
import { useState } from 'react';
export const METADATA_PREFIX = "metadata";

class Creator {
  address: PublicKey;
  verified: boolean;
  share: number;

  constructor(args: { address: PublicKey; verified: boolean; share: number }) {
    this.address = args.address;
    this.verified = args.verified;
    this.share = args.share;
  }
}

enum MetadataKey {
  Uninitialized = 0,
  MetadataV1 = 4,
  EditionV1 = 1,
  MasterEditionV1 = 2,
  MasterEditionV2 = 6,
  EditionMarker = 7,
}

export class collection {
  name: string;
  family: string;

  constructor(args: { name: string; family: string }) {
    this.name = args.name;
    this.family = args.family;
  }
}

export type Attribute = {
  trait_type?: string;
  display_type?: string;
  value: string | number;
};

class Data {
  name: string;
  symbol: string;
  description: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Creator[] | null;
  attributes: Attribute[] | undefined;
  image: string | undefined;
  animation_url: string | undefined;
  alreadyQueried: boolean;
  collection: collection;
  category: string;
  constructor(args: {
    name: string;
    symbol: string;
    description: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[] | null;
    attributes: Attribute[] | undefined;
    image: string | undefined;
    animation_url: string | undefined;
    alreadyQueried: boolean;
    collection: collection;
    category: string;
  }) {
    this.name = args.name;
    this.symbol = args.symbol;
    this.description = args.description;
    this.uri = args.uri;
    this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
    this.creators = args.creators;
    this.attributes = args.attributes;
    this.image = args.image;
    this.animation_url = args.animation_url;
    this.alreadyQueried = args.alreadyQueried;
    this.collection = args.collection;
    this.category = args.category
  }
}

class Metadata {
  key: MetadataKey;
  updateAuthority: PublicKey;
  mint: PublicKey;
  data: Data;
  primarySaleHappened: boolean;
  isMutable: boolean;
  masterEdition?: PublicKey;
  edition?: PublicKey;
  constructor(args: {
    updateAuthority: PublicKey;
    mint: PublicKey;
    data: Data;
    primarySaleHappened: boolean;
    isMutable: boolean;
    masterEdition?: PublicKey;
  }) {
    this.key = MetadataKey.MetadataV1;
    this.updateAuthority = args.updateAuthority;
    this.mint = args.mint;
    this.data = args.data;
    this.primarySaleHappened = args.primarySaleHappened;
    this.isMutable = args.isMutable;
  }
}


let holders = {};
const getMintsForToken = (url: RequestInfo) => (key: any) => {
  return fetch(url, {
    body: `{
        "jsonrpc":"2.0", 
        "id": ${Date.now()}, 
        "method":"getProgramAccounts", 
        "params":[
          "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
          {
            "encoding": "jsonParsed",
            "filters": [
              {
                "memcmp": {
                  "offset": 326,
                  "bytes": "${key}"
                }
              }
            ]
          }
        ]}
    `,
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(res => res.json());
};


type StringPublicKey = string;


interface PublicKeyStringAndAccount<T> {
  pubkey: string;
  account: AccountInfo<T>;
}

const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

const BPF_UPGRADE_LOADER_ID = new PublicKey(
  "BPFLoaderUpgradeab1e11111111111111111111111"
);

const MEMO_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

const METADATA_PROGRAM_ID =
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s" as StringPublicKey;

const VAULT_ID =
  "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn" as StringPublicKey;

const AUCTION_ID =
  "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8" as StringPublicKey;

const METAPLEX_ID =
  "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98" as StringPublicKey;

const SYSTEM = new PublicKey("11111111111111111111111111111111");

const METADATA_SCHEMA = new Map<any, any>([
  [
    Data,
    {
      kind: "struct",
      fields: [
        ["name", "string"],
        ["symbol", "string"],
        ["uri", "string"],
        ["sellerFeeBasisPoints", "u16"],
        ["creators", { kind: "option", type: [Creator] }],
      ],
    },
  ],
  [
    Creator,
    {
      kind: "struct",
      fields: [
        ["address", [32]],
        ["verified", "u8"],
        ["share", "u8"],
      ],
    },
  ],
  [
    Metadata,
    {
      kind: "struct",
      fields: [
        ["key", "u8"],
        ["updateAuthority", [32]],
        ["mint", [32]],
        ["data", Data],
        ["primarySaleHappened", "u8"],
        ["isMutable", "u8"],
      ],
    },
  ],
]);

const findProgramAddress = async (
  seeds: (Buffer | Uint8Array)[],
  programId: PublicKey
) => {
  const key =
    "pda-" +
    seeds.reduce((agg, item) => agg + item.toString("hex"), "") +
    programId.toString();

  const result = await PublicKey.findProgramAddress(seeds, programId);

  return [result[0].toBase58(), result[1]] as [string, number];
};

const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
    associatedToken: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    bpf_upgrade_loader: BPF_UPGRADE_LOADER_ID,
    system: SYSTEM,
    metadata: METADATA_PROGRAM_ID,
    memo: MEMO_ID,
    vault: VAULT_ID,
    auction: AUCTION_ID,
    metaplex: METAPLEX_ID,
  };
};


const PubKeysInternedMap = new Map<string, PublicKey>();

const toPublicKey = (key: string | PublicKey) => {
  if (typeof key !== "string") {
    return key;
  }

  let result = PubKeysInternedMap.get(key);
  if (!result) {
    result = new PublicKey(key);
    PubKeysInternedMap.set(key, result);
  }

  return result;
};

async function getMetadataKey(
  tokenMint: StringPublicKey
): Promise<StringPublicKey> {
  const PROGRAM_IDS = programIds();

  return (
    await findProgramAddress(
      [
        Buffer.from(METADATA_PREFIX),
        toPublicKey(PROGRAM_IDS.metadata).toBuffer(),
        toPublicKey(tokenMint).toBuffer(),
      ],
      toPublicKey(PROGRAM_IDS.metadata)
    )
  )[0];
}

async function fetchMetadataFromPDA(pubkey: PublicKey, url: string) {
  const connection = new anchor.web3.Connection(url);
  const metadataKey = await getMetadataKey(pubkey.toBase58());
  const metadataInfo = await connection.getAccountInfo(
    toPublicKey(metadataKey)
  );

  return metadataInfo;
}

const decodeMetadata = (buffer: Buffer): Metadata => {
  const metadata = deserializeUnchecked(
    METADATA_SCHEMA,
    Metadata,
    buffer
  ) as Metadata;

  metadata.data.name = metadata.data.name.replace(/\0/g, "");
  metadata.data.symbol = metadata.data.symbol.replace(/\0/g, "");
  metadata.data.uri = metadata.data.uri.replace(/\0/g, "");
  metadata.data.name = metadata.data.name.replace(/\0/g, "");
  return metadata;
};

export async function getMetadata(pubkey: PublicKey, url: string) {
  let metadata;

  try {
    const metadataPromise = await fetchMetadataFromPDA(pubkey, url);

    if (metadataPromise && metadataPromise.data.length > 0) {
      metadata = decodeMetadata(metadataPromise.data);
    }
  } catch (e) {
    console.log(e);
  }

  return metadata;
}

export const getMints = async (creatorId: string, url: string) => {

    const connection = new anchor.web3.Connection(url);
    // const a = await connection.getProgramAccounts(
    // new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
    // {
    //     filters: [
    //     {
    //         "memcmp": {
    //         "offset": 8,
    //         "bytes": creatorId
    //         }
    //     }
    //     ]
    // }
    // )
    // const deserialized = a.map(b=> deserializeUnchecked(METADATA_SCHEMA, Metadata, b.account.data));

    const b = await connection.getParsedTokenAccountsByOwner(new PublicKey(creatorId), {
    programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    });

    const ownedTokenAccounts = b.value.filter(item => item.account.data.parsed.info.tokenAmount.uiAmount > 0).map(i => i.account.data.parsed)

    var metadata: any[] = [] 
    await ownedTokenAccounts.map(async (m, idx) => {
    let met = await getMetadata(new anchor.web3.PublicKey(m.info.mint), url)
    metadata[idx] = met? met.data: {}
    })

    if (ownedTokenAccounts.length > 0) {
    while (metadata.length == 0) {
        await new Promise(resolve => setTimeout(resolve, 500))
    }
    }

    if (metadata.length > 0) {
    metadata.map((m, idx) => {
        var _uri = metadata[idx].uri || "";
        fetch(_uri)
            .then(async (_) => {
            try {
                const data = await _.json();

                if (data?.description) {
                m.description = data?.description;
                }

                if (data?.image) {
                m.image = data?.image;
                }

                if (data?.animation_url) {
                m.animation_url = data?.animation_url;
                }

                if (data?.collection) {
                m.collection = data?.collection;
                }

                if (data?.attributes) {
                m.attributes = data?.attributes;
                }

                if (data?.properties.category) {
                m.category = data?.properties.category;
                }

                m.alreadyQueried = true

                return m
            } catch (e) {
                console.log("JSON DATA isMetadataPartOfStore ERROR:", e);
                return undefined;
            }
            })
            .catch((e) => {
            console.log("JSON DATA isMetadataPartOfStore ERROR 2:", e);
            return undefined;
            });
        }
    );
    }

    console.log("LOADED!", metadata)

    return metadata
    // download(
    //   "mints-creatorId-" + Date.now() + ".json",
    //   jsonFormat(deserialized.map(g => new PublicKey(g.mint).toBase58()), {
    //     type: "space",
    //     size: 2,
    //   })
    // );
}