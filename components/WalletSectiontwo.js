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
import 'bootstrap/dist/css/bootstrap.css';



const Container = styled.div`

`



export default function Header() {

   const { address, setAddress, provider, setProvider, setOpen, setSeverity, setNotificationMessage } = useContext(Contexts);
   const router = useRouter();

   const [checkaccess, setcheckaccess] = useState(false);
   const [instanceset, setInstanceset] = useState();
   const [webModal, setWebModal] = useState();
   const [windoweth, setWindoweth] = useState();
   const [onmenu, setOnmenu] = useState(false);
   const [openTokens, setOpentokens] = useState(false);
   
 
   
   const responsiveMobile = useMediaQuery('(max-width: 765px)');
 
  const togglemenu = () => {
    setOnmenu(!onmenu);
  }


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
            import("bootstrap/dist/js/bootstrap");
            //console.log(window.ethereum);
            setWindoweth(window.ethereum);

            if(!window.ethereum) {
              setProviderMobile();
            } else {
              setProviderWindow();
            }


          }, []);











  return (
    <>
      <div className="nc-HeaderLogged relative w-full z-40 ">
        <div className="nc-MainNav2Logged relative z-10 onTop ">

          <div className="mx-4 py-3 relative flex justify-between items-center space-x-4 xl:space-x-8">
            <div className="flex justify-between flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10 pr-10">
              <Link href="/"><a
                className="ttnc-logo inline-block text-primary-6000 "
              >
                <img
                  className="block max-h-12 dark:hidden"
                  src="/logo.25debea968a8cdc57717f9110ced774d.svg"
                  alt="Logo"
                />
                <img
                  className="hidden max-h-12 dark:block"
                  src="/logo-light.efd6c8c15ce9ff0f90cc7add4d464ab1.svg"
                  alt="Logo-Light"
                />
              </a></Link>

              {/* Left here */}

            </div>


            <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">

            <div className="hidden items-center xl:flex space-x-2">

                {/* Navigation */}
              
              <div className="flex lg:space-x-4">

                <div className="lg:flex space-x-4 flex justify-between">

                  <div className="relative pt-2"  onClick={ () => goback("/mintpage/Mintpage") } >
                    <button
                      className="flex items-center justify-center px-1 py-1 text-sm rounded-full border focus:outline-none
                      border-neutral-300 dark:border-neutral-700
                        border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500
                        "
                      id="headlessui-popover-button-:ru:"
                      type="button"
                      aria-expanded="false"
                    >
                      <span className="ml-2">Mint music</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4 ml-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="relative pt-2"  onClick={ () => goback("/marketplace/Marketplace") } >
                    <button
                      className="flex items-center justify-center px-1 py-1 text-sm rounded-full border focus:outline-none 
                      
                        border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500
                        "
                      id="headlessui-popover-button-:r11:"
                      type="button"
                      aria-expanded="false"
                    >
                      <span className="ml-2">Marketplace</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4 ml-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>

                    </button>
                  </div>

                  <div className="relative pt-2" onClick={ () => goback("/dashboard/Dashboard") } >
                    <button
                      className="flex items-center justify-center px-1 py-1 text-sm border rounded-full focus:outline-none 
                      
                        border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500
                        "
                      id="headlessui-popover-button-:r14:"
                      type="button"
                      aria-expanded="false"
                    >
                      <span className="ml-2">Dashboard</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4 ml-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>


                                <li className="relative menu-item menu-dropdown " onClick={() => setOpentokens(!openTokens)}>

                                      <a
                                        rel="noopener noreferrer"
                                        id="headlessui-popover-button-:r0:"
                                        aria-expanded="false"
                                        aria-current="page"
                                        className="inline-flex items-center text-sm xl:text-base py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800"
                                      >
                                        Token
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          aria-hidden="true"
                                          className="ml-1 -mr-1 h-4 w-4 text-neutral-400"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </a>


                                      {openTokens && 
          
                                        <div id="headlessui-disclosure-panel-:r3b:" className="absolute z-100 bg-[#111827] rounded mt-2">
                                            <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base ">
                                              <li>
                                                <a
                                                  aria-current="page"
                                                  className="flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] text-secondary-500"
                                                  href="/ciscryp"
                                                >
                                                  <span className="block w-full">About streamifi</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] text-neutral-900"
                                                >
                                                  <span className="block w-full">Tokenomics</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] text-neutral-900"
 
                                                >
                                                  <span className="block w-full">Whitepaper</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  className="flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] text-neutral-900"
                                                >
                                                  <span className="block w-full">Team</span>
                                                </a>
                                              </li>


                                            </ul>
                                          </div>
                                        
                                        
                                        }


                                </li>



                </div>
                

              </div>
              {/* Navigation */}

                  {/* Entered here */}


                <a
                  className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-white text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                  rel="noopener noreferrer"
                  onClick={ !windoweth ? loginMobile : loginmetamask }
                >
                  {address ? shortenAddress(address) : "Connect wallet" }
                </a>
                <div />


              </div>


              <div className="flex items-center space-x-3 xl:hidden">


                <button className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center" onClick={togglemenu} >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

            </div>



          </div>
        </div>
      </div>



    {/* Secnd header */}
    
    <div className="w h-[1px] bg-neutral-100 dark:bg-neutral-700" />
    {/* Seperate */}



    {/*here ne */}
    <div className="flex flex-col lg:flex-row lg:items-center justify-between items-center space-y-6 lg:space-y-0 lg:space-x-2 " style={{padding: '8px'}}>
  <nav
    className="nc-Nav relative flex items-center w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
    data-nc-id="Nav"
  >
    <ul className="flex justify-between sm:space-x-2 w-full" style={{margin: '0px'}}>
      <li className="nc-NavItem relative" data-nc-id="NavItem">
        <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full bg-primary-100/90 dark:bg-primary-100 text-primary-900  focus:outline-none">
          Games
        </button>
      </li>
      <li className="nc-NavItem relative" data-nc-id="NavItem">
        <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-800 hover:bg-neutral-100/75 dark:hover:bg-neutral-800 focus:outline-none">
          Whale labs
        </button>
      </li>
      <li className="nc-NavItem relative" data-nc-id="NavItem">
        <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-800 hover:bg-neutral-100/75 dark:hover:bg-neutral-800 focus:outline-none">
          Token
        </button>
      </li>
      <li className="nc-NavItem relative" data-nc-id="NavItem">
        <button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-800 hover:bg-neutral-100/75 dark:hover:bg-neutral-800 focus:outline-none">
          Ticker+price
        </button>
      </li>
      <Link className="nc-NavItem relative" data-nc-id="NavItem" href="/artists/Artists" >
        <a><button className="block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-800 hover:bg-neutral-100/75 dark:hover:bg-neutral-800 focus:outline-none">
           Artists
        </button></a>
      </Link>
    </ul>
  </nav>

</div>
    {/* here ne */}
      
      <div className="w h-[1px] bg-neutral-100 dark:bg-neutral-700" />


      {/* menu open  */}

       { onmenu && 

<div
className="fixed inset-0 z-50 overflow-y-auto"
id="headlessui-dialog-:r1i:"
role="dialog"
aria-modal="true"
>
<div className="fixed left-0 top-0 bottom-0 w-full md:w-auto z-max outline-none focus:outline-none">
  <div className="z-10 relative opacity-100 translate-x-0">
    <div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <a
          className="ttnc-logo inline-block text-primary-6000 "
          href="/ciscryp"
          tabIndex={0}
        >
          <img
            className="block max-h-12 dark:hidden"
            src=" /logo.25debea968a8cdc57717f9110ced774d.svg"
            alt="Logo"
          />
          <img
            className="hidden max-h-12 dark:block"
            src=" /logo-light.efd6c8c15ce9ff0f90cc7add4d464ab1.svg"
            alt="Logo-Light"
          />
        </a>
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life.
            Write your stories and share them
          </span>
          <div className="flex justify-between items-center mt-4">
            <nav
              className="nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 "
              data-nc-id="SocialsList"
            >
              <a
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <img
                  src=" /facebook.8291c7f7c187e8f09292cced2ed0278d.svg"
                  alt=""
                />
              </a>
              <a
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
              >
                <img
                  src=" /twitter.f56ce1bc9eb5120250ac80ed561cf82f.svg"
                  alt=""
                />
              </a>
              <a
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                title="Youtube"
              >
                <img
                  src=" /youtube.bb2387598b5621f3a2e92ab928da4fe0.svg"
                  alt=""
                />
              </a>
              <a
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
              >
                <img
                  src=" /telegram.5acad1587076bc12320cadff0f4aa3f3.svg"
                  alt=""
                />
              </a>
            </nav>
            <span className="block">
              <button className="text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                <span className="sr-only">Enable dark mode</span>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C13.0001 16.06 9.00009 11.97 8.98009 7.13996C8.97009 5.83996 9.24009 4.60996 9.73009 3.48996C10.2701 2.24996 9.62009 1.65996 8.37009 2.18996C4.41009 3.85996 1.70009 7.84996 2.03009 12.42Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700  focus:outline-none" onClick={togglemenu}>
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        <li className="text-neutral-900 dark:text-white" onClick={() => setOpentokens(!openTokens)}>
          <>
          <a
            aria-current="page"
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-secondary-500"
          >
            <span className="text-white">Token</span>
            <span className="block flex-grow">
              <span
                className="flex justify-end flex-grow"
                id="headlessui-disclosure-button-:r1k:"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 h-4 w-4 text-neutral-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </span>
          </a>


          {openTokens && 
          
          <div id="headlessui-disclosure-panel-:r3b:">
              <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
                <li>
                  <a
                    aria-current="page"
                    className="flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] text-secondary-500"
                    href="/ciscryp"
                  >
                    <span className="block w-full">About streamifi</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] text-neutral-900"
                  >
                    <span className="block w-full">Tokenomics</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] text-neutral-900"
                  >
                    <span className="block w-full">Whitepaper</span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex px-4 py-2.5 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px] text-neutral-900"
                  >
                    <span className="block w-full">Team</span>
                  </a>
                </li>


              </ul>
            </div>
          
          
          }
           

          </>
        </li>





        <li className="text-neutral-900 dark:text-white"  onClick={ () => goback("/mintpage/Mintpage") } >
          <a
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg "
          >
            <span className="block w-full text-white">Mint music</span>
          </a>
        </li>


        <li className="text-neutral-900 dark:text-white" onClick={ () => goback("/marketplace/Marketplace") } >
          <a
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg "
          >
            <span className="block w-full text-white">Marketplace</span>
          </a>
        </li>


        <li className="text-neutral-900 dark:text-white" onClick={ () => goback("/dashboard/Dashboard") }>
          <a
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg "
          >
            <span className="block w-full text-white">Dashboard</span>
          </a>
        </li>


        <li className="text-neutral-900 dark:text-white">
          <a
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg "
          >
            <span className="block w-full text-white">App</span>
          </a>
        </li>



        <li className="text-neutral-900 dark:text-white">
          <a
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg "
          >
            <span className="block w-full text-white">Help center</span>
          </a>
        </li>





      </ul>
      <div className="flex items-center justify-between py-6 px-5 space-x-2">
        <a
          className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 !px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
          rel="noopener noreferrer"
        >
          Create
        </a>

        <div className="relative" onClick={ !windoweth ? loginMobile : loginmetamask }  >

          <a
            className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-2 py-3 sm:px-6  ttnc-ButtonSecondary border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
            rel="noopener noreferrer"
          >
            {address ? shortenAddress(address) : "Connect Wallet" }
          </a>

        </div>

      </div>
    </div>
  </div>
  <div
    className="fixed inset-0 bg-neutral-900 bg-opacity-50 opacity-100"
    id="headlessui-dialog-overlay-:r1p:"
    aria-hidden="true"
  />
</div>
</div>

       }

      {/* menu open */}

  </>

  )
}
