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
import useMediaQuery from '@mui/material/useMediaQuery';
import Purchasemobile from 'components/Purchasemobile';





export default function Purchasetokens(props) {


      //context
      const responsiveMobile = useMediaQuery('(max-width: 765px)');
      const { sections, setSections, provider } = useContext(Contexts);
      const [itemselected, setItemselected] = useState([]);
      const [albumorsingle, setAlbumorsingle] = useState("");



      const getContract = async () => {

        if(provider) {
    
            console.log("bad guy called purchase");
            const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
            const signer =  temporalProvider.getSigner();
            return new ethers.Contract(contractaddress, contractABI, signer);
    
        }
    
    
      }




      const getItem = async (ids, type) => {
          
        if(provider) {
    
            let value = ids.split(',');
            const idOne = parseInt(value[0]);
            const idTwo = parseInt(value[1]);
            const Contract = await getContract();
            
            if(type == "Album"){
              const getItem = await Contract.getAlbum(idOne, idTwo);
              setItemselected(getItem);
              console.log(getItem);
              setAlbumorsingle("Album");
            } else {
              const getItem = await Contract.getSingles(idOne, idTwo);
              setItemselected(getItem);
              setAlbumorsingle("Single");
            }



            /*
            if(album.length > 1) {
              setItemAlbum(album);
            } else {
              setItemSingle(album);
            }
            */
            //setItem(album);
    
        }
    
    
    }

    


      useEffect(() => {
  
            setSections(true);

            getItem(props.itemId, props.itemType);
  
  
      }, []);
  

  return (

    <Box  className={ !responsiveMobile ? styles.container : styles.containertwo }>

      {!responsiveMobile ? 

          <div className={styles.testingcontainer}>
        
                <Itemsale itemselected={itemselected} albumorsingle={albumorsingle} />


                <Priceinfo itemselected={itemselected} albumorsingle={albumorsingle} />


          </div>

          :
          

           <Purchasemobile itemselected={itemselected} albumorsingle={albumorsingle} />

      }


    </Box >

  )
}




export async function  getServerSideProps(context) {

  const {params, query} = context;
  const { Purchasetokens, musictype } = params;
  //const {musictype} = query;

  console.log(params);
  console.log(params.Purchasetokens[0], "checking");

  console.log(params.Purchasetokens[1], "firstTry");

  //console.log(Purchasetokens);

  const itemId = params.Purchasetokens[0];
  const itemType = params.Purchasetokens[1];

  console.log(itemId);
  console.log(itemType);



  return {
    props: {
      itemId : itemId,
      itemType: itemType,
    }
  }
  
}
