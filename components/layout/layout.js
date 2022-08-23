import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Navigation from 'components/Navigation';
import WalletSection from 'components/WalletSection';
import styles from "../../styles/Layout.module.css";
import useMediaQuery from '@mui/material/useMediaQuery';




const Children = styled.div`
width: 100%;
@media screen and (max-width: 424px ) { 
  width: 100%;
}
`



export default function layout({children}) {

  const responsiveMobile = useMediaQuery('(max-width: 770px)');
  const [sections, setSections] = useState(true);


  return (

          <Grid className={styles.container} container spacing={1}>

       

          { !sections 
            ?
             <div></div>

            :

           
              <Grid item xs={ responsiveMobile ? 1.5 : 0.8 } className={styles.leftsection} >

                <Navigation  />

              </Grid>
          }

            



         { !sections 

          ?
          <Grid item xs={12}>
             
            <Header />

            <Children> { children } </Children>

          </Grid>


          :

            <Grid item xs={ responsiveMobile ? 10.5 : 11.2}>
             
                <WalletSection />

                <Children> { children } </Children>

            </Grid>

          }


          </Grid>


  )
}
