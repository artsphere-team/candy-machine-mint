import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "../../logic/candy-machine";
import { Link } from "react-router-dom";


const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const whitelistedWallets = process.env.REACT_APP_WHITELISTED_ACCOUNTS!.split(',');

console.log("WH", whitelistedWallets)

export interface MintProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Mint = (props: MintProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);
  const [price, setprice] = useState(0);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  console.log(whitelistedWallets);

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
        price
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);
      setprice(price / 1000000000);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };


  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  const launchDate = new Date('2021-10-11 22:00:00')
  const currentDate = new Date()

  const whitelistedMinutes = 20
  const isWhitelistedWallet = whitelistedWallets.includes(wallet ? wallet?.publicKey.toBase58() : "")

  const afterLaunchDate = isWhitelistedWallet ? new Date(currentDate.getTime() + whitelistedMinutes * 60000) > launchDate : currentDate > launchDate

  if ((afterLaunchDate || isWhitelistedWallet) && !isActive) {
    setIsActive(true)
  }

  return (
    <div>
      <header>
        <div className="headerArt">
          <img src="img/Top/castle.png" alt="castle on the sand mountain" />
          <img src="img/Top/grassriver.png" alt="grass with a river" />
          <div className="dwarfMintWithText">
            <img width='200' src="img/DwarfsWithoutBackground/KING.png" alt="dwarf" />
            <div className="text">
              <img src="img/Top/textcloud_mint.png" alt="text Cloud" />
            </div>
          </div>
          <div className="bottomGrass"></div>
        </div>
        <h2>MINT<br />MINERDWARFS</h2>

        {!wallet && !isActive ? (
          <div style={{ position: 'absolute', top: 20, right: 10 }}>
            <WalletDialogButton style={{ background: 'transparent', boxShadow: 'none' }}><img src="img/Buttons/connect.png" alt="mint button" className="connectButton" /></WalletDialogButton>
          </div>
        ) : undefined}

        <div className='mintSection' >
          {wallet && (
            <p>Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
          )}

          {isActive && wallet && <p>Balance: {(balance || 0).toLocaleString()} SOL</p>}

          {isActive && wallet && <p>NFT price: {price} SOL</p>}

          {isActive && wallet && <p>Total Available: {itemsAvailable}</p>}

          {isActive && wallet && <p>Redeemed: {itemsRedeemed}</p>}

          {isActive && wallet && <p>Remaining: {itemsRemaining}</p>}

          {!isActive ? <div className='countdown'>

            <p>Coming soon</p>

            <Countdown
              date={launchDate}
              //onMount={({ completed }) => completed && setIsActive(true)}
              onComplete={() => setIsActive(true)}
              renderer={renderCounter}
            /></div> : <MintContainer>
            {!wallet ? (
              <WalletDialogButton style={{ background: 'transparent', boxShadow: 'none' }}><img src="img/Buttons/connect.png" alt="mint button" className="connectButton" /></WalletDialogButton>
            ) : (
              <Button
                disabled={isSoldOut || isMinting || !isActive}
                onClick={onMint}
                variant='text'
              >
                {isSoldOut ? (
                  "MinerDwarfs are SOLD OUT!"
                ) : isActive ? (
                  isMinting ? (
                    <CircularProgress />
                  ) : (
                    <img src="img/Buttons/mint1.png" alt="mint button" width='200' />
                  )
                ) : (
                  <span className='countdown'><Countdown
                    date={1633982400000}
                    //onMount={({ completed }) => completed && setIsActive(true)}
                    onComplete={() => setIsActive(true)}
                    renderer={renderCounter}
                  /></span>
                )}
              </Button>

            )}
          </MintContainer>}

        </div>
        <div className="clouds">
          <img src="img/Top/Clouds/cloud1.png" alt="cloud" />
          <img src="img/Top/Clouds/cloud2.png" alt="cloud" />
          <img src="img/Top/Clouds/cloud3.png" alt="cloud" />
        </div>

      </header>

      <Link to={`/`}><div className='backArrow'>
        &lt;
      </div></Link>


      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {days}d {hours}h {minutes}m {seconds}s
    </CounterText>
  );
};

export default Mint;
