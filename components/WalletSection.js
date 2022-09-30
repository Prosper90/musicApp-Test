import React, { useEffect, useContext, useState } from 'react';
import styles from "../styles/Walletsection.module.css";
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import PersonIcon from '@mui/icons-material/Person';
import Contexts from './context/contextclass';
import { ethers } from "ethers";
import { shortenAddress } from "./utils/trauncate";



export default function WalletSection() {

  const responsiveMobile = useMediaQuery('(max-width: 531px)');
  const { address, setAddress, provider, setProvider } = useContext(Contexts);






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
                 12 ETH
             </div>

           </div>

           <div className={styles.walletlogo} >logo</div>
        </div>


    </div>

  )
}
