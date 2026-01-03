import { useState } from 'react';
import { Bell, Lock, Globe, Shield, Eye, EyeOff } from 'lucide-react';

export function AccountSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: true,
    newArrivals: true,
    priceDrops: false,
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    personalizedAds: true,
    activityTracking: false,
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    currency: 'GBP',
    timezone: 'GMT',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleNotificationChange = (key: string) => {
    setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] });
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacy({ ...privacy, [key]: !privacy[key as keyof typeof privacy] });
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-[#111111] mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security settings</p>
      </div>

      {/* Password & Security */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-[#1ED2AF]" />
          <h2 className="text-xl text-[#111111]">Password & Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1ED2AF]"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1ED2AF]"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
              placeholder="Confirm new password"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            className="px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-[#1ED2AF]" />
          <h2 className="text-xl text-[#111111]">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              key: 'emailNotifications',
              label: 'Email Notifications',
              desc: 'Receive notifications via email',
            },
            {
              key: 'smsNotifications',
              label: 'SMS Notifications',
              desc: 'Receive notifications via text message',
            },
            {
              key: 'orderUpdates',
              label: 'Order Updates',
              desc: 'Get updates about your orders',
            },
            {
              key: 'promotions',
              label: 'Promotional Emails',
              desc: 'Receive exclusive offers and discounts',
            },
            {
              key: 'newArrivals',
              label: 'New Arrivals',
              desc: 'Be notified about new products',
            },
            {
              key: 'priceDrops',
              label: 'Price Drop Alerts',
              desc: 'Get notified when items go on sale',
            },
          ].map((item) => (
            <div key={item.key} className="flex items-start gap-3 p-4 bg-[#F5F3EE] rounded-lg">
              <input
                type="checkbox"
                id={item.key}
                checked={notifications[item.key as keyof typeof notifications]}
                onChange={() => handleNotificationChange(item.key)}
                className="mt-1 w-5 h-5 text-[#1ED2AF] border-gray-300 rounded focus:ring-[#1ED2AF]"
              />
              <div className="flex-1">
                <label htmlFor={item.key} className="text-[#111111] cursor-pointer">
                  {item.label}
                </label>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-[#1ED2AF]" />
          <h2 className="text-xl text-[#111111]">Privacy Settings</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              key: 'shareData',
              label: 'Share Data with Partners',
              desc: 'Allow sharing anonymized data with trusted partners',
            },
            {
              key: 'personalizedAds',
              label: 'Personalized Advertising',
              desc: 'Show ads tailored to your interests',
            },
            {
              key: 'activityTracking',
              label: 'Activity Tracking',
              desc: 'Track browsing activity for better recommendations',
            },
          ].map((item) => (
            <div key={item.key} className="flex items-start gap-3 p-4 bg-[#F5F3EE] rounded-lg">
              <input
                type="checkbox"
                id={item.key}
                checked={privacy[item.key as keyof typeof privacy]}
                onChange={() => handlePrivacyChange(item.key)}
                className="mt-1 w-5 h-5 text-[#1ED2AF] border-gray-300 rounded focus:ring-[#1ED2AF]"
              />
              <div className="flex-1">
                <label htmlFor={item.key} className="text-[#111111] cursor-pointer">
                  {item.label}
                </label>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language & Currency */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-[#1ED2AF]" />
          <h2 className="text-xl text-[#111111]">Language & Currency</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            >
              <option>English</option>
              <option>French</option>
              <option>German</option>
              <option>Spanish</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Currency</label>
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            >
              <option value="GBP">GBP - British Pound</option>
              <option value="USD">USD - US Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Timezone</label>
            <select
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
            >
              <option value="GMT">GMT - London</option>
              <option value="EST">EST - New York</option>
              <option value="PST">PST - Los Angeles</option>
              <option value="CET">CET - Paris</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-[#111111] mb-4">Account Actions</h2>
        <div className="space-y-3">
          <button className="w-full md:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#1ED2AF] hover:text-[#1ED2AF] transition-colors">
            Download My Data
          </button>
          <button className="w-full md:w-auto px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors ml-0 md:ml-3">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
