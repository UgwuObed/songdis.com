import Image from "next/image";

const Clientsay = () => {
    return (
        <div className="mx-auto max-w-2xl py-40 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="bg-image-what">
                <h3 className='text-navyblue text-center text-4xl lg:text-6xl font-semibold'>What Our Artists Say About Us</h3>

              {/* Web View */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 lg:mt-10">
            {/* Artist 1 */}
            <div className="relative h-full">
                <Image src="/assets/clientsay/kdiv.jpg" alt="Artist 1" width={300} height={300} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute bottom-5 left-5 bg-white bg-opacity-80 p-4 rounded-lg">
                    <p className="text-black">&quot;Songdis has been a game-changer for our music distribution.&quot;</p>
                    <h3 className="text-xl font-semibold">KDIV COCO</h3>
                    <h4 className="text-sm">Artist & Songwriter</h4>
                </div>
            </div>

            {/* Artist 2 */}
            <div className="relative h-full">
                <Image src="/assets/clientsay/rech.jpg" alt="Artist 2" width={300} height={300} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute bottom-5 left-5 bg-white bg-opacity-80 p-4 rounded-lg">
                    <p className="text-black">&quot;Their platform made it easy to get our tracks onto major streaming services.&quot;</p>
                    <h3 className="text-xl font-semibold">REECHDEE</h3>
                    <h4 className="text-sm">Artist</h4>
                </div>
            </div>

            {/* Artist 3 */}
            <div className="relative h-full">
                <Image src="/assets/clientsay/ola.jpg" alt="Artist 3" width={300} height={300} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute bottom-5 left-5 bg-white bg-opacity-80 p-4 rounded-lg">
                    <p className="text-black">&quot;We reached new heights with Songdis.&quot;</p>
                    <h3 className="text-xl font-semibold">SWIRTOLA</h3>
                    <h4 className="text-sm">Artist & Performer</h4>
                </div>
            </div>

            {/* Artist 4 */}
            <div className="relative h-full">
                <Image src="/assets/clientsay/emmy.jpg" alt="Artist 4" width={300} height={300} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute bottom-5 left-5 bg-white bg-opacity-80 p-4 rounded-lg">
                    <p className="text-black">&quot;The best distribution service I’ve used.&quot;</p>
                    <h3 className="text-xl font-semibold">EMMYBROWN</h3>
                    <h4 className="text-sm">Singer & Performer</h4>
                </div>
            </div>
        </div>

{/* Mobile View */}
<div className="lg:hidden mt-10">
    <div className="grid grid-cols-2 gap-4">
        {/* Artist 1 */}
        <div className="relative">
            <Image src="/assets/clientsay/kdiv.jpg" alt="Artist 1" width={300} height={300} className="w-full h-full object-cover rounded-lg" />
            <div className="bg-white bg-opacity-80 p-4 rounded-lg mt-2">
            </div>
        </div>

        {/* Artist 2 */}
        <div className="relative">
            <Image src="/assets/clientsay/rech.jpg" alt="Artist 2" width={300} height={300} className="w-full h-full object-cover rounded-lg" />
            <div className="bg-white bg-opacity-80 p-4 rounded-lg mt-2">
            </div>
        </div>

        {/* Artist 3 */}
        <div className="relative">
            <Image src="/assets/clientsay/ola.jpg" alt="Artist 3" width={300} height={300} className="w-full h-full object-cover rounded-lg" />
            <div className="bg-white bg-opacity-80 p-4 rounded-lg mt-2">
            </div>
        </div>

        {/* Artist 4 */}
        <div className="relative">
            <Image src="/assets/clientsay/emmy.jpg" alt="Artist 4" width={300} height={300} className="w-full h-full object-cover rounded-lg" />
            <div className="bg-white bg-opacity-80 p-4 rounded-lg mt-2">
            </div>
        </div>
    </div>
</div><br/>
                <div className="text-center mt-6">
                    <button className="bg-red-600 text-white py-3 px-6 rounded-lg">Join Now</button>
                </div>
            </div>
        </div>
    );
};

export default Clientsay;
