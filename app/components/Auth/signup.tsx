'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../apiConfig';
import Link from 'next/link';
import PaymentPlan from '../../components/Home/payment';
import TermsAndConditionsModal from '../../components/Auth/terms';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    account_type: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
  
    if (!formData.account_type) {
      setError('Please select an account type.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        account_type: formData.account_type,
      });
  
      if (response.data?.message === 'Registration successful.') {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', formData.email);

        router.push('/dashboard');
        setStep(2);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // if (step === 2) {
  //   return (
  //     <PaymentPlan
  //       accountType={formData.account_type}
  //       onPaymentComplete={() => router.push('/dashboard')} 
  //     />
  //   );
  // }

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" 
         style={{ backgroundImage: 'url("/assets/banner/auth.jpg")' }}>
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <img
      src="/assets/logo/logo.png"
      alt="Logo"
      className="h-16 md:h-24 w-auto mx-auto mb-6"
    />
        <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
          Sign up
        </h2>
        
        <p className="text-sm text-gray-600 text-center mb-6">
          To complete this signup, you must accept our <TermsAndConditionsModal />
      </p>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <h3 className="text-lg font-bold mt-6 mb-4">Choose account type</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Basic Plan */}
            <div
              className={`p-4 border rounded cursor-pointer transition-colors duration-200 flex flex-col justify-between h-full
                ${formData.account_type === 'basic' ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}
              onClick={() => setFormData({ ...formData, account_type: 'basic' })}
            >
              <p className="text-sm mb-4">Unlimited uploads and supportive community for one artist</p>
              <button
                type="button"
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              >
                Basic Plan
              </button>
            </div>

            {/* Growth Plan */}
            <div
              className={`p-4 border rounded cursor-pointer transition-colors duration-200 flex flex-col justify-between h-full
                ${formData.account_type === 'growth' ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}
              onClick={() => setFormData({ ...formData, account_type: 'growth' })}
            >
              <p className="text-sm mb-4">Three artists and enhances professional image.</p>
              <button
                type="button"
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              >
                Growth Plan
              </button>
            </div>

            {/* Professional Plan */}
            <div
              className={`p-4 border rounded cursor-pointer transition-colors duration-200 flex flex-col justify-between h-full
                ${formData.account_type === 'professional' ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}
              onClick={() => setFormData({ ...formData, account_type: 'professional' })}
            >
              <p className="text-sm mb-4">Designed specially for career-level artists or labels</p>
              <button
                type="button"
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              >
                Professional Plan
              </button>
            </div>
          </div>

          <div className="flex items-start mt-6">
  <div className="flex items-center h-5">
    <input
      id="terms"
      type="checkbox"
      checked={termsAccepted}
      onChange={(e) => setTermsAccepted(e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
    />
  </div>
  <div className="ml-3">
    <label htmlFor="terms" className="text-sm text-gray-600">
      I agree to the <TermsAndConditionsModal /> of SongDis distribution service.
      By checking this box, I confirm that I have read and understood the terms.
    </label>
  </div>
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 transition-colors disabled:bg-red-400 mt-6"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Signing up...
              </div>
            ) : (
              'Sign up'
            )}
          </button>
        </form>

        <p className="text-center mt-6">
          Already a member?{' '}
          <Link href="/auth/signin" className="text-red-600 hover:text-red-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;