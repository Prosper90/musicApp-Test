import React, { useEffect, useContext, useState } from 'react';
import styles from "../../styles/Mintpage.module.css";
import WalletSection from 'components/WalletSection';
import Navigation from 'components/Navigation';
import { Box, Typography } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import AlbumIcon from '@mui/icons-material/Album';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PanoramaIcon from '@mui/icons-material/Panorama';
import LinkIcon from '@mui/icons-material/Link';
import Contexts from 'components/context/contextclass';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ethers } from "ethers";
import { contractaddress, contractABI, chainID } from "../../components/utils/constants";
import Notification from "../../components/Notification";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';





const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));


export default function Mintpage(props) {



  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [bnblife, setBnblive] = useState();
  const [inputdataone, setInputdataone] = useState("0");
  const [inputdatatwo, setInputdatatwo] = useState("0");


    //context
    const { sections, setSections, address, setAddress, provider, setProvider } = useContext(Contexts);




    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



     const getapiatabnb = async() => {
      const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD");
      var data = await response.json();
      //document.getElementById("atabnbrate").innerHTML = price1;
      //console.log(data.USD);
      setBnblive(data.USD);
      }



    const getContract = async () => {
      console.log("bad guy called");
      const signer = await provider.getSigner();
      return new ethers.Contract(contractaddress, contractABI, signer);
    }


    const isUrl = (string) => {
      try { return Boolean(new URL(string)); }
      catch(e){ return false; }
  }




    const mintsingle = async (e) => {
      e.preventDefault();

       if(address) {

        const copies = e.target.copies.value;
        const songName = e.target.musicName.value;
        const artist = e.target.artist.value;
        const musiuri = e.target.musiuri.value;
        const imageuri = e.target.imageuri.value;
        const reformat = ethers.utils.parseEther(inputdatatwo);


          //checking for correct data input



          if( copies == "" || songName == "" || artist == "" || musiuri == "" || imageuri == "" || inputdatatwo == "0") {
            setOpen(true);
            setSeverity("error");
            setNotificationMessage("Form should not be empty");
            return;
          }
          

          if(copies == 1 ) {
              setOpen(true);
              setSeverity("error");
              setNotificationMessage("Copies should be more than one");
              return;
          }

          if(!isUrl(musiuri) || !isUrl(imageuri)) {
            setOpen(true);
            setSeverity("error");
            setNotificationMessage("Link should be live and formatted properly");
            return;
          }


        const Contract = await getContract();
        const waito = await Contract.addSingle(copies, songName, artist, musiuri, imageuri, reformat);



        //check for seller account
        const  checkifaccountexist = await fetch(`https://streamifi-backend.herokuapp.com/user/${address}`, { method: 'GET' })
        const checkuser = await checkifaccountexist.json();

              //first update sellers sold
          if(checkuser.user == null){
            //console.log(checkseller);
                const createuserbuyer = await fetch(`https://streamifi-backend.herokuapp.com/user`, 
                {
                    method: 'POST',   
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ address: address, bought: 0, sold: 0, profits: 0, borrowamount: 0, creator: 'creator'  })
                }
            );
            await createuserbuyer.json();
        }



        if(waito) {

          setOpen(true);
          setSeverity("success");
          setNotificationMessage("Music Created");
  
          return ;
        }



       } else {

        setOpen(true);
        setSeverity("error");
        setNotificationMessage("Connect Wallet");

       }


    }





    const mintalbum = async (e) => {

        e.preventDefault();
        console.log("called him");

        if(address) {

          const songNames = e.target.musicNames.value;
          const songput = songNames.split(",");

          const artists = e.target.artists.value;
          const artistput = artists.split(",");

          const musiuris = e.target.musiuris.value;

          const imageuri = e.target.imageuri.value;

          const price = e.target.priceone.value;

          const reformat = ethers.utils.parseEther(inputdataone);
          console.log(reformat);
          


          //checking for correct data input

          if(songNames == "" || artists == "" || musiuris == "" || imageuri == "" || inputdataone == "0") {
            setOpen(true);
            setSeverity("error");
            setNotificationMessage("Form should not be empty");
            return;
          }
          

          if(songput.length == 1 || artistput.length == 1) {
              setOpen(true);
              setSeverity("error");
              setNotificationMessage("Data should be more than one");
              return;
          }

          if(!isUrl(musiuris) || !isUrl(imageuri)) {
            setOpen(true);
            setSeverity("error");
            setNotificationMessage("Link should be live and formatted properly");
            return;
          }
          

          const Contract = await getContract();
          //console.log(Contract);
          const waito = await Contract.addAlbum( songput, artistput, musiuris, imageuri, reformat );



          //check for seller account
          const  checkifaccountexist = await fetch(`https://streamifi-backend.herokuapp.com/user/${address}`, { method: 'GET' })
          const checkuser = await checkifaccountexist.json();

                //first update sellers sold
            if(checkuser.user == null){
              //console.log(checkseller);
                  const createuserbuyer = await fetch(`https://streamifi-backend.herokuapp.com/user`, 
                  {
                      method: 'POST',   
                      headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ address: address, bought: 0, sold: 0, profits: 0, borrowamount: 0, creator: 'creator'  })
                  }
              );
              await createuserbuyer.json();
          }




          if(waito) {

            setOpen(true);
            setSeverity("success");
            setNotificationMessage("Music Created");
    
            return ;
          }



        } else {
          setOpen(true);
          setSeverity("error");
          setNotificationMessage("Connect Wallet");
        }


    }



    const handleChangeone = (e) => {
      //console.log(e.target.value);
      const converted = (e.target.value/bnblife) * 1;
      setInputdataone((converted).toFixed(4));
    }
  

    const handleChangetwo = (e) => {
      //console.log(e.target.value);
      const converted = (e.target.value/bnblife) * 1;
      setInputdatatwo((converted).toFixed(4));
    }
  





    useEffect(() => {

          setSections(true);
          getapiatabnb();

    });



  return (
    <Box  className={styles.container}>

        <div className={styles.formcontain}>

           <Typography variant="h6" gutterBottom> Mint  Album  </Typography>

            <form className={styles.form} onSubmit={mintalbum}>

              <LightTooltip title="Your input must be comma seperated" placement="top">
                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input name='musicNames' className={styles.input} placeholder="Music names"  />
                </div>
                
               </LightTooltip>

               <LightTooltip title="Your input must be comma seperated" placement="top">
                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input name='artists' className={styles.input} placeholder="Artists"  />
                </div>
              </LightTooltip>


              <LightTooltip title="Add the url to the stored music here" placement="top">
                <div className={styles.inputform}>
                  <LinkIcon /> <input  name='musiuris' className={styles.input} placeholder="Urls"  />
                </div>
              </LightTooltip>

              <LightTooltip title="Add the url to the albums image cover" placement="top">
                <div className={styles.inputform}>
                  <PanoramaIcon /> <input  name='imageuri' className={styles.input} placeholder="Image cover"  />
                </div>
              </LightTooltip>

             <div>
                  { inputdataone != 0 && <small style={{ fontSize: '9px'}} >{inputdataone}bnb</small>}
                  <LightTooltip title="input price in dollars" placement="top">
                    <div className={styles.inputform}>
                      <AttachMoneyIcon /> <input name='priceone' type={Number} onChange={(e) => handleChangeone(e)} className={styles.input} placeholder="Price"  />
                    </div>
                  </LightTooltip>
              </div>

                <div className={ styles.buttonContain }>
                    <button type='submit'>Mint</button>
                </div>

            </form>

        </div>





        <div className={styles.formcontain}>

            <Typography variant="h6" gutterBottom> Mint  Single  </Typography>

            <form className={styles.form} onSubmit={mintsingle}>

              <div className={styles.containtwo}>

              <LightTooltip title="Total music copies you want" placement="top">
                <div className={styles.inputformsecond}>
                  <ContentCopyIcon /> <input name='copies' className={styles.input} placeholder="Copies"  />
                </div>
              </LightTooltip>


                <div className={styles.inputformsecond}>
                  <HeadphonesIcon /> <input name='musicName' className={styles.input} placeholder="Music Name"  />
                </div>

             </div>

                <div className={styles.inputform}>
                  <HeadphonesIcon /> <input name='artist' className={styles.input} placeholder="Artist"  />
                </div>


              <LightTooltip title="Add the url to the stored music here" placement="top">
                <div className={styles.inputform}>
                  <LinkIcon /> <input name='musiuri' className={styles.input} placeholder="Url"  />
                </div>
              </LightTooltip>

              <LightTooltip title="Add the url to the Music image cover" placement="top">
                <div className={styles.inputform}>
                  <PanoramaIcon /> <input name='imageuri' className={styles.input} placeholder="Image cover"  />
                </div>
              </LightTooltip>

            <div>
                {inputdatatwo != 0 && <small style={{ fontSize: '9px'}}>{inputdatatwo}bnb</small>}
                <LightTooltip title="input price in dollars" placement="top">
                  <div className={styles.inputform}>
                    <AttachMoneyIcon /> <input name='pricetwo' type={Number} onChange={(e) => handleChangetwo(e)} className={styles.input} placeholder="Price"  />
                  </div>
                </LightTooltip>
              </div>

                <div className={ styles.buttonContain }>
                    <button type='submit'>Mint</button>
                </div>

            </form>

       </div>

       <div className={styles.absol}>
           <Notification open={open} handleClose={handleClose} severity={severity} notificationMessage={notificationMessage} />
        </div>


    </Box >
    
  )
}



