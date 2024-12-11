import Image from "next/image";

const Newsletter = () => {
    return (
        <div className='relative bg-red-700 z-3'>
            <div className="max-w-2xl mx-auto bg-blue-500 lg:max-w-7xl rounded-3xl">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8">

                    {/* COLUMN-1 */}
                    <div className='hidden lg:block'>
                        <div className='relative float-right pt-20'>
                            <Image src={'/assets/newsletter/bgImage.png'} alt="bgimg" width={588} height={334} />
                            <div className="absolute right-0 top-10">
                                <Image src={'/assets/newsletter/leaf.svg'} alt="leafimg" width={81} height={81}/>
                            </div>
                            <div className="absolute bottom-8 left-2">
                                <Image src={'/assets/newsletter/circel.svg'} alt="circleimg" width={30} height={30}/>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN-2 */}
                    <div className="flex flex-col justify-center p-10">
                        <h3 className="mb-3 text-4xl font-semibold text-white md:text-5xl" style={{ textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)' }}>Sign up to our newsletter.</h3>
                        <h4 className="text-base font-normal mb-7 text-offwhite" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Craven omni memoria patriae zombieland clairvius narcisse religionis sunt diri undead historiarum.</h4>
                        <div className="flex gap-0">
                            <input type="Email address" name="q" className="w-full py-4 pl-4 text-sm text-black bg-white rounded-l-lg" placeholder="@enter email-address" autoComplete="off" />
                            <button className="px-4 py-2 font-medium text-white rounded-r-lg bg-midblue">
                                <Image src={'/assets/newsletter/plane.svg'} alt="plane-img" width={20} height={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Newsletter;