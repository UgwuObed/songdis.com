import { HomeIcon, ChartBarIcon, WalletIcon, PlayIcon, CogIcon, UsersIcon, FolderIcon, LinkIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import { link } from 'fs';
import Link from 'next/link';
import React from 'react';

const SidebarMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => {
    const navigation = [
        { name: 'Home', href: '/dashboard', icon: HomeIcon },
        { name: 'Your Music', href: '/home/music', icon: PlayIcon },
        { name: 'Wallet', href: '/home/wallet', icon: WalletIcon },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
        { name: 'Release Links', href: '/release-link/release', icon: LinkIcon },
        { name: 'Playlist Hub', href: '/plays', icon: MusicalNoteIcon },
        { name: 'Co Management', href: '/collaborators', icon: UsersIcon },
        { name: 'Settings', href: '/settings', icon: CogIcon },
    ];
    

    return (
        <div
            className={`fixed inset-y-0 left-0 transform transition-all duration-500 ease-in-out ${
                isOpen ? 'w-48' : 'w-16'
            } flex flex-col h-screen bg-red-600 shadow-lg`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-4 right-[-14px] bg-red-600 text-white p-2 rounded-full focus:outline-none shadow-md z-10"
            >
                {isOpen ? '❮' : '❯'}
            </button>

            {/* Logo */}
            <div className={`flex items-center justify-center mt-6 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <img src="/assets/logo/song.png" alt="Logo" className="h-16" />
            </div>

            {/* Navigation */}
            <nav className="mt-6 flex-1 space-y-2 overflow-hidden">
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <div
                            className={`flex items-center text-white p-3 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 cursor-pointer group ${
                                isOpen ? 'justify-start' : 'justify-center'
                            }`}
                        >
                            {/* Icon always visible */}
                            <item.icon className="h-6 w-6 transition-transform duration-300" aria-hidden="true" />
                            {/* Only show text when sidebar is open */}
                            <span
                                className={`ml-3 text-sm font-medium transition-opacity duration-500 ${
                                    isOpen ? 'opacity-100' : 'opacity-0 hidden'
                                }`}
                            >
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Bottom Menu */}
            <div className="mt-auto p-4">
                <Link href="/spotify">
                    <div className="flex items-center text-white p-4 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 cursor-pointer group">
                        <FolderIcon className="h-6 w-6 group-hover:text-yellow-400" aria-hidden="true" />
                        <span className={`ml-3 text-sm font-medium ${isOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-500`}>
                            Spotify
                        </span>
                    </div>
                </Link>
                <Link href="/cover">
                    <div className="flex items-center text-white p-4 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 cursor-pointer group">
                        <FolderIcon className="h-6 w-6 group-hover:text-yellow-400" aria-hidden="true" />
                        <span className={`ml-3 text-sm font-medium ${isOpen ? 'opacity-100' : 'opacity-0 hidden'} transition-opacity duration-500`}>
                            Cover
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SidebarMenu;
