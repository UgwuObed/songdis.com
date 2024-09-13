import Image from 'next/image';

interface cardDataType {
    heading: string;
    subheading: string;
}

const cardData: cardDataType[] = [
    {
        heading: "Advanced Analytics",
        subheading: "Get deeper insights into your music's performance with detailed analytics. Track your streaming stats social media engagement and royalties easily.",
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
        subheading: "Release your own version of any song with ease. Our streamlined process ensures you obtain all necessary rights within 1-2 business days, allowing you to legally distribute your cover song and start earning royalties. Let us handle the licensing so you can focus on creating amazing music.",
    }
]

const Buyers = () => {
    return (
        <div className='mx-auto max-w-7xl py-16 px-6'>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5'>
                {cardData.map((items, i) => (
                    <div className='flex flex-col justify-center items-center' key={i}>
                        <h3 className='text-2xl text-black font-semibold text-center lg:mt-6'>{items.heading}</h3>
                        <p className='text-lg font-normal text-black text-center text-opacity-50 mt-2'>{items.subheading}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Buyers;
