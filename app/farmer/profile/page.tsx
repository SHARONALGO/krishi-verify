'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, User, Camera, MapPin, Phone, Mail, Home, Sprout, FileText, Award } from 'lucide-react';
import Link from 'next/link';

export default function FarmerProfilePage() {
  const router = useRouter();
  const { profile, role, loading } = useUser();

  useEffect(() => {
    if (!loading && role === 'operator') {
      router.push('/operator');
    }
  }, [role, loading, router]);

  // Dummy farmer data
  const farmerData = {
    fullName: 'Gurpreet Singh',
    email: 'gurpreet.farmer@email.com',
    phone: '+91 98765 12345',
    address: 'Village: Rampura, Post: Kharar',
    district: 'Ludhiana',
    state: 'Punjab',
    pincode: '141401',
    landArea: '12.5 acres',
    primaryCrops: ['Wheat', 'Rice', 'Maize'],
    farmerId: 'FARM-PB-2024-001',
    registrationDate: '2023-01-15',
    totalTransactions: 24,
    totalEarnings: '₹12,45,000',
    rating: '4.8/5',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">My Profile</h1>
        <p className="text-forest-700">Manage your personal and farm details</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="border-emerald-200 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-full bg-emerald-100 flex items-center justify-center text-4xl font-bold text-emerald-700">
                  {farmerData.fullName.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-emerald-600 rounded-full text-white hover:bg-emerald-700">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-emerald-900">{farmerData.fullName}</h3>
              <p className="text-sm text-emerald-600">ID: {farmerData.farmerId}</p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  Verified Farmer
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {farmerData.rating}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-600">{farmerData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-600">{farmerData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Home className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-600">{farmerData.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-600">{farmerData.district}, {farmerData.state}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-emerald-700">{farmerData.totalTransactions}</p>
                  <p className="text-xs text-slate-500">Transactions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-700">{farmerData.totalEarnings}</p>
                  <p className="text-xs text-slate-500">Total Earnings</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center gap-2">
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
                    defaultValue={farmerData.fullName}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    defaultValue={farmerData.email}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={farmerData.phone}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Farmer ID</label>
                  <input
                    type="text"
                    value={farmerData.farmerId}
                    readOnly
                    className="w-full p-3 rounded-lg border border-emerald-200 bg-slate-50 text-slate-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm Information */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center gap-2">
                <Sprout className="h-5 w-5" />
                Farm Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Land Area</label>
                  <input
                    type="text"
                    defaultValue={farmerData.landArea}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Primary Crops</label>
                  <input
                    type="text"
                    defaultValue={farmerData.primaryCrops.join(', ')}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Address</label>
                  <input
                    type="text"
                    defaultValue={farmerData.address}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">District</label>
                  <input
                    type="text"
                    defaultValue={farmerData.district}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">State</label>
                  <input
                    type="text"
                    defaultValue={farmerData.state}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Pincode</label>
                  <input
                    type="text"
                    defaultValue={farmerData.pincode}
                    className="w-full p-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded">
                      <FileText className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-emerald-900">Aadhaar Card</p>
                      <p className="text-xs text-emerald-600">Verified</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded">
                      <FileText className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-emerald-900">Land Records</p>
                      <p className="text-xs text-emerald-600">Verified</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded">
                      <Camera className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Bank Passbook</p>
                      <p className="text-xs text-slate-500">Upload required</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700 px-8">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}