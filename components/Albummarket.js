import React, { useEffect, useState, useContext, Suspense } from 'react';
import styles from "../styles/Albummarket.module.css";
import Contexts from './context/contextclass';
import { ethers } from "ethers";
import { contractaddress, contractABI, chainID } from "./utils/constants";
import { useRouter } from 'next/router';

export default function Albummarket() {

    const { address, setAddress, provider } = useContext(Contexts);
    const [albumsmarket, setAlbumsMarket] = useState([]);
    const router = useRouter()

            /* global BigInt */



    const getContract = async () => {

            //console.log("bad guy called");
            const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
            const signer =  temporalProvider.getSigner();
            return new ethers.Contract(contractaddress, contractABI, signer);


      }




      const getalbumsid = async () => {



        const contract = await getContract();
        const getalbums = await contract.getAllId();
        console.log(getalbums);
        const albumsarrfill = [];

        getalbums.map(async(data) => {

            let value = data.split(',');
            const idOne = parseInt(value[0]);
            const idTwo = parseInt(value[1]);
            const album = await contract.getAlbum(idOne, idTwo);

            //const eachalbum = await getAlbums(data);
            albumsarrfill.push(album);

        })

        setAlbumsMarket(albumsarrfill);
        console.log(albumsmarket);



    }










  const purchase = (id) => {


      router.push("/purchase/"+id);


  }


  
    


    useEffect(() => {
        
        const { ethereum } = window;




   /*
    const getAlbums = async (id) => {


            //console.log("called here oooooo")
            let value = id.split(',');
            const idOne = parseInt(value[0]);
            const idTwo = parseInt(value[1]);
            const Contract = await getContract();
            const album = await Contract.getAlbum(idOne, idTwo);
            return album;



    }

   */

      if(albumsmarket.length === 0){

        getalbumsid();
        console.log("inside useEffect");
        console.log(albumsmarket);

      }

   


    console.log("outside useEffect");

    }, []);


    


  return (

    <div className={styles.albummarketcontainer}>

        <div style={{marginBottom: "20px"}} >
           On Sale Albums
        </div>



      <div className={styles.songscontainer}>

         <div className={styles.insidecontainer}>


      {albumsmarket 

        ?

         albumsmarket.map((data, index) => {

        return( 

                <div className={styles.holder} key={index} onClick={ () => purchase(data[0].id) }>

                        <div className={styles.salecontainer}>

                            <div className={styles.imagecontainer}>
                                <img src={data[0].imguri} alt='supposed image' />
                            </div>

                            <div className={styles.infocontainer}>
                                <div className={styles.musicname}>{data[0].songname}</div>
                            </div>

                        </div>





                        <div className={styles.otherinfo}>

                            <div className={styles.date}>
                                <div>Artist</div>
                                <div>{data[0].artist}</div>
                            </div> 

                            <div className={styles.price}>
                                <div>Price</div>

                                <div className={styles.pricecontain}>
                                    <img src='/currencyimg.png'/>
                                    <div> { BigInt(data[0].cost).toString() } ETH</div>
                                </div>

                            </div>

                        </div>




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
