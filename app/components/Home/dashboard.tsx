'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../../components/Home/menu';
import SearchBar from '../../components/Home/search';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BASE_URL } from "../apiConfig";
import {
  MusicalNoteIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  NoSymbolIcon,
  MicrophoneIcon,
  LinkIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  SparklesIcon,
  MegaphoneIcon,
  CurrencyEuroIcon,
  RssIcon,
  CogIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 
  const [showLoginSuccessNotification, setShowLoginSuccessNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [releases, setReleases] = useState<string[]>([]);
 
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/music?filter=single`,  {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch music data');
        }
        const data = await response.json();
        const albumArts = data.data.data.slice(0, 4).map((item: { album_art_url: string }) => item.album_art_url);
        setReleases(albumArts);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusic();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    if (!token) {
      router.push('/auth/signin'); 
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false); 
  }, [router]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('loginSuccess') === 'true') {
      setShowLoginSuccessNotification(true);
      setTimeout(() => setShowLoginSuccessNotification(false), 3000);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return null; 
  }

  const features = [
    { name: 'Priority Pitch', description: 'Submit releases for enhanced promotion, editorial playlists, and more', icon: MusicalNoteIcon },
    { name: 'Publishing Administration', description: 'Collect more royalties and create revenue streams from 50+ societies', icon: DocumentTextIcon },
    { name: 'Greenlist', description: 'Authorize approved accounts to use your music', icon: CheckCircleIcon },
    { name: 'Blocklist', description: 'Prevent unauthorized usage on specified sites and services', icon: NoSymbolIcon },
    { name: 'Audio Recognition', description: 'Scan audio against our global database of musical fingerprints', icon: MicrophoneIcon },
    { name: 'Release Links', description: 'Share your music across the web with one easy link', icon: LinkIcon },
    { name: 'Royalty Splits', description: 'Automatically split your music income among collaborators', icon: CurrencyDollarIcon },
    { name: 'Copyright Registration', description: 'Effortlessly register copyright recordings and compositions', icon: ScaleIcon },
    { name: 'Cover Song Licensing', description: 'Secure rights for your new version of any song', icon: ShieldCheckIcon },
    { name: 'Advance Funding', description: 'Get paid for your music now', icon: CurrencyEuroIcon },
    { name: 'Chart Registration', description: 'Register releases for chart eligibility', icon: ChartBarIcon },
    { name: 'Usage Discovery', description: 'Detect your songs on social media and across the web', icon: SparklesIcon },
    { name: 'Spotify Discovery Mode', description: "Manage participation in Spotify's Discovery Mode", icon: RssIcon },
    { name: 'Promotional Assets', description: 'Create promotional graphics for your new releases', icon: CogIcon },
    { name: 'Channel Monetization', description: 'Monetize your YouTube Channel', icon: MegaphoneIcon },
    { name: 'Fan Blast', description: 'Send messages to your fans', icon: FireIcon },
  ];

  const chartData = [
    { name: 'Jan', uv: 30, pv: 20, amt: 50 },
    { name: 'Feb', uv: 40, pv: 28, amt: 60 },
    { name: 'Mar', uv: 20, pv: 18, amt: 40 },
    { name: 'Apr', uv: 50, pv: 45, amt: 70 },
    { name: 'May', uv: 45, pv: 35, amt: 65 },
    { name: 'Jun', uv: 25, pv: 22, amt: 47 },
    { name: 'Jul', uv: 30, pv: 20, amt: 50 },
    { name: 'Aug', uv: 35, pv: 30, amt: 55 },
    { name: 'Sep', uv: 38, pv: 32, amt: 70 },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden"> 
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-16'}`}
        style={{ overflowX: 'hidden', width: '100vw' }}
      >
         <SearchBar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Releases Section */}
          <div className="mb-8">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold">Releases</h2>
    <button className="text-red-600 font-medium">View All</button>
  </div>
  {releases.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {releases.map((albumArt, index) => (
        albumArt && (
          <div key={index} className="relative aspect-square">
            <img
              src={albumArt}
              alt={`Release ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg';
                console.log('Error loading image:', albumArt);
              }}
            />
          </div>
        )
      ))}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-500">
      No releases available
    </div>
  )}
</div>

          {/* Wallet and Delivery Log */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Wallet Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">My Wallet</h2>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
                <p className="text-2xl font-bold">$0</p>
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-red-600 text-white py-2 px-4 rounded">Withdraw</button>
                <button className="bg-red-600 text-white py-2 px-4 rounded">Transfer</button>
              </div>
            </div>

            {/* Delivery Log Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Delivery Log</h2>
                <select className="text-sm border rounded p-1">
                  <option>14 Sep - 20 Sep</option>
                </select>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      {/* <img src={`/assets/dashboard/release-${item}.jpeg`} alt={`Cover ${item}`} className="w-8 h-8 rounded mr-2" />
                      <span>Cover Me</span> */}
                    </div>
                    <span>Pending distribution</span>
                    <span>Sat, 20 Sept 2024</span>
                    <span className="text-green-500">Uploaded</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                  <feature.icon className="h-8 w-8 text-red-500 mb-2" />
                  <h3 className="text-sm font-semibold mb-1">{feature.name}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Analytics Snapshot</h2>
              <button className="text-red-600 font-medium">Go to Analytics</button>
            </div>
            <div className="h-64 bg-red-500 rounded-lg text-white p-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Bar dataKey="uv" fill="#ffc658" />
                  <Bar dataKey="pv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
