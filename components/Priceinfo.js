import React, { useEffect } from 'react';
import styles from "../styles/Priceinfo.module.css"

export default function Priceinfo(props) {
  
              /* global BigInt */


      useEffect(() => {

        console.log( Array.isArray(props.itemAlbum) );
        
      }, [])


  return (
    <div className={styles.container}>

    { Array.isArray(props.itemAlbum)

      ?

         <div className={styles.childone}>


              <div className={styles.priceinfo}>
                  <div className={styles.currentprice}>Current Price</div>

                  <div className={styles.singername}>   <img src='/currencyimg.png' />  <div>{ BigInt(props.itemAlbum[0].cost).toString() } ETH</div> </div>
              </div>

              <div className={styles.moreinfo}>

                  <div className={styles.infoinfo}>
                      <div className={styles.currentprice} >info</div>
                      <div className={styles.infodetails}>THis Album belongs to {props.itemAlbum[0].artist} </div>
                  </div>

                  <div className={styles.buttoncontain}>
                      <button className={styles.buybutton}>Buy</button>
                      <button className={styles.bidbutton}>Bid Item</button>
                  </div>

              </div>


        </div>



        : Object.keys(props.itemSingle).length !== 0 &&



        <div className={styles.childone}>


                    <div className={styles.priceinfo}>
                        <div className={styles.currentprice}>Current Price</div>

                        <div className={styles.singername}>   <img src='/currencyimg.png'/>  <div> { BigInt(props.itemSingle.cost).toString() } ETH </div> </div>
                    </div>

                    <div className={styles.moreinfo}>

                        <div className={styles.infoinfo}>
                            <div className={styles.currentprice} >info</div>
                            <div className={styles.infodetails}>THis music belongs to Ed sheeran</div>
                        </div>

                        <div className={styles.buttoncontain}>
                            <button className={styles.buybutton}>Buy</button>
                            <button className={styles.bidbutton}>Bid Item</button>
                        </div>

                    </div>


          </div>





    }





      
      <div className={styles.childtwo}>

          <div>Top Buyers</div>

          <div>buyer 1</div>

      </div>




    </div>
  )
}
