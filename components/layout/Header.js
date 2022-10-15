import React, { useEffect, useContext, useState } from 'react';
import styles from "../../styles/Header.module.css";
import styled from "styled-components";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Contexts from 'components/context/contextclass';
import { shortenAddress } from 'components/utils/trauncate';
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { chainID, currencytokenABI, currencyTokenaddress } from "components/utils/constants";
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import useMediaQuery from '@mui/material/useMediaQuery';





const Container = styled.div`

`



export default function Header() {

   const { address, setAddress, provider, setProvider, setOpen, setSeverity, setNotificationMessage } = useContext(Contexts);
   const router = useRouter();

   const [checkaccess, setcheckaccess] = useState(false);
   const [instanceset, setInstanceset] = useState();
   const [webModal, setWebModal] = useState();
   const [windoweth, setWindoweth] = useState();
   
 
   
   const responsiveMobile = useMediaQuery('(max-width: 765px)');
 



  const goback = (link) => {

    if(!address){
        setOpen(true);
        setSeverity("error");
        setNotificationMessage("Please connect your wallet to proceed");

        return ;
      }


      router.push(link);
      
  }






  const setProviderWindow = async () => {
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(temporalProvider);
  }



  //set provider for mobile
  const setProviderMobile = async () => {

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            97: "https://data-seed-prebsc-2-s2.binance.org:8545",
          }, // required
          network: 'bsc testnet',
          chainId: 97,
        }
      },
    };



    const web3Modal = new Web3Modal({
      network: "tBNB", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });
    
    setWebModal(web3Modal);


}




           //check for correct chain
           const updateAccount = async () => {
  
            console.log("in here");
    
                console.log("called");

                await ethereum.request({ method: "eth_requestAccounts" });
    
                const chainId = await provider.getNetwork();
                //console.log(chainId.chainId);
                if (chainId.chainId !== chainID) {
    
                  console.log("still trying");
    
                  try {
                    //switch chain
                    await window.ethereum.request({
                      method: "wallet_switchEthereumChain",
                      params: [
                        {
                          chainId: `0x${Number(97).toString(16)}`,
                        }],
                    });
        
                    setcheckaccess(true);
                    loginmetamask();
                    
                  } catch (error) {
                    if (error === 4902) {
                      //add the token or currency to metamask
                      await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                          {
                            chainId: `0x${Number(97).toString(16)}`,
                            rpcUrls: [
                              " https://data-seed-prebsc-1-s1.binance.org:8545",
                            ],
                            chainName: "BSC testnet",
                            nativeCurrency: {
                              name: "BSC",
                              symbol: "BNB",
                              decimals: 18,
                            },
                            blockExplorerUrls: [
                              "https://explorer.binance.org/smart-testnet",
                            ],
                          },
                        ],
                      });
        
                      setcheckaccess(true);
                      loginmetamask();
                    }
                  }
                } else if (chainId.chainId === chainID) {
                  setcheckaccess(true);
                }
        
        
          };
          
          



          const loginmetamask = async () => {
  
            if(provider){
      
      
              if(!checkaccess) {
                console.log("run");
                updateAccount();
              } 
      
    
              //console.log(provider);
              const chainId = await provider.getSigner().getChainId();
              if (chainId === chainID) {
                //console.log("called twice");
                const signer = await provider.getSigner();
                const accounts = await signer.getAddress();
      
                setAddress(accounts);
    
              } else {
                // alert("Wrong Chain Switch");
                updateAccount();
              }

      
      
      
      
          }
      
          }


          const loginMobile = async () => {


            const providerOptions = {
              walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                  rpc: {
                    97: "https://testnet.bscscan.com/",
                  }, // required
                  network: 'bsc testnet',
                  chainId: 97,
                }
              },
            };
        
        
        
            const web3Modal = new Web3Modal({
              network: "binance", // optional
              cacheProvider: true, // optional
              providerOptions, // required
            });
            

            const instance = await web3Modal.connect();

            //setgetInstance(instance); for onchange event
            setInstanceset(instance);

            const gettingprovider = await new ethers.providers.Web3Provider( instance );
            setProvider(gettingprovider);

            const chainId = await gettingprovider.getSigner().getChainId();

             if(provider) {


                  const signer = await gettingprovider.getSigner();
                  const accounts = await signer.getAddress();
        
                  setAddress(accounts);
                  //get balance
                  getBalance();

             }

          }
      
      

  
  

          useEffect(() => {
            const { ethereum } = window;

            //console.log(window.ethereum);
            setWindoweth(window.ethereum);

            if(!window.ethereum) {
              setProviderMobile();
            } else {
              setProviderWindow();
            }


          }, []);











  return (
    <Container >


      <div className={styles.eachsectioncover}>

            <div className={styles.logoContainer}> 
                <h1> Streamifi </h1>
              </div>


              <div className={styles.linkContainer}>
                

                    <div  onClick={ () => goback("/marketplace/Marketplace") }><a className={styles.linkstyle}> Marketplace </a></div>
                    <div  onClick={ () => goback("/mintpage/Mintpage") }><a className={styles.linkstyle}> Create </a></div>
                    <div  onClick={ () => goback("/App") }><a className={styles.linkstyle}> App </a></div>



                    <div className={styles.connectButton}>

                      <button onClick={ !windoweth ? loginMobile : loginmetamask } > 
                         { responsiveMobile ? 
                           
                           <div>

                               { address ? shortenAddress(address)
                                :
                                 <AccountBalanceWalletIcon className={ styles.adjustwallet } />
                                }

                           </div>
                           :
                           
                            <>
                              <div> {address ? shortenAddress(address) : "Connect" } </div> 
                              <PersonIcon className= { styles.walletconnectIcon } /> 
                            </>
                          }


                          </button>

                    </div>

              </div>

      </div>







      <div className={styles.eachsectioncovertwo}>

                  

                      <div  onClick={ () => goback("/App") }><a className={styles.linkstyle}> Artists </a></div>
                      <div  onClick={ () => goback("/App") }><a className={styles.linkstyle}> Music </a></div>
                      <div  onClick={ () => goback("/App") }><a className={styles.linkstyle}> Hot trend </a></div>
                      <div  onClick={ () => goback("/App") }><a className={styles.linkstyle}> Top charts </a></div>
                      <div  onClick={ () => goback("/App") }><a className={styles.linkstyle}> Whats new </a></div>
                      <div  onClick={ () => goback("/App") }><a className={styles.linkstyle}> Explore </a></div>



      </div>







    </Container>
  )
}
