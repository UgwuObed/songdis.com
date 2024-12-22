'use client';
import React, { useState, useEffect } from 'react';
import { X, Calendar, Twitter, Instagram, Facebook, Music, ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentPlan from '../../components/Home/payment';
import { BASE_URL } from '../apiConfig';

type UploadTypeSelectionProps = {
  onSelect: (uploadType: 'Single' | 'Album/EP') => void;
};

const UploadTypeSelection: React.FC<UploadTypeSelectionProps> = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState<'Single' | 'Album/EP' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentPlan, setShowPaymentPlan] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    stage_name: '',
    dob: '',
    twitter_url: '',
    instagram_url: '',
    facebook_url: '',
    spotify_url: '',
    apple_music_url: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${BASE_URL}/api/status`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (data.message === 'No active subscription.') {
          setShowPaymentPlan(true);
        } else if (!response.ok) {
          throw new Error(data.message || 'Failed to check subscription status');
        }
      } catch (error) {
        console.error('Subscription check error:', error);
        toast.error('Error checking subscription status. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    checkSubscriptionStatus();
  }, []);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (showPaymentPlan) return; 

      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${BASE_URL}/api/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.status === 404) {
          setProfile(null);
          setShowModal(true);
        } else {
          setProfile(data.profile);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Error fetching profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [showPaymentPlan]); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};
    if (!formData.full_name) validationErrors.full_name = 'Full name is required.';
    if (!formData.stage_name) validationErrors.stage_name = 'Stage name is required.';
    if (!formData.dob) validationErrors.dob = 'Date of birth is required.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleCreateProfile = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/create-profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setProfile(response.data.profile);
      setShowModal(false);
      toast.success('Profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (showPaymentPlan) {
    return (
      <PaymentPlan
        accountType=""
        onPaymentComplete={() => {
          setShowPaymentPlan(false);
          window.location.reload(); 
        }}
      />
    );
  }


  return (
    <div className="flex flex-col items-center bg-white text-gray-800 p-10 rounded-lg space-y-6 shadow-md">
  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
  Select Upload Type
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
  {/* Song */}
  <div
    className={`flex flex-col items-center p-4 sm:p-6 rounded-lg cursor-pointer transition-transform transform ${
      selectedType === 'Single'
        ? 'bg-red-100 border-2 border-red-500 scale-105'
        : 'bg-gray-100 border border-gray-300 hover:scale-105'
    }`}
    onClick={() => setSelectedType('Single')}
  >
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-6 h-6 sm:w-8 sm:h-8 text-white"
        viewBox="0 0 24 24"
      >
        <path d="M12 3L1 9l11 6 11-6L12 3zm0 7.5L4.5 9 12 13.5 19.5 9 12 10.5zm0 3L4.5 12 12 16.5 19.5 12 12 13.5z" />
      </svg>
    </div>
    <p className="text-base sm:text-lg font-semibold">Single</p>
  </div>

  {/* Album/EP */}
  <div
    className={`flex flex-col items-center p-4 sm:p-6 rounded-lg cursor-pointer transition-transform transform ${
      selectedType === 'Album/EP'
        ? 'bg-yellow-100 border-2 border-yellow-500 scale-105'
        : 'bg-gray-100 border border-gray-300 hover:scale-105'
    }`}
    onClick={() => setSelectedType('Album/EP')}
  >
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-6 h-6 sm:w-8 sm:h-8 text-white"
        viewBox="0 0 24 24"
      >
        <path d="M4 4h16v16H4z" />
      </svg>
    </div>
    <p className="text-base sm:text-lg font-semibold">Album / EP</p>
  </div>
</div>

<button
  onClick={() => selectedType && onSelect(selectedType)}
  className={`mt-4 sm:mt-6 px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-lg font-bold rounded-lg transition ${
    selectedType
      ? 'bg-red-500 text-white hover:bg-red-600'
      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
  }`}
  disabled={!selectedType}
>
  Next
</button>

<div className="mt-4 text-xs sm:text-sm text-gray-500 text-center md:text-left">
  <p>Supported file types: MP3, WAV, FLAC, M4A, OGG</p>
  <p>Max file size: 250MB</p>
</div>

      {/* Toast Notifications */}
      <ToastContainer />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-1xl font-bold">Artist Profile Setup</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-6 gap-2">
                <div className={`h-2 w-16 rounded-full transition-colors ${step === 1 ? 'bg-red-500' : 'bg-gray-200'}`} />
                <div className={`h-2 w-16 rounded-full transition-colors ${step === 2 ? 'bg-red-500' : 'bg-gray-200'}`} />
              </div>

              {/* Form Steps */}
              <div className={`transition-opacity duration-300 ${step === 1 ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                        <input
                          type="text"
                          name="full_name"
                          placeholder="Enter your full name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          className={`w-full p-3 border ${errors.full_name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all`}
                        />
                        {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name*</label>
                        <input
                          type="text"
                          name="stage_name"
                          placeholder="Enter your stage name"
                          value={formData.stage_name}
                          onChange={handleInputChange}
                          className={`w-full p-3 border ${errors.stage_name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all`}
                        />
                        {errors.stage_name && <p className="text-red-500 text-sm mt-1">{errors.stage_name}</p>}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className={`w-full p-3 pl-10 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all`}
                        />
                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`transition-opacity duration-300 ${step === 2 ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Social Media Links</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Twitter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          name="twitter_url"
                          placeholder="Twitter Profile URL"
                          value={formData.twitter_url}
                          onChange={handleInputChange}
                          className="w-full p-3 pl-10 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        />
                      </div>

                      <div className="relative">
                        <Instagram className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          name="instagram_url"
                          placeholder="Instagram Profile URL"
                          value={formData.instagram_url}
                          onChange={handleInputChange}
                          className="w-full p-3 pl-10 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Music Platforms</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Music className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          name="spotify_url"
                          placeholder="Spotify Profile URL"
                          value={formData.spotify_url}
                          onChange={handleInputChange}
                          className="w-full p-3 pl-10 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        />
                      </div>

                      <div className="relative">
                        <Music className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          name="apple_music_url"
                          placeholder="Apple Music Profile URL"
                          value={formData.apple_music_url}
                          onChange={handleInputChange}
                          className="w-full p-3 pl-10 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t mt-6">
                <button
                  type="button"
                  onClick={() => step === 1 ? setShowModal(false) : setStep(1)}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {step === 1 ? 'Cancel' : 'Back'}
                </button>
                
                <button
                  type="button"
                  onClick={() => step === 1 ? setStep(2) : handleCreateProfile()}
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
                >
                  {step === 1 ? (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    isSubmitting ? 'Saving...' : 'Create Profile'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadTypeSelection;