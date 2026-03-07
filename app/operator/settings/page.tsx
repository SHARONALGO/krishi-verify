'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Settings, User, Camera, MapPin, Phone, Mail, Building, Shield, Bell, Moon, Sun } from 'lucide-react';

export default function OperatorSettingsPage() {
  const router = useRouter();
  const { role, profile, loading } = useUser();

  // Dummy profile data
  const [formData, setFormData] = useState({
    fullName: 'Rajesh Kumar Sharma',
    mandiName: 'Azadpur Mandi',
    email: 'rajesh.sharma@krishiverify.in',
    phone: '+91 98765 43210',
    address: 'Block A, Office 204, Azadpur Market',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110033',
    licenseNumber: 'Mandi-Operator-DL-2024-001',
    emergencyContact: '+91 98765 43211',
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    smsAlerts: true,
    autoVerify: true,
    twoFactorAuth: false,
  });

  useEffect(() => {
    if (!loading && role === 'farmer') {
      router.push('/farmer');
    }
  }, [role, loading, router]);

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Settings className="h-8 w-8 text-blue-600" />
          Settings
        </h1>
        <p className="text-slate-600">
          Manage your mandi profile and system preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="border-blue-200 bg-white lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">
                  {formData.fullName.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{formData.fullName}</h3>
              <p className="text-sm text-blue-600">{formData.mandiName}</p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Operator
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Verified
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{formData.city}, {formData.state}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Emergency Contact</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mandi Information */}
          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Building className="h-5 w-5" />
                Mandi Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Mandi Name</label>
                  <input
                    type="text"
                    value={formData.mandiName}
                    onChange={(e) => setFormData({...formData, mandiName: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">License Number</label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    readOnly
                    className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Preferences & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Email Notifications</p>
                      <p className="text-sm text-slate-500">Receive daily summary emails</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, emailNotifications: !preferences.emailNotifications})}
                    className={`w-12 h-6 rounded-full transition-colors ${preferences.emailNotifications ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white mx-0.5 transition-transform ${preferences.emailNotifications ? 'translate-x-6' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Bell className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">SMS Alerts</p>
                      <p className="text-sm text-slate-500">Get SMS alerts for urgent updates</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, smsAlerts: !preferences.smsAlerts})}
                    className={`w-12 h-6 rounded-full transition-colors ${preferences.smsAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white mx-0.5 transition-transform ${preferences.smsAlerts ? 'translate-x-6' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Auto-Verify Transactions</p>
                      <p className="text-sm text-slate-500">Automatically verify blockchain records</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, autoVerify: !preferences.autoVerify})}
                    className={`w-12 h-6 rounded-full transition-colors ${preferences.autoVerify ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white mx-0.5 transition-transform ${preferences.autoVerify ? 'translate-x-6' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-200 rounded-lg">
                      {preferences.darkMode ? <Moon className="h-5 w-5 text-slate-600" /> : <Sun className="h-5 w-5 text-slate-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Dark Mode</p>
                      <p className="text-sm text-slate-500">Toggle dark theme</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreferences({...preferences, darkMode: !preferences.darkMode})}
                    className={`w-12 h-6 rounded-full transition-colors ${preferences.darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white mx-0.5 transition-transform ${preferences.darkMode ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}