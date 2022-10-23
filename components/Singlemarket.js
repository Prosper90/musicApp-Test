import React, { useEffect, useState, useContext } from 'react';
import styles from "../styles/Singlemarket.module.css"
import Contexts from './context/contextclass';
import { ethers } from 'ethers';
import { contractaddress, contractABI, chainID } from "./utils/constants";
import { useRouter } from 'next/router';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


export default function Singlemarket() {

const { address, setAddress, provider } = useContext(Contexts);
const [singlesmarket, setSinglesMarket] = useState([]);
const [singleslisted, setSingleslisted] = useState([]);
const router = useRouter();

        /* global BigInt */


    
    const getContract = async () => {

        console.log("bad guy called");
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer =  temporalProvider.getSigner();
        return new ethers.Contract(contractaddress, contractABI, signer);


    }



    const checkforsale = async (ids) => {
        let value = ids.split(',');
        const idOne = parseInt(value[0]);
        const idTwo = parseInt(value[1]);
        const contract = await getContract();
        const getsinglescheck = await contract.checksaleSingle(idOne, idTwo);

        if(getsinglescheck === true) {
            return true;
        } else {
            return false;
        }
    }



    const getsingles = async () => {

        const contract = await getContract();

        const getsinglesmarket = await contract.getSinglesmarket();

        setSinglesMarket(getsinglesmarket);
        const arr = [];

        getsinglesmarket.map(async (data, index) => {
            const checker = await checkforsale(data.id);
            if(checker) {
                arr.push(data);
            }
        })

        setTimeout(() => {
            console.log("All wrapped up setTimeOut");
            setSingleslisted(arr);
          }, 3000);

  
    }



    const purchase = (selectedItem) => {

        router.push("/purchase/"+selectedItem.id+"/"+selectedItem.musictype);
  
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

            { singleslisted.length !== 0 

            ?

            singleslisted.map((data, index) => {

            return ( 
                <div className={styles.holder} key={index} onClick={ () => purchase(data) } >

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
                                            <div>{ Math.round( (data?.cost/10 ** 18) * 10 ) / 10 } ETH</div>
                                        </div>

                                    </div>

                        </div>


                        <div className={styles.buyborder} > <ShoppingBagIcon fontSize="small" className={styles.icon} />  Buy </div>


                 </div>

                )



            }) 


            : 


            <div> No items for sale </div>
            


            } 


         </div>













        </div>







    </div>

  )
}
