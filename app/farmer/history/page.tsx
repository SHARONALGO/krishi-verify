'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, History, Search, Filter, Download, Eye, CheckCircle, Calendar, Sprout, IndianRupee } from 'lucide-react';

// Extended transaction history data
const transactionHistory = [
  {
    id: 'TXN-2024-001',
    date: '2024-03-05',
    crop: 'Wheat',
    quantity: '15 Quintal',
    mspRate: '₹2,275/quintal',
    totalAmount: '₹34,125',
    market: 'Ludhiana Mandi',
    status: 'Paid',
    paymentDate: '2024-03-07',
    hash: '0x7f83...9e0f1',
  },
  {
    id: 'TXN-2024-002',
    date: '2024-03-04',
    crop: 'Rice',
    quantity: '20 Quintal',
    mspRate: '₹2,040/quintal',
    totalAmount: '₹40,800',
    market: 'Amritsar Mandi',
    status: 'Paid',
    paymentDate: '2024-03-06',
    hash: '0x8c94...d1e2f3',
  },
  {
    id: 'TXN-2024-003',
    date: '2024-03-03',
    crop: 'Maize',
    quantity: '12 Quintal',
    mspRate: '₹1,960/quintal',
    totalAmount: '₹23,520',
    market: 'Karnal Mandi',
    status: 'Paid',
    paymentDate: '2024-03-05',
    hash: '0x9d05...e2f3g4',
  },
  {
    id: 'TXN-2024-004',
    date: '2024-03-01',
    crop: 'Cotton',
    quantity: '8 Quintal',
    mspRate: '₹6,620/quintal',
    totalAmount: '₹52,960',
    market: 'Rajkot Mandi',
    status: 'Processing',
    paymentDate: '-',
    hash: '0xa1b2...d0e1f2',
  },
  {
    id: 'TXN-2024-005',
    date: '2024-02-28',
    crop: 'Soyabean',
    quantity: '9.5 Quintal',
    mspRate: '₹4,300/quintal',
    totalAmount: '₹40,850',
    market: 'Indore Mandi',
    status: 'Paid',
    paymentDate: '2024-03-02',
    hash: '0xb2c3...e1f2g3',
  },
  {
    id: 'TXN-2024-006',
    date: '2024-02-25',
    crop: 'Wheat',
    quantity: '18 Quintal',
    mspRate: '₹2,275/quintal',
    totalAmount: '₹40,950',
    market: 'Ludhiana Mandi',
    status: 'Paid',
    paymentDate: '2024-02-28',
    hash: '0xc3d4...f2g3h4',
  },
  {
    id: 'TXN-2024-007',
    date: '2024-02-20',
    crop: 'Rice',
    quantity: '25 Quintal',
    mspRate: '₹2,040/quintal',
    totalAmount: '₹51,000',
    market: 'Amritsar Mandi',
    status: 'Paid',
    paymentDate: '2024-02-23',
    hash: '0xd4e5...g3h4i5',
  },
];

const stats = [
  { label: 'Total Transactions', value: '24', icon: History },
  { label: 'Total Volume', value: '186 Qtl', icon: Sprout },
  { label: 'Total Earnings', value: '₹12.5L', icon: IndianRupee },
  { label: 'This Month', value: '₹1.9L', icon: Calendar },
];

export default function FarmerHistoryPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && role === 'operator') {
      router.push('/operator');
    }
  }, [role, loading, router]);

  const filteredTransactions = transactionHistory.filter(txn => 
    txn.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">My History</h1>
        <p className="text-forest-700">View all your past transactions and sales history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-emerald-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <stat.icon className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card className="border-emerald-200 mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by crop, transaction ID, or market..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <Button variant="outline" className="border-emerald-300 text-emerald-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-emerald-300 text-emerald-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-800 flex items-center gap-2">
            <History className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-100 bg-emerald-50/50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">Txn ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">Crop</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">MSP Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">Market</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-emerald-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn, idx) => (
                  <tr key={idx} className="border-b border-emerald-50 hover:bg-emerald-50/50">
                    <td className="py-3 px-4 text-sm font-mono text-emerald-600">{txn.id}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{txn.date}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-emerald-900 capitalize">{txn.crop}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{txn.quantity}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{txn.mspRate}</td>
                    <td className="py-3 px-4 font-medium text-emerald-700">{txn.totalAmount}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{txn.market}</td>
                    <td className="py-3 px-4">
                      {txn.status === 'Paid' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          Processing
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500">No transactions found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}