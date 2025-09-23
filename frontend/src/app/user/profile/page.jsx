'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const getProfileData = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    if (!token) {
      toast.error("❌ You are not logged in. Please log in.");
      window.location.href = '/signup';
      return;
    }

    console.log("Token:", token);

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((result) => {
        console.log(result.data);
        
        setProfileData(result.data);
        setFormData({ name: result.data.name, email: result.data.email });
        console.log("Profile data fetched successfully:", result.data);
      })
      .catch((err) => {
        console.error("Error fetching profile data:", err);
        // FIX: Check if err.response exists before trying to access it
        const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
        toast.error(`❌ Error: ${errorMessage}`);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    if (!token) {
      toast.error("❌ You are not logged in. Please log in.");
      return;
    }

    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/updateuser`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((result) => {
        setProfileData(result.data.user);
        setIsEditing(false);
        toast.success("✅ Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        // FIX: Check if err.response exists before trying to access it
        const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
        toast.error(`❌ Error: ${errorMessage}`);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Profile
        </h1>

        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-6 flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              className="h-24 w-24 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>
          <div className="flex-grow">
            {isEditing ? (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-xl font-semibold text-gray-900">{profileData.name || 'User Name'}</p>
                <p className="text-gray-600">{profileData.email}</p>
                <button
                  onClick={handleEditClick}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Plan</h2>
            <p className="text-2xl font-bold text-indigo-600 mb-1">
              {profileData.plan || 'Free Tier'}
            </p>
            <p className="text-sm text-gray-500">Access to basic features.</p>
            <button className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200">
              Upgrade
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Usage</h2>
            <p className="text-2xl font-bold text-indigo-600">
              {profileData.emailsGenerated || 0} / {profileData.plan === 'Pro' ? '1000' : '5'}
            </p>
            <p className="text-sm text-gray-500">Emails generated this month.</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Emails</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">Email Subject Line 1</p>
                <p className="text-sm text-gray-500">Generated on Sep 17, 2025</p>
              </div>
              <button className="text-sm text-blue-500 hover:text-blue-700">
                View
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;