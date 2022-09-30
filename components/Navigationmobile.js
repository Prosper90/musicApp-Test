import React from 'react';
import styles from "../styles/Navigationmobile.module.css";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';




export default function Navigation() {

  const responsiveMobile = useMediaQuery('(max-width: 770px)');



  return (

    <div className={ styles.container}>



             <Link  href="/"><a><HomeIcon className={styles.icons} /></a></Link>

             <Link  href="/mintpage/Mintpage"><a><LibraryMusicIcon className={styles.icons} /></a></Link>

             <Link  href="/marketplace/Marketplace"><a><LocalGroceryStoreIcon className={styles.icons} /></a></Link>

 
             <Link  href="/dashboard/Dashboard"><a><DashboardIcon className={styles.icons} /></a></Link>


    </div>

  )
}
