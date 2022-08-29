import React, { useEffect, useContext } from 'react';
import Albummarket from 'components/Albummarket';
import Singlemarket from 'components/Singlemarket';
import styles from "../../styles/Marketplace.module.css"
import Contexts from 'components/context/contextclass';


export default function Marketplace() {


  //context
  const { sections, setSections } = useContext(Contexts);

  useEffect(() => {

      setSections(true);

  })


  return (
    <div className={styles.marketcontainer}>
       <Albummarket />
       <Singlemarket />
    </div>
  )
}
