import React, { useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DehazeIcon from '@mui/icons-material/Dehaze';
import styles from "../../styles/Purchasetokens.module.css";
import Contexts from 'components/context/contextclass';
import Dashboardinfo from 'components/Dashboardinfo';
import Itemsinfo from 'components/Itemsinfo';


export default function Purchasetokens() {


      //context
      const { sections, setSections } = useContext(Contexts);


      useEffect(() => {
  
            setSections(true);
  
  
      });
  

  return (

    <Box  className={styles.container}>

      <Grid container spacing={1}>
    

        <Grid item xs={ 8 }>
          <Dashboardinfo  />
        </Grid>



        <Grid item xs={ 4 }>
          <Itemsinfo  />
        </Grid>


      </Grid>


    </Box >

  )
}
