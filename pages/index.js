import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/Home.module.css"
import { ethers } from "ethers";
import React, { useEffect, useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Contexts from 'components/context/contextclass';
import Notification from 'components/Notification';
import Firstsection from 'components/homepage/Firstsection';
import Secondsection from 'components/homepage/Secondsection';




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
    
    import("bootstrap/dist/js/bootstrap");
       setSections(false);

  })


  return (

  <>

  {/*First section */}
    <Firstsection />
  {/*First section */}

  {/*Second section footer */}
    <Secondsection />
  {/*Second section footer */}

  <Notification open={open} handleClose={handleClose} severity={severity} notificationMessage={notificationMessage} />


   </>

  )
}




