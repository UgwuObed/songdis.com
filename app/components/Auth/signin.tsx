'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams  } from 'next/navigation';
import { BASE_URL } from '../apiConfig';
import Link from 'next/link';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get('reset') === 'success';

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

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data?.message === 'Login successful.') {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        router.push('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Signin error:', err);
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
          Welcome Back
        </h2>
        
        <p className="text-sm text-gray-600 text-center mb-6">
          Continue being amazing
        </p>
  
        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}
  
        {resetSuccess && (
          <div className="bg-green-600 text-white p-4 rounded mb-4 text-center">
            Password reset successful. Please sign in with your new password.
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          
          <div className="space-y-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex justify-end">
              <Link 
                href="/auth/forget" 
                className="text-sm text-red-600 hover:text-red-700"
              >
                Forgot Password?
              </Link>
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
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
  
        <p className="text-center mt-6">
          Not a member?{' '}
          <Link href="/auth/signup" className="text-red-600 hover:text-red-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;