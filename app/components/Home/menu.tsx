import { Disclosure } from '@headlessui/react';
import { HomeIcon, ChartBarIcon, WalletIcon, PlayIcon, CogIcon, UsersIcon, FolderIcon, LinkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

const SidebarMenu = () => {
    const navigation = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Your Music', href: '/music', icon: PlayIcon },
        { name: 'Wallet', href: '/wallet', icon: WalletIcon },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
        { name: 'Release Links', href: '/release-links', icon: LinkIcon },
        { name: 'Team', href: '/team', icon: UsersIcon },
        { name: 'Settings', href: '/settings', icon: CogIcon },
    ];

    return (
        <div className="flex flex-col h-screen bg-red-600">
            {/* Logo */}
            <div className="flex items-center justify-center mt-6">
                <img src="/path/to/logo.png" alt="Logo" className="h-14" />
            </div>

            {/* Navigation */}
            <nav className="mt-10 flex-1 space-y-2">
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <div className="flex items-center text-white p-4 hover:bg-red-700 cursor-pointer">
                            <item.icon className="h-6 w-6 mr-3" aria-hidden="true" />
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Bottom Menu */}
            <div className="mt-auto p-4">
                <Link href="/spotify">
                    <div className="flex items-center text-white p-4 hover:bg-red-700 cursor-pointer">
                        <FolderIcon className="h-6 w-6 mr-3" aria-hidden="true" />
                        <span className="text-sm font-medium">Spotify</span>
                    </div>
                </Link>
                <Link href="/cover">
                    <div className="flex items-center text-white p-4 hover:bg-red-700 cursor-pointer">
                        <FolderIcon className="h-6 w-6 mr-3" aria-hidden="true" />
                        <span className="text-sm font-medium">Cover</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SidebarMenu;
