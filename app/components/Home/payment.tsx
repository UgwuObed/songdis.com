const PaymentPlan = ({
    accountType,
    onPaymentComplete,
  }: {
    accountType: string;
    onPaymentComplete: () => void;
  }) => {
    const handlePayment = (plan: string) => {
      console.log(`Processing payment for the ${plan} plan`);
      onPaymentComplete();
    };
  
    return (
      <div className="py-24 relative">
        {/* Background gradient */}
        <div className="absolute h-[26.5rem] w-full top-0 bg-white-to-r from-red-600 to-white -z-10"></div>
  
        {/* Content container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-manrope text-5xl font-bold text-black mb-4">
              Select a Payment Plan
            </h2>
            <p className="text-gray-500 text-xl leading-6">
              You've selected the <span className="text-black">{accountType}</span> plan.
            </p>
          </div>
  
          <section className="py-12">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-1">
                {/* Basic Plan */}
                <div className="group relative flex flex-col items-center bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 p-6 border border-red-500 hover:border-red-700">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex justify-center items-center mb-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m2 0a2 2 0 100-4h-6a2 2 0 100 4m0 0h6a2 2 0 110 4h-6a2 2 0 100-4m0 0h-6a2 2 0 100 4h6"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-red-600">Basic Plan</h3>
                  <p className="font-bold mt-2 text-gray-700">₦1,999.99 Monthly</p>
                  <ul className="mt-4 text-gray-700 list-disc list-inside">
                    <li className="mb-2">1 Artist Account</li>
                    <li className="mb-2">Unlimited Releases</li>
                    <li className="mb-2">Fast Payments & Easy Withdrawals</li>
                    <li className="mb-2">Lyrics Distribution</li>
                    <li className="mb-2">Access to Artist Community Group</li>
                    <li className="mb-2">Stream Links for Each Release</li>
                    <li className="mb-2">24/7 Customer Support</li>
                  </ul>
                  <button
                    onClick={() => handlePayment("Basic")}
                    className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Select Basic
                  </button>
                </div>
  
                {/* Growth Plan */}
                <div className="group relative flex flex-col items-center bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 p-6 border border-red-500 hover:border-red-700">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex justify-center items-center mb-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h11M9 21v-2a4 4 0 00-4-4h-2a4 4 0 01-4-4V4a4 4 0 014-4h12a4 4 0 014 4v7M7 17h1m1 4h2m5-4h3m3 4h3"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-red-600">Growth Plan</h3>
                  <p className="font-bold mt-2 text-gray-700">₦9,999.99 Monthly</p>
                  <ul className="mt-4 text-gray-700 list-disc list-inside">
                    <li className="mb-2">All Basic Plan Features</li>
                    <li className="mb-2">3 Artist Accounts</li>
                    <li className="mb-2">Cover Licensing</li>
                    <li className="mb-2">Lyrics Syncing</li>
                    <li className="mb-2">Profile Verification</li>
                    <li className="mb-2">Visual Consultation</li>
                    <li className="mb-2">Editorial Playlist Consideration</li>
                    <li className="mb-2">24/7 Customer Support</li>
                    <li className="mb-2">Access to Artist Community Group</li>
                  </ul>
                  <button
                    onClick={() => handlePayment("Growth")}
                    className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Select Growth
                  </button>
                </div>
  
                {/* Professional Plan */}
                <div className="group relative flex flex-col items-center bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 p-6 border border-red-500 hover:border-red-700">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex justify-center items-center mb-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c1.5 0 3-1.5 3-3s-1.5-3-3-3-3 1.5-3 3 1.5 3 3 3zm0 4c-2 0-3.5-1.5-3.5-3.5S10 5 12 5s3.5 1.5 3.5 3.5S14 12 12 12zm4.5 6.5c0 2-1.5 3.5-3.5 3.5S9.5 20.5 9.5 18.5s1.5-3.5 3.5-3.5 3.5 1.5 3.5 3.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-red-600">Professional Plan</h3>
                  <p className="font-bold mt-2 text-gray-700">₦499,999.99 Yearly</p>
                  <ul className="mt-4 text-gray-700 list-disc list-inside">
                    <li className="mb-2">All Features from Basic & Growth Plans</li>
                    <li className="mb-2">Unlimited Artists & Releases</li>
                    <li className="mb-2">Co-Management Support</li>
                    <li className="mb-2">Billboard Chart Registration</li>
                    <li className="mb-2">Advanced Visual Consultation</li>
                    <li className="mb-2">Editorial Playlist Consideration</li>
                    <li className="mb-2">Educational Resources</li>
                    <li className="mb-2">24/7 Customer Support</li>
                  </ul>
                  <button
                    onClick={() => handlePayment("Professional")}
                    className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Select Professional
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default PaymentPlan;
  