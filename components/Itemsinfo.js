import React from 'react';
import styles from "../styles/Itemsinfo.module.css";

export default function Itemsinfo() {
  return (
    <div className={styles.container}>
      

        <div className={styles.listallcontainer}>

          <button className={styles.buttonlist} > List All Albums For Sale </button>

          <button className={styles.buttonlist} > List All Singles For Sale </button>

        </div>



        <div className={styles.listoneinfo}>

          <div className={styles.type}>Album</div>

          <div className={styles.priceandname}>

              <div className={styles.infocontain}>
                <div>Music Name</div>


                <div className={styles.pricecontain}>
                  <img src='/currencyimg.png'  />
                  <div>3 ETH</div>
                </div>

              </div>

              <img className={styles.musicImage} src='/crystals.png'  />

          </div>


          <div>Artist</div>

          <button className={styles.listbutton}>List for sale</button>

        </div>





    </div>
  )
}
