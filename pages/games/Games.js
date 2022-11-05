import React from 'react';
import Secondsection from 'components/homepage/Secondsection';
import styles from "../../styles/Game.module.css";


export default function Games() {
  return (
    <div>
      {/* Game */}
      <div className={ styles.banner } >

        <div className={ styles.imagecontainer }>
          <img className={styles.gameimage} src="/gameplay.jpg" alt="game" />
          <div className={styles.comingsoon} >COMING SOON</div>
        </div>

      </div>
      {/* Game */}
     <Secondsection />
    </div>
  )
}
