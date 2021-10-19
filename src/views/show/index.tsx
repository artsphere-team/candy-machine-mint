import { WalletDialogButton } from "@solana/wallet-adapter-material-ui"
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { shortenAddress } from "../../logic/candy-machine";
import { getMints } from "../../logic/utils/get-mints"
import Masonry from 'react-masonry-css';
import { CardLoader } from '../../components/Loader'
import { ArtCard } from "../../components/ArtCard";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";

export enum ArtworkViewState {
    Metaplex = '0',
    Owned = '1',
    Created = '2',
  }

const Show = () => {
    const [isLoading, setisLoading] = useState(false)
    const [issuedNftLoading, setissuedNftLoading] = useState(false)
    const [issuedownedMinerdwarfs, setissuedownedMinerdwarfs] = useState(false)
    const [metadata, setmetadata] = useState([] as any)
    const [ownedMinerdwarfs, setownedMinerdwarfs] = useState([] as any)
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    const wallet = useAnchorWallet();


    let url = "https://api.mainnet-beta.solana.com"

    if (wallet && !issuedNftLoading) {
        console.log("IssuedNFTLoading")
        setissuedNftLoading(true)
        setisLoading(true)
        getMints(wallet.publicKey.toBase58(), url).then((items) => {setmetadata(items); setisLoading(false);})
        
    }

        
    if (metadata.length > 0 && !issuedownedMinerdwarfs) {
        console.log("INNER", metadata)
        setownedMinerdwarfs(metadata.filter((m: any) => m.data.name.includes("MinerDwarf")));
        setissuedownedMinerdwarfs(true)
    }


    //console.log("DATA", metadata, ownedMinerdwarfs)

    

  const artworkGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        //@ts-ignore
        ? ownedMinerdwarfs.map((m, idx) => {
            const id = m.info.mint;
            return (
                <ArtCard
                  key={id}
                  pubkey={m.pubkey}
                  preview={false}
                  height={250}
                  width={250}
                  data={m.data}
                />
            );
          })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );


    return (
        <div>
            <header>
            <div className="headerArt">
            

            <div className="clouds">
            <img src="img/Top/Clouds/cloud1.png" alt="cloud" />
            <img src="img/Top/Clouds/cloud2.png" alt="cloud" />
            <img src="img/Top/Clouds/cloud3.png" alt="cloud" />
            </div>
            </div>
            <h2>MINERDWARFS<br />SHOWROOM</h2>

            {!wallet ?(
                <div style={{ position: 'absolute', top: 20, right: 10 }}>
                <WalletDialogButton style={{ background: 'transparent', boxShadow: 'none' }}><img src="img/Buttons/connect.png" alt="mint button" className="connectButton" /></WalletDialogButton>
                </div>
            ) : undefined}

            <div className='walletText' >
                {wallet && (
                    <p style={{ position: 'absolute', top: 20, right: 10 }}>Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
                    )}
            </div>

            <div className='mintSection' >
            
                {!wallet && <p>Not connected</p>}
                {isLoading && <p>Loading ... </p>}
                {!isLoading && wallet && <p>You have {ownedMinerdwarfs.length} Minerdwarf{ownedMinerdwarfs.length>1?"s":""}!</p>}

                <Layout style={{ margin: 0, marginTop: 30 }}>
                    <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Col style={{ width: '100%', marginTop: 10 }}>
                            <Row>
                                {artworkGrid}
                            </Row>
                        </Col>
                    </Content>
                </Layout>
            </div>
            </header>

            <Link to={`/`}>
                <div className='backArrow'>
                    &lt;
                </div>
            </Link>
        </div>
    )
}

export default Show