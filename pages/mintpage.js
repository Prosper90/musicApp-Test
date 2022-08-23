import React from 'react';
import styles from "../styles/Mintpage.module.css";
import WalletSection from 'components/WalletSection';
import Navigation from 'components/Navigation';
import { Box, Typography } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import AlbumIcon from '@mui/icons-material/Album';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PanoramaIcon from '@mui/icons-material/Panorama';
import LinkIcon from '@mui/icons-material/Link';



export default function mintpage() {
  return (
    <Box  className={styles.container}>

        <div className={styles.formcontain}>

           <Typography variant="h6" gutterBottom> Mint  Album  </Typography>

            <form className={styles.form}>

                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input  className={styles.input} placeholder="Music names"  />
                </div>

                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input  className={styles.input} placeholder="Artists"  />
                </div>

                <div className={styles.inputform}>
                  <LinkIcon /> <input  className={styles.input} placeholder="Uris"  />
                </div>

                <div className={styles.inputform}>
                  <PanoramaIcon /> <input  className={styles.input} placeholder="Image cover"  />
                </div>

                <div className={styles.inputform}>
                  <AttachMoneyIcon /> <input  className={styles.input} placeholder="Price"  />
                </div>

                <div className={ styles.buttonContain }>
                    <button type='submit'>Mint</button>
                </div>

            </form>

        </div>




        <div className={styles.formcontain}>

            <Typography variant="h6" gutterBottom> Mint  Single  </Typography>

            <form className={styles.form}>

                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input  className={styles.input} placeholder="Music Name"  />
                </div>

                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input  className={styles.input} placeholder="Artist"  />
                </div>

                <div className={styles.inputform}>
                  <LinkIcon /> <input  className={styles.input} placeholder="Uri"  />
                </div>

                <div className={styles.inputform}>
                  <PanoramaIcon /> <input  className={styles.input} placeholder="Image cover"  />
                </div>

                <div className={styles.inputform}>
                  <AttachMoneyIcon /> <input  className={styles.input} placeholder="Price"  />
                </div>

                <div className={ styles.buttonContain }>
                    <button type='submit'>Mint</button>
                </div>

            </form>

       </div>

    </Box >
  )
}
