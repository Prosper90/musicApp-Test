import React from 'react';
import styles from "../styles/Dashboardinfo.module.css";
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



export default function Dashboardinfo() {
  return (

    <div className={styles.container}>

        <div className={styles.holdsalesinfo}>

            <div className={styles.totalinfos}>
                <SellIcon />
                <div className={styles.accountinfo}>
                    <div>2</div>
                    <div>Total sold</div>
                </div>
            </div>

            <div className={styles.totalinfos}>
                <ShoppingBagIcon />
                <div className={styles.accountinfo}>
                    <div>2</div>
                    <div>Total bought</div>
                </div>
            </div>


            <div className={styles.totalinfos}>
                <AttachMoneyIcon />
                <div className={styles.accountinfo}>
                    <div>100</div>
                    <div>Profits</div>
                </div>
            </div>

        </div>







        <div className={styles.ownedassets}>

            <div className={styles.albums}>
                
                <div style={{marginBottom: "20px"}} >
                    Albums
                </div>

               <div className={styles.songslistcontainer}>

                    <div className={styles.imagecontainer}>
                        <img src='/crystals.png' />
                    </div>

                   <div className={styles.songinfo}>
                       <div className={styles.musicname}> Monster </div>

                       <div className={styles.songinfoothers}>

                           <div className={styles.singer}>
                               <div>Artist</div>
                               <div>Eminem</div>
                           </div>


                           <div className={styles.singer}>

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









            <div className={styles.singles}>


                <div style={{marginBottom: "20px"}} >
                        Singles
                </div>

                <div className={styles.songslistcontainer}>

                        <div className={styles.imagecontainer}>
                            <img src='/crystals.png' />
                        </div>

                    <div className={styles.songinfo}>
                        <div className={styles.musicname}> Monster </div>

                        <div className={styles.songinfoothers}>
                            
                            <div className={styles.singer}>
                                <div>Artist</div>
                                <div>Eminem</div>
                            </div>


                           <div className={styles.singer}>

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



        </div>





       
    </div>

  )
}
