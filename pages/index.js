import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/Home.module.css"
import { ethers } from "ethers";
import React, { useEffect, useState, useContext } from 'react';
import ABI from "../components/ABI.json";
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Contexts from 'components/context/contextclass';
import Notification from 'components/Notification';

export default function Home(props) {



    //context
    const { sections, setSections, open, severity, notificationMessage, setOpen } = useContext(Contexts);


    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


 

  useEffect(() => {

       setSections(false);

  })


  return (
    <div className={styles.container}>

        <div className={styles.firstlayercontainer}>

              <div className={styles.welcomecontainer}>
                  <Typography variant="h1" gutterBottom>Truly Decentralized Music</Typography>
                  <Typography variant="overline" display="block" gutterBottom> Music connect, Blockchain Melody, Rythm & game </Typography>
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


        
  <Notification open={open} handleClose={handleClose} severity={severity} notificationMessage={notificationMessage} />


    </div> 
  )
}




