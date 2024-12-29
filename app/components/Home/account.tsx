import React, { useState, useEffect } from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { BASE_URL } from "../apiConfig";


interface AccountDetails {
  id: string;
  account_number: string;
  bank_name: string;
  account_name: string;
}

interface AccountDetailsFormProps {
  onSuccess: () => void;
}

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [accountDetails, setAccountDetails] = useState({
    account_number: '',
    bank_name: '',
    account_name: ''
  });
  const [existingAccount, setExistingAccount] = useState<AccountDetails | null>(null);

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/account-details`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (response.ok) {
        const data: AccountDetails = await response.json();
        setExistingAccount(data);
        setAccountDetails({
          account_number: data.account_number,
          bank_name: data.bank_name,
          account_name: data.account_name
        });
      }
    } catch (err) {
      console.error('Error fetching account details:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountDetails({
      ...accountDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = existingAccount 
        ? `${BASE_URL}/api/account-details/${existingAccount.id}`
        : `${BASE_URL}/api/account-details`;
      
      const method = existingAccount ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(accountDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save account details');
      }

      setSuccess(existingAccount ? 'Account details updated successfully!' : 'Account details saved successfully!');
      setExistingAccount(data);
      onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingAccount || !confirm('Are you sure you want to delete your account details?')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${BASE_URL}/api/account-details/${existingAccount.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete account details');
      }

      setSuccess('Account details deleted successfully!');
      setExistingAccount(null);
      setAccountDetails({
        account_number: '',
        bank_name: '',
        account_name: ''
      });
      onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {existingAccount ? 'Update Account Details' : 'Add Account Details'}
      </h2>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 mb-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          <CheckCircleIcon className="h-5 w-5" />
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number
          </label>
          <input
            type="text"
            name="account_number"
            value={accountDetails.account_number}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Name
          </label>
          <input
            type="text"
            name="bank_name"
            value={accountDetails.bank_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Name
          </label>
          <input
            type="text"
            name="account_name"
            value={accountDetails.account_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (existingAccount ? 'Update Details' : 'Save Details')}
          </button>

          {existingAccount && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;