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

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                      <p className="font-bold">IMPORTANT NOTE:</p>
                      <p>SONGDIS DOES NOT TAKE ANY COPYRIGHT OR OWNERSHIP OF YOUR MUSIC. WE OPERATE UNDER A LIMITED LICENSE TO DISTRIBUTE YOUR CONTENT.</p>
                    </div>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">1. SONGDIS SERVICE AND YOUR RECORDINGS</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. The SongDis Service allows you to upload audio recordings and related content for distribution to digital platforms and services.</p>
                        <p className="mb-2">b. Recordings must be in single track, EP, or album configurations.</p>
                        <p className="mb-2">c. Accepted file formats include WAV, MP3, AIFF, and other common formats.</p>
                        <p className="mb-2">d. Accurate metadata must be provided upon uploading.</p>
                        <p>e. SongDis will generate unique codes such as ISRCs and UPCs unless otherwise provided.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">2. DIGITAL STORES</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. SongDis licenses your content to Digital Stores on a non-exclusive basis.</p>
                        <p className="mb-2">b. Digital Stores set their pricing and other terms independently.</p>
                        <p className="mb-2">c. SongDis distributes your content globally unless otherwise specified.</p>
                        <p>d. Content availability may change based on Digital Store agreements.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">3. YOUR ACCOUNT</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. You are responsible for maintaining account security.</p>
                        <p className="mb-2">b. Account type determines service level and benefits.</p>
                        <p>c. Account upgrades or changes may be made at any time.</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">4. PAYMENTS AND FEES</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. Royalty Distribution varies by plan (90-100% based on plan type)</p>
                        <p className="mb-2">b. All payments are made in USD with conversion fees borne by artists</p>
                        <p>c. Artists are responsible for all applicable taxes</p>
                      </div>
                    </section>

                    <section className="mb-6">
                      <h3 className="text-lg font-bold mb-2">5. LIMITATIONS OF LIABILITY</h3>
                      <div className="pl-4">
                        <p className="mb-2">a. Service is provided "as-is" without guarantees</p>
                        <p>b. SongDis is not liable for indirect or consequential damages</p>
                      </div>
                    </section>
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