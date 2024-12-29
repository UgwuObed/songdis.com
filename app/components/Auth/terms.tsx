import React, { Fragment, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TermsAndConditionsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="text-red-600 underline hover:text-red-700 inline"
      >
        terms and conditions
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
              onClick={closeModal}
            />

            {/* Modal panel */}
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold mb-4">
                    SongDis Distribution Agreement
                  </h3>
                  <button
                    onClick={closeModal}
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-2 max-h-[70vh] overflow-y-auto">
                  <p className="text-sm text-gray-600 mb-4">As of December 24, 2024</p>
                  
                  <div className="space-y-4">
                    <p>
                      This Distribution Agreement and Terms of Service (this "Agreement") is a binding legal agreement between you and SongDis, 
                      a music distribution service operated by The Heavenly Wave Music ("SongDis," "we," "our," or "us"), regarding your use 
                      of our SongDis service to distribute your musical recordings to selected digital platforms and stores (our "Service").
                    </p>

                    <p>
                      If you are entering this Agreement on behalf of others, such as a group, label, or organization, you confirm that you are 
                      authorized to do so and bind all parties to this Agreement.
                    </p>

                    <p>
                      By clicking to accept this Agreement, you confirm that you have read and agree to all terms outlined below. 
                      This Agreement becomes effective on the date of your acceptance ("Effective Date").
                    </p>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                      <p className="font-bold">IMPORTANT NOTE:</p>
                      <p>SONGDIS DOES NOT TAKE ANY COPYRIGHT OR OWNERSHIP OF YOUR MUSIC. WE OPERATE UNDER A LIMITED LICENSE TO DISTRIBUTE YOUR CONTENT.</p>
                    </div>

                    <p>
                      Please ensure that you own or have secured the rights to distribute 100% of the recordings, compositions, artwork, and any 
                      associated materials uploaded to SongDis. For example, you may not upload recordings containing uncleared samples, unauthorized 
                      remixes, or other unlicensed materials. Failure to comply may result in the removal of your content or termination of this Agreement.
                    </p>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">1. SONGDIS SERVICE AND YOUR RECORDINGS</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. The SongDis Service allows you to upload audio recordings and related content (collectively, "Recordings") for distribution to digital platforms and services such as Spotify, Apple Music, Boomplay, and other affiliated platforms ("Digital Stores"), enabling their customers ("Customers") to access and purchase your music.</p>
                        <p className="mb-2">b. Recordings must be in single track, EP, or album configurations. Individual tracks within an album can only be removed by re-uploading the entire album minus the specific track.</p>
                        <p className="mb-2">c. Accepted file formats include WAV, MP3, AIFF, and other common formats, subject to size and quality requirements. SongDis may convert files as needed to meet the specifications of Digital Stores.</p>
                        <p className="mb-2">d. Upon uploading, you must provide accurate metadata, including artist name, album title, track titles, and other required details. You are responsible for indicating explicit content where applicable.</p>
                        <p>e. SongDis will generate unique codes such as ISRCs and UPCs for your recordings unless otherwise provided by you.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">2. DIGITAL STORES</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. SongDis licenses your content to Digital Stores on a non-exclusive basis, meaning you may distribute your content through other services. However, duplicate submissions to the same store via multiple services may cause conflicts, for which SongDis is not responsible.</p>
                        <p className="mb-2">b. Digital Stores set their pricing and other terms independently, and SongDis has no control over these policies. By opting into a Digital Store, you agree to their terms and conditions.</p>
                        <p className="mb-2">c. SongDis distributes your content globally unless otherwise specified. Certain Digital Stores may choose to exclude your Recordings or specific territories based on their policies.</p>
                        <p>d. If SongDis's agreements with a Digital Store expire or terminate, your content will no longer be available through that platform.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">3. YOUR ACCOUNT</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. When registering, you will create a user account with a username and password, which you must keep secure. You are fully responsible for any actions taken under your account, including financial transactions and content uploads.</p>
                        <p className="mb-2">b. Your account type determines the level of service and benefits available, as outlined in the SongDis Plans document. Payment for your chosen plan will recur automatically unless canceled.</p>
                        <p>c. Account upgrades or changes may be made at any time, subject to applicable fees or prorated adjustments.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">4. TERM AND TERMINATION</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. This Agreement begins on the Effective Date and continues for one (1) year unless terminated earlier. It will automatically renew for subsequent terms unless canceled before the renewal date.</p>
                        <p className="mb-2">b. SongDis may terminate this Agreement if you breach its terms, fail to maintain valid payment information, or if your Recordings violate applicable laws or third-party rights.</p>
                        <p>c. Upon termination, SongDis will notify Digital Stores to remove your Recordings. However, content already downloaded or purchased by Customers may remain accessible.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">5. GRANT OF RIGHTS</h3>
                      <div className="pl-4">
                        <p>By using the Service, you grant SongDis the following limited, non-exclusive rights:</p>
                        <p className="mb-2">a. To distribute, reproduce, and promote your Recordings across all selected Digital Stores.</p>
                        <p className="mb-2">b. To use your name, likeness, and associated metadata for marketing, promotion, and operational purposes.</p>
                        <p className="mb-2">c. To collect and process revenues generated from your Recordings and remit them to you according to this Agreement.</p>
                        <p>d. To take necessary steps to format or adapt your Recordings for compliance with Digital Store requirements.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">6. PAYMENTS AND FEES</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. Royalty Distribution:</p>
                        <ul className="list-disc pl-8 mb-2">
                          <li>For artists on the Starter Plan and Growth Plan, SongDis will remit 100% of the revenue received from Digital Stores for your Recordings.</li>
                          <li>For artists on the Professional Plan, SongDis will remit 90% of the revenue received from Digital Stores for your Recordings, with SongDis retaining 10% as a co-management and administrative fee.</li>
                        </ul>
                        <p className="mb-2">b. Currency and Exchange Rates: SongDis collects revenue in U.S. Dollars (USD). Artists requesting payment in their local currency are responsible for all exchange rate conversions and associated fees.</p>
                        <p className="mb-2">c. Taxes and Obligations: All payments are made gross of any applicable taxes. You are responsible for reporting and paying any applicable taxes in your jurisdiction.</p>
                        <p>d. Payment Processing Fees: Payment methods may involve additional processing fees, which will be borne by you.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">7. REPRESENTATIONS AND WARRANTIES</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. You own or have secured all necessary rights to distribute and license the content submitted to SongDis.</p>
                        <p className="mb-2">b. Your content does not infringe on any copyright, trademark, or other rights of third parties.</p>
                        <p>c. You will comply with all laws and third-party terms applicable to your use of the Service.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">8. LIMITATIONS OF LIABILITY</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. SongDis provides its Service "as-is" and makes no guarantees regarding earnings, platform performance, or uninterrupted service.</p>
                        <p>b. SongDis is not liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">9. MISCELLANEOUS</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. This Agreement is governed by the laws of Nigeria. Any disputes will be resolved through arbitration in Lagos.</p>
                        <p className="mb-2">b. SongDis reserves the right to modify or discontinue the Service at any time with prior notice.</p>
                        <p>c. If any part of this Agreement is deemed invalid or unenforceable, the remaining provisions will remain in effect.</p>
                      </div>
                    </section>

                    <p className="font-bold mt-6">BY CLICKING ACCEPT, YOU AGREE TO THESE TERMS IN FULL.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsAndConditionsModal;