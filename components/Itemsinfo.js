import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from "../styles/Itemsinfo.module.css";
import {ethers} from "ethers";
import { contractaddress, contractABI, chainID } from "../components/utils/constants";
import Contexts from 'components/context/contextclass';
import Notification from 'components/Notification';



export default function Itemsinfo(props) {


  //states
  const [borrwed, setBorrowed] = useState();
  const [clickedOut, setClickedOut] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [inputdata, setInputdata] = useState();
  const [bnblife, setBnblive] = useState();


  const { address, borrowamount } = useContext(Contexts);


   //ref
   const myRef = useRef(null);



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






  const listforsale = async (type, ids) => {

    let value = ids.split(',');
    const idOne = parseInt(value[0]);
    const idTwo = parseInt(value[1]);
    console.log(type, ids);


      //sell from the contract
      if(type === "Album") {
          console.log("called album");
          const Contract = await getContract();
          const setforsaleAlbum = await Contract.Albumforsale(idOne, idTwo);
          await setforsaleAlbum;
          
      } else {
          console.log("called singles");
          const Contract = await getContract();
          const setforsaleSingle = await Contract.singleforsale(idOne, idTwo);
          await setforsaleSingle;
      }

        //notifications
        setOpen(true);
        setSeverity("success");
        setNotificationMessage("Asset listed for sale");
  }



  const getborroowedassets = async () => {

    //call borrowed to get list of borrowed
    const  getassets = await fetch(`https://streamifi-backend.herokuapp.com/getborrowinfo`, { method: 'GET' })
    const toloop = await getassets.json();
    const arr = [];

        toloop.infoborrow.map((data, index) => {
            console.log(data,"hi you called");
            console.log("guy run");
            if(address == data.addressborrower || address == data.addressborrowee) {
              arr.push(data);
          }

        })
      
      if(arr.length == 0) {
        setBorrowed(false);
      } else {
        setBorrowed(arr);
      }

    
  }





  const handleChange = (e) => {
    const converted = (e.target.value/bnblife) * 1;
    console.log(e.target.value);
    setInputdata((converted).toFixed(4));
  }



  const getapiatabnb = async() => {
    const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD");
    var data = await response.json();
    //document.getElementById("atabnbrate").innerHTML = price1;
    //console.log(data.USD);
    setBnblive(data.USD);
    }





  const setborrowamount = async (e) => {

    e.preventDefault();

    console.log("setting borrow amount");

    const setvalue = await fetch(`https://streamifi-backend.herokuapp.com/setvalue`, 
    {
        method: 'POST',   
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( { address: address, amount: inputdata} )
    }
    );
      await setvalue.json();




      //notifications
      setOpen(true);
      setSeverity("success");
      setNotificationMessage("Amount to borrowed set");


  }






  useEffect(() => {
    //console.log(props);
     if(borrwed !== false || Array.isArray(borrwed) ) {
        getborroowedassets();
     }


    const handleClickOutside = (event) => {
      //console.log(myRef);
     if(myRef.current === null){
  
    } else if( Object.keys(myRef).length !== 0 ) {
    
     // console.log("In here");
      if (!myRef.current.contains(event.target)) {
          setClickedOut(!clickedOut);
          props.setSelect();
          console.log("called and clicked");
      }
  
    }
  
    getapiatabnb()
  
    };
    
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);


  }, [props, clickedOut])



  return (


    
    <div className={styles.container}>
      

        <div className={ styles.listallcontainer }>


          <div className={styles.borrowed}>
            <div className={styles.borrowtitle}>
                Assets  borrowed and lended
            </div>


            <div className={styles.borrowedoutside}>

              {/*map here*/}
              {  Array.isArray(borrwed) ?

                 <>
                   { borrwed.map((data, index) => {

                      <div className={styles.mappeditem}>
                        <div className={styles.typename}>{data.musictype}</div>
                        <div className={styles.boreded}>
                            info on the asset borrowed
                        </div>
                      </div>

                   })}
                 </>

                 :


                 <div className="emptyborrowed">
                    No transaction here
                 </div>
              
               }

            </div>

          </div>


        </div>




      




         { props.select &&

           <>
             { !props.responsiveMainmobile ?

                    <div className={ styles.listoneinfo }>

                        <div className={styles.type}> <div className={styles.hd}>Album</div> <small className={styles.listlist}>{props.select.sale ? "Listed" : "Not listed"}</small> </div>

                        <div className={ props.responsiveMobile ? styles.priceandnamemobile  : styles.priceandname }>

                          <div className={styles.infocontain}>
                            <div className={styles.songinfo}> 
                              <div className={styles.songname}> { props.select.songname } </div> 
                                <small className={styles.artist}>{props.select.artist}</small>
                              </div>


                            <div className={styles.pricecontain}>
                              <img className={styles.currencyimg} src='/currencyimg.png'  />
                              <div>{ Math.round( (props.select.cost/10 ** 18) * 10 ) / 10 } ETH</div>
                            </div>

                          </div>

                          <img className={styles.musicImage} src={props.select.imguri}  />

                          </div>


                          <div className={styles.setborrowamount}>
                                <small className={styles.borrowheader}> <div className={styles.borrowin}> lend <div className={styles.bnbcurrency}>$ {borrowamount}</div> </div>  <div className={styles.statusborrow}> Status : {borrowamount == 0 ? "not borrowable" : "borrowable" } </div> </small> 
                               <form className={styles.borrowform} onSubmit={setborrowamount} >
                                 <input type="number" max="500" min="0" name="borrowvalue" className={styles.inputborrow} onChange={(e) => handleChange(e)} placeholder="set the amount to lend" />
                                   <div  className={styles.currencysymb} >bnb{inputdata}</div>
                                   <button className={styles.submit} >Lend</button>
                               </form>
                           </div>

                        <button onClick={ ()=> listforsale(props.select.musictype, props.select.id) } className={styles.listbutton}>List for sale</button>

                        </div>


                :


                    <div className={styles.modalcontainer}  >


                        <div className={ styles.listoneinfomobile  } ref={myRef} >

                            <div className={styles.type}>Single</div>

                            <div className={ props.responsiveMobile ? styles.priceandnamemobile  : styles.priceandname }>

                                <div className={styles.infocontain}>
                                  <div className={styles.songinfo}> 
                                     <div className={styles.songname}> { props.select.songname } </div> 
                                      <small className={styles.artist}>{props.select.artist}</small>
                                    </div>


                                  <div className={styles.pricecontain}>
                                    <img className={styles.currencyimg} src='/currencyimg.png'  />
                                    <div>{ Math.round( (props.select.cost/10 ** 18) * 10 ) / 10 } ETH</div>
                                  </div>

                                </div>

                                <img className={styles.musicImage} src={props.select.imguri}  />

                            </div>


                            <div className={styles.setborrowamount}>
                            <small className={styles.borrowheader}> <div className={styles.borrowin}> lend <div className={styles.bnbcurrency}>$ {borrowamount}</div> </div>  <div className={styles.statusborrow}> Status : {borrowamount == 0 ? "not borrowable" : "borrowable" } </div> </small> 
                               <form className={styles.borrowform} onSubmit={setborrowamount}>
                                   <input type="number" max="500" min="0" name="borrowvalue"  className={styles.inputborrow} onChange={(e) => handleChange(e)} placeholder="set the amount to lend" />
                                   <div  className={styles.currencysymb} >bnb{inputdata}</div>
                                   <button className={styles.submit}  >Lend</button>
                               </form>
                            </div>

                            <button onClick={ ()=> listforsale(props.select.musictype, props.select.id) } className={styles.listbutton}>List for sale</button>

                        </div>
                  

                    </div>


              }

         
           </>
         
         }


          


        { /* onclick would load another one that has that overlay*/ }




        <div className={styles.absol}>
           <Notification open={open} handleClose={handleClose} severity={severity} notificationMessage={notificationMessage} />
        </div>



    </div>
  )
}
