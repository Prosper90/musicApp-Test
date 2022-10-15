import React, { useEffect, useState, useContext, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DehazeIcon from '@mui/icons-material/Dehaze';
import styles from "../../styles/Purchasetokens.module.css";
import Contexts from 'components/context/contextclass';
import Dashboardinfo from 'components/Dashboardinfo';
import Itemsinfo from 'components/Itemsinfo';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ethers} from "ethers";
import { contractaddress, contractABI, chainID } from "../../components/utils/constants";


export default function Purchasetokens() {
     

      //context
      const responsiveMobile = useMediaQuery('(max-width: 765px)');
      const responsiveMainmobile = useMediaQuery('(max-width: 519px)');
      const {  setSections, address } = useContext(Contexts);
      const [ownedMusicAlbum, setOwnedMusicAlbum] = useState([]);
      const [ownedMusicSingle, setOwnedMusicSingle] = useState([]);
      const [ownedAlbums, setOwnedAlbums] = useState([]);
      const [ownedSingles, setOwnedSingles] = useState([]);
      const [loading, setloader] = useState(false);
      const [activate, setActivate] = useState(false);




              /* global BigInt */
      const [select, setSelect] = useState();


      const checkforrepeat = (id) => {
        
        console.log(id);
        if(ownedAlbums.length === 0){
           return false;
        }

        ownedAlbums.map((data, index) => {
           console.log(data);
           if(data[0].id === id) {
               return true;
           } else {
               return false;
           }

        })

    }

      



      const getContract = async () => {
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer = temporalProvider.getSigner();
        return new ethers.Contract(contractaddress, contractABI, signer);
      }

      


      const getOwnedAlbums = async () => {

        if(address) {
          const contract = await getContract();
          const owned = await contract.getUsersTokens(address);
          //console.log(owned.length);
          setOwnedMusicAlbum(owned);
          const arr = [];
          

          owned.map(async (data, index) => {

            let value = data.split(',');
            const idOne = parseInt(value[0]);
            const idTwo = parseInt(value[1]);
            const checkifalbumsexist = await contract.checkAlbum(idOne, idTwo);
            const avoidrepeat = checkforrepeat(data);
           
            if(checkifalbumsexist) {
              console.log("Album counting");
              const album = await contract.getAlbum(idOne, idTwo);
              if(!avoidrepeat) {
                  
                arr.push(album);
              }
            } else {
              console.log("No albums")
            }


          });

          setTimeout(() => {
            console.log("All wrapped up setTimeOut");
            setOwnedAlbums(arr);
          }, 3000);


        } else {
          console.log("connect wallet");
        }

      }


     



    const getOwnedSinges = async () => {
      if(address) {
        const contract = await getContract();
        const owned = await contract.getUsersTokens(address);
        setOwnedMusicSingle(owned);
        const arr = [];

        owned.map(async (data, index) => {

           let value = data.split(',');
           const idOne = parseInt(value[0]);
           const idTwo = parseInt(value[1]);
           //console.log(value);
           const checkifsinglesexist = await contract.checkSingle(idOne);

           if(checkifsinglesexist) {
                const eachmusic = await contract.getSingles(idOne, idTwo);
                arr.push(eachmusic);
           } else {
             console.log("No singles")
           }

        
        })

        setTimeout(() => {
          console.log("All wrapped up setTimeOut");
          setOwnedSingles(arr);
        }, 3000);

        //setloader(true);   
      } else {
        console.log("connect wallet");
      }
    }










      useEffect(() => {

            const { ethereum } = window;
            setSections(true);

    
            if(ownedAlbums.length == 0){
              getOwnedAlbums();
            }

            if(ownedSingles.length == 0) {
              getOwnedSinges();
            }


            console.log(ownedAlbums);
            console.log(ownedSingles);


  
      }, []);





      const selectlist = (item) => {
        if(responsiveMobile) {
          console.log("calling activate");
          setActivate(true);
        }
        setSelect(item);
      }



  

  return (

    <Box  className={ responsiveMobile ? styles.containertwo : styles.containerone}>

      { !responsiveMobile ?

            <Grid container spacing={1}>
    

            <Grid item xs={ 8 }>

              <Dashboardinfo  
                loading={loading}
                setloader={setloader} 
                responsiveMainmobile={responsiveMobile} 
                ownedAlbums={ownedAlbums} 
                ownedSingles={ownedSingles} 
                ownedMusicAlbum={ownedMusicAlbum} 
                ownedMusicSingle={ownedMusicSingle} 
                selectlist={selectlist}
                />

            </Grid>
    
    
    
            <Grid item xs={ 4 }>
              <Itemsinfo  
                loading={loading} 
                select={select} 
                responsiveMainmobile={responsiveMobile} 
                activate={activate} 
                setSelect={setSelect}  
                />
            </Grid>
    
    
          </Grid>

          :

          <Box>

              <Dashboardinfo  
                loading={loading}
                setloader={setloader} 
                responsiveMainmobile={responsiveMobile} 
                ownedAlbums={ownedAlbums} 
                ownedSingles={ownedSingles} 
                ownedMusicAlbum={ownedMusicAlbum} 
                ownedMusicSingle={ownedMusicSingle} 
                selectlist={selectlist}
                />

              <Itemsinfo  
                loading={loading} 
                responsiveMainmobile={responsiveMobile} 
                select={select} 
                activate={activate} 
                setSelect={setSelect} 
                />

          </Box>
      
    }




    </Box >

  )
}
