import React from 'react';
import { Card, CardProps, Button, Badge } from 'antd';
import { ArtContent } from './../ArtContent';
// import { useArt } from '../../hooks';
import { PublicKey } from '@solana/web3.js';
import { Data } from '../../logic/utils/get-mints';
import { useMeta } from '../../contexts/meta/meta';

const { Meta } = Card;

enum MetadataCategory {
    Audio = 'audio',
    Video = 'video',
    Image = 'image',
    VR = 'vr',
    HTML = 'html',
  }

type StringPublicKey = string;

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

export interface ArtCardProps extends CardProps {
  pubkey?: StringPublicKey;

  image?: string;
  animationURL?: string;

  category?: MetadataCategory;

  name?: string;
  symbol?: string;
  description?: string;
  creators?: Creator[];
  preview?: boolean;
  small?: boolean;
  close?: () => void;

  height?: number;
  width?: number;

  data: Data
}

export const ArtCard = (props: ArtCardProps) => {
  let {
    className,
    small,
    category,
    image,
    animationURL,
    name,
    preview,
    creators,
    description,
    close,
    pubkey,
    height,
    width,
    data,
    ...rest
  } = props;
  var { metadata} = useMeta();
  const art = data
  creators = art?.creators || creators || [];
  name = art?.name || name || ' ';
  image = art?.image || image || ''
  // console.log("[2]", art, image)

  //console.log("[2] METADATA", metadata)

  const card = (
    <Card
      hoverable={true}
      className={`art-card ${small ? 'small' : ''} ${className ?? ''}`}
      cover={
        <>
          {close && (
            <Button
              className="card-close-button"
              shape="circle"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                close && close();
              }}
            >
              X
            </Button>
          )}
          <ArtContent
            pubkey={pubkey}
            image={image}
            animationURL={animationURL}
            category={category}
            preview={preview}
            height={height}
            width={width}
            data={data}
            className={'art-card'}
          />
        </>
      }
      {...rest}
    >
      <Meta
        title={`${name}`}
        description={
          <>
            {/* <MetaAvatar creators={creators} size={32} /> */}
            {/* {art.type === ArtType.Master && (
              <>
                <br />
                {!endAuctionAt && (
                  <span style={{ padding: '24px' }}>
                    {(art.maxSupply || 0) - (art.supply || 0)}/
                    {art.maxSupply || 0} prints remaining
                  </span>
                )}
              </>
            )} */}
            {/* <div className="edition-badge">{badge}</div> */}
          </>
        }
      />
    </Card>
  );

  return card
};
