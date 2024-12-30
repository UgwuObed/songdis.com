import React from "react";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  onClick?: () => void;  
}

interface DrawerdataProps {
  openSignIn: () => void;
  openSignUp: () => void;
  openFaq: () => void;
}

const Data = ({ openSignIn, openSignUp, openFaq }: DrawerdataProps) => {
  const navigation: NavigationItem[] = [
    { 
      name: 'Distribute', 
      href: '/', 
      current: true, 
      onClick: () => openSignUp()  
    },
    { name: 'Services', href: '#services', current: false },
    { name: 'About', href: '#about', current: false },
    { name: 'Project', href: '#project', current: false },
    { 
      name: 'FAQ', 
      href: '/FAQ',
      current: false,
      onClick: () => openFaq()
    }
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

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
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4"></div>
            <Link 
              href="/auth/signin"
              className="block bg-lightblue w-full hover:bg-blue hover:text-white text-blue font-medium my-2 py-2 px-4 rounded text-center"
              onClick={(e) => {
                e.preventDefault();
                openSignIn();
              }}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup" 
              className="block bg-lightblue w-full hover:bg-blue hover:text-white text-blue font-medium my-2 py-2 px-4 rounded text-center"
              onClick={(e) => {
                e.preventDefault();
                openSignUp();
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;