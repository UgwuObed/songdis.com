"use client"; 

import React, { useState } from 'react';
import Image from "next/image";
import Registerdialog from '../Navbar/Registerdialog';

const Banner = () => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);  

    return (
        <main>
            <div className="w-full"> 
                <div className="relative w-full px-3 pb-20 pt-36 sm:pt-40 banner-image"> 
                    <div className="relative z-10 text-center">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-6xl md:4px lh-96">
                            Get your music everywhere.<br /> In Simple Steps!
                        </h1>
                        <p className="mt-6 text-base leading-8 text-white">
                            Songdis provides independent artists and labels with Co-management & simple music distribution to over 400+ platforms including Spotify, Apple.<br />
                            Earn 100% of your revenue and expand your fan base across Africa and worldwide.
                        </p>
                    </div>

                    <div className="relative z-10 mt-5 text-center">
                        <button
                            type="button"
                            className="px-6 py-3 mt-2 text-sm font-medium text-red-600 bg-white border-2 border-red-600 leafbutton"
                            onClick={() => setIsRegisterOpen(true)}  
                        >
                            Join For Free
                        </button>
                    </div>


                    {/* Registration dialog */}
                    <Registerdialog isOpen={isRegisterOpen} setIsOpen={setIsRegisterOpen} />
                </div>
            </div>
        </main>
    );
};

export default Banner;
