'use client'; 

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); 
    setError(''); 

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

    
      if (response.status === 200 && response.data.token) {
        const { token } = response.data;
        localStorage.setItem('authToken', token); 

      
        router.push('/dashboard?loginSuccess=true');
      } else {
        
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
     
      if (axios.isAxiosError(err) && err.response) {
       
        
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
  
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer as React.CSSProperties}>
        <img src="/assets/logo/logo.png" alt="Logo" style={styles.logo} />
        <h2 style={styles.title as React.CSSProperties}>Welcome Back</h2>
        <p style={styles.subtitle as React.CSSProperties}>Continue being amazing</p>

        {/* Display error messages */}
        {error && <p className="notification error">{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form as React.CSSProperties}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input as React.CSSProperties}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input as React.CSSProperties}
          />
          <button
            type="submit"
            style={styles.submitButton as React.CSSProperties}
            disabled={loading}
          >
            {loading ? (
              <div style={styles.loaderContainer}>
                <div className="spinner" />
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p style={{ color: 'inherit', textAlign: 'center' }}>
          Not a member? <Link href="/auth/signup">Sign Up</Link>
        </p>
      </div>

     
      <style jsx>{`
        .notification {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 15px 20px;
          border-radius: 5px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-size: 14px;
          font-weight: 600;
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .error {
          background-color: #e53e3e;
          color: white;
        }

        .spinner {
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-left-color: #ffffff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-right: 10px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

// Styles Object
const styles = {
  container: {
    backgroundImage: 'url("/assets/banner/auth.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '20px',
    minHeight: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '700px',
    position: 'relative',
  },
  logo: {
    width: '140px',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '14px',
    color: 'gray',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#EB001B',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default Signin;
