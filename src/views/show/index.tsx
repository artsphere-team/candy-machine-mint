import { WalletDialogButton } from "@solana/wallet-adapter-material-ui"
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { shortenAddress } from "../../logic/candy-machine";
import Masonry from 'react-masonry-css';
import { CardLoader } from '../../components/Loader'
import { ArtCard } from "../../components/ArtCard";
import { Row } from "antd";
import { useMeta } from "../../contexts/meta/meta";
import { ArtModal } from "../../components/ArtModal";
import { PublicKey } from "@solana/web3.js";
//import {fetchingData} from  "../../contexts/meta/meta"

const Show = () => {
    const { metadata, ownedMinerDwarfsMeta, isLoading } = useMeta()
    const [issuedownedMinerdwarfs, setissuedownedMinerdwarfs] = useState(false)
    const [ownedMinerdwarfs, setownedMinerdwarfs] = useState([] as any)

    const [showArtworkModal, setShowArtworkModal] = useState<boolean>(false);
    const [artworkIdModal, setArtworkIdModal] = useState<string>("");
    const [arworkidList, setartworkIdList] = useState([] as any)

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    const wallet = useAnchorWallet();


    if (!isLoading && ownedMinerDwarfsMeta && !issuedownedMinerdwarfs) {
        //console.log("INNER", metadata)
        setownedMinerdwarfs(ownedMinerDwarfsMeta);
        setartworkIdList(ownedMinerDwarfsMeta.map((m) => pubkeyToString(m.info.mint)))
        setissuedownedMinerdwarfs(true)
    }

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
                        <Link
                            to={`#`}
                            style={{ textDecoration: 'none', color: 'black' }}
                            onClick={() => {
                                setShowArtworkModal(true);
                                setArtworkIdModal(id);
                                console.log("Modal visible:", showArtworkModal, id)
                            }}
                        >
                            <ArtCard
                                key={id}
                                pubkey={id}
                                image={m.data.image}
                                preview={false}
                                data={m.data}
                                height={300}
                            />
                        </Link>
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
                    {wallet && isLoading && <p>Loading ... </p>}
                    {!isLoading && wallet && <p>You have {ownedMinerdwarfs.length} Minerdwarf{ownedMinerdwarfs.length > 1 ? "s" : ""}!</p>}
                    <br />
                    <div className="card-container">
                        <Row style={{ width: '90%', marginLeft: '5%' }}>
                            {wallet && artworkGrid}

                        </Row>
                    </div>
                </div>
            </header>
            <ArtModal
                artworkId={artworkIdModal}
                artworkIdList={arworkidList}
                visible={showArtworkModal}
                key={arworkidList.indexOf(artworkIdModal)}
                onSwipe={(direction: string) => {
                    var currentIdx = arworkidList.indexOf(artworkIdModal);
                    setArtworkIdModal(
                        direction == "right"
                            ? arworkidList[currentIdx + 1]
                            : arworkidList[currentIdx - 1]
                    );
                }}
                onCancel={() => {
                    console.log("MODAL CANCELLED")
                    setArtworkIdModal("");
                    setShowArtworkModal(false);
                }}
            />

            <Link to={`/`}>
                <div className='backArrow'>
                    &lt;
                </div>
            </Link>
        </div>
    )
}


const pubkeyToString = (key: PublicKey | null | string = '') => {
    return typeof key === 'string' ? key : key?.toBase58() || '';
};

export default Show