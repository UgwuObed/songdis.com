import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronUpDownIcon, CheckIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BASE_URL } from "../../apiConfig";
import CreateProfileModal from "../../UploadMusic/profile";

interface Profile {
  id: number;
  stage_name: string;
}

interface ArtistSelectProps {
  value: string | null;
  onChange: (id: string, stageName: string) => void;
}

const ArtistSelect: React.FC<ArtistSelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateProfile, setShowCreateProfile] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/profile`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      
      const profileData = response.data.profile;
      setProfiles(Array.isArray(profileData) ? profileData : [profileData]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.stage_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded px-4 py-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
      >
        <span className="text-sm">
          {value || "Select artist..."}
        </span>
        <ChevronUpDownIcon className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <div className="flex items-center px-2 bg-gray-50 rounded">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="w-full p-2 text-sm bg-transparent border-none focus:outline-none"
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="max-h-60 overflow-auto">
            {loading ? (
              <div className="p-2 text-center text-sm text-gray-500">Loading...</div>
            ) : (
              <>
                {filteredProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onChange(profile.id.toString(), profile.stage_name);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon 
                      className={`h-4 w-4 mr-2 ${value === profile.stage_name ? 'text-red-500' : 'text-transparent'}`}
                    />
                    <div>{profile.stage_name}</div>
                  </div>
                ))}
                <div
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer border-t"
                  onClick={() => setShowCreateProfile(true)}
                >
                  <PlusIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Add New Artist
                </div>
              </>
            )}
          </div>
          <CreateProfileModal 
            isOpen={showCreateProfile}
            onClose={() => setShowCreateProfile(false)}
            onProfileCreated={(profile) => {
              setProfiles((prevProfiles) => [...prevProfiles, profile]);
              setShowCreateProfile(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ArtistSelect;