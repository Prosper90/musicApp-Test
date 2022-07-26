import React, { useEffect, useState, useContext } from 'react';
import styles from "../styles/Purchasemobile.module.css";
import {ethers} from "ethers";
import { contractaddress, contractABI, chainID } from "../components/utils/constants";
import Contexts from 'components/context/contextclass';
import Notification from 'components/Notification';
import PersonIcon from '@mui/icons-material/Person';
import Albummarket from './Albummarket';
import Singlemarket from './Singlemarket';




export default function Priceinfo(props) {
  
        /* global BigInt */

        const [open, setOpen] = useState(false);
        const [severity, setSeverity] = useState("");
        const [notificationMessage, setNotificationMessage] = useState("");
        const { setSections, address, tokenbalance, borrowamount, setBorrowamount } = useContext(Contexts);
    
    
    
          const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpen(false);
          };
    
    
    
    
    
    
    
    
    
            const getContract = async () => {
                console.log("bad guy called");
                const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
                const signer = temporalProvider.getSigner();
                return new ethers.Contract(contractaddress, contractABI, signer);
            }
    
    
    
    
        //get users address 
        const getusersaddress = async (idOne, idTwo) => {
            const Contract = await getContract();
            const getaddress = await Contract.ownerOf(idOne, idTwo);
            return getaddress;
        }
    
        
       //buy assets
        const buy = async (ids, cost) => {
     
           const costset = Math.round( (cost/10 ** 18) * 10 ) / 10;
           console.log(costset);
           console.log(cost);
    
            //check if balance is enough
            if(tokenbalance < costset ) {
                //notifications
                setOpen(true);
                setSeverity("error");
                setNotificationMessage("Insufficient funds");
                return;
            }
    
            //check buyers balance if its enough
            let value = ids.split(',');
            const idOne = parseInt(value[0]);
            const idTwo = parseInt(value[1]);
    
            //get sellers address
            const sellersaddress = await getusersaddress(idOne, idTwo);
    
            //Dont allow user buy from himself/herself
            if(sellersaddress === address ) {
                //notifications
                setOpen(true);
                setSeverity("error");
                setNotificationMessage("Cannot buy your own Items");
                return;
            }
            
            //check for buyer account
            const  checkifuserexist = await fetch(`https://streamifi-backend.herokuapp.com/user/${address}`, { method: 'GET' })
            const checkuserbuyer = await checkifuserexist.json();
    
            //check for seller account
            const  checkifsellerexist = await fetch(`https://streamifi-backend.herokuapp.com/user/${sellersaddress}`, { method: 'GET' })
            const checkseller = await checkifsellerexist.json();
    
    
            //sell from the contract
            if(props.albumorsingle == "Album") {
                console.log("Album hoorayyyy");
                const Contract = await getContract();
                 await Contract.buysellAlbum(idOne, idTwo, {
                    gasLimit: 1000000,
                    nonce: 105 || undefined,
                  });
                await buying;
                console.log(buying);
            } else {
                const Contract = await getContract();
                 await Contract.buysellSingle(idOne, idTwo, {
                    gasLimit: 10000000,
                    nonce: 105 || undefined,
                  });
    
            }
            
    
            //first update sellers sold
            if(checkseller.user !== null){
                //console.log(checkseller);
                const updatesellersaccount = await fetch(`https://streamifi-backend.herokuapp.com/user/sold`, 
                {
                  method: 'POST',   
                   headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ address: sellersaddress})
               }
               );
                const checksuccess = await updatesellersaccount.json();
                await checksuccede;
    
            } else {
            //create seller user
            const createuserbuyer = await fetch(`https://streamifi-backend.herokuapp.com/user`, 
            {
                method: 'POST',   
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address: sellersaddress, bought: 0, sold: 1, profits: 0, borrowamount: 0  })
            });
                 await createuserbuyer.json();
            }
    
    
            //calling normal database and creating user for buying if theres no account
            if( checkuserbuyer.user !== null ){
    
                console.log("evaluated to true");
                console.log("Hey Hey");
    
                const addbought = await fetch(`https://streamifi-backend.herokuapp.com/user/bought`, 
                {
                  method: 'POST',   
                   headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ address: address})
               }
               );
               const checksuccede = await addbought.json();
               /* use checksuccede to notify the user that their transaction has been saved it returns true if it was successfull or false if it was bad*/
              await checksuccede;
    
            } else {
               //create buyer user
               console.log("creating buyer user account");
               console.log("creating user buyer");
               const createuserbuyer = await fetch(`https://streamifi-backend.herokuapp.com/user`, 
                    {
                        method: 'POST',   
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ address: address, bought: 1, sold: 0, profits: 0, borrowamount: 0  })
                    }
                );
                 await createuserbuyer.json();
            }
    
    
            //notifications
            setOpen(true);
            setSeverity("success");
            setNotificationMessage("Asset bought successfully");
    
        }
    
    
    
    
    
    
    
        //borrow assets
        const borrow = async (ids, type, asseturl) => {
    
            let value = ids.split(',');
            const idOne = parseInt(value[0]);
            const idTwo = parseInt(value[1]);
    
            //get sellers address
            const borroweraddress = await getusersaddress(idOne, idTwo);
            console.log("borrow");
    
    
    
            //get sellers borrow amount
            const values = await fetch(`https://streamifi-backend.herokuapp.com/${borroweraddress}`, { method: 'GET' })
            const borroweddata = await values.json();
            console.log(borroweddata);
            //console.log(borroweddata.user.borrowamount);
    
    
            //check if asset can be borrowed
            if(borroweddata.user?.borrowamount === 0 || borroweddata.user == null ) {
                //notifications
                setOpen(true);
                setSeverity("error");
                setNotificationMessage("This asset cannot be borrowed");
                return;
            }
    
            const converttowei = ethers.utils.parseEther(String(borroweddata.user.borrowamount));
    
    
            //move money to the borrower
            const Contract = await getContract();
            const borrowing = await Contract.borrow(idOne, idTwo,{
                gasLimit: 1000000,
                nonce: 105 || undefined,
              });
            await borrowing;
    
            const addbought = await fetch(`https://streamifi-backend.herokuapp.com/borrow`, 
            {
              method: 'POST',   
              headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ addressborrower: borroweraddress,  addressborrowee: address, musictype: type, borrowedId: ids, assetUrl : asseturl  })
          });
             await addbought.json();
    
            //notifications
            setOpen(true);
            setSeverity("success");
            setNotificationMessage("Borrowed an asset");
        }
          
    
    
    
    
            const getitemnumber = async (id) => {
                let value = id.split(',');
                //const idOne = parseInt(value[0]);
                const idTwo = parseInt(value[1]);
                return idTwo;
            }
    
    
            useEffect(() => {
                const { ethereum } = window;
    
    
            }, [props.albumorsingle])



  return (
      

  <div className={styles.container}>


    { props.albumorsingle &&

       <>

                <div className={styles.itemforsale}>

                        <div className={styles.imgcontainer}>
                        <img className={styles.itemforsaleimg} src={ props.albumorsingle == "Album" ? props.itemselected[0].imguri : props.itemselected.imguri } alt='for sale'   />
                        <div className={styles.shadow}></div>
                        </div>

                        <div className={styles.info}>

                                <div className={styles.releasedate}>musicType : {props.albumorsingle}</div>

                                <div className={styles.singer}>
                                    <PersonIcon />
                                    <div className={styles.singername}>{ props.albumorsingle == "Album" ? props.itemselected[0].artist : props.itemselected.artist}</div>
                                </div>

                                <div className={styles.songname}>
                                    { props.albumorsingle == "Album" ?  props.itemselected[0].songname : props.itemselected.songname }
                                </div>

                                <div className={styles.details}>
                                    This Song has a total of unknown in here.
                                </div>

                        </div>

                </div>


                


                    { props.albumorsingle === "Album" ?


                            <div className={styles.childone}>


                            <div className={styles.priceinfo}>
                                <div className={styles.currentprice}>Current Price</div>

                                <div className={styles.singername}>   <img src='/currencyimg.png'/>  <div> {Math.round( (props.itemselected[0].cost/10 ** 18) * 10 ) / 10 } ETH </div> </div>
                            </div>

                            <div className={styles.moreinfo}>

                                <div className={styles.infoinfo}>
                                    <div className={styles.currentprice} >info</div>
                                    <div className={styles.infodetails}>This music is of type {props.albumorsingle} and its the { () => getitemnumber(props.itemselected[0].id)} in the album</div>
                                </div>

                                <div className={styles.buttoncontain}>
                                    <button className={styles.buybutton} onClick={() => buy(props.itemselected[0].id, props.itemselected[0].cost) } >Buy</button>
                                    <button className={styles.bidbutton} onClick={() => borrow(props.itemselected[0].id, props.itemselected[0].musictype, props.itemselected[0].uri )} >Borrow</button>
                                </div>

                            </div>


                            </div>

                        :

                        <>
        
                        { props.albumorsingle === "Single" &&

                            <div className={styles.childone}>


                            <div className={styles.priceinfo}>
                                <div className={styles.currentprice}>Current Price</div>

                                <div className={styles.singername}>   <img src='/currencyimg.png'/>  <div> {Math.round( (props.itemselected.cost/10 ** 18) * 10 ) / 10 } ETH </div> </div>
                            </div>

                            <div className={styles.moreinfo}>

                                <div className={styles.infoinfo}>
                                    <div className={styles.currentprice} >info</div>
                                    <div className={styles.infodetails}>THis music belongs to Ed sheeran</div>
                                </div>

                                <div className={styles.buttoncontain}>
                                    <button className={styles.buybutton} onClick={() => buy(props.itemselected[0].id, props.itemselected[0].cost) } >Buy</button>
                                    <button className={styles.bidbutton} onClick={() => borrow(props.itemselected[0].id, props.itemselected[0].musictype, props.itemselected[0].uri )} >Borrow</button>
                                </div>

                            </div>


                            </div>

                         }

                        </>

                    } 



            
            <div className={styles.childtwo}>

                <div>Top Buyers</div>

                <div>buyer 1</div>

            </div>





            <div className={styles.othersfrommarket}>

                    { props.albumorsingle == "Album"

                    ?
                        <Albummarket  />
                    :  
                        <Singlemarket />
                    }

            </div>




                <div className={styles.absol}>
                   <Notification open={open} handleClose={handleClose} severity={severity} notificationMessage={notificationMessage} />
                </div>

        </>

      }


    </div>


  )
}
