import React, {useEffect} from 'react';
import styles from "../styles/Itemsinfo.module.css";

export default function Itemsinfo(props) {


  useEffect(() => {
    console.log(props);
  }, [props])



  return (


    
    <div className={styles.container}>
      

        <div className={ props.responsiveMainmobile ? styles.listallcontainermobile  : styles.listallcontainer }>

          <button className={ styles.buttonlist } > List All Albums For Sale </button>

          <button className={ styles.buttonlist } > List All Singles For Sale </button>

        </div>




      

      { !props.responsiveMobile ?


         <>

         {props.select &&


          <div className={ styles.listoneinfo }>

              <div className={styles.type}>Album</div>

              <div className={ props.responsiveMobile ? styles.priceandnamemobile  : styles.priceandname }>

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
         
         
         
         }


          
         </>


    
    :



        <div className={ props.select ? styles.mobilemodal : styles.mobilenone }>

                <div className={styles.listoneinfo }>

                <div className={styles.type}>Album</div>

                <div className={ props.responsiveMobile ? styles.priceandnamemobile  : styles.priceandname }>

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
      
      
      
      
      
    
    }







        { /* onclick would load another one that has that overlay*/ }








    </div>
  )
}
