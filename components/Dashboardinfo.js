import React, { useEffect } from 'react';
import styles from "../styles/Dashboardinfo.module.css";
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



export default function Dashboardinfo(props) {

            /* global BigInt */


 useEffect(() => {
    console.log(props)
    console.log(props.ownedAlbums);
    console.log(props.ownedSingles);

    props.ownedAlbums.map((data, index) => {
        console.log(data);
        console.log(index)
        //console.log( JSON.stringify(data[index]) );
        console.log(typeof(data[index]));
        console.log(data[0].songname);
        console.log(data[0])
    })

 }, [props])
    

  return (

    <div className={ props.responsiveMainmobile ? styles.containertwo  :  styles.container }>



        <div className={ !props.responsiveMainmobile ? styles.holdsalesinfo : styles.holdsalesinfotwo }>

            <div className={ props.responsiveMainmobile ? styles.totalinfostwo : styles.totalinfos}>
                <SellIcon />
                <div className={styles.accountinfo}>
                    <div>2</div>
                    <div>Total sold</div>
                </div>
            </div>

            <div className={ props.responsiveMainmobile ? styles.totalinfostwo : styles.totalinfos}>
                <ShoppingBagIcon />
                <div className={styles.accountinfo}>
                    <div>2</div>
                    <div>Total bought</div>
                </div>
            </div>


            <div className={ props.responsiveMainmobile ? styles.totalinfostwo : styles.totalinfos}>
                <AttachMoneyIcon />
                <div className={styles.accountinfo}>
                    <div>100</div>
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


                                        <div className={ props.responsiveMainmobile ? styles.rowcontainertwo : styles.rowcontainer }>
                                            
                                                { props.ownedAlbums.map((data, index) => (

                                                        <div className={styles.songslistcontainer} key={index} onClick={ () => selectlist(data[index]) } >

                                                                <div className={styles.imagecontainer}>
                                                                    <img src={data[0].imguri} alt="imgsrc" />
                                                                </div>

                                                                <div className={styles.songinfo}>
                                                                <div className={styles.musicname}> {data[0].songname} </div>

                                                                <div className={styles.songinfoothers}>
                                                                    
                                                                    <div className={styles.singer}>
                                                                        <div>Artist</div>
                                                                        <div>{data[0].artist}</div>
                                                                    </div>


                                                                <div className={styles.singer}>

                                                                    <div>Price</div>

                                                                        <div className={styles.pricecontain}>
                                                                                <img src='/currencyimg.png'/>
                                                                                <div>{ BigInt(data[0].cost).toString() } ETH</div>
                                                                        </div>

                                                                </div>

                                                                </div>


                                                                </div>


                                                        </div>



                                                ))}






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

                                <div className={ props.responsiveMainmobile ? styles.rowcontainertwo : styles.rowcontainer }>

                                  { props.ownedSingles.map((data, index) => (

                                    <div className={styles.songslistcontainer} key={index} >


                                                <div className={styles.imagecontainer}>
                                                    <img src={data.imguri} />
                                                </div>

                                                <div className={styles.songinfo}>
                                                <div className={styles.musicname}> {data.songname} </div>

                                                <div className={styles.songinfoothers}>
                                                    
                                                    <div className={styles.singer}>
                                                        <div>Artist</div>
                                                        <div>{data.artist}</div>
                                                    </div>


                                                <div className={styles.singer}>

                                                    <div>Price</div>

                                                        <div className={styles.pricecontain}>
                                                                <img src='/currencyimg.png'/>
                                                                <div>110 ETH</div>
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
