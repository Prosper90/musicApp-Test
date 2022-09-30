import React, { useEffect, useState, useContext } from 'react';
import styles from "../styles/Singlemarket.module.css"
import Contexts from './context/contextclass';
import { ethers } from 'ethers';
import { contractaddress, contractABI, chainID } from "./utils/constants";


export default function Singlemarket() {

const { address, setAddress, provider } = useContext(Contexts);
const [singlesmarket, setSinglesMarket] = useState([]);
        /* global BigInt */


    
    const getContract = async () => {

        console.log("bad guy called");
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer =  temporalProvider.getSigner();
        return new ethers.Contract(contractaddress, contractABI, signer);


    }



    const getsingles = async () => {

        const contract = await getContract();

        const getsinglesmarket = await contract.getSinglesmarket();

        setSinglesMarket(getsinglesmarket);
  
    }



    useEffect(() => {
        
        const { ethereum } = window;
        //console.log(provider);
        if(provider){
            getsingles();
            //console.log(albumsmarket);
        } else {
            alert("Connect wallet to see products on sale");
        }

    }, [address]);

  return (

    <div className={styles.singlemarketcontainer}>

        <div style={{marginBottom: "20px"}} >
           On Sale Singles
        </div>



      <div className={styles.songscontainer}>

      <div className={styles.insidecontainer}>

            { singlesmarket.length !== 0 

            ?

            singlesmarket.map((data, index) => (

                <div className={styles.holder} key={index}>

                <div className={styles.salecontainer}>

                        <div className={styles.imagecontainer}>
                            <img src={data.imguri} />
                        </div>

                        <div className={styles.infocontainer}>
                            <div className={styles.musicname}>{data.songname}</div>
                        </div>

                </div>





                    <div className={styles.otherinfo}>

                        <div className={styles.date}>
                            <div>Artist</div>
                            <div>{data.artist}</div>
                        </div> 

                        <div className={styles.price}>
                            <div>Price</div>

                            <div className={styles.pricecontain}>
                                <img src='/currencyimg.png'/>
                                <div>{ BigInt(data.cost).toString() } ETH</div>
                            </div>

                        </div>

                    </div>




                </div>

                )) 


            : 


            <div> No items for sale </div>
            


            } 


         </div>













        </div>







    </div>

  )
}
