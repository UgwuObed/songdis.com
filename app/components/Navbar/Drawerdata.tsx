import React, { useState } from 'react';
import Link from 'next/link';
import Signdialog from './Signdialog';  // Import Sign In modal
import Registerdialog from './Registerdialog';  // Import Sign Up modal

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Services', href: '#services', current: false },
  { name: 'About', href: '#about', current: false },
  { name: 'Project', href: '#project', current: false },
  { name: 'Help', href: '/', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Drawerdata = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false); // State for Sign In modal
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // State for Sign Up modal

  const openSignInModal = () => setIsSignInOpen(true);
  const openSignUpModal = () => setIsSignUpOpen(true);
  const closeSignInModal = () => setIsSignInOpen(false);
  const closeSignUpModal = () => setIsSignUpOpen(false);

  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'text-black hover:opacity-100' : 'hover:text-black hover:opacity-100',
                  'px-2 py-1 text-lg font-normal opacity-75 block'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4"></div>

            {/* Sign In button */}
            <button
              className="bg-white w-full text-blue border border-lightblue font-medium py-2 px-4 rounded"
              onClick={openSignInModal}
            >
              Sign In
            </button>

            {/* Sign Up button */}
            <button
              className="bg-lightblue w-full hover:bg-blue hover:text-white text-blue font-medium my-2 py-2 px-4 rounded"
              onClick={openSignUpModal}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <Signdialog isOpen={isSignInOpen} onClose={closeSignInModal} />

      {/* Sign Up Modal */}
      <Registerdialog isOpen={isSignUpOpen} onClose={closeSignUpModal} />
    </div>
  );
};

export default Drawerdata;
