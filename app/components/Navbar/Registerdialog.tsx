import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';

const Register = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
        setError('');
        setSuccess(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/register`, formData);
            const { token } = response.data;

            // Store token in localStorage
            localStorage.setItem('authToken', token);
            setSuccess(true);
            setError('');
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                <div className='hidden lg:block'>
                    <button className="text-white text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out bg-red-600 hover:bg-red-700" onClick={openModal}>
                        Sign up
                    </button>
                </div>
            </div>

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
                                <Dialog.Panel className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}
                                    >
                                    </div>
                                    <div className="w-full lg:w-1/2 p-8">
                                        <h2 className="text-2xl font-semibold text-gray-700 text-center">Register your account</h2>
                                        {error && <p className="text-red-500 text-center">{error}</p>}
                                        {success && <p className="text-green-500 text-center">Registration successful!</p>}
                                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                            <div className="rounded-md shadow-sm">
                                                <div className="mb-4">
                                                    <input
                                                        id="first_name"
                                                        name="first_name"
                                                        type="text"
                                                        required
                                                        className="relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                                        placeholder="First Name"
                                                        value={formData.first_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        id="last_name"
                                                        name="last_name"
                                                        type="text"
                                                        required
                                                        className="relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                                        placeholder="Last Name"
                                                        value={formData.last_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        className="relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                                        placeholder="Email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        required
                                                        className="relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                                        placeholder="Password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        id="password_confirmation"
                                                        name="password_confirmation"
                                                        type="password"
                                                        required
                                                        className="relative block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                                        placeholder="Confirm Password"
                                                        value={formData.password_confirmation}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            >
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <LockClosedIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
                                                </span>
                                                Register Now
                                            </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Register;
