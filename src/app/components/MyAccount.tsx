import { useState } from 'react';
import { Save, Camera } from 'lucide-react';

export function MyAccount() {
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+44 7700 900000',
    dateOfBirth: '1990-05-15',
  });

  const [subscriptions, setSubscriptions] = useState({
    newsletter: true,
    promotions: true,
    newArrivals: true,
    orderUpdates: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscriptionChange = (key: string) => {
    setSubscriptions({ ...subscriptions, [key]: !subscriptions[key as keyof typeof subscriptions] });
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-[#111111] mb-2">My Account</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      {/* Profile Picture */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Profile Picture</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-[#1ED2AF] rounded-full flex items-center justify-center text-white text-3xl">
              SJ
            </div>
            <button className="absolute bottom-0 right-0 bg-[#111111] text-white p-2 rounded-full hover:bg-[#1ED2AF] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-gray-700 mb-2">Upload a new profile picture</p>
            <button className="px-4 py-2 border-2 border-[#1ED2AF] text-[#1ED2AF] rounded-lg hover:bg-[#1ED2AF] hover:text-white transition-colors">
              Choose File
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <button className="text-[#1ED2AF] hover:text-[#111111] transition-colors">
              Change Password
            </button>
          </div>
          <div>
            <button className="text-[#1ED2AF] hover:text-[#111111] transition-colors">
              Update Email Preferences
            </button>
          </div>
          <div>
            <button className="text-[#1ED2AF] hover:text-[#111111] transition-colors">
              Manage Privacy Settings
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Preferences */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Subscription Preferences</h2>
        <p className="text-gray-600 mb-6">Choose which emails you'd like to receive from VIBRIVO</p>
        <div className="space-y-4">
          {[
            { key: 'newsletter', label: 'Newsletter', desc: 'Monthly newsletter with style tips and stories' },
            { key: 'promotions', label: 'Promotional Emails', desc: 'Exclusive offers and discounts' },
            { key: 'newArrivals', label: 'New Arrivals', desc: 'Be the first to know about new products' },
            { key: 'orderUpdates', label: 'Order Updates', desc: 'Essential updates about your orders' },
          ].map((item) => (
            <div key={item.key} className="flex items-start gap-3">
              <input
                type="checkbox"
                id={item.key}
                checked={subscriptions[item.key as keyof typeof subscriptions]}
                onChange={() => handleSubscriptionChange(item.key)}
                className="mt-1 w-5 h-5 text-[#1ED2AF] border-gray-300 rounded focus:ring-[#1ED2AF]"
              />
              <div className="flex-1">
                <label htmlFor={item.key} className="text-gray-900 cursor-pointer">
                  {item.label}
                </label>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={handleSave}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
