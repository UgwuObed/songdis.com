import React from "react";

interface BannerProps {
    openSignUp: () => void;
}

const Banner = ({ openSignUp }: BannerProps) => {
    return (
        <main>
            <div className="w-full"> 
                <div className="w-full pt-16 sm:pt-20 pb-20 banner-image relative"> 
                    <div className="text-center relative z-10">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-6xl md:4px lh-96">
                            Get your music everywhere.<br /> In Simple Steps!
                        </h1>
                        <p className="mt-6 text-base leading-8 text-white">
                            Songdis provides independent artists and labels with Co-management & simple music distribution to over 400+ platforms including Spotify, Apple.<br />
                            Earn 100% of your revenue and expand your fan base across Africa and worldwide.
                        </p>
                    </div>

                    <div className="text-center mt-5 relative z-10">
                        <button 
                            type="button" 
                            className='text-sm text-white font-medium bg-red-600 py-3 px-6 mt-2 border border-lightgrey leafbutton'
                            onClick={openSignUp} 
                        >
                            Join For Free
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Banner;
