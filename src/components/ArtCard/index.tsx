import React from 'react';
import { Card, CardProps, Button, Badge } from 'antd';
import { ArtContent } from './../ArtContent';
// import { useArt } from '../../hooks';
import { PublicKey } from '@solana/web3.js';
import { Data } from '../../logic/utils/get-mints';
import { useMeta } from '../../contexts/meta/meta';
import './index.css';
const traits = require('../Attributes/traits.json');

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
  var { metadata, isLoading} = useMeta();
  const art = data
  creators = art?.creators || creators || [];
  name = art?.name || name || ' ';

  image = art?.image || image || ''
  
  var rarity = 1
  if (!isLoading){
    var met_img = metadata.filter(m => pubkeyToString(m.info.mint) == pubkey)[0]

    if (met_img?.data) {
      image = met_img.data.image
      //console.log("pubkey", isLoading, met_img, pubkey, "image", met_img.data.image, image)
    
      for (let i=0; i<met_img.data.attributes.length; i++){
        if (met_img.data.attributes[i].rarity !== undefined)
          rarity = rarity + met_img.data.attributes[i].rarity
      }
      rarity = rarity/met_img.data.attributes.length
    }
  }


  const card = (
    <Card
      hoverable={true}
      className={`art-card ${small ? 'small' : ''} ${className ?? ''}`}
      style={{ background: 'white'}}
      cover={
        <>
          <ArtContent
            pubkey={pubkey}
            image={image}
            animationURL={animationURL}
            category={category}
            preview={preview}
            height={height}
            width={width}
            data={data}
          />
        </>
      }
      {...rest}
    >
      <Meta
        title={<div style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}>{`${name} (${((rarity) * 100).toFixed(2)}%)`}</div>}
      />
    </Card>
  );

  return card
};

const pubkeyToString = (key: PublicKey | null | string = '') => {
  return typeof key === 'string' ? key : key?.toBase58() || '';
};