import React from 'react';
import Header from 'components/layout/Header';
import Secondsection from 'components/homepage/Secondsection';

export default function Artistsongs() {
  return (
    <div>
        {/* Songs */}

        <div className="nc-AccountPage " data-nc-id="AccountPage">
            <div className="container">
                <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
                <div className="max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white">Songs</h2>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                     Artists Songs. Listed and not listed
                    </span>
                </div>
                <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700" />
                <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-start">
                    <div className="relative rounded-full overflow-hidden flex">
                        <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full w-32 h-32 ring-1 ring-white dark:ring-neutral-900">
                        <img
                            className="absolute inset-0 w-full h-full object-cover rounded-full"
                            src="/ciscryp/static/media/Image-4.36899b28c72dc4bc41a9.png"
                            alt="John Doe"
                        />
                        <span className="wil-avatar__name">J</span>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">

                        <img src="/author3.png" alt="artist image" />

                        </div>

                        <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    </div>
                    <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-5 sm:space-y-6 md:sm:space-y-7">

                    <div>
                        <label
                        className="nc-Label text-base font-medium text-neutral-900 dark:text-neutral-200 "
                        data-nc-id="Label"
                        >
                        Wallet Address
                        </label>
                        <div className="mt-1.5 relative text-neutral-700 dark:text-neutral-300">
                        <input
                            type="text"
                            className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 !pr-10 "
                            disabled=""
                            defaultValue="0x1bde388826caab77bfe80148abdce6830606e2c6"
                        />
                        <span className="absolute right-2.5 cursor-pointer top-1/2 -translate-y-1/2 ">
                            <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            </svg>
                        </span>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
                        <div>
                        <label
                            className="nc-Label text-base font-medium text-neutral-900 dark:text-neutral-200 "
                            data-nc-id="Label"
                        >
                            Facebook
                        </label>
                        <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                            <i className="text-2xl lab la-facebook-f" />
                            </span>
                            <input
                            type="text"
                            className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 pl-2 pr-3 !rounded-l-none"
                            placeholder="yourfacebook"
                            />
                        </div>
                        </div>
                        <div>
                        <label
                            className="nc-Label text-base font-medium text-neutral-900 dark:text-neutral-200 "
                            data-nc-id="Label"
                        >
                            Twitter
                        </label>
                        <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                            <i className="text-2xl lab la-twitter" />
                            </span>
                            <input
                            type="text"
                            className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 pl-2 pr-3 !rounded-l-none"
                            placeholder="yourtwitter"
                            />
                        </div>
                        </div>
                        <div>
                        <label
                            className="nc-Label text-base font-medium text-neutral-900 dark:text-neutral-200 "
                            data-nc-id="Label"
                        >
                            Telegram
                        </label>
                        <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                            <i className="text-2xl lab la-telegram-plane" />
                            </span>
                            <input
                            type="text"
                            className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 pl-2 pr-3 !rounded-l-none"
                            placeholder="yourtelegram"
                            />
                        </div>
                        </div>
                    </div>




                    <div
                        className="nc-CardNFTMusic2 relative flex justify-between p-2 space-x-2 rounded-3xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-xl transition-shadow "
                        data-nc-id="CardNFTMusic2"
                    >
                        <a className="flex-grow flex space-x-4" >
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
                            <h2 className="block font-medium sm:text-lg">music name</h2>
                            <div className=" flex items-center pt-3 mt-1.5">

                            <div className="hidden sm:flex -space-x-1.5 ">
                                Type
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
                           buy
                        </span>
                        </div>
                    </div>


                    <div className="pt-2">
                        <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                          See more
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>


        {/* Songs */}
        <Secondsection />
    </div>
  )
}




/*
export async function  getServerSideProps(context) {

    const {params, query} = context;
    const { Purchasetokens, musictype } = params;
    //const {musictype} = query;
  
    console.log(params);
    console.log(params.Purchasetokens[0], "checking");
  
    console.log(params.Purchasetokens[1], "firstTry");
  
    //console.log(Purchasetokens);
  
    const itemId = params.Purchasetokens[0];
    const itemType = params.Purchasetokens[1];
  
    console.log(itemId);
    console.log(itemType);
  
  
  
    return {
      props: {
        itemId : itemId,
        itemType: itemType,
      }
    }
    
  }


  */