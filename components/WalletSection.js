import React from 'react';
import styles from "../styles/Walletsection.module.css";
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function WalletSection() {

  const responsiveMobile = useMediaQuery('(max-width: 531px)');


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
           <button className={styles.connectwallet} >Connect</button>

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
