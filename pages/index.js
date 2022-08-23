import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/Home.module.css"
import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';
import ABI from "../components/ABI.json";
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Contexts from 'components/context/contextclass';

export default function Home(props) {



    //context
    const { sections, setSections } = React.useContext(Contexts);
 

  useEffect(() => {

       setSections(false);

  })


  return (
    <div className={styles.container}>

        <div className={styles.firstlayercontainer}>

              <div className={styles.welcomecontainer}>
                  <Typography variant="h1" gutterBottom>DISCOVER AND BUY MUSIC FOR LIFE</Typography>
                  <Typography variant="overline" display="block" gutterBottom>Get amazing music from the  artists near you, with our nfts </Typography>
                  <button>Get Started <ArrowForwardIosIcon className={styles.icon} /> </button>
              </div>



              <div className={styles.illustrationcontain}>
                <div className={styles.overlay}></div>
                  <img className={styles.img} src='/illustration.png' />
              </div>

        </div>


        <div className={styles.secondlayercontainer}>
            <img className={styles.img} src="/mainone.png" />
        </div>


    </div> 
  )
}




