import Image from 'next/image';

interface cardDataType {
    heading: string;
    subheading: string;
}

const cardData: cardDataType[] = [
    {
        heading: "Advanced Analytics",
        subheading: "With songdis advance tools you can get deeper insights into your music's performance with detailed analytics. Track your streaming stats social media engagement and royalties easily.",
    },
    {
        heading: "Create release links.",
        subheading: "Instantly create shareable links and pre-save links to amplify your music's reach on release day. Provide your fans with a convenient way to discover and enjoy your latest release across all major streaming platforms.",
    },
    {
        heading: "Simple Withdrawals ",
        subheading: "Get your royalties directly deposited into your African bank account and enjoy the ease of quick and simple withdrawals. Stay in control of your earnings with reliable banking services from SONGDIS",
    },
    {
        heading: "Cover Song Licensing",
        subheading: "Release your own version of any song with ease. Our streamlined process ensures you obtain all necessary rights within 1-2 business days, allowing you to legally distribute your cover song and start earning royalties.",
    }
]

const Buyers = () => {
    return (
        <div className='px-6 py-16 mx-auto max-w-7xl'>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5'>
                {cardData.map((items, i) => (
                    <div className='flex flex-col items-center justify-start md:items-start' key={i}>
                        <h3 className='text-2xl font-semibold text-center text-black lg:mt-6'>{items.heading}</h3>
                        <p className='mt-2 text-base font-normal text-center text-black text-opacity-50 md:text-start'>{items.subheading}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Buyers;
