'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-password`, {
        email,
      });

      setSuccess(response.data.message);
      setEmail(''); 
    } catch (err) {
      console.error('Forgot password error:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: 'url("/assets/banner/auth.jpg")' }}
    >
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <img
          src="/assets/logo/logo.png"
          alt="Logo"
          className="h-12 md:h-16 w-auto mx-auto mb-6"
        />
        
        <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
          Forgot Password
        </h2>
        
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address to receive a password reset link
        </p>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600 text-white p-4 rounded mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 transition-colors disabled:bg-red-400"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Sending Reset Link...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link href="/auth/signin" className="text-red-600 hover:text-red-700 block">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;