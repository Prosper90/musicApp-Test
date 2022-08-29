import React from 'react';
import styles from "../styles/Itemsale.module.css";
import PersonIcon from '@mui/icons-material/Person';
import Singlemarket from './Singlemarket';
import Albummarket from './Albummarket';

export default function Itemsale() {
  return (
    <div className={styles.container}>




       <div className={styles.itemforsale}>

           <div className={styles.imgcontainer}>
              <img src='/musicone.png' alt='for sale'   />
              <div className={styles.shadow}></div>
           </div>

           <div className={styles.info}>

              <div className={styles.releasedate}>Realesed on 8th</div>

              <div className={styles.singer}>
                  <PersonIcon />
                  <div className={styles.singername}>Ed sheeran</div>
              </div>

              <div className={styles.songname}>
                  Die with him
              </div>

              <div className={styles.details}>
                  From Album cover it , this here is a Dummy text.
              </div>

           </div>

       </div>





       <div className={styles.othersfrommarket}>
           
          <Singlemarket />

       </div>
         





    </div>
  )
}
