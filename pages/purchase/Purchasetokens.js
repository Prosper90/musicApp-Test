import React, { useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DehazeIcon from '@mui/icons-material/Dehaze';
import styles from "../../styles/Purchasetokens.module.css";
import Itemsale from 'components/Itemsale';
import Priceinfo from 'components/Priceinfo';
import Contexts from 'components/context/contextclass';


export default function Purchasetokens() {


      //context
      const { sections, setSections } = useContext(Contexts);


      useEffect(() => {
  
            setSections(true);
  
  
      });
  

  return (

    <Box  className={styles.container}>

      <Grid container spacing={1}>
    

        <Grid item xs={ 7 }>
          <Itemsale  />
        </Grid>



        <Grid item xs={ 5 }>
          <Priceinfo  />
        </Grid>


      </Grid>


    </Box >

  )
}
