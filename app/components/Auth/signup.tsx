import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import Link from 'next/link';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
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
      const response = await axios.post(`${BASE_URL}/register`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
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
        <h2 style={styles.title}>Sign up</h2>
        <p style={styles.subtitle}>
          To complete this signup, you must accept our{' '}
          <a href="#terms" style={styles.link}>terms</a> and{' '}
          <a href="#conditions" style={styles.link}>conditions</a>.
        </p>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>Registration successful!</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.gridContainer}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <h3 style={styles.accountTypeHeading}>Choose account type</h3>
          <div style={styles.accountTypeContainer}>
            <div
              style={{
                ...styles.accountTypeBox,
                ...(formData.accountType === 'artist' ? styles.activeBox : {}),
              }}
              onClick={() => setFormData({ ...formData, accountType: 'artist' })}
            >
              <h4 style={styles.accountTypeTitle}>Artist</h4>
              <p>Unlimited albums and singles</p>
              <button type="button" style={styles.selectButton}>
                Select for $2.99
              </button>
            </div>

            <div
              style={{
                ...styles.accountTypeBox,
                ...(formData.accountType === 'label-paid' ? styles.activeBox : {}),
              }}
              onClick={() => setFormData({ ...formData, accountType: 'label-paid' })}
            >
              <h4 style={styles.accountTypeTitle}>Label</h4>
              <p>Unlimited albums for one artist</p>
              <button type="button" style={styles.selectButton}>
                Select for $5.99
              </button>
            </div>

            <div
              style={{
                ...styles.accountTypeBox,
                ...(formData.accountType === 'label-free' ? styles.activeBox : {}),
              }}
              onClick={() => setFormData({ ...formData, accountType: 'label-free' })}
            >
              <h4 style={styles.accountTypeTitle}>Label</h4>
              <p>Collect royalties. 100% free.</p>
              <button type="button" style={styles.selectButton}>
                Select for free
              </button>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            Sign up
          </button>
        </form>

        <p style={styles.footer}>
      Already a member? <Link href="/auth/signin">Sign In</Link>
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
    borderColor: '#EB001B',
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

export default Signup;
