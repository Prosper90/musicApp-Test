import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DehazeIcon from '@mui/icons-material/Dehaze';
import styles from "../../styles/Purchasetokens.module.css";
import Itemsale from 'components/Itemsale';
import Priceinfo from 'components/Priceinfo';
import Contexts from 'components/context/contextclass';
import { ethers } from 'ethers';
import { contractaddress, contractABI, chainID } from "../../components/utils/constants";


export default function Purchasetokens(props) {


      //context
      const { sections, setSections, provider } = useContext(Contexts);
      const [itemAlbum, setItemAlbum] = useState();
      const [itemSingle, setItemSingle] = useState({});


      const getContract = async () => {

        if(provider) {
    
            console.log("bad guy called purchase");
            const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
            const signer =  temporalProvider.getSigner();
            return new ethers.Contract(contractaddress, contractABI, signer);
    
        }
    
    
      }




      const getItem = async (ids) => {
          
        if(provider) {
    
            console.log("called here oooo purchase");
            let value = ids.split(',');
            const idOne = parseInt(value[0]);
            const idTwo = parseInt(value[1]);
            const Contract = await getContract();
            const album = await Contract.getAlbum(idOne, idTwo);
            if(album.length > 1) {
              setItemAlbum(album);
            } else {
              setItemSingle(album);
            }
            //setItem(album);
    
        }
    
    
    }

    


      useEffect(() => {
  
            setSections(true);

            getItem(props.itemId);
  
  
      }, []);
  

  return (

    <Box  className={styles.container}>

      <Grid container spacing={1}>
    

        <Grid item xs={ 7 }>
          <Itemsale itemAlbum={itemAlbum} itemSingle={itemSingle} />
        </Grid>



        <Grid item xs={ 5 }>
          <Priceinfo itemAlbum={itemAlbum} itemSingle={itemSingle} />
        </Grid>


      </Grid>


    </Box >

  )
}




export async function  getServerSideProps(context) {

  const {params, query} = context;
  const { Purchasetokens } = params;

  console.log(params);

  console.log(Purchasetokens);

  const itemId = Purchasetokens;

  console.log(itemId);



  return {
    props: {
      itemId : itemId,
    }
  }
}
