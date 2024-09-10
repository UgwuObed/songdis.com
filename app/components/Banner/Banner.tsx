import Image from "next/image";


const Banner = () => {
    return (
        <main>
            <div className="px-6 lg:px-8">
                <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20 banner-image">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold text-navyblue sm:text-5xl lg:text-7xl md:4px lh-96">
                        Make money with your music.<br /> Unlimited & everywhere.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-bluegray">
                        SONGDIS provides independent artists and labels with easy music distribution to over 400+ platforms including spotify, Apple, Instagram <br />Earn 100% of your revenue, and expand
                        your fan base across Africa & worldwide.
                        </p>
                    </div>

                    <div className="text-center mt-5">
                        <button type="button" className='text-15px text-white font-medium bg-red-600 py-5 px-9 mt-2 leafbutton'>
                            Get Started
                        </button>
                        <button type="button" className='text-15px ml-4 mt-2 text-red-600 transition duration-150 ease-in-out hover:text-white hover:bg-red-600 font-medium py-5 px-16 border border-lightgrey leafbutton'>
                            See More
                        </button>
                    </div>

                    <Image src={'/assets/banner/dashboard.png'} alt="banner-image" width={1200} height={598} />
                </div>
            </div>
        </main>
    )
}

export default Banner;
