import Image from 'next/image';

interface cardDataType {
    heading: string;
    percent: string;
    subheading: string;
}

const cardData: cardDataType[] = [
    {
        percent: '80k',
        heading: "Advanced Analytics",
        subheading: "Get deeper insights into your music's performance with detailed analytics. Track your streaming stats social media engagement and royalties easily.",
    },
    {
        percent: '90k',
        heading: "Create release links.",
        subheading: "Instantly create shareable links and pre-save links to amplify your music's reach on release day. Provide your fans with a convenient way to discover and enjoy your latest release across all major streaming platforms.",
    },
    {
        percent: '80%',
        heading: "Simple Withdrawals ",
        subheading: "Get your royalties directly deposited into your African bank account and enjoy the ease of quick and simple withdrawals. Stay in control of your earnings with reliable banking services from SONGDIS",
    },
    {
        percent: '50+',
        heading: "Music Industry Partners",
        subheading: "Partnering with leading industry professionals to enhance music distribution and promotion to help you reach global audience. Boost your streams and build momentum with these powerful tools from SONGDIS.",
    }
]

const Buyers = () => {
    return (
        <div className='mx-auto max-w-7xl py-16 px-6'>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5'>
                {cardData.map((items, i) => (
                    <div className='flex flex-col justify-center items-center' key={i}>
                        <h2 className='text-4xl lg:text-6xl text-black font-semibold text-center mt-5'>{items.percent}</h2>
                        <h3 className='text-2xl text-black font-semibold text-center lg:mt-6'>{items.heading}</h3>
                        <p className='text-lg font-normal text-black text-center text-opacity-50 mt-2'>{items.subheading}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Buyers;
