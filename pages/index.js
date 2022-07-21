import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/Home.module.css"
import { Ethers } from "Ethers";
import React, { useEffect, useState } from 'react';
import ABI from "../components/ABI.json";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function Home() {
 

  const [provider, setProvider] = useState();
  const [ready, setready] = useState(false);
  const [accountReady, setaccountReady] = useState("");
  const [tokenbalance, setTokenBalance] = useState("");
  const [ownedMusic, setOwnedMusic] = useState([]);
  const contractAddress = "0x98267959D65901cE034BbEC4907090a907CeAAA2";
        /* global BigInt */



  useEffect(()=> {
    const { ethereum } = window;
      setUp();
  }, []);




  const getContract = async () => {
    console.log("bad guy called");
    const signer = await provider.getSigner();
    return new Ethers.Contract(contractAddress, ABI, signer);
  }


  const setUp = async () => {
    const exprovider = await new Ethers.providers.Web3Provider(window.ethereum);
    setProvider(exprovider);
    console.log(provider);
    console.log(ABI);
    if(provider){
      const chainId = await provider.getNetwork();
      console.log(chainId);
    }

  }



  const connectWallet = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    setaccountReady(accounts[0]);
    setready(true);
    console.log(accounts[0], "hi");

  }
  

//mint single music
  const smartContractcallsingles = async (e) => {
    e.preventDefault();
    const copies = e.target.copies.value;
    const songName = e.target.musicName.value;
    const artist = e.target.artist.value;
    const uri = e.target.uri.value;
    const Contract = await getContract();
    console.log(Contract);
    await Contract.addSingle(copies, songName, artist, uri);

  }


  //get token balance
  const getBalance = async () => {
    const Contract = await getContract();
    console.log(Contract);
    const balance = await Contract.balanceOf(accountReady);
    const owned = await Contract.getUsersTokens(accountReady);
    setOwnedMusic(owned);
    console.log(ownedMusic);
    setTokenBalance(balance);
  }


    //get users music
    /*
    const getMusic = async () => {
      const Contract = getContract();
      const owned = await Contract.getUsersTokens(accountReady);
      setOwnedMusic(owned);
    }
*/


  const getUri = async (id) => {
    console.log("called here oooooo")
    let value = id.split(',');
    const idOne = parseInt(value[0]);
    const idTwo = parseInt(value[1]);
    const Contract = await getContract();
    const songUri = await Contract.singleSongTokenURI(idOne, idTwo);
    console.log(songUri);
    return songUri;
  }





  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Music App Test
        </h1>
        
        {ready ? 
        
        <div style={{marginTop: '20px'}} > { accountReady } </div>
        :
        <button style={{marginTop: '20px'}} onClick={connectWallet}> Connect Wallet </button>
        }



        <div className={styles.grid}>

          
          <form className={styles.card}>
            <h2>Mint Album &rarr;</h2>
            <small>PLease upload your data to ipfs in a numeric order from zero</small>
          </form>

          <form className={styles.card} onSubmit={smartContractcallsingles}>
            <h2>Mint Single &rarr;</h2>
            <small>PLease upload your data to ipfs in a numeric order from zero</small>
            <input name='copies' placeholder='copies'/>
            <input name='musicName' placeholder='music Name'/>
            <input name='artist' placeholder='artist'/>
            <input name='uri' placeholder='uri'/>

            <button type='submit'>submit</button>
          </form>

          <div className={styles.card}>
            <h2>Get Info on your created music &rarr;</h2>
            
            <div> <button onClick={getBalance}>get Balance</button>   { BigInt(tokenbalance).toString() } </div>
            
          </div>




          <ul className={styles.card}>
            <h2>Your available musics &rarr;</h2>
             
            {tokenbalance ? 
                        ownedMusic.map((data) => (
                         <AudioPlayer key={data} autoPlay src={getUri(data)} onPlay={e => console.log("onPlay")} />
                        )) 

                         :

                  <h1>You have no music</h1>
            }


            
          </ul>


          
          <div className={styles.card} >
                <AudioPlayer
                  autoPlay
                  src="./hello.mp3"
                  onPlay={e => console.log("onPlay")}
                  // other props here
              />
          </div>

                                  



        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          Footer
        </a>
      </footer>
    </div>
  )
}




