import React, { useEffect, useContext, useState } from 'react';
import styles from "../../styles/Mintpage.module.css";
import WalletSection from 'components/WalletSection';
import Navigation from 'components/Navigation';
import { Box, Typography } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import AlbumIcon from '@mui/icons-material/Album';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PanoramaIcon from '@mui/icons-material/Panorama';
import LinkIcon from '@mui/icons-material/Link';
import Contexts from 'components/context/contextclass';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ethers } from "ethers";
import { contractaddress, contractABI, chainID } from "../../components/utils/constants";




export default function Mintpage(props) {



    //context
    const { sections, setSections, address, setAddress, provider, setProvider } = useContext(Contexts);


  

    const getContract = async () => {
      console.log("bad guy called");
      const signer = await provider.getSigner();
      return new ethers.Contract(contractaddress, contractABI, signer);
    }





    const mintsingle = async (e) => {
      e.preventDefault();

       if(address) {

        const copies = e.target.copies.value;
        const songName = e.target.musicName.value;
        const artist = e.target.artist.value;
        const musiuri = e.target.musiuri.value;
        const imageuri = e.target.imageuri.value;
        const price = e.target.price.value;


        const Contract = await getContract();
        console.log(Contract);
        await Contract.addSingle(copies, songName, artist, musiuri, imageuri, price);

       } else {
         console.log("Connect wallet");
       }


    }





    const mintalbum = async (e) => {

        e.preventDefault();
        console.log("called him");

        if(address) {

          const songNames = e.target.musicNames.value;
          const songput = songNames.split(",");

          const artists = e.target.artists.value;
          const artistput = artists.split(",");

          const musiuris = e.target.musiuris.value;

          const imageuri = e.target.imageuri.value;

          const price = e.target.price.value;


          const Contract = await getContract();
          console.log(Contract);
          await Contract.addAlbum( songput, artistput, musiuris, imageuri, price );

        } else {
          console.log("Connect wallet");
        }


    }


    useEffect(() => {

          setSections(true);


    });



  return (
    <Box  className={styles.container}>

        <div className={styles.formcontain}>

           <Typography variant="h6" gutterBottom> Mint  Album  </Typography>

            <form className={styles.form} onSubmit={mintalbum}>

                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input name='musicNames' className={styles.input} placeholder="Music names"  />
                </div>

                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input name='artists' className={styles.input} placeholder="Artists"  />
                </div>

                <div className={styles.inputform}>
                  <LinkIcon /> <input  name='musiuris' className={styles.input} placeholder="Urls"  />
                </div>

                <div className={styles.inputform}>
                  <PanoramaIcon /> <input  name='imageuri' className={styles.input} placeholder="Image cover"  />
                </div>

                <div className={styles.inputform}>
                  <AttachMoneyIcon /> <input name='price' className={styles.input} placeholder="Price"  />
                </div>

                <div className={ styles.buttonContain }>
                    <button type='submit'>Mint</button>
                </div>

            </form>

        </div>





        <div className={styles.formcontain}>

            <Typography variant="h6" gutterBottom> Mint  Single  </Typography>

            <form className={styles.form} onSubmit={mintsingle}>

              <div className={styles.containtwo}>

                <div className={styles.inputformsecond}>
                  <ContentCopyIcon /> <input name='copies' className={styles.input} placeholder="Copies"  />
                </div>
                <div className={styles.inputformsecond}>
                  <HeadphonesIcon /> <input name='musicName' className={styles.input} placeholder="Music Name"  />
                </div>

             </div>

                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input name='artist' className={styles.input} placeholder="Artist"  />
                </div>

                <div className={styles.inputform}>
                  <LinkIcon /> <input name='musiuri' className={styles.input} placeholder="Url"  />
                </div>

                <div className={styles.inputform}>
                  <PanoramaIcon /> <input name='imageuri' className={styles.input} placeholder="Image cover"  />
                </div>

                <div className={styles.inputform}>
                  <AttachMoneyIcon /> <input name='price' className={styles.input} placeholder="Price"  />
                </div>

                <div className={ styles.buttonContain }>
                    <button type='submit'>Mint</button>
                </div>

            </form>

       </div>

    </Box >
  )
}



