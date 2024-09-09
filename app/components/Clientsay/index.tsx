import Image from "next/image";

const Clientsay = () => {
    return (
        <div className="mx-auto max-w-2xl py-40 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="bg-image-what">
                <h3 className='text-navyblue text-center text-4xl lg:text-6xl font-semibold'>What Our Clients Say About Us</h3>
                <h4 className="text-lg font-normal text-darkgray text-center mt-4">Hear from artists and labels who have experienced the power of seamless music distribution. <br /> Discover how we’ve helped them reach new heights.</h4>

                <div className="lg:relative">
                    <Image src={'/assets/clientsay/avatars.png'} alt="client-avatars" width={1061} height={733} className="hidden lg:block" />

                    <span className="lg:absolute lg:bottom-40 lg:left-80">
                    <Image src={'/assets/clientsay/kdiv.jpeg'} alt="testimonial-client" width={168} height={168} className="mx-auto pt-10 lg:pb-10 rounded-full" />
                        <div className="lg:inline-block bg-white rounded-2xl p-5 shadow-sm">
                            <p className="text-base font-normal text-center text-darkgray">“Songdis has been a game-changer for our music distribution. The platform made it easy to get our tracks onto major streaming services and track our success.”</p>
                            <h3 className="text-2xl font-medium text-center py-2">Melodysongz</h3>
                            <h4 className="text-sm font-normal text-center">Music Producer</h4>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Clientsay;

