import React from 'react';
import styles from "../styles/Navigation.module.css";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';


export default function Navigation() {



  return (

    <div className={styles.container}>

         <div className={styles.iconscontains}>
             <HomeIcon className={styles.icons} />
             <LibraryMusicIcon className={styles.icons} />
             <LocalGroceryStoreIcon className={styles.icons} />
         </div>

    </div>

  )
}
