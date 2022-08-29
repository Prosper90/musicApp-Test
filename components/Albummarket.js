import React from 'react';
import styles from "../styles/Albummarket.module.css";

export default function Albummarket() {
  return (
    <div className={styles.albummarketcontainer}>

        <div style={{marginBottom: "20px"}} >
           On Sale Albums
        </div>



      <div className={styles.songscontainer}>

            <div className={styles.holder}>

               <div className={styles.salecontainer}>

                    <div className={styles.imagecontainer}>
                        <img src='/crystals.png' />
                    </div>

                    <div className={styles.infocontainer}>
                        <div className={styles.musicname}>Eminem Monster</div>
                    </div>

               </div>
 




                <div className={styles.otherinfo}>

                    <div className={styles.date}>
                        <div>Date</div>
                        <div>1st may 2023</div>
                    </div> 

                    <div className={styles.price}>
                        <div>Price</div>

                        <div className={styles.pricecontain}>
                            <img src='/currencyimg.png'/>
                            <div>2 ETH</div>
                        </div>

                    </div>

                </div>




            </div>

        </div>








    </div>
  )
}
