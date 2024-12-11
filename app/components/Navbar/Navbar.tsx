import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
    onClick?: () => void;
}

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [isSignInOpen, setIsSignInOpen] = React.useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);

    const navigation: NavigationItem[] = [
        { 
            name: 'Distribute', 
            href: '/', 
            current: true, 
            onClick: () => setIsRegisterOpen(true)
        },
        { name: 'Services', href: '#services', current: false },
        { name: 'About', href: '#about', current: false },
        { name: 'Project', href: '#project', current: false },
        { name: 'Help', href: '/', current: false },
    ];

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Disclosure as="nav" className="fixed top-0 z-50 w-full bg-white shadow navbar">
            <>
                <div className="px-6 mx-auto max-w-7xl lg:py-4 lg:px-8">
                    <div className="relative flex items-center justify-between h-20">
                        <div className="flex items-center flex-1 sm:items-stretch sm:justify-start">
                            <div className="flex items-center flex-shrink-0">
                                <img
                                    className="block lg:hidden"
                                    src={'/assets/logo/logo.png'}
                                    alt="dsign-logo"
                                    style={{ height: '140px', width: 'auto' }} 
                                />
                                <img
                                    className="hidden lg:block"
                                    src={'/assets/logo/logo.png'}
                                    alt="dsign-logo"
                                    style={{ height: '250px', width: 'auto' }} 
                                />
                            </div>
                            <div className="hidden m-auto lg:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'text-black hover:opacity-100' : 'hover:text-black hover:opacity-100',
                                                'px-3 py-4 text-lg font-normal opacity-75 space-links'
                                            )}
                                            onClick={(e) => {
                                                if (item.onClick) {
                                                    e.preventDefault();
                                                    item.onClick();
                                                }
                                            }}
                                            aria-current={item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="hidden space-x-4 lg:flex">
                            <Link 
                             className="px-4 py-2 text-lg font-medium text-black hover:bg-gray-200" 
                            href="/auth/signin">Sign In</Link>
                            <Link 
                             className="px-4 py-2 text-lg font-medium text-white bg-red-600 hover:bg-red-700 border-lightgrey leafbutton"
                            href="/auth/signup">Sign Up</Link>
                        </div>

                    
                        {/* SIGNIN DIALOG */}
                        <Signdialog isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />

                        {/* REGISTER DIALOG */}
                        <Registerdialog isOpen={isRegisterOpen} setIsOpen={setIsRegisterOpen} />

                        {/* DRAWER ICON FOR MOBILE */}
                        <div className='block lg:hidden'>
                            <Bars3Icon className="block w-6 h-6" aria-hidden="true" onClick={() => setIsDrawerOpen(true)} />
                        </div>

                        {/* DRAWER LINKS DATA */}
                        <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                            <Drawerdata
                                openSignIn={() => setIsSignInOpen(true)}
                                openSignUp={() => setIsRegisterOpen(true)}
                            />
                        </Drawer>
                    </div>
                </div>
            </>
        </Disclosure>
    );
}

export default Navbar;