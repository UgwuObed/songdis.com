import React, { useState } from 'react';
import { X, Calendar, Twitter, Instagram, Music, ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../apiConfig';
import ProfileLimitModal from '../Home/profile';
import PaymentPlan from '../Home/payment';
import { useRouter } from 'next/router';

type CreateProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated: (profile: any) => void;
};

const CreateProfileModal = ({ isOpen, onClose, onProfileCreated }: CreateProfileModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProfileLimitModal, setShowProfileLimitModal] = useState(false);
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
      onProfileCreated(response.data.profile);
      resetForm();
      onClose();
      toast.success('Profile created successfully!');
    } catch (error: unknown) {
      console.error('Error creating profile:', error);
      if (axios.isAxiosError(error) && error.response?.data?.message?.includes('profile limit')) {
        setShowProfileLimitModal(true);
      } else {
        toast.error('Failed to create profile. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpgrade = () => {
    setShowProfileLimitModal(false);
    setShowPaymentPlan(true);
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      stage_name: '',
      dob: '',
      twitter_url: '',
      instagram_url: '',
      facebook_url: '',
      spotify_url: '',
      apple_music_url: '',
    });
    setStep(1);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full max-w-3xl shadow-2xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-1xl font-bold">Artist Profile Setup</h3>
            <button 
              onClick={() => {
                resetForm();
                onClose();
              }} 
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-6 gap-2">
              <div className={`h-2 w-16 rounded-full transition-colors ${step === 1 ? 'bg-red-500' : 'bg-gray-200'}`} />
              <div className={`h-2 w-16 rounded-full transition-colors ${step === 2 ? 'bg-red-500' : 'bg-gray-200'}`} />
            </div>

            {/* Step 1: Personal Information */}
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

            {/* Step 2: Social Media and Music Platforms */}
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

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t mt-6">
              <button
                type="button"
                onClick={() => {
                  if (step === 1) {
                    resetForm();
                    onClose();
                  } else {
                    setStep(1);
                  }
                }}
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

              <ProfileLimitModal 
        isOpen={showProfileLimitModal}
        onClose={() => setShowProfileLimitModal(false)}
        onUpgrade={handleUpgrade}
        />
            </div>
          </div>
        </div>
      </div>

      {showPaymentPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <PaymentPlan 
            accountType="Growth"
            onPaymentComplete={() => {
              setShowPaymentPlan(false);
              onClose();
            }} 
          />
        </div>
      )}
    </>
  );
};

export default CreateProfileModal;

