import React, { useEffect, useState, useContext } from 'react';
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
      const { sections, setSections, provider, setProvider, address, setAddress, setOpen, setSeverity, setNotificationMessage } = useContext(Contexts);
      const [ownedMusicAlbum, setOwnedMusicAlbum] = useState([]);
      const [ownedMusicSingle, setOwnedMusicSingle] = useState([]);
      const [ownedAlbums, setOwnedAlbums] = useState([]);
      const [ownedSingles, setOwnedSingles] = useState([]);

              /* global BigInt */
      const [runother, setRunother] = useState(false);
      const [select, setSelect] = useState();

      



      const getContract = async () => {
        console.log("bad guy called");
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer = temporalProvider.getSigner();
        return new ethers.Contract(contractaddress, contractABI, signer);
      }



      const getAlbum = async (id) => {
        console.log("called here oooooo");
        let value = id.split(',');
        const idOne = parseInt(value[0]);
        const idTwo = parseInt(value[1]);
        const Contract = await getContract();
        const album = await Contract.getAlbum(idOne, idTwo);
        //console.log(album);
        return album;
      }



      const getSingle = async (id) => {
        console.log("called here oooooo");
        let value = id.split(',');
        const idOne = parseInt(value[0]);
        const idTwo = parseInt(value[1]);
        const Contract = await getContract();
        const single = await Contract.getSingles(idOne, idTwo);
        //console.log(single);
        return single;
      }



      const getOwnedAlbums = async () => {
        if(address) {

          const Contract = await getContract();
          const owned = await Contract.getUsersTokens(address);
          const arr = [];
          setOwnedMusicAlbum(owned);
          owned.map(async (data) => {
             let eachalbum = await getAlbum(data);
             //console.log(eachalbum);
             arr.push(eachalbum);
          })
          //console.log(arr);
          setOwnedAlbums(arr);
          setRunother(true);

        } else {
          console.log("connect wallet");
        }

      }







      const getOwnedSinges = async () => {
        if(address) {

          const Contract = await getContract();
          const owned = await Contract.getUsersTokens(address);
          const arr = [];
          setOwnedMusicSingle(owned);
          owned.map(async (data) => {
            //console.log(data);
             let eachmusic = await getSingle(data);
             //console.log(eachalbum);
             arr.push(eachmusic);
            // console.log(arr);
          })
          //console.log(arr); 
          setOwnedSingles(arr);

        } else {
          console.log("connect wallet");
        }

      }







      useEffect(() => {

            const { ethereum } = window;
            setSections(true);



            if(ownedAlbums.length == 0) {

              getOwnedAlbums();

            }


              //getOwnedSinges();



             // console.log("in in in in here");
              //const arr = [];
             
              /*
              ownedMusic.map( async (data) => {
                //console.log(data);
                 let eachalbum = await getAlbum(data);
                 arr.push(eachalbum);
              })
              */

              //console.log(arr);

              //setOwnedAlbums(arr);

            console.log(ownedAlbums);
            console.log(ownedSingles);

  
  
      }, []);



      const selectlist = (item) => {
        setSelect(item);
      }



  

  return (

    <Box  className={ responsiveMobile ? styles.containertwo : styles.containerone}>

      { !responsiveMobile ?

            <Grid container spacing={1}>
    

            <Grid item xs={ 8 }>

              <Dashboardinfo responsiveMainmobile={responsiveMobile} ownedAlbums={ownedAlbums} ownedSingles={ownedSingles} ownedMusicAlbum={ownedMusicAlbum} ownedMusicSingle={ownedMusicSingle} selectlist={selectlist} />

            </Grid>
    
    
    
            <Grid item xs={ 4 }>
              <Itemsinfo select={select} responsiveMainmobile={responsiveMobile} />
            </Grid>
    
    
          </Grid>

          :

          <Box>

              <Dashboardinfo  responsiveMainmobile={responsiveMobile} ownedAlbums={ownedAlbums} ownedSingles={ownedSingles} ownedMusicAlbum={ownedMusicAlbum} ownedMusicSingle={ownedMusicSingle} />

              <Itemsinfo responsiveMainmobile={responsiveMobile} select={select} />

          </Box>
      
    }




    </Box >

  )
}
