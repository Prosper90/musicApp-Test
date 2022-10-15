import React, { useEffect, useState, useContext } from 'react';
import styles from "../styles/Priceinfo.module.css";

import Singlemarket from './Singlemarket';
import Albummarket from './Albummarket';


export default function Priceinfo(props) {
  





  return (

    <div className={styles.container}>

      
      <div className={styles.childtwo}>

          <div>Top Buyers</div>

          <div>buyer 1</div>

      </div>




      <div className={styles.othersfrommarket}>

            { props.albumorsingle == "Album"

            ?
                <Albummarket  />
            :
                <Singlemarket />
            }

       </div>







    </div>


  )
}
