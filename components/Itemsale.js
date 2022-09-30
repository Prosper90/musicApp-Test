import React from 'react';
import styles from "../styles/Itemsale.module.css";
import PersonIcon from '@mui/icons-material/Person';
import Singlemarket from './Singlemarket';
import Albummarket from './Albummarket';

export default function Itemsale(props) {
  return (
    <div className={styles.container}>


    { Array.isArray(props.itemAlbum)

      ?


        <div className={styles.itemforsale}>

            <div className={styles.imgcontainer}>
              <img className={styles.itemforsaleimg} src={props.itemAlbum[0].imguri} alt='for sale'   />
              <div className={styles.shadow}></div>
            </div>

            <div className={styles.info}>

              <div className={styles.releasedate}>Realesed on 8th</div>

              <div className={styles.singer}>
                  <PersonIcon />
                  <div className={styles.singername}>{props.itemAlbum[0].artist}</div>
              </div>

              <div className={styles.songname}>
                 {props.itemAlbum[0].songname}
              </div>

              <div className={styles.details}>
                  This Album has a total of {props.itemAlbum.length} in here.
              </div>

            </div>

        </div>


    : Object.keys(props.itemSingle).length !== 0 &&


      <div className={styles.itemforsale}>

          <div className={styles.imgcontainer}>
            <img className={styles.itemforsaleimg} src={props.itemSingle.imguri} alt='for sale'   />
            <div className={styles.shadow}></div>
          </div>

          <div className={styles.info}>

            <div className={styles.releasedate}>Realesed on 8th</div>

            <div className={styles.singer}>
                <PersonIcon />
                <div className={styles.singername}>{props.itemSingle.artist}</div>
            </div>

            <div className={styles.songname}>
              {props.itemSingle.songname}
            </div>

            <div className={styles.details}>
                This Song has a total of unknown in here.
            </div>

          </div>

      </div>
    
     }







       <div className={styles.othersfrommarket}>

       { props.itemAlbum  

         ?
           <Albummarket  />
         :
           
           <Singlemarket />

       }

       </div>
         





    </div>
  )
}
