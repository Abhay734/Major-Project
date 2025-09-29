'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import UseAppContext from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [emailHistory, setEmailHistory] = useState([]);
  const { authToken } = UseAppContext();
  const router = useRouter();

  const getProfileData = () => {
    if (!authToken) return; // Guard clause, layout should prevent this state

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then((result) => {
        if (result.data) {
          setProfileData(result.data);
          setFormData({ name: result.data.name, email: result.data.email });
        } else {
          toast.error("❌ Failed to retrieve profile data.");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile data:", err);
        const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
        toast.error(`❌ Error: ${errorMessage}`);
      });

    // Dummy data for email history
    setEmailHistory([
      { id: 1, subject: 'Follow-up on our recent chat', date: 'Sep 17, 2025' },
      { id: 2, subject: 'Introduction to our new service', date: 'Sep 16, 2025' },
      { id: 3, subject: 'Meeting with the design team', date: 'Sep 15, 2025' },
      { id: 4, subject: 'Your newsletter subscription update', date: 'Sep 14, 2025' },
      { id: 5, subject: 'Request for feedback', date: 'Sep 13, 2025' },
    ]);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (!authToken) {
      toast.error("❌ Session expired. Please log in again.");
      return;
    }

    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/updateuser`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then((result) => {
        if (result.data) {
          setProfileData(result.data);
          setIsEditing(false);
          toast.success("✅ Profile updated successfully!");
        } else {
          toast.error("❌ Failed to update profile.");
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
        toast.error(`❌ Error: ${errorMessage}`);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authToken) {
      getProfileData();
    }
  }, [authToken]);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 w-full max-w-5xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-200 text-center">
          My Account
        </h1>

        {/* Profile Details & Edit Section */}
        <div className="bg-white rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12">
          <div className="flex-shrink-0">
            <img
              className="h-32 w-32 rounded-full border-4 border-gray-200"
              src="https://www.gravatar.com/avatar?d=mp&s=150"
              alt="Profile"
            />
          </div>
          <div className="flex-grow w-full">
            {isEditing ? (
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 px-4 py-2"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-sm font-medium text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: profileData.name, email: profileData.email });
                    }}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-3 px-6 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">{profileData.name || 'User Name'}</p>
                <p className="text-xl text-gray-600">{profileData.email}</p>
                <button
                  onClick={handleEditClick}
                  className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-200"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Usage Details Section */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Usage</h2>
          <p className="text-3xl font-extrabold text-indigo-600">
            {profileData.emailsGenerated || 0} / {profileData.plan === 'Pro' ? '1000' : '5'}
          </p>
          <p className="text-sm text-gray-500 mt-2">Emails generated this month.</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${(profileData.emailsGenerated / (profileData.plan === 'Pro' ? 1000 : 5)) * 100}%` }}>
            </div>
          </div>
        </div>


        {/* All Email History Section */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Email History</h2>
          <ul className="divide-y divide-gray-200">
            {emailHistory.length > 0 ? (
              emailHistory.map(email => (
                <li key={email.id} className="py-4 flex justify-between items-center transition duration-200 hover:bg-gray-100 px-2 rounded-md">
                  <div>
                    <p className="font-semibold text-gray-700">{email.subject}</p>
                    <p className="text-sm text-gray-500">Generated on {email.date}</p>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    View
                  </button>
                </li>
              ))
            ) : (
              <li className="py-4 text-center text-gray-500">No emails generated yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;