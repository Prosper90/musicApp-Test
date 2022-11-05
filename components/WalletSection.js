import React, { useEffect, useContext, useState } from 'react';
import styles from "../styles/Walletsection.module.css";
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import PersonIcon from '@mui/icons-material/Person';
import Contexts from './context/contextclass';
import { ethers } from "ethers";
import { shortenAddress } from "./utils/trauncate";
import { currencyTokenaddress, currencytokenABI, chainID } from "../components/utils/constants";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';



export default function WalletSection() {

  const responsiveMobile = useMediaQuery('(max-width: 531px)');
  const { address, setAddress, provider, setProvider, setTokenBalance, tokenbalance } = useContext(Contexts);
        /* global BigInt */



  //get balance
  const getBalance = async () => {
    //check if wallet is connected
    if (address) {
      console.log("called balance");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let val =  String(await provider.getBalance(address));
      console.log(val);
      setTokenBalance(val);
      //setAccountDecimal(await transferToken.decimals());
      //console.log(AccountBalance);
      //console.log(AccountDecimal);
    }
  };



  useEffect(() => {

    getBalance();

  }, [])





  return (
    <div className="nc-HeaderLogged relative w-full z-40 ">

    <div className="nc-MainNav2Logged relative z-10 onTop ">

      <div className="flex mx-4 py-3 relative justify-between items-center space-x-4 xl:space-x-8">
        
        <div className="flex justify-between flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10 pr-10">
          <Link href="/"><a
            className="ttnc-logo inline-block text-primary-6000 "
          >
            <img
              className="block max-h-12 dark:hidden"
              src="/logo-light.efd6c8c15ce9ff0f90cc7add4d464ab1.svg"
              alt="Logo"
            />
            <img
              className="hidden max-h-12 dark:block"
              src="/logo-light.efd6c8c15ce9ff0f90cc7add4d464ab1.svg"
              alt="Logo-Light"
            />
          </a></Link>

          {/* Left here */}

          { responsiveMobile ?
    
            <SearchIcon className='text-white' />
          :
          <form  className="relative">
              <input
                type="search"
                className="block w-full border-neutral-200 focus:border-primary-300 bg-transparent focus:ring focus:ring-primary-200 focus:ring-opacity-20 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-[42px] pl-4 py-3 pr-10 w-full"
                placeholder="Search items"
              />
              <span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </form>
            }


        </div>


        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 w-6/12">

        <div className="flex items-center xl:flex space-x-2 w-full">

            {/* Navigation */}
          

          {/* Navigation */}

              {/* Entered here */}


           {/* Another here */}

           <div className={styles.othersection}>
             
              <div className={styles.walletbalance} >

                <div className={styles.holdimgicon}>
                  <img src='/walletbalance.png' />
                </div>

                <div className={styles.holdwalletamount}>
                  { Math.round( (tokenbalance/10 ** 18) * 10 ) / 10 }  ETH
                </div>

              </div>

                  <img className={styles.imagelogo} src='/ethlogo.png' alt='chain-logo' />

            </div>
           {/* Another here */}


              <a
                className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-white text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                rel="noopener noreferrer"
              >
                {address ? shortenAddress(address) : "Connect wallet" }
              </a>



           <div />


        </div>




        </div>



      </div>

    </div>


  </div>

  )
}
