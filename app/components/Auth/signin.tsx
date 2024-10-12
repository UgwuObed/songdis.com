import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import Link from 'next/link';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setSuccess(true);
      setError('');
      setIsOpen(true);
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    setError('');
    setSuccess(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <img src="/assets/logo/logo.png" alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>
          Continue being amazing
        </p>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>Login successful!</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
         
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          <button type="submit" style={styles.submitButton}>
            Sign in
          </button>
        </form>

        <p style={styles.footer}>
        Not a member? <Link href="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );

};

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
  link: {
    color: 'red',
    textDecoration: 'underline',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  accountTypeHeading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  accountTypeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  accountTypeBox: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
    cursor: 'pointer',
    flex: 1,
  },
  activeBox: {
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
  },
  accountTypeTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  selectButton: {
    marginTop: '10px',
    backgroundColor: '#EB001B',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#EB001B',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default Signin;
