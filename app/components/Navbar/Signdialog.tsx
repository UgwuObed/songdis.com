import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';

interface SigninProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Signin = ({ isOpen, setIsOpen }: SigninProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
        setError('');
        setSuccess(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/login`, formData);
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            setSuccess(true);
            setError('');
        } catch (err) {
            setError('Failed to sign in. Please check your credentials and try again.');
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h2 className="text-2xl font-semibold text-gray-700 text-center">Sign In</h2>
                                {error && <p className="text-red-500 text-center">{error}</p>}
                                {success && <p className="text-green-500 text-center">Sign-in successful!</p>}
                                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                    <div className="rounded-md shadow-sm">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="mb-4 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="mb-4 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="relative flex w-full justify-center rounded-md border bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        <LockClosedIcon className="absolute inset-y-0 left-0 h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
                                        Sign In
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Signin;
