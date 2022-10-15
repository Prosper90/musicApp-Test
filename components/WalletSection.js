import React, { useEffect, useContext, useState } from 'react';
import styles from "../styles/Walletsection.module.css";
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import PersonIcon from '@mui/icons-material/Person';
import Contexts from './context/contextclass';
import { ethers } from "ethers";
import { shortenAddress } from "./utils/trauncate";
import { currencyTokenaddress, currencytokenABI, chainID } from "../components/utils/constants";



export default function WalletSection() {

  const responsiveMobile = useMediaQuery('(max-width: 531px)');
  const { address, setAddress, provider, setProvider, setTokenBalance, tokenbalance } = useContext(Contexts);
        /* global BigInt */



  //get balance
  const getBalance = async () => {
    //check if wallet is connected
    if (address) {
      console.log("called balance");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let val =  String(await provider.getBalance(address));
      console.log(val);
      setTokenBalance(val);
      //setAccountDecimal(await transferToken.decimals());
      //console.log(AccountBalance);
      //console.log(AccountDecimal);
    }
  };



  useEffect(() => {

    getBalance();

  }, [])





  return (

    <div className={styles.container}>


      {responsiveMobile ?
        
        <SearchIcon />
        
      :
        <form className={styles.form}>
          <SearchIcon /> <input  className={styles.input} placeholder="Search projects"  />
        </form>
      }




        <div className={styles.othersection}>
           <button  className={styles.connectwallet} > <div> {address ? shortenAddress(address) : "Connect" } </div> <PersonIcon className='wallet-connectIcon' /> </button>

           <div className={styles.walletbalance} >

             <div className={styles.holdimgicon}>
               <img src='/walletbalance.png' />
             </div>

             <div className={styles.holdwalletamount}>
               { Math.round( (tokenbalance/10 ** 18) * 10 ) / 10 }  ETH
             </div>

           </div>

              <img className={styles.imagelogo} src='/ethlogo.png' alt='chain-logo' />

        </div>


    </div>

  )
}
