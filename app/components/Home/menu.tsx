import { HomeIcon, ChartBarIcon, WalletIcon, PlayIcon, CogIcon, UsersIcon, FolderIcon, LinkIcon, MusicalNoteIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface SidebarMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, setIsOpen }) => {
    const [isMobile, setIsMobile] = useState(false);

    const navigation = [
        { name: 'Home', href: '/dashboard', icon: HomeIcon },
        { name: 'Your Music', href: '/home/music', icon: PlayIcon },
        { name: 'Wallet', href: '/home/wallet', icon: WalletIcon },
        { name: 'Analytics', href: '/home/analytics', icon: ChartBarIcon },
        { name: 'Release Links', href: '/release-link/release', icon: LinkIcon },
        { name: 'Playlist Hub', href: '/home/playlist', icon: MusicalNoteIcon },
        { name: 'Co Management', href: '/home/management', icon: UsersIcon },
        { name: 'Settings', href: '/home/settings', icon: CogIcon },
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={toggleMenu}
                className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-red-600 text-white`}
            >
                {isOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                ) : (
                    <Bars3Icon className="h-6 w-6" />
                )}
            </button>

            {/* Overlay for mobile */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                    ${isMobile ? 'w-64' : (isOpen ? 'w-48' : 'w-16')} 
                    flex flex-col h-screen bg-red-600 shadow-lg z-40`}
            >
                {/* Desktop Toggle Button */}
                {!isMobile && (
                    <button
                        onClick={toggleMenu}
                        className="absolute top-4 right-[-14px] bg-red-600 text-white p-2 rounded-full focus:outline-none shadow-md"
                    >
                        {isOpen ? '❮' : '❯'}
                    </button>
                )}

                {/* Logo */}
                <div className={`flex items-center justify-center mt-6 transition-opacity duration-500 
                    ${(isOpen || isMobile) ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src="/assets/logo/song.png" alt="Logo" className="h-16" />
                </div>

                {/* Navigation */}
                <nav className="mt-6 flex-1 space-y-2 overflow-hidden">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <div className={`flex items-center text-white p-3 hover:bg-red-700 hover:scale-105 
                                transform transition-all duration-300 cursor-pointer group
                                ${(isOpen || isMobile) ? 'justify-start' : 'justify-center'}`}
                            >
                                <item.icon className="h-6 w-6 transition-transform duration-300" />
                                <span className={`ml-3 text-sm font-medium transition-opacity duration-500 
                                    ${(isOpen || isMobile) ? 'opacity-100' : 'opacity-0 hidden'}`}
                                >
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </nav>

                {/* Bottom Menu */}
                <div className="mt-auto p-4">
                    {['Spotify', 'Cover'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            onClick={(e) => {
                                e.preventDefault();
                                alert('Coming Soon');
                            }}
                        >
                            <div className="flex items-center text-white p-4 hover:bg-red-700 hover:scale-105 
                                transform transition-all duration-300 cursor-pointer group"
                            >
                                <FolderIcon className="h-6 w-6 group-hover:text-yellow-400" />
                                <span className={`ml-3 text-sm font-medium 
                                    ${(isOpen || isMobile) ? 'opacity-100' : 'opacity-0 hidden'} 
                                    transition-opacity duration-500`}
                                >
                                    {item}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;