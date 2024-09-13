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
    heading: "Easy Withdrawal",
    subheading:
      "Enjoy hassle-free withdrawal options with streamlined processes for your earnings.",
  },
];

const Why = () => {
  return (
    <div id="about">
      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 my-20 sm:py-20 lg:px-8">
        {/* Grid layout for Web and Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* COLUMN-1 (Image Section) */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/assets/why/iPad.png"
              alt="music-distribution-image"
              width={400}
              height={900}
              className="w-full max-w-md lg:max-w-lg rounded-lg shadow-lg"
            />
          </div>

          {/* COLUMN-2 (Content Section) */}
          <div className="space-y-6">
            {whydata.map((item, index) => (
              <div className="flex items-start" key={index}>
                
                {/* Icon with a hover effect */}
                <div className="flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center bg-circlebg transition-all transform hover:scale-105 hover:shadow-lg">
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
                  <h5 className="text-md text-gray-600 mt-2 leading-relaxed">
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
