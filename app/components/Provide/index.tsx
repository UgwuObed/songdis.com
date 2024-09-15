import Image from "next/image";
import Link from "next/link";

interface datatype {
    imgSrc: string;
    service: string;
    paragraph: string;
}

const Aboutdata: datatype[] = [
    {
        imgSrc: "/assets/provide/distribution.svg",
        service: "Playlist Opportunity",
        paragraph: 'Let our team promote your music by submitting it for editorial playlists and securing user-generated placements that match your genre. Boost your streams and reach a broader audience.',
    },
    {
        imgSrc: "/assets/provide/sign.svg",
        service: "Get Signed",
        paragraph: 'At songdis, we help talented artists succeed by offering representation through our management company, The Heavenly Wave. We pitch their music to top record labels and investors.',
    },
    {
        imgSrc: "/assets/provide/analytics.svg",
        service: "Chart Registration",
        paragraph: 'Log in to your Songdis Dashboard to register your music for chart placement and ensure its considered for Billboard recognition and promotion.',
    },
    {
        imgSrc: "/assets/provide/team.svg",
        service: "Co-Management",
        paragraph: 'Our Pro Plan artists enjoy the support of our management team at The Heavenly Wave, alleviating the stress of navigating the music industry on their own. We handle the behind-the-scenes tasks, such as promotion, contract negotiation, and public relations, allowing you to focus on what you do best - making great music.',
    },
]

const Provide = () => {
    return (
        <div id="services">

            <div className='mx-auto max-w-7xl px-4 my-10 sm:py-20 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>

                    {/* COLUMN-1 */}
                    <div className='col-span-6 flex justify-center'>
                        <div className="flex flex-col align-middle justify-center p-10">
                            <p className="text-4xl lg:text-6xl pt-4 font-semibold lh-81 mt-5 text-center lg:text-start">Our Music Distribution Services</p>
                            <h4 className="text-lg pt-4 font-normal lh-33 text-center lg:text-start text-bluegray">We offer a range of services designed to help artists succeed in the music industry, from global distribution to targeted marketing and in-depth analytics.</h4>
                            <Link href={'/'} className="mt-4 text-xl font-medium text-blue flex gap-2 mx-auto lg:mx-0 space-links">Learn more <Image src={'/assets/provide/arrow.svg'} alt={'arrow'} width={20} height={20} /></Link>
                        </div>
                    </div>

                    <div className='lg:col-span-1'></div>

                {/* COLUMN-2 */}
                <div className='col-span-6 lg:col-span-5'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 lg:gap-x-40 px-10 py-12 bg-red-400 rounded-3xl'>
                        {Aboutdata.map((item, i) => (
                            <div key={i} className='bg-white rounded-3xl lg:-ml-32 p-6 shadow-xl'>
                                <Image src={item.imgSrc} alt={item.service} width={64} height={64} className="mb-5" />
                                <h4 className="text-2xl font-semibold">{item.service}</h4>
                                <h4 className='text-lg font-normal text-bluegray my-2'>{item.paragraph}</h4>
                            </div>
                        ))}
                    </div>
                </div>


                </div>
            </div>

        </div>
    )
}

export default Provide;
