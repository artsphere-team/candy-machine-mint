import { WalletDialogButton } from "@solana/wallet-adapter-material-ui"
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { shortenAddress } from "../../logic/candy-machine";
import {getMints} from "../../logic/utils/get-mints"

const Show = () => {
    const [isLoading, setisLoading] = useState(false)
    const [issuedNftLoading, setissuedNftLoading] = useState(false)
    const [issuedownedMinerdwarfs, setissuedownedMinerdwarfs] = useState(false)
    const [metadata, setmetadata] = useState([] as any)
    const [ownedMinerdwarfs, setownedMinerdwarfs] = useState([])

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
        setownedMinerdwarfs(metadata.filter((m: any) => m.name.includes("MinerDwarf")));
        setissuedownedMinerdwarfs(true)
    }


    console.log("DATA", metadata, ownedMinerdwarfs)

    //if (nft_metadata && wallet) {setisLoading(false)}


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