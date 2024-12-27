'use client';


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { BASE_URL } from '../apiConfig';
import Link from 'next/link';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  
  const token = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');
  
  const [email, setEmail] = useState(emailFromUrl || '');
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [emailFromUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) {
      setError('Invalid reset link');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${BASE_URL}/api/reset-password`, {
        email,
        token,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      if (response.data?.message) {
        router.push('/auth/signin?reset=success');
      }
    } catch (err) {
      console.error('Reset password error:', err);
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
          Reset Password
        </h2>
        
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password
        </p>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={!!emailFromUrl}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm New Password"
            value={formData.password_confirmation}
            onChange={handleChange}
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
                Resetting Password...
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/auth/signin" className="text-red-600 hover:text-red-700">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;