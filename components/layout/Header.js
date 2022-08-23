import React from 'react';
import styles from "../../styles/Header.module.css";
import styled from "styled-components";
import Link from 'next/link';




const Container = styled.div`
display: flex;
padding: 26px 20px 0 20px;
justify-content: space-between;
align-items: center;
color: #FFFFFF;
`

export default function Header() {
  return (
    <Container >

        <div className={styles.logoContainer}>
          <img src="/logo.png" />
        </div>


        <div className={styles.linkContainer}>

              <Link  href="/Marketplace"><a className={styles.linkstyle}> Marketplace </a></Link>
              <Link  href="/Mintpage"><a className={styles.linkstyle}> Post Music </a></Link>
              <Link  href="/App"><a className={styles.linkstyle}> App </a></Link>



              <div className={styles.connectButton}>
                 <button>Explore</button>
              </div>

        </div>




    </Container>
  )
}
