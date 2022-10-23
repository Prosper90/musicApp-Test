import React, { useEffect, useState, useContext, useRef } from 'react';
import styles from "../styles/Albummarket.module.css";
import Contexts from './context/contextclass';
import { ethers } from "ethers";
import { contractaddress, contractABI, chainID } from "./utils/constants";
import { useRouter } from 'next/router';
import { id } from 'ethers/lib/utils';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';



export default function Albummarket() {

    const { address, setAddress, provider } = useContext(Contexts);
    const [albummarket,  setAlbumMarket] = useState([]);
    const [albumlisted, setAlbumlisted] = useState([]);
    const router = useRouter();



            /* global BigInt */



    const getContract = async () => {

            //console.log("bad guy called");
            const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
            const signer =  temporalProvider.getSigner();
            return new ethers.Contract(contractaddress, contractABI, signer);


      }



      const checkforrepeat = (id) => {
        
        console.log(id);
        if(albumlisted.length === 0){
           return false;
        }

        albumlisted.map((data, index) => {
           console.log(data);
           if(data[0].id === id) {
               return true;
           } else {
               return false;
           }

        })

    }

      


      
      const getalbumsid = async () => {

        const contract = await getContract();
        const getalbums = await contract.getAllId();
          setAlbumMarket(getalbums);
          const arr = [];
         
          await getalbums.map( async (data, index) => {

            let value = data.split(',');
            const idOne = parseInt(value[0]);
            const idTwo = parseInt(value[1]);
            const geteachalbum = await contract.getAlbum(idOne, idTwo);
            console.log(geteachalbum);
            //const avoidrepeat = checkforrepeat(geteachalbum[0].id);
            //console.log(avoidrepeat);
            
            if(geteachalbum[0].sale){
                arr.push(geteachalbum);
            }

        
          })

          setTimeout(() => {
            console.log("All wrapped up setTimeOut market");
            setAlbumlisted(arr);
          }, 3000);
          

    }





  const purchase = (selectedItem) => {

      console.log(selectedItem);
      router.push("/purchase/"+selectedItem.id+"/"+selectedItem.musictype);


  }


  
    


    useEffect(() => {
        
        const { ethereum } = window;

            getalbumsid();


        console.log(albumlisted);

    }, []);


    


  return (

    <div className={styles.albummarketcontainer}>

        <div style={{marginBottom: "20px"}} >
           On Sale Albums
        </div>



      <div className={styles.songscontainer}>

         <div className={styles.insidecontainer}>


      { albummarket.length !== 0

        ?
          <>
           { albumlisted.length !== 0 ?

                albumlisted?.map((data, index) => (      
                    
                  <div className={styles.holder} key={index} onClick={ () => purchase(data[0]) } >

                          <div className={styles.salecontainer}>

                              <div className={styles.imagecontainer}>
                                  <img src={data[0]?.imguri} alt='supposed image' />
                              </div>

                              <div className={styles.infocontainer}>
                                  <div className={styles.musicname}>{data[0]?.songname}</div>
                              </div>

                          </div>

                          <div className={styles.otherinfo}>

                              <div className={styles.date}>
                                  <div>Artist</div>
                                  <div>{data[0]?.artist}</div>
                              </div> 

                              <div className={styles.price}>
                                  <div>Price</div>

                                  <div className={styles.pricecontain}>
                                      <img src='/currencyimg.png'/>
                                      <div> { Math.round( (data[0]?.cost/10 ** 18) * 10 ) / 10 } ETH</div>
                                  </div>

                              </div>

                          </div>


                          <div className={styles.buyborder} > <ShoppingBagIcon fontSize="small" className={styles.icon} />  Buy </div>


                      </div> 

                    ))

                    :

                    <div> Market is empty </div>
              }
            
            </>

         :

         <div>No minted music</div>
   

      }



      


         </div>

        </div>








    </div>
  )
}
