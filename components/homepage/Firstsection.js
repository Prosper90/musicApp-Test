import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Contexts from 'components/context/contextclass';
import ScrollContainer from 'react-indiana-drag-scroll';
import { shortenAddress } from 'components/utils/trauncate';




export default function Firstsection() {

  const { address, setAddress, provider, setProvider, setOpen, setSeverity, setNotificationMessage } = useContext(Contexts);
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [holdArtists, setHoldartist] = useState([]);
  const [colortrack, setColortrck] = useState('new');


  const goback = (link) => {

    if(!address){
        setOpen(true);
        setSeverity("error");
        setNotificationMessage("Please connect your wallet to proceed");

        return ;
      }


      router.push(link);
      
  }



  let holdvalue = "test";
  let instance ;

  const play = (value) => {
    //console.log(value);
    console.log(holdvalue);
    console.log(instance);

    if(holdvalue == value){
      console.log("Entered");
      instance.pause();
      holdvalue ="emptyIt";
      return;
    }

    let audio = new Audio(value);


    holdvalue = value;
    instance = audio;
    audio.play();
  }


  const getArtists = async () => {

    const createuserbuyer = await fetch(`https://streamifi-backend.herokuapp.com/users`, 
        {
            method: 'GET',   
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        }
      );
      const value = await createuserbuyer.json();
      console.log(value);
      
      const creators = value.user.filter((data) => {
        return data.creator;
      })
      //console.log(creators);
      setHoldartist(creators);
      setArtists(creators);

  }


  const shownew = (value) => {
    console.log('clicked and called');
    if(value == 'popular') {

      const rearrange = holdArtists.filter((data) => {
        return data.creator && data.sold > 4 ;
      })
      setColortrck('popular');
      setArtists(rearrange);

    } else {

      const creators = holdArtists.filter((data) => {
        return data.creator;
      })
      //console.log(creators);
      setColortrck('new');
      setArtists(creators);

    }

  }




  const checkUser = (selectedItem) => {

    if(!address){
      setOpen(true);
      setSeverity("error");
      setNotificationMessage("Please connect your wallet to proceed");

      return ;
    }

    console.log(selectedItem);
    router.push("/artistsongs/"+selectedItem);


}



  useEffect(() => {

    getArtists();

  }, [])



  return (

    <div className="nc-PageHome relative overflow-hidden">
  <div
    className="nc-BgGlassmorphism absolute inset-x-0 md:top-10 min-h-0 pl-20 py-24 flex overflow-hidden z-0"
    data-nc-id="BgGlassmorphism"
  >
    <span className="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96" />
    <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000" />
  </div>
  <div className="mx-4 relative mt-5 mb-20 sm:mb-24 lg:mt-20 lg:mb-32">
    <div className="nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] text-white">
            Truely Decentralised Music 🖼
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Discover music NTFs in the first of its type. <br />{" "}
            Create your music as NFTS.
          </span>
          <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
            <span>Start your search</span>
            <span>
              <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
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
          </button>
        </div>
        <div className="flex-grow">
          <img
            className="w-full"
            src="/hero-right-3.2c590fa44020b6330821.png"
            alt="hero"
          />
        </div>
      </div>
      <div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full">
        <div
          className="nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 "
          data-nc-id="HeroSearchForm"
        >
          <form className="arrange w-full relative xl:mt-8 flex flex-col lg:flex-row rounded-[30px] md:rounded-[36px] lg:rounded-full shadow-xl dark:shadow-2xl dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0" style={{backgroundColor: '#1F2937 !important'}} >
            <div className="relative flex flex-1 lg:flex-[1.5]">
              <div className="flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ">
                <div className="text-neutral-300 dark:text-neutral-400">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 5H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 8H17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
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
                </div>
                <div className="flex-grow">
                  <input
                    className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
                    placeholder="Seach NFTs"
                    defaultValue=""
                  />
                  <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                    <span className="line-clamp-1">
                      What are you looking for?
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex relative flex-1">
              <button
                className="flex text-left flex-1 items-center [ nc-hero-field-padding ] space-x-3 focus:outline-none cursor-pointer "
                id="headlessui-popover-button-:rf:"
                type="button"
                aria-expanded="false"
              >
                <div className="text-neutral-300 dark:text-neutral-400">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-grow">
                  <span className="block xl:text-lg font-semibold min-w-[130px] text-white" >
                    Item type
                  </span>
                  <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                    Type of item
                  </span>
                </div>
              </button>
            </div>
            <div className="flex relative flex-1">
              <button
                className="flex text-left flex-1 items-center [ nc-hero-field-padding ] space-x-3 focus:outline-none cursor-pointer "
                id="headlessui-popover-button-:ri:"
                type="button"
                aria-expanded="false"
              >
                <div className="text-neutral-300 dark:text-neutral-400">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.30011 18.0399V16.8799C6.00011 15.4899 4.11011 12.7799 4.11011 9.89993C4.11011 4.94993 8.66011 1.06993 13.8001 2.18993C16.0601 2.68993 18.0401 4.18993 19.0701 6.25993C21.1601 10.4599 18.9601 14.9199 15.7301 16.8699V18.0299C15.7301 18.3199 15.8401 18.9899 14.7701 18.9899H9.26011C8.16011 18.9999 8.30011 18.5699 8.30011 18.0399Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-grow">
                  <span className="block xl:text-lg font-semibold text-white" >
                    Sale type
                  </span>
                  <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                    Type of sale
                  </span>
                </div>
              </button>
            </div>
            <div className="flex relative flex-[1.5]">
              <div className="flex-1  flex flex-col sm:flex-row justify-between cursor-pointer">
                <button
                  className="flex items-center flex-1 text-left items-cente space-x-3 focus:outline-none [ nc-hero-field-padding ] "
                  id="headlessui-popover-button-:rl:"
                  type="button"
                  aria-expanded="false"
                >
                  <div className="text-neutral-300 dark:text-neutral-400">
                    <svg
                      className="nc-icon-field nc-icon-field-2"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx={12}
                        cy={12}
                        r="7.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M14.25 8.75H11.375C10.4775 8.75 9.75 9.47754 9.75 10.375V10.375C9.75 11.2725 10.4775 12 11.375 12H12.625C13.5225 12 14.25 12.7275 14.25 13.625V13.625C14.25 14.5225 13.5225 15.25 12.625 15.25H9.75"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 7.75V8.25"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 15.75V16.25"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <span className="block xl:text-lg font-semibold truncate min-w-[170px] text-white">
                      0.01ETH ~ 10ETH
                    </span>
                    <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                      Price range
                    </span>
                  </div>
                </button>
                <div className="sm:pr-1 md:pr-2 xl:pr-4 flex items-center">
                  <a
                    type="button"
                    className="h-14 px-4 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
                  >
                    <span className="mr-3 md:hidden">Search</span>
                    <svg
                      width={24}
                      height={24}
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
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      className="nc-SectionHowItWork  mt-24 lg:mt-40 xl:mt-48"
      data-nc-id="SectionHowItWork"
    >
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <img
          className="hidden md:block absolute inset-x-0 -top-1"
          src="/VectorHIW.1a377ddaa77cc48b5b38a6739a397aff.svg"
          alt="vector"
        />
        <div className="relative flex flex-col items-center max-w-xs mx-auto">
          <div
            className="nc-NcImage mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
            data-nc-id="NcImage"
          >
            <img
              src="data:image/png;base64,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"
              className="object-cover w-full h-full"
              alt="nc-imgs"
            />
          </div>
          <div className="text-center mt-auto space-y-5">
            <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-blue-800 bg-blue-100  relative">
              Step 1
            </span>
            <h3 className="text-lg font-semibold text-white">Filter &amp; Discover</h3>
            <span className="block text-neutral-500 dark:text-neutral-400">
              Connect with wallet, discover, buy NTFs, sell your NFTs and earn
              money
            </span>
          </div>
        </div>
        <div className="relative flex flex-col items-center max-w-xs mx-auto">
          <div
            className="nc-NcImage mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
            data-nc-id="NcImage"
          >
            <img
              src="data:image/png;base64,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"
              className="object-cover w-full h-full"
              alt="nc-imgs"
            />
          </div>
          <div className="text-center mt-auto space-y-5">
            <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-pink-800 bg-pink-100  relative">
              Step 2
            </span>
            <h3 className="text-lg font-semibold text-white">Connect wallet</h3>
            <span className="block text-neutral-500 dark:text-neutral-400">
              Connect with wallet, discover, buy music NTFs, sell your NFTs and earn
              money
            </span>
          </div>
        </div>
        <div className="relative flex flex-col items-center max-w-xs mx-auto">
          <div
            className="nc-NcImage mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
            data-nc-id="NcImage"
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAC61BMVEUAAAACAgKDhY0MDA4DAwTs4s3w2sTi4toGBgbu7Ojr6eJ7foYCAgICAgLd07jw4cABAQHo6OkQEhUZGiDt2aE4PUsCAwPu3Kzl5ebq5t/q6eRMTlbp5d3m5ufn5+djZ3MPEBM7P0zt6uba2tvm5ubn5+e9vcHEomcAAAARERPe29fUs3Pu2qQmKTHu3Kje3t7u7u/p1J4sLzrq6uvs7OzMzM4HBwgqLDLQ0dJiZXDs2abp1KC2rJ/Hp3Hk5OS8vcDGxsjr2KdjZnBUV2JRVF8BAQFGSFBmanPu3KiwsLR4fYby4LOIfW99fYy/mVdZXWrMzM3q6+tCRlPu7u4WGB3v3ahmaneAgo3t3bIxND9hZXGys7fFoV/l4+XXuX66klHjzZzu376anaPr16CcnaHr6+ufoKTu2qS9llV0eIOzs7Xt2qWVmJ4AAADKys3i4+Pm5ufn6Ojh4eLe39/Y2Nnp6erf4OHk5OXW1tjm5eXd3d7Ky83nz5Lq05jP0NHq6uvT09Xa2tvR0tPIycvlzI7Gx8nb29zMzc/s153U1dbly4vr1Zvp0pXnzo/c3N3o0JTs7OznzIvjyYnAwcPlyoljZ3NgZHBXW2jExchPU2G7vL9obHdbX2zOztC9vsG1trpqbniwsbWtrrLhw3+4ubzq0ZLlyYZwc33BwsVtcHqpqq7u26R2eILs1ZlTWGXv7+/i396ztLeQkpiAgotmaXVLUF6KjJPixoTbtGtITVrk4+PR0dLDxMXpz494e4Xm4t/s15/r05WHiZDev3pRVmPt2aFydoC9llTo5uXf29mUlpx9gIjaunW6ur2goaaXmZ/nyYJDR1akpqrlxX7ozIjkw3k5PEebnaPb1dLhvnXkv3HeuXDJpGDZqVk/Q1DRrmriuWfar2HNlkXBjEM0N0LSqmHZrF/lz5/j28zq16vhyZLewojSolbHmFDSnU/fzqzXv5XRupLIsIzXuX7a0L+8fzvGuqzNupq4lWQxTA04AAAAb3RSTlMABv4NLgsCBTdXF/62pyH+ficjGe7ldG+CdGdFPzX07N67paKdjINoaFFQ/vfm5ODdysnGr6CebmxrWkwy+u/o3NvHsquVjomHXjkzHxHt6+rp6c7GuKillP339evn5+bl5OTj2NbV0MK/u6yohGa6EaAWAAAL70lEQVRo3uyWP2wScRTHu9SmHWxMmlRNdWh0UdO00anGwc3EyRgTJ6MxxsGhpYXCwYFtORCPO46jDF3q4OUuTRpSNi5tL0AICSQdSICkgKRAU2rtH63VxNH34JD6J0ATnex3Igyfz++93/s9aDvJSU5ykpP8BznV3t7e0faPcnr44YPbAz09A89f9N7t+Ov03qFrCwtRSKiS23dO/018+52eBQjSHbVcu3Pq+KCOrlN/avzwANIdopTOZLPppKSYnZih4xbReX1xcfF+//kLP1u6HiA+nCwUsslEQkokkum0xKCh5+ax+OfcbvdiJYP9ffVLvIm9F7OFdEoMY0RR4VOJZIoxm809w8fgn9G53S9f1iSDl89Uv+6F4zuShaTog0DrARxmSJaXEhwa7rY+4deRj3GrkhsXVD6TzSo+ZzRqzjhCTlk0Vw2pFMcwzFB7yxdQ5esgqECJ+9IZ6A+0J43Hj4bYvCPElBU4OIMGHgycubfVBg0CXRVo9LVSgj3RqFJIh4EfdoS8+04HVwRZmGE4NCgcxz3taq1BN1Q88jWERldNbNshZpOMryow0w4ITE+YF38ImNZK6KzjjyQWC4YyadGM3NoLc2JSSZIjKZ4FDznQyi10DcIFIL3KH8WgAAxbvBj21eAMxyDfzORYEktAQaizBcFZ4KOgzkdDbDRGEMEtVgw7ncj37e/nC4mKQKZBQPEKQ5JMfytPAPi/4IlRxBNLwfcUmywWFeD69tKSlHDCFLHlqoAFAdndvEd4wzXBaD0VftD/kZaSCREPXvQqioiCQpFFAc2HSZbs7mu6inVqEP+7IE7RNA/Py2nO84wZ4y0nlKoA3gPb3fQSLlfQml8KgM8o8PvjHz1eGgRHwvAJlq0KKKr7XLMdfQ/RFSZ66gJNRRCPfwlIXoVjjvAZLiMAHwRUC4JOLAAboieQqkE48nU6+A4Fa0JA4knYPIFMTs6wyOcEmUIBh4LzTQp4hnwQ6PUjI3qNGh0OVk2wIwS8JMlxX3flXCaLfC5dpinaq0CHyO4rLRaAAlToMJWlqiFiBAo+RQSJhYHcjUgwpxwmU6YhIvRpq/tukzUNArxQF/IxhAbgEB0xtkTEgvE1EEQCFMWSxSSdSuECItm8TNNevALP9pOOhoILtfHU1wTwYco+pTW8Xja4JogYCA5WM4KHpthcgldgCUFy+wIIRJKiPdsPG3foEvLrLULByPScxTI9+dpg0Br9hH9t+UDOCTCqFE2qiZRkLxTAQQEftvsar7mLdYF6CUaLyfTKsjyNApffH1yb+xwRhIAHaqBYfMFCviRLXq9XYSmPsHW7cYfOqisCe1TJxKTJal15NWeBCrTaKb/fGF+5tVo3RPKlUllAPg8NCuxsNf49aL+nqwmwhompaZPVZrNZoYTpimB8yT8FAkgk4NnbpKj1jZwgeVS+Z/XD48ar7ry6pUf1Y+N2w6RlDvizs7M2KwqAb7ePLMVN3zYgshD4KtNUpBg4wj/cGW48o/dxgkYmxo04NpPTllcm2+z8/PyKzWSZNGgNdpdrnBjTft7Y291cFQIbOQ+dlmt8yrN69XCorWH6RuFex4DvmlIFVtvKzMzM/KwVBVqX0Whcivm1B+82QSCU5Jyclyv9Z/H861cfNfn32I98EIy7gK8K5t++eTOzYp2b1NpdxnEIoRlzfTlc39wrleTdvCxIUoqlkP9u/erNtiYz+p3x8gdxGgzD+C1VUBDcVNTBv6CDk+Dgv1VQcVdxE3EwNQlp2kDIH9LQJYNFKJEkJhaulhtsT1TaomDByp1V6OJScBJEB8VBV5/nM6ig5+Vpueu1x/P73vf93vf7mgNqTFGjIVLUicMw7hAQwF3Ds3qzIikfvszfPxmPxxhLYvmP383nJw6uN0fFzpfhE4gasMhIkQCYeh3eEAnYw4PKs8+fxpyrcL91azyfTC4dXPeoFP7wAEDFbECODLclAIaj1jQZ0hCfPBDH28sPcKaw/Mlkcv74ev6lPEMA1Oo5ASGwyi2/UVdkKa8QCJVqFc8PHx+j3+4dnsP/2tmF9XQoD4AWIkd5DOwDS1UkKAfUZGlQqQwGlQcfx6/e0f7KwQLfb/ZJAiAcGIKIgYVGm6mBhrHKCAU+0BgOMA++T5idgxuL3Ecv/45AIcHOEY5jocIc278Adl3RZEUDQVK/fcXqi2hXJc8BCVyljW4jA1OUBeD6cwDYdoCu1viu/GDvQiEdagj/nwRIYiElzYbqNaakIj4nnDtAVes1RZb5XyeLXdmPxS1VFgBIuinONUmyTTYw/YXyDDF3gqDxxKtuLwQ4gP3uBiJHcpmXIOZE8w1HgX8OwGe/dpiuk8APKnuKAabtdhibNMtPTERju65rg0jCH2OEAIvzOxCEHcUA7XaCR8tGWhk47Wqq4XmRBsmAcP0oLgHwx97Ks1SwBqVTSZL1kqTDDZ7XM9CNUcuzFSjvDyYoBziMgVnat1BMxy+mkCdL3H0iHUFd971mx4cvhcVDwh7+P28aJGzl8nZu37Z//7YdeL22zqRZW2chRQTMtgpA3GzpNqTCmRL5x/rNiATVru1nEx0hHfu5vnfT/wgJ3DkuUQEt4HZv+C7OmwieeFB4RXv6+4xBV4+U0EM6sQ3uLP3I/+6mexWhahmnAtZsRUPD7MRNY2jiYgRZlEN7jCiDhIa6Ey0EjjUcmsOhBYi6bc3RsfGImHXSTfjXbNVxwyQxvWbTMygftyMYm0P+hL8r7mN76W+pemQYnngHiDVnxzYxI3EkarDX/STN0llojjojXl081yUlwkPYux6ZF7YslE7Df4ixPuL9JnKGlnV0jVuRzP4ql9VOkrSnvX5/pf/86Rs38tDjcQyMgFC0xx/4dQwNZOiO1zLcZtwRMZBxdOO/juTd5SqarNHtr8zSXvvt06WlF4uLj1K3lfZIDHl/ASQXXo1GRzcsHD+FZHXCKW6Ynu+j9lDk3fiXP8dlPV1dWu13e9Pe5hcvFu/fv7M862XdbpalPSBiMEYtqjlNu9Pw1JbSuatJHPssuYUKO5HfzGazpPl3krae5Oxx3i4/XVpdycLwOczv373zcDVLX0OzLhBJG7kKk+z1yqPnUDc8ffrC9X7WnhrYr5Rl9pZvP1xcfpMd+PvA/NFu+bu2DURxPJE9GJxAsbGheHC92YMXF2y85icNDYEQEtqxdCm0U/dAGzpkNndC6FLLQqBIHAJLJ4EoaBBGg4Rt7CHePOUP6TvhoeCkdOzgzyRO0vf77t67u8ePml8L2wsFb6L1YlkxDIUx5KjzKbAAC1g4c2E7lNIgn08Se6ANtPveVB337qB6oWa/3w0DQlDk2PM3a00XlOetGnoxaJl9k2IkK4osMyyosc2Jp3EYwIgCxjonhqUb9Mc9bdi7gdYgzb820UURK1G4WOshX379pnmBgQhCMiOiSJACBghhb+EBDlXwCoQYAxtvaE7mQ03jt8jtzzQ79wNVFZBoETn5vLbFXl9PvCSSsWhJnBGRIU6FITwNBaoQkWONXNf33ZFIMAp6Q9M0taHXH4yvf0CC+sNJoDhTCv9biJ6s3fg3C1ugYECskST5vk90SlMHAXPlkeT6s+VDytIfiTg2TUi5qbNYHYwn9mQ+jQiWdeICFrtaP6o/2J4T6DJXs6QRzDJwHMoMpouSxOOecfnHFHCwcH7hxV4E4TimKiSJo8AMUZR3fRdmWH2iyzu9EvJUlxEmAEZGIIQwYCDFB0B9+dB8xWk23z0+zMSDykcvbxBwR/0BJAaCEomRCDKxwKi79RQnnyJDZgiyyIwoL4ShkFCDSTNgWWpd7KzY3bloLo+yhYqggCrEa/clXwIsoguQLoTR8XOn6clllSGEFCMKHDBwgkg+Oy+VWq324WG7vbuiffil3Mhls8cYMuO7EokhBN+FBz1xAkNGl3/pI98eVxnsMJ0GicP133fq9XoZeLGiXK7XG41cLgvsWSKvCLJXAlq1mlXd61Yq3e7p1vNkirmDs/2jTqfROdqvYnE/xwG9lEKhUCxmONuZTLFQEd3zWq120EhfFWFoe+uf2E4BmWIls/0Ha98UuBuMb9iwYcP/zm/X9LtxHXkBrAAAAABJRU5ErkJggg=="
              className="object-cover w-full h-full"
              alt="nc-imgs"
            />
          </div>
          <div className="text-center mt-auto space-y-5">
            <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-yellow-800 bg-yellow-100  relative">
              Step 3
            </span>
            <h3 className="text-lg font-semibold text-white">Mint music</h3>
            <span className="block text-neutral-500 dark:text-neutral-400">
              make your already made music into nfts and sell without fear of piracy
            </span>
          </div>
        </div>
        <div className="relative flex flex-col items-center max-w-xs mx-auto">
          <div
            className="nc-NcImage mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
            data-nc-id="NcImage"
          >
            <img
              src="data:image/png;base64,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"
              className="object-cover w-full h-full"
              alt="nc-imgs"
            />
          </div>
          <div className="text-center mt-auto space-y-5">
            <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-green-800 bg-green-100  relative">
              Step 4
            </span>
            <h3 className="text-lg font-semibold text-white">Earn money</h3>
            <span className="block text-neutral-500 dark:text-neutral-400">
              Make more money with every music trend, by buying music in the marketplace
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="bg-[#000]-100/70 dark:bg-black/20 py-20 lg:py-32">
    <div className="container">
      <div className="nc-SectionLargeSlider relative ">
        <div className="nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse lg:flex-row justify-end ">
          <div className="lg:absolute z-10 lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 -mt-2 lg:mt-0 sm:px-5 lg:px-0 w-full lg:max-w-lg " >
            <div className="nc-CardLarge1__left p-4 sm:p-8 xl:py-14 md:px-10 bg-white dark:bg-neutral-900 shadow-lg rounded-3xl space-y-3 sm:space-y-8 " style={{backgroundColor: '#1F2937 !important'}} >
              <h2 className="text-2xl lg:text-3xl 2xl:text-5xl font-semibold ">
                <a title="Walking On Air" className='text-white'>
                  First Minted
                </a>
              </h2>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-12">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-10 h-10 ring-1 ring-white dark:ring-neutral-900">
                      <img
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                        src="/author3.png"
                        alt="John Doe"
                      />
                      <span className="wil-avatar__name">J</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-xs dark:text-neutral-400">Creator</div>
                    <div className="text-sm font-semibold flex items-center">

                      <span>
                          <img
                            className="hidden max-h-12 dark:block"
                            src="/logo-light.efd6c8c15ce9ff0f90cc7add4d464ab1.svg"
                            alt="Logo-Light"
                            
                            style={{width: '60%', paddingTop: '4px'}}
                          />
                      </span>


                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="flex flex-col sm:flex-row items-baseline p-6 border-2 border-green-500 rounded-xl relative">
                  <span className="block absolute bottom-full translate-y-1.5 py-1 px-1.5 dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400 ring ring-offset-0 ring-white dark:ring-neutral-900" style={{backgroundColor: '#1F2937 !important', border: 'none'}} >
                    Current Price
                  </span>
                  <span className="text-3xl xl:text-4xl font-semibold text-green-500">
                    1.000 ETH
                  </span>
                  <span className="text-lg text-neutral-400 sm:ml-3.5">
                    (≈ $3,221.22)
                  </span>
                </div>
              </div>
              <div className="space-y-5">
                <div className=" text-white dark:text-neutral-400 flex items-center space-x-2 ">
                  <span className="text-white leading-none mt-1">Sailor</span>
                </div>
                
                <div className="flex space-x-5 sm:space-x-10">
                  <div className="flex flex-col items-center text-neutral-500">
                         First music nft for this project, created on date, it represents the value of the project
                  </div>
                </div>

              </div>
              <div className="w h-[1px] bg-neutral-100 dark:bg-neutral-700" />
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <a
                  className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                  rel="noopener noreferrer"

                >
                  Enjoy Good Music
                </a>

                <a
                  className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonSecondary border border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
                  rel="noopener noreferrer"

                  
                >
                  View Trending List
                </a>

              </div>
            </div>
            <div className="p-4 sm:pt-8 sm:px-10 ">
              <div
                className="nc-NextPrev relative flex items-center text-neutral-500 dark:text-neutral-400 "
                data-nc-id="NextPrev"
                data-glide-el="controls"
              >
                <button
                  className="w-11 h-11 text-xl mr-2 border-neutral-200 dark:border-neutral-6000 rounded-full flex items-center justify-center "
                  title="Prev"
                  data-glide-dir="<"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5 12H3.67004"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="w-11 h-11 text-xl  border-neutral-200 dark:border-neutral-6000 rounded-full flex items-center justify-center border-2"
                  title="Next"
                  data-glide-dir=">"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 12H20.33"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[64%] relative ">
            <div className="nc-CardLarge1__right ">
              <a>
                <div
                  className="nc-NcImage aspect-w-1 aspect-h-1 relative"
                  data-nc-id="NcImage"
                >
                  <img
                    src="/large1.501744b97da258c84cca.png"
                    className="absolute inset-0 object-cover rounded-3xl sm:rounded-[40px] border-4 sm:border-[14px] border-white dark:border-neutral-800"
                    alt="title"
                    style={{border: '1px solid #1F2937'}}
                  />
                </div>
              </a>
              <div className="bg-black/50  flex items-center justify-center rounded-full text-white absolute w-8 h-8 md:w-10 md:h-10 left-3 bottom-3 sm:left-7 sm:bottom-7 ">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="mx-4 relative space-y-24 my-24 lg:space-y-32 lg:my-32">
    <div className="nc-SectionMagazine8 relative ">
      <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-14 text-neutral-900 dark:text-neutral-50">
        <div className="max-w-2xl">
          <h2 className="flex items-center  flex-wrap  text-3xl md:text-4xl font-semibold">
            Listen NFTs audio live
          </h2>
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            Click on music icon and enjoy NTF music or audio{" "}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 2xl:gap-8">
      
        <div
          className="nc-CardNFTMusic relative group sm:col-span-3 xl:col-span-2"
          data-nc-id="CardNFTMusic"
        >
          <div className="">
            <div
              className="nc-NcImage block aspect-w-12 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0"
              data-nc-id="NcImage"
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                alt="nc-imgs"
              />
            </div>
          </div>
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
            <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white  !h-9">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-sm">22</span>
            </button>
          </div>


          <div className="w-11/12 max-w-[360px] transform -mt-32 relative z-10">
            <div className="px-5 flex items-center space-x-4 relative ">
              <div className="flex-grow flex justify-center">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAAAdCAYAAAAAaUg8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADZSURBVHgB7drLDoIwFEXRhi/XL6+PCTNPSS8gYa2pid2TkyKxtUm990e7AJ21dG7wjujtAnTWulPn0oCfjAQCI4EgjmT2h89RP5x01tK57Uv6np9X0VlL58rjFgTL2e+RR8/XOUZnre/5e19XVdeyzprP/6XjSp0etyAwEgiMBAIjgcBIIDASCIwEAiOBwEggMBIIPiN5tnONnq+z9nydVecf9R+dWTpr6Vx53IJgZCSz191R16XOWjqrHHWtztJZ606dHrcgMBIIjASCipGc/R57lM5at+l8Ab6JZwjCaizRAAAAAElFTkSuQmCC"
                  alt="musicWave"
                />
              </div>
              <div
                className="nc-ButtonPlayMusicRunningContainer select-none relative z-10"
                data-nc-id="ButtonPlayMusicRunningContainer"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-50 text-primary-500 cursor-pointer" onClick={() => play('/sample1.wav')}>
                  <svg
                    className="ml-0.5 w-9 h-9"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                    />
                  </svg>
                </div>


              </div>
            </div>
            <a
              className="block p-5 mt-5 dark:bg-neutral-800 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none"
              
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">NFT music #1132</h2>
                <div className="flex -space-x-1.5 ">
                     Icon
                </div>
              </div>
              <div className="w-full mt-1.5 flex justify-between items-end ">
                <div className="pt-3">
                  <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold ">
                    <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 ">
                      Price
                    </span>
                    <span className=" text-green-500 !leading-none">
                      1.000 ETH
                    </span>
                  </div>
                </div>
                <span className="block text-neutral-500 dark:text-neutral-400 text-xs">
                  54 in stock
                </span>
              </div>
            </a>
          </div>
          <a className="absolute inset-0 "  />
        </div>
        <div
          className="nc-CardNFTMusic relative group sm:col-span-3 xl:col-span-2"
          data-nc-id="CardNFTMusic"
        >
          <div className="">
            <div
              className="nc-NcImage block aspect-w-12 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0"
              data-nc-id="NcImage"
            >
              <img
                src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                alt="nc-imgs"
              />
            </div>
          </div>
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
            <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white  !h-9">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-sm">22</span>
            </button>
          </div>

          <div className="w-11/12 max-w-[360px] transform -mt-32 relative z-10">
            <div className="px-5 flex items-center space-x-4 relative ">
              <div className="flex-grow flex justify-center">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAAAdCAYAAAAAaUg8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADZSURBVHgB7drLDoIwFEXRhi/XL6+PCTNPSS8gYa2pid2TkyKxtUm990e7AJ21dG7wjujtAnTWulPn0oCfjAQCI4EgjmT2h89RP5x01tK57Uv6np9X0VlL58rjFgTL2e+RR8/XOUZnre/5e19XVdeyzprP/6XjSp0etyAwEgiMBAIjgcBIIDASCIwEAiOBwEggMBIIPiN5tnONnq+z9nydVecf9R+dWTpr6Vx53IJgZCSz191R16XOWjqrHHWtztJZ606dHrcgMBIIjASCipGc/R57lM5at+l8Ab6JZwjCaizRAAAAAElFTkSuQmCC"
                  alt="musicWave"
                />
              </div>
              <div
                className="nc-ButtonPlayMusicRunningContainer select-none relative z-10"
                data-nc-id="ButtonPlayMusicRunningContainer"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-50 text-primary-500 cursor-pointer" onClick={() => play('/sample2.wav')}>
                  <svg
                    className="ml-0.5 w-9 h-9"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <a
              className="block p-5 mt-5 dark:bg-neutral-800 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none"

            >
              
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">NFT music #1132</h2>

                <div className="flex -space-x-1.5 ">
                  Icon
                </div>

                
              </div>


              <div className="w-full mt-1.5 flex justify-between items-end ">
                <div className="pt-3">
                  <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold ">
                    <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 ">
                      Price
                    </span>
                    <span className=" text-green-500 !leading-none">
                      1.000 ETH
                    </span>
                  </div>
                </div>
                <span className="block text-neutral-500 dark:text-neutral-400 text-xs">
                  43 in stock
                </span>
              </div>
            </a>
          </div>
          <a className="absolute inset-0 " />
        </div>
        <div className="grid grid-rows-3 gap-6 xl:gap-8 sm:col-span-6 xl:col-span-2">
          <div
            className="nc-CardNFTMusic2 relative flex justify-between p-2 space-x-2 rounded-3xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-xl transition-shadow "
            data-nc-id="CardNFTMusic2"
          >
            <a className="flex-grow flex space-x-4">
              <div className="relative w-16 sm:w-24">
                <div
                  className="nc-NcImage absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
                  data-nc-id="NcImage"
                >
                  <img
                    src="https://images.pexels.com/photos/2179483/pexels-photo-2179483.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    className="object-cover w-full h-full"
                    alt="nc-imgs"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <h2 className="block font-medium sm:text-lg">NFT music #114</h2>
                <div className=" flex items-center pt-3 mt-1.5">

                  <div className="hidden sm:flex -space-x-1.5 ">
                     Icon
                  </div>

                  <div className="sm:ml-3.5">
                    <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold ">
                      <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 ">
                        Price
                      </span>
                      <span className=" text-green-500 !leading-none">
                        1.00 ETH
                      </span>
                    </div>
                  </div>
                  <span className="block ml-3.5 text-neutral-500 dark:text-neutral-400 text-xs">
                    1 of 100
                  </span>
                </div>
              </div>
            </a>
            <div
              className="nc-ButtonPlayMusicRunningContainer select-none flex items-center"
              data-nc-id="ButtonPlayMusicRunningContainer"
            >
              <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full dark:bg-neutral-900/50 text-primary-6000 dark:text-primary-200 shadow-lg cursor-pointer" onClick={() => play('/sample3.wav')}>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div
            className="nc-CardNFTMusic2 relative flex justify-between p-2 space-x-2 rounded-3xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-xl transition-shadow "
            data-nc-id="CardNFTMusic2"
          >
            <a className="flex-grow flex space-x-4">
              <div className="relative w-16 sm:w-24">
                <div
                  className="nc-NcImage absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
                  data-nc-id="NcImage"
                >
                  <img
                    src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    className="object-cover w-full h-full"
                    alt="nc-imgs"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <h2 className="block font-medium sm:text-lg">NFT music #114</h2>
                <div className=" flex items-center pt-3 mt-1.5">

                  <div className="hidden sm:flex -space-x-1.5 ">
                     Icon
                  </div>

                  <div className="sm:ml-3.5">
                    <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold ">
                      <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 ">
                        Price
                      </span>
                      <span className=" text-green-500 !leading-none">
                        1.00 ETH
                      </span>
                    </div>
                  </div>
                  <span className="block ml-3.5 text-neutral-500 dark:text-neutral-400 text-xs">
                    1 of 100
                  </span>
                </div>
              </div>
            </a>
            <div
              className="nc-ButtonPlayMusicRunningContainer select-none flex items-center"
              data-nc-id="ButtonPlayMusicRunningContainer"
            >
              <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full dark:bg-neutral-900/50 text-primary-6000 dark:text-primary-200 shadow-lg cursor-pointer" onClick={() => play('/sample4.wav')}>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div
            className="nc-CardNFTMusic2 relative flex justify-between p-2 space-x-2 rounded-3xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-xl transition-shadow "
            data-nc-id="CardNFTMusic2"
          >
            <a className="flex-grow flex space-x-4">
              <div className="relative w-16 sm:w-24">
                <div
                  className="nc-NcImage absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
                  data-nc-id="NcImage"
                >
                  <img
                    src="https://images.unsplash.com/photo-1557264305-7e2764da873b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                    className="object-cover w-full h-full"
                    alt="nc-imgs"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <h2 className="block font-medium sm:text-lg">NFT music #114</h2>
                <div className=" flex items-center pt-3 mt-1.5">

                  <div className="hidden sm:flex -space-x-1.5 ">
                    Icon
                  </div>

                  <div className="sm:ml-3.5">
                    <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold ">
                      <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 ">
                        Price
                      </span>
                      <span className=" text-green-500 !leading-none">
                        1.00 ETH
                      </span>
                    </div>
                  </div>
                  <span className="block ml-3.5 text-neutral-500 dark:text-neutral-400 text-xs">
                    1 of 100
                  </span>
                </div>
              </div>
            </a>
            <div
              className="nc-ButtonPlayMusicRunningContainer select-none flex items-center"
              data-nc-id="ButtonPlayMusicRunningContainer"
            >
              <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full dark:bg-neutral-900/50 text-primary-6000 dark:text-primary-200 shadow-lg cursor-pointer" onClick={() => play('/sample5.wav')}>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
here

    </div>
    <div className="relative py-20 lg:py-28">
      <div
        className="nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100/80 dark:bg-black/20 "
        data-nc-id="BackgroundSection"
      />
      <div
        className="nc-SectionGridAuthorBox relative "
        data-nc-id="SectionGridAuthorBox"
      >
        <div>
          <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
            <div className="flex flex-col items-center text-center w-full max-w-2xl mx-auto">
              <h2 className="flex items-center  flex-wrap justify-center text-3xl md:text-4xl 2xl:text-5xl font-semibold">
                Top List Creators.
              </h2>
            </div>
          </div>
          <nav
            className="nc-Nav mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
            data-nc-id="Nav"
          >
            <ul className="flex  p-1 dark:bg-neutral-800 rounded-full shadow-lg">
              <li className="nc-NavItem2 relative" data-nc-id="NavItem2">
                <button className= { colortrack == 'new' ? "block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full bg-primary-6000 text-primary-50 focus:outline-none" : "block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full text-neutral-6000 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900  focus:outline-none" } >
                  <div className="flex items-center justify-center sm:space-x-2.5 text-xs sm:text-sm" onClick={ () => shownew('new') }>
                    <span className="hidden sm:inline-block">
                      {" "}
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.4399 19.05L15.9599 20.57L18.9999 17.53"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>New</span>
                  </div>
                </button>
              </li>
              <li className="nc-NavItem2 relative" data-nc-id="NavItem2" >
                <button className= { colortrack == 'popular' ? "block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full bg-primary-6000 text-primary-50 focus:outline-none" : "block font-medium whitespace-nowrap px-3 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full text-neutral-6000 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900  focus:outline-none" } >
                  <div className="flex items-center justify-center sm:space-x-2.5 text-xs sm:text-sm " onClick={ () => shownew('popular') } style={{cursor: 'pointer'}} >
                    <span className="hidden sm:inline-block">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5 19.5H14.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.5 21.5V17.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>Popular</span>
                  </div>
                </button>
              </li>

            </ul>
          </nav>
        </div>

        <div className="grid gap-4 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

         {/* heretwo */}

          { artists?.map((data, index) => (

                  <div
                  className="nc-CardAuthorBox4 relative flex flex-col overflow-hidden group dark:bg-neutral-800 group rounded-3xl hover:shadow-xl transition-shadow "
                  data-nc-id="CardAuthorBox4"
                  key={index}
                  onClick={ () => checkUser(data) }
                  >
                  <div className="relative flex-shrink-0 h-36">

                    <div
                      className="nc-NcImage flex h-full w-full flex-shrink-0 rounded-3xl overflow-hidden"
                      data-nc-id="NcImage"
                    >
                      <img
                        src="https://images.pexels.com/photos/4800161/pexels-photo-4800161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        className="object-cover w-full h-full"
                        alt="nc-imgs"
                      />
                    </div>
                  </div>
                  <div className="pb-5 px-4 pt-1.5">
                    <div className="text-center relative flex items-center justify-center ">
                      <div className="relative">
                        <svg
                          className="mx-auto h-14 -mt-[38px] dark:text-neutral-800 dark:group-hover:text-neutral-800"
                          width={134}
                          height={54}
                          viewBox="0 0 134 54"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M101.734 19.8581C99.2658 17.4194 96.9737 14.8065 94.5052 12.1935C94.1526 11.671 93.6237 11.3226 93.0947 10.8C92.7421 10.4516 92.5658 10.2774 92.2131 9.92903C85.6895 3.83226 76.6974 0 67 0C57.3026 0 48.3105 3.83226 41.6105 9.92903C41.2579 10.2774 41.0816 10.4516 40.7289 10.8C40.2 11.3226 39.8474 11.671 39.3184 12.1935C36.85 14.8065 34.5579 17.4194 32.0895 19.8581C23.2737 28.7419 11.4605 30.4839 -0.176331 30.8323V54H16.3974H32.0895H101.558H110.197H134V30.6581C122.363 30.3097 110.55 28.7419 101.734 19.8581Z"
                            fill="currentColor"
                          />
                        </svg>
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                          <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-12 h-12 text-2xl ">
                            <img
                              className="absolute inset-0 w-full h-full object-cover rounded-full"
                              src="/author3.png"
                              alt="John Doe"
                            />
                            <span className="wil-avatar__name">J</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-start items-center justify-between">
                      <div>
                        <h2 className="text-base font-medium flex items-center">
                          <span className="text-white">{shortenAddress(data.address)}</span>
                          <span className="ml-1">
                            <svg className="w-5 h-5" viewBox="0 0 17 17" fill="none">
                              <path
                                d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                                fill="#38BDF8"
                                stroke="#38BDF8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </h2>

                      </div>
                      <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium px-4 py-2 min-w-[84px]  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 relative z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                        Songs
                      </button>
                    </div>
                  </div>
                  <a className="absolute inset-0"  />
                  </div>

          )
           ) }

          {/* heretwo */}




        </div>



        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-5">
          <Link href='/artists/Artists'>
          <a className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonSecondary border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
            Show me more
          </a>
          </Link>
          <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0" onClick={ () => goback("/mintpage/Mintpage") } >
            Become an author
          </button>
        </div>
      </div>
    </div>
    <div className="nc-SectionSliderCardNftVideo ">


      {/* Section explore */}
      <div className="glidejs_ro_ flow-root glide--ltr glide--slider glide--swipeable">
  <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 text-neutral-900 dark:text-neutral-50">
    <div className="max-w-2xl">
      <h2 className="flex items-center  flex-wrap  text-3xl md:text-4xl font-semibold">
           Top List Collections
      </h2>
      <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
        Click on play icon and enjoy NTFs video
      </span>
    </div>
    <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
      <div
        className="nc-NextPrev relative flex items-center text-neutral-500 dark:text-neutral-400 "
        data-nc-id="NextPrev"
        data-glide-el="controls"
      >
        <button
          className="w-10 h-10 mr-2 border-neutral-200 dark:border-neutral-6000 rounded-full flex items-center justify-center "
          title="Prev"
          data-glide-dir="<"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5 12H3.67004"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="w-10 h-10  border-neutral-200 dark:border-neutral-6000 rounded-full flex items-center justify-center border-2"
          title="Next"
          data-glide-dir=">"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 12H20.33"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>


  <div className="glide__track" data-glide-el="track">
    <ul
      className="glide__slides">
      
      <ScrollContainer className="scroll-container w-full flex" horizontal={true}  vertical={true} >
      <li
        className="glide__slide glide__slide--active"
        style={{ width: 380, marginRight: 14 }}
      >
        <div
          className="nc-CardNFTVideo relative flex flex-col group "
          data-nc-id="CardNFTVideo"
        >
          <div className="relative flex-shrink-0 ">
            <div className="">
              <div
                className="nc-NcImage flex aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl overflow-hidden z-0"
                data-nc-id="NcImage"
              >
                <img
                  src="https://images.unsplash.com/photo-1643101809204-6fb869816dbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                  alt="nc-imgs"
                />
              </div>
            </div>
            <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white absolute top-3 right-3 z-10 !h-9">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  fill="#ef4444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-sm">23</span>
            </button>
            <div
              className="nc-ButtonPlayMusicRunningContainer select-none absolute bottom-3 left-3 z-10"
              data-nc-id="ButtonPlayMusicRunningContainer"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full  cursor-pointer bg-neutral-50/80 text-primary-500">
                <svg
                  className="ml-0.5 w-9 h-9"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h2 className="sm:text-lg font-semibold text-white">NFT Music #1922</h2>
              <div className="ml-2 flex items-center space-x-3">
                <div className="hidden sm:flex -space-x-1 ">
                  Icon
                </div>
                <span className="text-neutral-700 dark:text-neutral-400 text-xs">
                  1 of 100
                </span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-3.5">
              <div className="pt-3">
                <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold ">
                  <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 ">
                    Current Bid
                  </span>
                  <span className=" text-green-500 !leading-none">
                    1.000 ETH
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-normal tracking-wide">
                  Remaining time
                </span>
                <span className="block font-semibold mt-0.5">
                  3h : 15m : 20s
                </span>
              </div>
            </div>
          </div>
          <a className="absolute inset-0"  />
        </div>
      </li>
      <li
        className="glide__slide"
        style={{ width: 380, marginLeft: 14, marginRight: 14 }}
      >
        <div
          className="nc-CardNFTVideo relative flex flex-col group "
          data-nc-id="CardNFTVideo"
        >
          <div className="relative flex-shrink-0 ">
            <div className="">
              <div
                className="nc-NcImage flex aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl overflow-hidden z-0"
                data-nc-id="NcImage"
              >
                <img
                  src="https://images.unsplash.com/photo-1643101808200-0d159c1331f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                  alt="nc-imgs"
                />
              </div>
            </div>
            <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white absolute top-3 right-3 z-10 !h-9">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-sm">22</span>
            </button>
            <div
              className="nc-ButtonPlayMusicRunningContainer select-none absolute bottom-3 left-3 z-10"
              data-nc-id="ButtonPlayMusicRunningContainer"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full  cursor-pointer bg-neutral-50/80 text-primary-500">
                <svg
                  className="ml-0.5 w-9 h-9"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h2 className="sm:text-lg font-semibold text-white">NFT Music #1885</h2>

              <div className="ml-2 flex items-center space-x-3">
                <div className="hidden sm:flex -space-x-1 ">
                     Icon
                </div>
                <span className="text-neutral-700 dark:text-neutral-400 text-xs">
                  1 of 100
                </span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-3.5">
              <div className="pt-3">
                <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold ">
                  <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 ">
                    Price
                  </span>
                  <span className=" text-green-500 !leading-none">
                    1.000 ETH
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-normal tracking-wide">
                  Remaining time
                </span>
                <span className="block font-semibold mt-0.5 text-white">
                  3h : 15m : 20s
                </span>
              </div>
            </div>
          </div>
          <a className="absolute inset-0" />
        </div>
      </li>
      <li
        className="glide__slide"
        style={{ width: 380, marginLeft: 14, marginRight: 14 }}
      >
        <div
          className="nc-CardNFTVideo relative flex flex-col group "
          data-nc-id="CardNFTVideo"
        >
          <div className="relative flex-shrink-0 ">
            <div className="">
              <div
                className="nc-NcImage flex aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl overflow-hidden z-0"
                data-nc-id="NcImage"
              >
                <img
                  src="https://images.unsplash.com/photo-1643101808513-0552e31e4d9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                  alt="nc-imgs"
                />
              </div>
            </div>
            <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white absolute top-3 right-3 z-10 !h-9">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-sm">22</span>
            </button>
            <div
              className="nc-ButtonPlayMusicRunningContainer select-none absolute bottom-3 left-3 z-10"
              data-nc-id="ButtonPlayMusicRunningContainer"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full  cursor-pointer bg-neutral-50/80 text-primary-500">
                <svg
                  className="ml-0.5 w-9 h-9"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h2 className="sm:text-lg font-semibold text-white">NFT Music #1395</h2>
              <div className="ml-2 flex items-center space-x-3">
                <div className="hidden sm:flex -space-x-1 ">
                  Icon
                </div>
                <span className="text-neutral-700 dark:text-neutral-400 text-xs">
                  1 of 100
                </span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-3.5">
              <div className="pt-3">
                <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold ">
                  <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 ">
                    Price
                  </span>
                  <span className=" text-green-500 !leading-none">
                    1.000 ETH
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-normal tracking-wide">
                  Remaining time
                </span>
                <span className="block font-semibold mt-0.5 text-white">
                  3h : 15m : 20s
                </span>
              </div>
            </div>
          </div>
          <a className="absolute inset-0"  />
        </div>
      </li>
      <li
        className="glide__slide"
        style={{ width: 380, marginLeft: 14, marginRight: 14 }}
      >
        <div
          className="nc-CardNFTVideo relative flex flex-col group "
          data-nc-id="CardNFTVideo"
        >
          <div className="relative flex-shrink-0 ">
            <div className="">
              <div
                className="nc-NcImage flex aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl overflow-hidden z-0"
                data-nc-id="NcImage"
              >
                <div className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500">
                  <div className="h-2/4 max-w-[50%]">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 197 193"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M145.828 48.9822C134.953 48.9822 126.105 57.8301 126.105 68.7051C126.105 79.5801 134.953 88.428 145.828 88.428C156.703 88.428 165.551 79.5805 165.551 68.7051C165.551 57.8293 156.704 48.9822 145.828 48.9822ZM145.828 80.7741C139.173 80.7741 133.759 75.3602 133.759 68.7051C133.759 62.0501 139.173 56.6361 145.828 56.6361C152.483 56.6361 157.897 62.0501 157.897 68.7051C157.897 75.3594 152.483 80.7741 145.828 80.7741Z"
                        fill="currentColor"
                      />
                      <path
                        d="M145.963 171.49C145.867 171.256 145.748 171.034 145.611 170.828C145.473 170.617 145.312 170.422 145.136 170.246C144.96 170.07 144.765 169.909 144.554 169.771C144.348 169.634 144.126 169.515 143.892 169.419C143.663 169.324 143.422 169.247 143.177 169.201C142.683 169.102 142.178 169.102 141.684 169.201C141.439 169.247 141.198 169.324 140.969 169.419C140.735 169.515 140.513 169.634 140.306 169.771C140.096 169.909 139.901 170.07 139.725 170.246C139.549 170.422 139.388 170.617 139.25 170.828C139.112 171.034 138.994 171.256 138.898 171.49C138.802 171.719 138.726 171.96 138.68 172.205C138.63 172.45 138.603 172.703 138.603 172.952C138.603 173.2 138.63 173.453 138.68 173.698C138.726 173.943 138.802 174.184 138.898 174.413C138.994 174.647 139.112 174.869 139.25 175.075C139.388 175.286 139.549 175.481 139.725 175.657C139.812 175.745 139.905 175.829 140.001 175.908C140.099 175.987 140.201 176.063 140.306 176.132C140.513 176.269 140.735 176.388 140.969 176.484C141.198 176.579 141.439 176.656 141.684 176.702C141.929 176.752 142.182 176.778 142.43 176.778C142.679 176.778 142.932 176.752 143.177 176.702C143.422 176.656 143.663 176.579 143.892 176.484C144.126 176.388 144.348 176.269 144.554 176.132C144.66 176.062 144.762 175.987 144.859 175.908C144.956 175.829 145.048 175.745 145.136 175.657C145.312 175.481 145.473 175.286 145.611 175.075C145.748 174.869 145.867 174.647 145.963 174.413C146.058 174.184 146.135 173.943 146.185 173.698C146.234 173.453 146.257 173.2 146.257 172.952C146.257 172.703 146.234 172.45 146.185 172.205C146.135 171.96 146.058 171.719 145.963 171.49Z"
                        fill="currentColor"
                      />
                      <path
                        d="M85.7341 20.0459C85.6384 19.8163 85.5198 19.5943 85.382 19.3838C85.2442 19.1772 85.0835 18.9782 84.9075 18.8021C84.7314 18.6261 84.5363 18.4653 84.3258 18.3276C84.1191 18.1898 83.8972 18.0712 83.6637 17.9755C83.4341 17.8798 83.193 17.8071 82.9481 17.7574C82.4544 17.6579 81.9492 17.6579 81.4556 17.7574C81.2106 17.8071 80.9695 17.8798 80.7361 17.9755C80.5065 18.0712 80.2845 18.1898 80.0779 18.3276C79.8674 18.4653 79.6722 18.6261 79.4962 18.8021C79.3201 18.9782 79.1594 19.1772 79.0178 19.3838C78.88 19.5943 78.7652 19.8163 78.6696 20.0459C78.5739 20.2755 78.4973 20.5166 78.4514 20.7615C78.4017 21.0103 78.3749 21.259 78.3749 21.5116C78.3749 21.7603 78.4017 22.0091 78.4514 22.2579C78.4973 22.5028 78.5739 22.7439 78.6696 22.9735C78.7652 23.2031 78.88 23.4251 79.0178 23.6356C79.1594 23.8422 79.3201 24.0412 79.4962 24.2172C79.6722 24.3933 79.8674 24.554 80.0779 24.6918C80.2845 24.8296 80.5065 24.9482 80.7361 25.0439C80.9695 25.1395 81.2106 25.2123 81.4556 25.262C81.7005 25.3118 81.9531 25.3385 82.2018 25.3385C82.4506 25.3385 82.7032 25.3118 82.9481 25.262C83.193 25.2123 83.4341 25.1395 83.6637 25.0439C83.8972 24.9482 84.1191 24.8296 84.3258 24.6918C84.5363 24.554 84.7314 24.3933 84.9075 24.2172C85.0835 24.0412 85.2442 23.8422 85.382 23.6356C85.5198 23.4251 85.6384 23.2031 85.7341 22.9735C85.8298 22.7439 85.9063 22.5028 85.9522 22.2579C86.002 22.0091 86.0288 21.7603 86.0288 21.5116C86.0288 21.259 86.002 21.0103 85.9522 20.7615C85.9063 20.5166 85.8298 20.2755 85.7341 20.0459Z"
                        fill="currentColor"
                      />
                      <path
                        d="M175.008 17.6988C172.714 7.99787 163.987 0.755371 153.594 0.755371H33.522C15.2866 0.754988 0.450684 15.5909 0.450684 33.8263V153.899C0.450684 165.824 9.98628 175.557 21.8326 175.891C24.1272 185.592 32.8542 192.835 43.2467 192.835H174.382C186.517 192.835 196.39 182.962 196.39 170.826V141.949V39.6911C196.39 27.7663 186.855 18.0329 175.008 17.6988ZM188.736 170.827C188.736 178.742 182.297 185.182 174.382 185.182H43.2467C37.1197 185.182 31.8799 181.322 29.8236 175.908C29.2232 174.327 28.8918 172.615 28.8918 170.827V168.254V150.524L72.7964 76.0808C74.1332 73.8144 76.517 72.4911 79.1323 72.5332C81.7633 72.5783 84.0851 73.9844 85.3434 76.2955L104.247 111.007L131.725 161.462C132.419 162.737 133.733 163.459 135.089 163.459C135.708 163.459 136.335 163.309 136.916 162.993C138.772 161.982 139.458 159.657 138.447 157.801L129.53 141.428C133.445 141.608 137.296 140.341 140.362 137.797L157.572 123.52C160.332 121.23 164.408 121.331 167.051 123.755L167.95 124.578L175.604 131.594L188.736 143.632V170.827ZM188.736 133.249L175.603 121.21L167.95 115.382C162.963 113.297 157.033 114.022 152.685 117.629L135.475 131.906C133.582 133.476 131.111 134.111 128.695 133.646C126.28 133.183 124.22 131.677 123.043 129.517L110.969 107.345L104.226 94.9648V94.9644L92.0655 72.6342C89.4716 67.8716 84.6856 64.9727 79.2632 64.8801C73.8423 64.7951 68.9588 67.521 66.2037 72.1922L28.8914 135.457V39.6911C28.8914 31.7758 35.331 25.3362 43.2463 25.3362H66.8937C69.0074 25.3362 70.7207 23.6229 70.7207 21.5093C70.7207 19.3957 69.0074 17.6823 66.8937 17.6823H43.2463C31.1106 17.6823 21.2375 27.5555 21.2375 39.6911V149.479V168.198C13.8924 167.575 8.10458 161.402 8.10458 153.899V33.8263C8.10458 19.8109 19.507 8.40888 33.522 8.40888H153.594C159.721 8.40888 164.961 12.2684 167.017 17.6827H97.5093C95.3957 17.6827 93.6824 19.396 93.6824 21.5097C93.6824 23.6233 95.3957 25.3366 97.5093 25.3366H167.949L175.603 25.3925C182.949 26.0147 188.736 32.1876 188.736 39.6911V133.249Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white absolute top-3 right-3 z-10 !h-9">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-sm">22</span>
            </button>
            <div
              className="nc-ButtonPlayMusicRunningContainer select-none absolute bottom-3 left-3 z-10"
              data-nc-id="ButtonPlayMusicRunningContainer"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full  cursor-pointer bg-neutral-50/80 text-primary-500">
                <svg
                  className="ml-0.5 w-9 h-9"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h2 className="sm:text-lg font-semibold text-white">NFT Music #1845</h2>
              <div className="ml-2 flex items-center space-x-3">
                Icon
              </div>
            </div>
            <div className="flex justify-between items-end mt-3.5">
              <div className="pt-3">
                <div className="flex items-baseline border-2 border-green-500 rounded-lg relative py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold ">
                  <span className="block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 ">
                    Price
                  </span>
                  <span className=" text-green-500 !leading-none">
                    1.000 ETH
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-normal tracking-wide">
                  Remaining time
                </span>
                <span className="block font-semibold mt-0.5 text-white">
                  3h : 15m : 20s
                </span>
              </div>
            </div>
          </div>
          <a className="absolute inset-0"  />
        </div>
      </li>
      <li className="glide__slide" style={{ width: 380, marginLeft: 14 }}>
        <a className="block relative group">
          <div className="flex aspect-w-16 aspect-h-9 w-full h-0 rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
          <div className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
            <div className="flex items-center justify-center relative">
              <span className="text-xl font-semibold">NFTs Music</span>
              <svg
                className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20.4999V3.66992"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm mt-1">Show me more</span>
          </div>
        </a>
      </li>

      </ScrollContainer>

    </ul>
  </div>
</div>


      {/* Section here */}




    </div>



    <div
      className="nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center "
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl text-white">Never miss a drop!</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Subcribe to our super-exclusive drop list and be the first to know
          abour upcoming drops
        </span>
        <ul className="space-y-4 mt-10">
          <li className="flex items-center space-x-4">
            <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-blue-800 bg-blue-100  relative">
              01
            </span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-red-800 bg-red-100  relative">
              02
            </span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm">
          <input
            type="email"
            className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-full text-sm font-normal h-11 px-4 py-3 "
            required=""
            aria-required="true"
            placeholder="Enter your email"
          />
          <button
            className="ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 absolute transform top-1/2 -translate-y-1/2 right-1  w-9 h-9  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="flex-grow">
        <div className="nc-NcImage " data-nc-id="NcImage">
          <img
            src="/SVG-subcribe2.efb832b25bd6eca32484.png"
            className="object-cover w-full h-full"
            alt="nc-imgs"
          />
        </div>
      </div>
    </div>

    <div className="nc-SectionSliderCategories ">
      <div className="glidejs_r17_ flow-root glide--ltr glide--slider glide--swipeable">
        <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 text-neutral-900 dark:text-neutral-50">
          <div className="max-w-2xl">
            <h2 className="flex items-center  flex-wrap  text-3xl md:text-4xl font-semibold">
              Browse by category
            </h2>
            <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
              Explore the NFTs in the most featured categories.
            </span>
          </div>
          <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
            <div
              className="nc-NextPrev relative flex items-center text-neutral-500 dark:text-neutral-400 "
              data-nc-id="NextPrev"
              data-glide-el="controls"
            >
              <button
                className="w-10 h-10 mr-2 border-neutral-200 dark:border-neutral-6000 rounded-full flex items-center justify-center "
                title="Prev"
                data-glide-dir="<"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 12H3.67004"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="w-10 h-10  border-neutral-200 dark:border-neutral-6000 rounded-full flex items-center justify-center border-2"
                title="Next"
                data-glide-dir=">"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 12H20.33"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
     
        
        <div className="glide__track" data-glide-el="track">

          <ul
            className="glide__slides w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth"
          >
         <ScrollContainer className="scroll-container w-full flex" horizontal={true}  vertical={true} >
            <li
              className="glide__slide glide__slide--active"
              style={{ width: 224, marginRight: 16 }}
            >
              <a
                className="nc-CardCategory5 flex flex-col "
                data-nc-id="CardCategory5"
              >
                <div className="flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group">
                  <div className="nc-NcImage " data-nc-id="NcImage">
                    <img
                      src="/cat1.751d5f13adef7a67aee3.png"
                      className="object-cover w-full h-full rounded-2xl"
                      alt="nc-imgs"
                    />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity" />
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-500" />
                  <div className="ml-3">
                    <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate">
                      Arts
                    </h2>
                    <span className="block mt-1 text-sm text-neutral-6000 dark:text-neutral-400">
                      1162 NFTs
                    </span>
                  </div>
                </div>
              </a>
            </li>
            <li
              className="glide__slide"
              style={{ width: 224, marginLeft: 16, marginRight: 16 }}
            >
              <a
                className="nc-CardCategory5 flex flex-col "
                data-nc-id="CardCategory5"
              >
                <div className="flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group">
                  <div className="nc-NcImage " data-nc-id="NcImage">
                    <img
                      src="/cat3.117d199c357ea49ba478.png"
                      className="object-cover w-full h-full rounded-2xl"
                      alt="nc-imgs"
                    />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity" />
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500" />
                  <div className="ml-3">
                    <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate">
                      Entertainment
                    </h2>
                    <span className="block mt-1 text-sm text-neutral-6000 dark:text-neutral-400">
                      1107 NFTs
                    </span>
                  </div>
                </div>
              </a>
            </li>
            <li
              className="glide__slide"
              style={{ width: 224, marginLeft: 16, marginRight: 16 }}
            >
              <a
                className="nc-CardCategory5 flex flex-col "
                data-nc-id="CardCategory5"
              >
                <div className="flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group">
                  <div className="nc-NcImage " data-nc-id="NcImage">
                    <img
                      src="/cat4.0d5fa5b878a3db06b4f3.png"
                      className="object-cover w-full h-full rounded-2xl"
                      alt="nc-imgs"
                    />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity" />
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500" />
                  <div className="ml-3">
                    <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate">
                      Music
                    </h2>
                    <span className="block mt-1 text-sm text-neutral-6000 dark:text-neutral-400">
                      1081 NFTs
                    </span>
                  </div>
                </div>
              </a>
            </li>
            <li
              className="glide__slide"
              style={{ width: 224, marginLeft: 16, marginRight: 16 }}
            >
              <a
                className="nc-CardCategory5 flex flex-col "
                data-nc-id="CardCategory5"
              >
                <div className="flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group">
                  <div className="nc-NcImage " data-nc-id="NcImage">
                    <img
                      src="/cat6.f39545a23d3105a933a1.png"
                      className="object-cover w-full h-full rounded-2xl"
                      alt="nc-imgs"
                    />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity" />
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-500" />
                  <div className="ml-3">
                    <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate">
                      News
                    </h2>
                    <span className="block mt-1 text-sm text-neutral-6000 dark:text-neutral-400">
                      1817 NFTs
                    </span>
                  </div>
                </div>
              </a>
            </li>
            <li
              className="glide__slide"
              style={{ width: 224, marginLeft: 16, marginRight: 16 }}
            >
              <a
                className="nc-CardCategory5 flex flex-col "
                data-nc-id="CardCategory5"
              >
                <div className="flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group">
                  <div className="nc-NcImage " data-nc-id="NcImage">
                    <img
                      src="/cat2.05e98f46eb6fcd69a6cb.png"
                      className="object-cover w-full h-full rounded-2xl"
                      alt="nc-imgs"
                    />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity" />
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-500" />
                  <div className="ml-3">
                    <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate">
                      Science
                    </h2>
                    <span className="block mt-1 text-sm text-neutral-6000 dark:text-neutral-400">
                      1707 NFTs
                    </span>
                  </div>
                </div>
              </a>
            </li>
            <li className="glide__slide" style={{ width: 224, marginLeft: 16 }}>
              <a
                className="nc-CardCategory5 flex flex-col "
                data-nc-id="CardCategory5"
              >
                <div className="flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group">
                  <div className="nc-NcImage " data-nc-id="NcImage">
                    <div className="object-cover w-full h-full rounded-2xl flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500">
                      <div className="h-2/4 max-w-[50%]">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 197 193"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M145.828 48.9822C134.953 48.9822 126.105 57.8301 126.105 68.7051C126.105 79.5801 134.953 88.428 145.828 88.428C156.703 88.428 165.551 79.5805 165.551 68.7051C165.551 57.8293 156.704 48.9822 145.828 48.9822ZM145.828 80.7741C139.173 80.7741 133.759 75.3602 133.759 68.7051C133.759 62.0501 139.173 56.6361 145.828 56.6361C152.483 56.6361 157.897 62.0501 157.897 68.7051C157.897 75.3594 152.483 80.7741 145.828 80.7741Z"
                            fill="currentColor"
                          />
                          <path
                            d="M145.963 171.49C145.867 171.256 145.748 171.034 145.611 170.828C145.473 170.617 145.312 170.422 145.136 170.246C144.96 170.07 144.765 169.909 144.554 169.771C144.348 169.634 144.126 169.515 143.892 169.419C143.663 169.324 143.422 169.247 143.177 169.201C142.683 169.102 142.178 169.102 141.684 169.201C141.439 169.247 141.198 169.324 140.969 169.419C140.735 169.515 140.513 169.634 140.306 169.771C140.096 169.909 139.901 170.07 139.725 170.246C139.549 170.422 139.388 170.617 139.25 170.828C139.112 171.034 138.994 171.256 138.898 171.49C138.802 171.719 138.726 171.96 138.68 172.205C138.63 172.45 138.603 172.703 138.603 172.952C138.603 173.2 138.63 173.453 138.68 173.698C138.726 173.943 138.802 174.184 138.898 174.413C138.994 174.647 139.112 174.869 139.25 175.075C139.388 175.286 139.549 175.481 139.725 175.657C139.812 175.745 139.905 175.829 140.001 175.908C140.099 175.987 140.201 176.063 140.306 176.132C140.513 176.269 140.735 176.388 140.969 176.484C141.198 176.579 141.439 176.656 141.684 176.702C141.929 176.752 142.182 176.778 142.43 176.778C142.679 176.778 142.932 176.752 143.177 176.702C143.422 176.656 143.663 176.579 143.892 176.484C144.126 176.388 144.348 176.269 144.554 176.132C144.66 176.062 144.762 175.987 144.859 175.908C144.956 175.829 145.048 175.745 145.136 175.657C145.312 175.481 145.473 175.286 145.611 175.075C145.748 174.869 145.867 174.647 145.963 174.413C146.058 174.184 146.135 173.943 146.185 173.698C146.234 173.453 146.257 173.2 146.257 172.952C146.257 172.703 146.234 172.45 146.185 172.205C146.135 171.96 146.058 171.719 145.963 171.49Z"
                            fill="currentColor"
                          />
                          <path
                            d="M85.7341 20.0459C85.6384 19.8163 85.5198 19.5943 85.382 19.3838C85.2442 19.1772 85.0835 18.9782 84.9075 18.8021C84.7314 18.6261 84.5363 18.4653 84.3258 18.3276C84.1191 18.1898 83.8972 18.0712 83.6637 17.9755C83.4341 17.8798 83.193 17.8071 82.9481 17.7574C82.4544 17.6579 81.9492 17.6579 81.4556 17.7574C81.2106 17.8071 80.9695 17.8798 80.7361 17.9755C80.5065 18.0712 80.2845 18.1898 80.0779 18.3276C79.8674 18.4653 79.6722 18.6261 79.4962 18.8021C79.3201 18.9782 79.1594 19.1772 79.0178 19.3838C78.88 19.5943 78.7652 19.8163 78.6696 20.0459C78.5739 20.2755 78.4973 20.5166 78.4514 20.7615C78.4017 21.0103 78.3749 21.259 78.3749 21.5116C78.3749 21.7603 78.4017 22.0091 78.4514 22.2579C78.4973 22.5028 78.5739 22.7439 78.6696 22.9735C78.7652 23.2031 78.88 23.4251 79.0178 23.6356C79.1594 23.8422 79.3201 24.0412 79.4962 24.2172C79.6722 24.3933 79.8674 24.554 80.0779 24.6918C80.2845 24.8296 80.5065 24.9482 80.7361 25.0439C80.9695 25.1395 81.2106 25.2123 81.4556 25.262C81.7005 25.3118 81.9531 25.3385 82.2018 25.3385C82.4506 25.3385 82.7032 25.3118 82.9481 25.262C83.193 25.2123 83.4341 25.1395 83.6637 25.0439C83.8972 24.9482 84.1191 24.8296 84.3258 24.6918C84.5363 24.554 84.7314 24.3933 84.9075 24.2172C85.0835 24.0412 85.2442 23.8422 85.382 23.6356C85.5198 23.4251 85.6384 23.2031 85.7341 22.9735C85.8298 22.7439 85.9063 22.5028 85.9522 22.2579C86.002 22.0091 86.0288 21.7603 86.0288 21.5116C86.0288 21.259 86.002 21.0103 85.9522 20.7615C85.9063 20.5166 85.8298 20.2755 85.7341 20.0459Z"
                            fill="currentColor"
                          />
                          <path
                            d="M175.008 17.6988C172.714 7.99787 163.987 0.755371 153.594 0.755371H33.522C15.2866 0.754988 0.450684 15.5909 0.450684 33.8263V153.899C0.450684 165.824 9.98628 175.557 21.8326 175.891C24.1272 185.592 32.8542 192.835 43.2467 192.835H174.382C186.517 192.835 196.39 182.962 196.39 170.826V141.949V39.6911C196.39 27.7663 186.855 18.0329 175.008 17.6988ZM188.736 170.827C188.736 178.742 182.297 185.182 174.382 185.182H43.2467C37.1197 185.182 31.8799 181.322 29.8236 175.908C29.2232 174.327 28.8918 172.615 28.8918 170.827V168.254V150.524L72.7964 76.0808C74.1332 73.8144 76.517 72.4911 79.1323 72.5332C81.7633 72.5783 84.0851 73.9844 85.3434 76.2955L104.247 111.007L131.725 161.462C132.419 162.737 133.733 163.459 135.089 163.459C135.708 163.459 136.335 163.309 136.916 162.993C138.772 161.982 139.458 159.657 138.447 157.801L129.53 141.428C133.445 141.608 137.296 140.341 140.362 137.797L157.572 123.52C160.332 121.23 164.408 121.331 167.051 123.755L167.95 124.578L175.604 131.594L188.736 143.632V170.827ZM188.736 133.249L175.603 121.21L167.95 115.382C162.963 113.297 157.033 114.022 152.685 117.629L135.475 131.906C133.582 133.476 131.111 134.111 128.695 133.646C126.28 133.183 124.22 131.677 123.043 129.517L110.969 107.345L104.226 94.9648V94.9644L92.0655 72.6342C89.4716 67.8716 84.6856 64.9727 79.2632 64.8801C73.8423 64.7951 68.9588 67.521 66.2037 72.1922L28.8914 135.457V39.6911C28.8914 31.7758 35.331 25.3362 43.2463 25.3362H66.8937C69.0074 25.3362 70.7207 23.6229 70.7207 21.5093C70.7207 19.3957 69.0074 17.6823 66.8937 17.6823H43.2463C31.1106 17.6823 21.2375 27.5555 21.2375 39.6911V149.479V168.198C13.8924 167.575 8.10458 161.402 8.10458 153.899V33.8263C8.10458 19.8109 19.507 8.40888 33.522 8.40888H153.594C159.721 8.40888 164.961 12.2684 167.017 17.6827H97.5093C95.3957 17.6827 93.6824 19.396 93.6824 21.5097C93.6824 23.6233 95.3957 25.3366 97.5093 25.3366H167.949L175.603 25.3925C182.949 26.0147 188.736 32.1876 188.736 39.6911V133.249Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity" />
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500" />
                  <div className="ml-3">
                    <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate">
                      Sports
                    </h2>
                    <span className="block mt-1 text-sm text-neutral-6000 dark:text-neutral-400">
                      1063 NFTs
                    </span>
                  </div>
                </div>
              </a>
            </li>
           </ScrollContainer>
          </ul>


        </div>
      


      </div>
    </div>
    <div className="relative py-20 lg:py-24">
      <div
        className="nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100/80 dark:bg-black/20 "
        data-nc-id="BackgroundSection"
      />
      <div
        className="nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  "
        data-nc-id="SectionBecomeAnAuthor"
      >
        <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
          <a
            className="ttnc-logo inline-block text-primary-6000 w-28"
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
          </a>
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight text-white">
            Earn free crypto <br /> with Ciscrypt
          </h2>
          <span className="block mt-6 text-neutral-500 dark:text-neutral-400 ">
            A creative agency that lead and inspire.
          </span>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
            <a
              className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
              rel="noopener noreferrer"
            >
              Create item
            </a>
            <a
              className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonSecondary border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
              rel="noopener noreferrer"
            >
              Discover more
            </a>
          </div>
        </div>
        <div className="flex-grow">
          <div className="nc-NcImage block dark:hidden" data-nc-id="NcImage">
            <div className="object-cover w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500">
              <div className="h-2/4 max-w-[50%]">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 197 193"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M145.828 48.9822C134.953 48.9822 126.105 57.8301 126.105 68.7051C126.105 79.5801 134.953 88.428 145.828 88.428C156.703 88.428 165.551 79.5805 165.551 68.7051C165.551 57.8293 156.704 48.9822 145.828 48.9822ZM145.828 80.7741C139.173 80.7741 133.759 75.3602 133.759 68.7051C133.759 62.0501 139.173 56.6361 145.828 56.6361C152.483 56.6361 157.897 62.0501 157.897 68.7051C157.897 75.3594 152.483 80.7741 145.828 80.7741Z"
                    fill="currentColor"
                  />
                  <path
                    d="M145.963 171.49C145.867 171.256 145.748 171.034 145.611 170.828C145.473 170.617 145.312 170.422 145.136 170.246C144.96 170.07 144.765 169.909 144.554 169.771C144.348 169.634 144.126 169.515 143.892 169.419C143.663 169.324 143.422 169.247 143.177 169.201C142.683 169.102 142.178 169.102 141.684 169.201C141.439 169.247 141.198 169.324 140.969 169.419C140.735 169.515 140.513 169.634 140.306 169.771C140.096 169.909 139.901 170.07 139.725 170.246C139.549 170.422 139.388 170.617 139.25 170.828C139.112 171.034 138.994 171.256 138.898 171.49C138.802 171.719 138.726 171.96 138.68 172.205C138.63 172.45 138.603 172.703 138.603 172.952C138.603 173.2 138.63 173.453 138.68 173.698C138.726 173.943 138.802 174.184 138.898 174.413C138.994 174.647 139.112 174.869 139.25 175.075C139.388 175.286 139.549 175.481 139.725 175.657C139.812 175.745 139.905 175.829 140.001 175.908C140.099 175.987 140.201 176.063 140.306 176.132C140.513 176.269 140.735 176.388 140.969 176.484C141.198 176.579 141.439 176.656 141.684 176.702C141.929 176.752 142.182 176.778 142.43 176.778C142.679 176.778 142.932 176.752 143.177 176.702C143.422 176.656 143.663 176.579 143.892 176.484C144.126 176.388 144.348 176.269 144.554 176.132C144.66 176.062 144.762 175.987 144.859 175.908C144.956 175.829 145.048 175.745 145.136 175.657C145.312 175.481 145.473 175.286 145.611 175.075C145.748 174.869 145.867 174.647 145.963 174.413C146.058 174.184 146.135 173.943 146.185 173.698C146.234 173.453 146.257 173.2 146.257 172.952C146.257 172.703 146.234 172.45 146.185 172.205C146.135 171.96 146.058 171.719 145.963 171.49Z"
                    fill="currentColor"
                  />
                  <path
                    d="M85.7341 20.0459C85.6384 19.8163 85.5198 19.5943 85.382 19.3838C85.2442 19.1772 85.0835 18.9782 84.9075 18.8021C84.7314 18.6261 84.5363 18.4653 84.3258 18.3276C84.1191 18.1898 83.8972 18.0712 83.6637 17.9755C83.4341 17.8798 83.193 17.8071 82.9481 17.7574C82.4544 17.6579 81.9492 17.6579 81.4556 17.7574C81.2106 17.8071 80.9695 17.8798 80.7361 17.9755C80.5065 18.0712 80.2845 18.1898 80.0779 18.3276C79.8674 18.4653 79.6722 18.6261 79.4962 18.8021C79.3201 18.9782 79.1594 19.1772 79.0178 19.3838C78.88 19.5943 78.7652 19.8163 78.6696 20.0459C78.5739 20.2755 78.4973 20.5166 78.4514 20.7615C78.4017 21.0103 78.3749 21.259 78.3749 21.5116C78.3749 21.7603 78.4017 22.0091 78.4514 22.2579C78.4973 22.5028 78.5739 22.7439 78.6696 22.9735C78.7652 23.2031 78.88 23.4251 79.0178 23.6356C79.1594 23.8422 79.3201 24.0412 79.4962 24.2172C79.6722 24.3933 79.8674 24.554 80.0779 24.6918C80.2845 24.8296 80.5065 24.9482 80.7361 25.0439C80.9695 25.1395 81.2106 25.2123 81.4556 25.262C81.7005 25.3118 81.9531 25.3385 82.2018 25.3385C82.4506 25.3385 82.7032 25.3118 82.9481 25.262C83.193 25.2123 83.4341 25.1395 83.6637 25.0439C83.8972 24.9482 84.1191 24.8296 84.3258 24.6918C84.5363 24.554 84.7314 24.3933 84.9075 24.2172C85.0835 24.0412 85.2442 23.8422 85.382 23.6356C85.5198 23.4251 85.6384 23.2031 85.7341 22.9735C85.8298 22.7439 85.9063 22.5028 85.9522 22.2579C86.002 22.0091 86.0288 21.7603 86.0288 21.5116C86.0288 21.259 86.002 21.0103 85.9522 20.7615C85.9063 20.5166 85.8298 20.2755 85.7341 20.0459Z"
                    fill="currentColor"
                  />
                  <path
                    d="M175.008 17.6988C172.714 7.99787 163.987 0.755371 153.594 0.755371H33.522C15.2866 0.754988 0.450684 15.5909 0.450684 33.8263V153.899C0.450684 165.824 9.98628 175.557 21.8326 175.891C24.1272 185.592 32.8542 192.835 43.2467 192.835H174.382C186.517 192.835 196.39 182.962 196.39 170.826V141.949V39.6911C196.39 27.7663 186.855 18.0329 175.008 17.6988ZM188.736 170.827C188.736 178.742 182.297 185.182 174.382 185.182H43.2467C37.1197 185.182 31.8799 181.322 29.8236 175.908C29.2232 174.327 28.8918 172.615 28.8918 170.827V168.254V150.524L72.7964 76.0808C74.1332 73.8144 76.517 72.4911 79.1323 72.5332C81.7633 72.5783 84.0851 73.9844 85.3434 76.2955L104.247 111.007L131.725 161.462C132.419 162.737 133.733 163.459 135.089 163.459C135.708 163.459 136.335 163.309 136.916 162.993C138.772 161.982 139.458 159.657 138.447 157.801L129.53 141.428C133.445 141.608 137.296 140.341 140.362 137.797L157.572 123.52C160.332 121.23 164.408 121.331 167.051 123.755L167.95 124.578L175.604 131.594L188.736 143.632V170.827ZM188.736 133.249L175.603 121.21L167.95 115.382C162.963 113.297 157.033 114.022 152.685 117.629L135.475 131.906C133.582 133.476 131.111 134.111 128.695 133.646C126.28 133.183 124.22 131.677 123.043 129.517L110.969 107.345L104.226 94.9648V94.9644L92.0655 72.6342C89.4716 67.8716 84.6856 64.9727 79.2632 64.8801C73.8423 64.7951 68.9588 67.521 66.2037 72.1922L28.8914 135.457V39.6911C28.8914 31.7758 35.331 25.3362 43.2463 25.3362H66.8937C69.0074 25.3362 70.7207 23.6229 70.7207 21.5093C70.7207 19.3957 69.0074 17.6823 66.8937 17.6823H43.2463C31.1106 17.6823 21.2375 27.5555 21.2375 39.6911V149.479V168.198C13.8924 167.575 8.10458 161.402 8.10458 153.899V33.8263C8.10458 19.8109 19.507 8.40888 33.522 8.40888H153.594C159.721 8.40888 164.961 12.2684 167.017 17.6827H97.5093C95.3957 17.6827 93.6824 19.396 93.6824 21.5097C93.6824 23.6233 95.3957 25.3366 97.5093 25.3366H167.949L175.603 25.3925C182.949 26.0147 188.736 32.1876 188.736 39.6911V133.249Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="nc-NcImage hidden dark:block" data-nc-id="NcImage">
            <img
              src="/illustration.png"
              className="object-cover w-full h-full"
              alt="nc-imgs"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="nc-SectionVideos ">
      <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold">🎬 The Videos</h2>
          <span className="mt-2 md:mt-4 font-normal block text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
            Check out our hottest videos. View more and share more new
            perspectives on just about any topic. Everyone’s welcome.
          </span>
        </div>
      </div>
      <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-7/12 dark:bg-neutral-800/80" />
        <div className="flex-grow relative  ">
          <div
            className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0"
            title="Magical Scotland - 4K Scenic Relaxation Film with Calming Music"
          >
            <div className="cursor-pointer absolute inset-0 flex items-center justify-center z-10">
              <div
                className="nc-NcPlayIcon bg-white bg-opacity-30 backdrop-filter backdrop-blur rounded-full  w-20 h-20 p-3 lg:w-52 lg:h-52 lg:p-12"
                data-nc-id="NcPlayIcon"
              >
                <div className="w-full h-full bg-white rounded-full text-primary-500 relative">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 md:w-12 md:h-12"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="nc-NcImage absolute inset-0 rounded-3xl overflow-hidden z-0"
              data-nc-id="NcImage"
            >
              <img
                src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300  "
                alt="Magical Scotland - 4K Scenic Relaxation Film with Calming Music"
                title="Magical Scotland - 4K Scenic Relaxation Film with Calming Music"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}
