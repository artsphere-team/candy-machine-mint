import { WalletDialogButton } from "@solana/wallet-adapter-material-ui"
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { shortenAddress } from "../../logic/candy-machine";
import Masonry from 'react-masonry-css';
import { CardLoader } from '../../components/Loader'
import { ArtCard } from "../../components/ArtCard";
import {  Row } from "antd";
import { useMeta } from "../../contexts/meta/meta";

export enum ArtworkViewState {
    Metaplex = '0',
    Owned = '1',
    Created = '2',
}


const Show = () => {
    const {metadata, ownedMinerDwarfsMeta, isLoading} = useMeta()
    const [issuedNftLoading, setissuedNftLoading] = useState(false)
    const [issuedownedMinerdwarfs, setissuedownedMinerdwarfs] = useState(false)
    const [metadata1, setmetadata1] = useState([] as any)
    const [ownedMinerdwarfs, setownedMinerdwarfs] = useState([] as any)
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    const wallet = useAnchorWallet();

    // let url = "https://api.mainnet-beta.solana.com"

    // if (wallet && !issuedNftLoading) {
    //     console.log("IssuedNFTLoading")
    //     setissuedNftLoading(true)
    //     setisLoading(true)
    //     getMints(wallet.publicKey.toBase58(), url).then((items) => {setmetadata1(items); setisLoading(false);})

    // }

        
    if (!isLoading && ownedMinerDwarfsMeta && !issuedownedMinerdwarfs) {
        console.log("INNER", metadata)
        setownedMinerdwarfs(ownedMinerDwarfsMeta);
        setissuedownedMinerdwarfs(true)
    }

    console.log("ISLOADING MAIN", isLoading, metadata, ownedMinerDwarfsMeta)

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
            //console.log("[1] SHOW", m.data, id, metadata)
            return (
                <ArtCard
                  key={id}
                  pubkey={id}
                  image={m.data.image}
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
                <h2 style={{ top: 100 }}>MINERDWARFS<br />SHOWROOM</h2>

                {!wallet ? (
                    <div style={{ position: 'absolute', top: 20, right: 10 }}>
                        <WalletDialogButton style={{ background: 'transparent', boxShadow: 'none' }}><img src="img/Buttons/connect.png" alt="mint button" className="connectButton" /></WalletDialogButton>
                    </div>
                ) : undefined}

                <div className='walletText' >
                    {wallet && (
                        <p style={{ position: 'absolute', top: 20, right: 10 }}>Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
                    )}
                </div>

                <div className='showroom-section' >

                    {!wallet && <p>Not connected</p>}
                    {isLoading && <p>Loading ... </p>}
                    {!isLoading && wallet && <p>You have {ownedMinerdwarfs.length} Minerdwarf{ownedMinerdwarfs.length > 1 ? "s" : ""}!</p>}
                    <br />
                    <Row>
                        {artworkGrid}
                    </Row>
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