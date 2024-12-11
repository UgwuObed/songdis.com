import Image from "next/image";

const Clientsay = () => {
    return (
        <div className="max-w-2xl px-4 py-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="bg-image-what">
                <h3 className='text-4xl font-semibold text-center text-navyblue lg:text-6xl'>Join 10k + Songdis  Artists</h3>
                <p className='text-2xl text-center text-navyblue lg:text-6xl font-200 sm:text-4xl'>We provide the tools and services you need to succeed in all stages of your career.</p>
              {/* Web View */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4 lg:mt-10">
            {/* Artist 1 */}
            <div className="relative h-full">
                <Image src="/assets/clientsay/kdiv.jpg" alt="Artist 1" width={300} height={300} className="object-cover w-full h-full rounded-lg" />
                <div className="absolute p-4 bg-white rounded-lg bottom-5 left-5 bg-opacity-80">
                    <p className="text-black">&quot;Songdis has been a game-changer for our music distribution.&quot;</p>
                    <h3 className="text-xl font-semibold">KDIV COCO</h3>
                    <h4 className="text-sm">Artist & Songwriter</h4>
                </div>
            </div>

            {/* Artist 2 */}
            <div className="relative h-full">
                <Image src="/assets/clientsay/rech.jpg" alt="Artist 2" width={300} height={300} className="object-cover w-full h-full rounded-lg" />
                <div className="absolute p-4 bg-white rounded-lg bottom-5 left-5 bg-opacity-80">
                    <p className="text-black">&quot;Their platform made it easy to get our tracks onto major streaming services.&quot;</p>
                    <h3 className="text-xl font-semibold">REECHDEE</h3>
                    <h4 className="text-sm">Artist</h4>
                </div>
            </div>

            {/* Artist 3 */}
            <div className="relative h-full">
                <Image src="/assets/clientsay/ola.jpg" alt="Artist 3" width={300} height={300} className="object-cover w-full h-full rounded-lg" />
                <div className="absolute p-4 bg-white rounded-lg bottom-5 left-5 bg-opacity-80">
                    <p className="text-black">&quot;We reached new heights with Songdis.&quot;</p>
                    <h3 className="text-xl font-semibold">SWIRTOLA</h3>
                    <h4 className="text-sm">Artist & Performer</h4>
                </div>
            </div>

            {/* Artist 4 */}
            <div className="relative h-full">
                <Image src="/assets/clientsay/emmy.jpg" alt="Artist 4" width={300} height={300} className="object-cover w-full h-full rounded-lg" />
                <div className="absolute p-4 bg-white rounded-lg bottom-5 left-5 bg-opacity-80">
                    <p className="text-black">&quot;The best distribution service I’ve used.&quot;</p>
                    <h3 className="text-xl font-semibold">EMMYBROWN</h3>
                    <h4 className="text-sm">Singer & Performer</h4>
                </div>
            </div>
        </div>

{/* Mobile View */}
<div className="mt-10 lg:hidden">
    <div className="grid grid-cols-2 gap-4">
        {/* Artist 1 */}
        <div className="relative">
            <Image src="/assets/clientsay/kdiv.jpg" alt="Artist 1" width={300} height={300} className="object-cover w-full h-full rounded-lg" />
            <div className="p-4 mt-2 bg-white rounded-lg bg-opacity-80">
            </div>
        </div>

        {/* Artist 2 */}
        <div className="relative">
            <Image src="/assets/clientsay/rech.jpg" alt="Artist 2" width={300} height={300} className="object-cover w-full h-full rounded-lg" />
            <div className="p-4 mt-2 bg-white rounded-lg bg-opacity-80">
            </div>
        </div>

        {/* Artist 3 */}
        <div className="relative">
            <Image src="/assets/clientsay/ola.jpg" alt="Artist 3" width={300} height={300} className="object-cover w-full h-full rounded-lg" />
            <div className="p-4 mt-2 bg-white rounded-lg bg-opacity-80">
            </div>
        </div>

        {/* Artist 4 */}
        <div className="relative">
            <Image src="/assets/clientsay/emmy.jpg" alt="Artist 4" width={300} height={300} className="object-cover w-full h-full rounded-lg" />
            <div className="p-4 mt-2 bg-white rounded-lg bg-opacity-80">
            </div>
        </div>
    </div>
</div><br/>
<div className="mt-6 text-center">
                    <button className="px-6 py-3 text-white bg-red-600 rounded-lg">Join Now</button>
                </div>

            </div>
        </div>
    );
};

export default Clientsay;
