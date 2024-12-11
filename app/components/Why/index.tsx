import Image from "next/image";

interface whydata {
  heading: string;
  subheading: string;
}

const whydata: whydata[] = [
  {
    heading: "Global Reach",
    subheading:
      "Distribute your music to top streaming platforms worldwide, reaching a global audience effortlessly.",
  },
  {
    heading: "Easy Management",
    subheading:
      "Streamline your music distribution process with our intuitive platform and tools, making management a breeze.",
  },
  {
    heading: "Fast Payments, Simple Withdrawals",
    subheading:
      "Get your royalties directly deposited into your African bank account and enjoy the ease of quick and simple withdrawals. Stay in control of your earnings",
  },
];

const Why = () => {
  return (
    <div id="about">
      {/* Main Container */}
      <div className="px-4 mx-auto my-20 max-w-7xl sm:py-5 lg:px-8">
        {/* Grid layout for Web and Mobile */}
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* COLUMN-1 (Image Section) */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/assets/why/web.png"
              alt="music-distribution-image"
              width={400}
              height={900}
              className="w-full max-w-md rounded-lg shadow-lg lg:max-w-lg"
            />
          </div>

          {/* COLUMN-2 (Content Section) */}
          <div className="space-y-6">
            {whydata.map((item, index) => (
              <div className="flex items-start" key={index}>
                
                {/* Icon with a hover effect */}
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-all transform rounded-full bg-circlebg hover:scale-105 hover:shadow-lg">
                  <Image
                    src="/assets/why/check.svg"
                    alt="check-icon"
                    width={24}
                    height={24}
                  />
                </div>

                {/* Textual Content */}
                <div className="ml-6">
                  <h4 className="text-xl font-bold text-gray-900">
                    {item.heading}
                  </h4>
                  <h5 className="mt-2 leading-relaxed text-gray-600 text-md">
                    {item.subheading}
                  </h5>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Why;
