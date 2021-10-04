import './index.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Home = () => {
    var [isActive, setActive] = useState<boolean[]>([false, false, false, false, false, false, false, false]);

    const toggleClass = (i: any) => {
        const newActive = isActive;
        newActive[i] = !isActive[i];
        setActive(() => newActive);


        console.log(isActive);
    };




    return (
        <div>
            <header>
                <div className="headerArt">
                    <img src="img/Top/castle.png" alt="castle on the sand mountain" />
                    <img src="img/Top/grassriver.png" alt="grass with a river" />
                    <div className="dwarfWithText">
                        <img src="img/Top/dwarf.png" alt="dwarf" />
                        <div className="text">
                            <img src="img/Top/textcloud.png" alt="text Cloud" />
                        </div>
                    </div>
                    <div className="bottomGrass"></div>
                </div>
                <h1>MINERDWARFS</h1>
                <Link to={`/mint`}><img src="img/Buttons/mint.png" alt="mint button" className="mintButton" /></Link>
                <div className="clouds">
                    <img src="img/Top/Clouds/cloud1.png" alt="cloud" />
                    <img src="img/Top/Clouds/cloud2.png" alt="cloud" />
                    <img src="img/Top/Clouds/cloud3.png" alt="cloud" />
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="https://discord.gg/mAqEJxhCBP" target="_blank" rel="noreferrer"><img src="img/Buttons/discord.png" alt="discord button" /></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/MinerDwarfs"><img src="img/Buttons/twitter.png" alt="twitter button" /></a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className="shadow"></div>
                <section className="firstSection">
                    <h2>MINERDWARFS</h2>
                    <p>
                        An original collection of 5555 randomly generated NFTs,
                        using more than 500 hand drawn assets
                        with a robust and unique rarity system implementation.
                    </p>
                </section>
                <section className="aboutUs">
                    <h2>About Us</h2>
                    <div className="dwarfImages">
                        <img src="img/DwarfsWithoutBackground/first.png" alt="1 dwarf" />
                        <img src="img/DwarfsWithoutBackground/second.png" alt="2 dwarf" />
                        <img src="img/DwarfsWithoutBackground/third.png" alt="3 dwarf" />
                        <img src="img/DwarfsWithoutBackground/fourth.png" alt="4 dwarf" />
                        <img src="img/DwarfsWithoutBackground/fifth.png" alt="5 dwarf" />
                        <img src="img/DwarfsWithoutBackground/sixth.png" alt="6 dwarf" />
                        <img src="img/DwarfsWithoutBackground/seventh.png" alt="7 dwarf" />
                        <img src="img/DwarfsWithoutBackground/eighth.png" alt="8 dwarf" />
                        <img src="img/DwarfsWithoutBackground/ninth.png" alt="9 dwarf" />
                        <img src="img/DwarfsWithoutBackground/tenth.png" alt="10 dwarf" />
                        <img src="img/DwarfsWithoutBackground/eleventh.png" alt="11 dwarf" />
                        <img src="img/DwarfsWithoutBackground/twelfth.png" alt="12 dwarf" />
                        <img src="img/DwarfsWithoutBackground/thirteenth.png" alt="13 dwarf" />
                        <img src="img/DwarfsWithoutBackground/fourteenth.png" alt="14 dwarf" />
                        <img src="img/DwarfsWithoutBackground/fifteenth.png" alt="15 dwarf" />
                        <img src="img/DwarfsWithoutBackground/sixteenth.png" alt="16 dwarf" />
                        <img src="img/DwarfsWithoutBackground/seventeenth.png" alt="17 dwarf" />
                    </div>
                    <div className="kingTalk">
                        <img src="img/Main/head.png" alt="king head talking" className="kingHead" />
                        <img src="img/Main/cloud.png" alt="cloud text frame" className="cloudTextFrame" />
                        <div className="text">
                            <p>
                                It is a little known fact that NFTs have existed for as long as there have been humans to enjoy them,
                                however, in the past only a lucky few had connections to magical realms that could bring them NFTs.
                            </p>
                            <p>
                                Cast your minds back to the days of yore - a time when archery practice was compulsory. A time when
                                dogs used to chase horse carriages and animals would be convicted of crimes. A time when people bathed
                                once a week and certain loaves of bread could get you high.
                            </p>
                            <p>
                                ...In these Before-fore-times, few people could command their Fetch Fairies to enter the CryptoMines
                                Of Dwaria and steal NFTs from under the beards of the dwarfs that mined them before the Dwarfs could
                                understand what happened…
                            </p>
                            <p>
                                ...However, one day the Miner Dwarfs found out and waged a war on the Fetch Fairies, imprisoning them
                                within the deep digital rocks of their mines.  Cocky and complacent, the Dwarfs took comfort thinking
                                that their troves of NFTs were now forever safe. The Dwarfs retired from the world, to drink and delve
                                and covet their NFTs… But the dwarfs delved too deep…
                            </p>
                            <p>
                                ...They awakened furious foes, such as Ice Dragons, that raged against the dwarfs, wreaking havoc and
                                freezing the dwarfs in place as they worked in their mines. There they have laid for untold years…
                                until now…
                            </p>
                            <p>
                                ...There is a disturbance in the plane of magic — a portal has opened in the ether. Although the
                                Fairies have all been captured, their NFT conduit has suddenly opened once more into the CryptoMines
                                Of Dwaria, and the frozen Miner Dwarfs are about to pour out!
                            </p>
                            <p>
                                Join us in collecting these Miner Dwarfs!
                            </p>
                        </div>
                    </div>
                    <img src="img/Main/mine.png" alt="mine" className="mineBackground" />
                    <div className="dwarfsWithBackground">
                        <img src="img/DwarfsWithBackground/first.jpg" alt="1 dwarf" />
                        <img src="img/DwarfsWithBackground/second.jpg" alt="2 dwarf" />
                        <img src="img/DwarfsWithBackground/third.jpg" alt="3 dwarf" />
                        <img src="img/DwarfsWithBackground/fourth.jpg" alt="4 dwarf" />
                        <img src="img/DwarfsWithBackground/fifth.jpg" alt="5 dwarf" />
                        <img src="img/DwarfsWithBackground/sixth.jpg" alt="6 dwarf" />
                        <img src="img/DwarfsWithBackground/seventh.jpg" alt="7 dwarf" />
                        <img src="img/DwarfsWithBackground/eighth.jpg" alt="8 dwarf" />
                        <img src="img/DwarfsWithBackground/ninth.jpg" alt="9 dwarf" />
                        <img src="img/DwarfsWithBackground/tenth.jpg" alt="10 dwarf" />
                        <img src="img/DwarfsWithBackground/eleventh.jpg" alt="11 dwarf" />
                        <img src="img/DwarfsWithBackground/twelfth.jpg" alt="12 dwarf" />
                        <img src="img/DwarfsWithBackground/thirteenth.jpg" alt="13 dwarf" />
                        <img src="img/DwarfsWithBackground/fourteenth.jpg" alt="14 dwarf" />
                        <img src="img/DwarfsWithBackground/fifteenth.jpg" alt="15 dwarf" />
                        <img src="img/DwarfsWithBackground/sixtheenth.jpg" alt="16 dwarf" />
                        <img src="img/DwarfsWithBackground/seventeenth.jpg" alt="17 dwarf" />
                        <img src="img/DwarfsWithBackground/eighteenth.jpg" alt="18 dwarf" />
                        <img src="img/DwarfsWithBackground/nineteenth.jpg" alt="19 dwarf" />
                        <img src="img/DwarfsWithBackground/twentieth.jpg" alt="20 dwarf" />
                        <img src="img/DwarfsWithBackground/tweenty-first.jpg" alt="21 dwarf" />
                        <img src="img/DwarfsWithBackground/twenty-second.jpg" alt="22 dwarf" />
                        <img src="img/DwarfsWithBackground/twenty-third.jpg" alt="23 dwarf" />
                        <img src="img/DwarfsWithBackground/twenty-fourth.jpg" alt="23 dwarf" />
                    </div>
                </section>
                <section className="roadmap">
                    <img src="img/Main/roadmap.png" alt="roadmap background" />
                    <h2>ROADMAP</h2>
                    <ul>
                        {/* <li>
                            <h3>Public Mint – 11<sup>th</sup> October at 20:00 UTC</h3>
                            <p>
                                The 5555 MinerDwarfs will be released to the public.
                                More Details on Twitter and Discord.
                            </p>
                        </li> */}
                        {/* <li>
                            <h3>Marketplace – 8<sup>th</sup> October</h3>
                            <p>
                                Trade your MinerDwarfs directly on all available marketplaces after minting.
                            </p>
                        </li> */}
                        <li>
                            <h3>Stage I</h3>

                            <p>Opening of the Fairies NFT conduit into the crypto mines of Dwaria
                                (Launching/appearing on the Solana blockchain) </p>
                            <p>Partnerships with some Solana projects </p>
                            <p>MinerDwarfs Holders will get early access and early rewards to the game.</p>


                        </li>

                        <li>
                            <h3>Stage II</h3>

                            <p>Listing on popular marketplaces  </p>
                            <p>Setting up token verification and gated access  </p>
                            <p>Community-driven structuring and building </p>
                            <p>Partnerships with the best projects in the ecosystem  </p>


                        </li>

                        <li>
                            <h3>Stage III</h3>

                            <p>Airdrop to holders from partners collection as well as next gen series.
                                (Priority given to higher token holdings). </p>
                            <p>Dwarfs Market launch</p>
                            <p>Miner Dwarfs community rewards</p>
                            <p>All other spells to be cast by the Dwarfs of the crypto mines of Dwaria. </p>


                        </li>
                    </ul>
                </section>
                <section className="faq">
                    <img src="img/FAQ/FAQsign.png" alt="pixel sign" />
                    <h2>FAQ</h2>
                    <div className="questions">
                        <div className="FAQblock" onClick={() => toggleClass(0)}>
                            <img src="img/FAQ/FAQwood.png" alt="pixel sign" />
                            <h2 className="number">1</h2>
                            <h2 className="text">When is the launch?</h2>
                            <div className={isActive[0] ? 'information visible' : 'information hidden'}>
                                <p>
                                    11th October – 20 UTC.
                                </p>
                            </div>
                        </div>
                        <div className="FAQblock" onClick={() => toggleClass(1)}>
                            <img src="img/FAQ/FAQwood.png" alt="pixel sign" />
                            <h2 className="number">2</h2>
                            <h2 className="text">Where are you launching?</h2>
                            <div className={isActive[1] ? 'information visible' : 'information hidden'}>
                                <p>
                                    We are launching on Solana.
                                </p>
                            </div>
                        </div>
                        <div className="FAQblock" onClick={() => toggleClass(2)}>
                            <img src="img/FAQ/FAQwood.png" alt="pixel sign" />
                            <h2 className="number">3</h2>
                            <h2 className="text">How many MinerDwarfs will exist?</h2>
                            <div className={isActive[2] ? 'information visible' : 'information hidden'}>
                                <p>
                                    Only 5555 unique MinerDwarfs will be available.
                                </p>
                            </div>
                        </div>
                        <div className="FAQblock" onClick={() => toggleClass(3)}>
                            <img src="img/FAQ/FAQwood.png" alt="pixel sign" />
                            <h2 className="number">4</h2>
                            <h2 className="text">What is the price of minting?</h2>
                            <div className={isActive[3] ? 'information visible' : 'information hidden'}>
                                <p>
                                    Mint price will be 1 SOL
                                </p>
                            </div>
                        </div>
                        <div className="FAQblock" onClick={() => toggleClass(4)}>
                            <img src="img/FAQ/FAQwood.png" alt="pixel sign" />
                            <h2 className="number">5</h2>
                            <h2 className="text">Is there a pre-sale?</h2>
                            <div className={isActive[4] ? 'information visible' : 'information hidden'}>
                                <p>
                                    No
                                </p>
                            </div>
                        </div>
                        <div className="FAQblock" onClick={() => { toggleClass(5) }}>
                            <img src="img/FAQ/FAQwood.png" alt="pixel sign" />
                            <h2 className="number">6</h2>
                            <h2 className="text">How can I tell how rare my Miner Dwarf is?</h2>
                            <div className={isActive[5] ? 'information visible' : 'information hidden'}>
                                <p>
                                    You can check on our website after mint.
                                </p>
                            </div>
                        </div>
                        <div className="FAQblock" onClick={() => { toggleClass(6) }}>
                            <img src="img/FAQ/FAQwood.png" alt="pixel sign" />
                            <h2 className="number">7</h2>
                            <h2 className="text">How much can I mint?</h2>
                            <div className={isActive[6] ? 'information visible' : 'information hidden'}>
                                <p>
                                    You can mint 1 Miner Dwarf per transaction.
                                    There is no limit on how many your wallet can hold.
                                </p>
                            </div>
                        </div>
                        <div className="FAQblock special" onClick={() => toggleClass(7)} >
                            <img src="img/FAQ/FAQwood.png" alt="pixel sign" />
                            <h2 className="number">8</h2>
                            <h2 className="text">How to purchase Miner Dwarfs?</h2>
                            <div className={isActive[7] ? 'information visible' : 'information hidden'}>
                                <p>
                                    You will need to connect your Solana wallet and follow the buy prompts.
                                </p>
                                <ul>
                                    <li>
                                        <p>Download the Phantom or Sollet wallet extension for your browser (Google Chrome recommended).</p>
                                    </li>
                                    <li>
                                        <p>Buy Solana (SOL) on an exchange like FTX, Binance, Coinbase, etc, and send it to your Phantom or Sollet wallet Public Address.</p>
                                    </li>
                                    <li>
                                        <p>Click on the "Mint" button, new subpage will be open.</p>
                                    </li>
                                    <li>
                                        <p>Connect your Wallet to our website by clicking on the Connect button.</p>
                                    </li>
                                    <li>
                                        <p>Click the “Mint” button and approve the transaction in your Wallet.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <img src="img/Footer/footerGif.gif" alt="animated mine" />
                <h2>STAY TUNED...</h2>
                <a href='https://kekw.io' target='_blank' style={{textDecoration: 'none'}}><div className="footerBlock">
                    <img className="footerBlockImage" style={{ margin: 0, marginTop: 15, marginBottom: 5, width: 30, }} src="img/Footer/logo_kekw_pixelated.png" alt="kekw logo pixel sign" />
                    <p style={{ margin: 0, padding: 0, }}>$KEKW Official Partner</p>
                </div></a>
            </footer>
        </div>
    );
};

export default Home;
