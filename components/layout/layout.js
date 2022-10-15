import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Navigation from 'components/Navigation';
import WalletSection from 'components/WalletSection';
import styles from "../../styles/Layout.module.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import Contexts from 'components/context/contextclass';
import Notification from 'components/Navigation'
import Navigationmobile from "../Navigationmobile";




const Children = styled.div`
width: 100%;
@media screen and (max-width: 424px ) { 
  width: 100%;
}
`



export default function Layout({children}) {

  const responsiveMobile = useMediaQuery('(max-width: 770px)');
  const [sections, setSections] = useState(false);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState({});
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  //wallet balance
  const [tokenbalance, setTokenBalance] = useState();
  //borrowed value
  const [borrowamount, setBorrowamount] = useState(0);






  useEffect(() => {
    console.log("Ran");
  }, [sections]);


  return (

    <Contexts.Provider value = { { sections, setSections, address, setAddress, provider, setProvider, setOpen, setSeverity, setNotificationMessage, open, severity, notificationMessage, setTokenBalance, tokenbalance, borrowamount, setBorrowamount } }>

          <Grid className={  styles.container } container spacing={1}>

       

          { !sections 
            ?
             <div></div>

            :
            <>
              { responsiveMobile ? 
              
                <div className={styles.mobilenavigate} >
                    <Navigationmobile  />
                </div>

              :

                <Grid item xs={ 0.8 } className={ responsiveMobile ? styles.remove : styles.leftsection} >

                  <Navigation  />

                </Grid>
            
              }

           </>

           

          }

            



         { !sections 

          ?
          <Grid item xs={12}>
             
            <Header />

            <Children > { children } </Children>

          </Grid>


          :

            <Grid item xs={ responsiveMobile ? 12 : 11.2}>
             
                <WalletSection />

                <Children> { children } </Children>

            </Grid>

          }


          </Grid>


    </Contexts.Provider>


  )
}
