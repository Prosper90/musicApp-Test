import React, { useEffect, useState, useContext, useRef } from 'react';
import styles from "../styles/Dashboardinfo.module.css";
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {ethers} from "ethers";
import { contractaddress, contractABI, chainID } from "../components/utils/constants";
import Contexts from 'components/context/contextclass';



export default function Dashboardinfo(props) {

            /* global BigInt */

            const [rerender, setrerender] = useState(false);

            //dashboard values
            const [sold, setSold] = useState(0);
            const [bought, setBought] = useState(0);
            const [profits, setProfits] = useState(0);
            const [valuesgotten, setValuesgotten] = useState(false);


        const {  address, borrowamount, setBorrowamount } = useContext(Contexts);


        const getContract = async () => {
            console.log("bad guy called");
            const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
            const signer = temporalProvider.getSigner();
            return new ethers.Contract(contractaddress, contractABI, signer);
        }


        
        const getdashboardvalues = async() => {

            const values = await fetch(`https://streamifi-backend.herokuapp.com/user/${address}`, { method: 'GET' })
            const borroweddata = await values.json();
            console.log(borroweddata.users, "dashboard values")
            if(borroweddata.users) {
                setSold(borroweddata.users.sold);
                setBought(borroweddata.users.bought);
                setProfits(borroweddata.users.profits);
                setBorrowamount(borroweddata.users.borrowamount);
                setValuesgotten(true);
            }
            
            
        }


        //use borrowamount later



        const selectlist = (selected) => {
            props.selectlist(selected);
        }


        
        

        useEffect(() => {
            console.log(props)
             console.log(props.ownedAlbums);
  
        
            if(!valuesgotten){
                getdashboardvalues();
             }

        }, [props.ownedAlbums.length])
            

  return (

    <div className={ props.responsiveMainmobile ? styles.containertwo  :  styles.container }>



        <div className={ !props.responsiveMainmobile ? styles.holdsalesinfo : styles.holdsalesinfotwo }>

            <div className={ props.responsiveMainmobile ? styles.totalinfostwo : styles.totalinfos}>
                <SellIcon />
                <div className={styles.accountinfo}>
                    <div>{sold}</div>
                    <div>Total sold</div>
                </div>
            </div>

            <div className={ props.responsiveMainmobile ? styles.totalinfostwo : styles.totalinfos}>
                <ShoppingBagIcon />
                <div className={styles.accountinfo}>
                    <div>{bought}</div>
                    <div>Total bought</div>
                </div>
            </div>


            <div className={ props.responsiveMainmobile ? styles.totalinfostwo : styles.totalinfos}>
                <AttachMoneyIcon />
                <div className={styles.accountinfo}>
                    <div>{profits}</div>
                    <div>Profits</div>
                </div>
            </div>

        </div>








             <div className={ props.responsiveMainmobile ? styles.ownedassetstwo : styles.ownedassets } >
                    

                            <div className={ props.responsiveMainmobile ? styles.albumstwo : styles.albums }>


                                <div style={{marginBottom: "20px"}} >
                                        Albums
                                </div>

                              { props.ownedMusicAlbum.length !== 0 ?



                               <div className={ props.responsiveMainmobile ? styles.rowcontainertwo : styles.rowcontainer }  >

                         
                                     { props.ownedAlbums?.length !== 0 ?
                                                   
                                        <>

                                            { props.ownedAlbums.map((data, index) => (
                                                
                                                        <div className={styles.songslistcontainer} key={index} onClick={ () => selectlist(data[index]) } >

                                                        <div className={styles.imagecontainer}>
                                                            <img src={data[0]?.imguri} alt="imgsrc" />
                                                        </div>

                                                        <div className={styles.songinfo}>
                                                        <div className={styles.musicname}> {data[0]?.songname} </div>

                                                        <div className={styles.songinfoothers}>
                                                            
                                                            <div className={styles.singer}>
                                                                <div>Artist</div>
                                                                <div>{data[0]?.artist}</div>
                                                            </div>


                                                        <div className={styles.singer}>

                                                            <div>Price</div>

                                                                <div className={styles.pricecontain}>
                                                                        <img src='/currencyimg.png'/>
                                                                        <div>{ Math.round( (data[0]?.cost/10 ** 18) * 10 ) / 10 } ETH</div>
                                                                </div>

                                                        </div>

                                                        </div>

                                                        </div>

                                                </div>

                                                ))}  
                                            
                                            </>

                                            :

                                            <div>
                                                loading...
                                            </div>
                                        
                                        }
                            
                                    
                                    </div>



                                :

                                <div> You have no asset here </div>
                                

                               }



                    </div>




                     <div className={ props.responsiveMainmobile ? styles.singlestwo : styles.singles }>


                                <div style={{marginBottom: "20px"}} >
                                        Singles
                                </div>

                        { props.ownedMusicSingle.length !== 0 ?

                            <div className={ props.responsiveMainmobile ? styles.rowcontainertwo : styles.rowcontainer }   >

                               { props.ownedSingles.map((data, index) => (

                                    <div className={styles.songslistcontainer} key={index} onClick={ () => selectlist(data) } >


                                                <div className={styles.imagecontainer}>
                                                    <img src={data?.imguri} />
                                                </div>

                                                <div className={styles.songinfo}>
                                                <div className={styles.musicname}> {data?.songname} </div>

                                                <div className={styles.songinfoothers}>
                                                    
                                                    <div className={styles.singer}>
                                                        <div>Artist</div>
                                                        <div>{data?.artist}</div>
                                                    </div>


                                                <div className={styles.singer}>

                                                    <div>Price</div>

                                                        <div className={styles.pricecontain}>
                                                                <img src='/currencyimg.png'/>
                                                                <div>{ Math.round( (data?.cost/10 ** 18) * 10 ) / 10 } ETH</div>
                                                        </div>

                                                </div>

                                                </div>


                                                </div>




                                    </div>


                                    ) 

                                    )}



                                </div>

                                :

                                <div> You have no asset here </div>

                             }




                                

                        </div>










        </div>










       
    </div>

  )
}
