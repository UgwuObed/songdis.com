import Link from "next/link";
import Image from "next/image";

// MIDDLE LINKS DATA
interface ProductType {
  id: number;
  link: string[];
}

const products: ProductType[] = [
  {
    id: 1,
    link: ['Home', 'Popular', 'About', 'Contact'],
  },
  {
    id: 2,
    link: ['Help', 'Resources', 'Application', 'Team'],
  },
];

const Footer = () => {
  return (
    <div className="bg-red-700"> 
      <div className="max-w-2xl px-4 pt-10 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 mt-10 mb-20 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          {/* COLUMN-1 */}
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <div className="flex gap-4">
              <Link href="https://facebook.com" className="footer-fb-icons">
                <Image
                  src={"/assets/footer/facebook.svg"}
                  alt="facebook"
                  width={15}
                  height={20}
                />
              </Link>
              <Link href="https://twitter.com" className="footer-icons">
                <Image
                  src={"/assets/footer/twitter.svg"}
                  alt="twitter"
                  width={20}
                  height={20}
                />
              </Link>
              <Link href="https://instagram.com" className="footer-icons">
                <Image
                  src={"/assets/footer/instagram.svg"}
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>

          {/* COLUMN-2/3 */}
          {products.map((product) => (
            <div
              key={product.id}
              className="relative col-span-2 group md:col-span-4 lg:col-span-2"
            >
              <ul>
                {product.link.map((link: string, index: number) => (
                  <li key={index} className="mb-5">
                    <Link
                      href="/"
                      className="mb-6 text-sm font-normal text-white space-links"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* COLUMN-4 */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <div className="flex gap-2">
              <Image
                src={"/assets/footer/mask.svg"}
                alt="mask-icon"
                width={24}
                height={24}
              />
              <h5 className="text-base font-normal text-white">
            Office 2282, 182-184 High Street North, East
            Ham, London, United Kingdom, E6 2JA
      </h5>
            </div>
            <br />
            <div className="flex gap-2">
              <Image
                src={"/assets/footer/mask.svg"}
                alt="mask-icon"
                width={24}
                height={24}
              />
              <h5 className="text-base font-normal text-white">
              Grace Betty Udokwe Street Lekki, Lagos Nigeria, 
              </h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Image
                src={"/assets/footer/telephone.svg"}
                alt="telephone-icon"
                width={24}
                height={24}
              />
              <h5 className="text-base font-normal text-white">
              +234 915 533 5515
              </h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Image
                src={"/assets/footer/email.svg"}
                alt="email-icon"
                width={24}
                height={24}
              />
              <h5 className="text-base font-normal text-white">
                info@songdis.com
              </h5>
            </div>
          </div>
        </div>

        {/* All Rights Reserved */}
        <div className="items-center justify-between py-10 border-t lg:flex border-t-white">
          <h4 className="text-sm font-normal text-center text-white lg:text-start">
            @2023 Agency. All Rights Reserved by songdis.com
          </h4>
          <div className="flex justify-center gap-5 mt-5 lg:mt-0 lg:justify-start">
            <h4 className="text-sm font-normal text-white">
              <Link href="/" target="_blank">
                Privacy policy
              </Link>
            </h4>
            <div className="h-5 bg-white w-0.5"></div>
            <h4 className="text-sm font-normal text-white">
              <Link href="/" target="_blank">
                Terms & conditions
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
