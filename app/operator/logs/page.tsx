'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ShieldCheck, Database, CheckCircle, XCircle, Copy, Search, Filter } from 'lucide-react';

// Sample audit log data
const auditLogs = [
  { 
    id: '0x7f83b1a9c4e2d5f6a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
    txnId: 'TXN-2024-001',
    timestamp: '2024-01-15 10:30:45',
    farmer: 'Rajesh Kumar',
    crop: 'Wheat',
    quantity: '50 Qtl',
    amount: '₹1,17,500',
    verified: true,
    blockNumber: '1847291',
    merkleRoot: '0xabc123...def456'
  },
  { 
    id: '0x8c94a2b0d5e3f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3',
    txnId: 'TXN-2024-002',
    timestamp: '2024-01-15 11:15:22',
    farmer: 'Suresh Patel',
    crop: 'Rice',
    quantity: '75 Qtl',
    amount: '₹1,68,750',
    verified: true,
    blockNumber: '1847292',
    merkleRoot: '0xdef456...ghi789'
  },
  { 
    id: '0x9d05b3c1e6f4g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4',
    txnId: 'TXN-2024-003',
    timestamp: '2024-01-15 12:45:10',
    farmer: 'Amit Singh',
    crop: 'Maize',
    quantity: '40 Qtl',
    amount: '₹86,000',
    verified: false,
    blockNumber: '1847293',
    merkleRoot: '0xghi789...jkl012'
  },
  { 
    id: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
    txnId: 'TXN-2024-004',
    timestamp: '2024-01-15 14:20:33',
    farmer: 'Priya Sharma',
    crop: 'Cotton',
    quantity: '25 Qtl',
    amount: '₹1,71,250',
    verified: true,
    blockNumber: '1847294',
    merkleRoot: '0xjkl012...mno345'
  },
  { 
    id: '0xb2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3',
    txnId: 'TXN-2024-005',
    timestamp: '2024-01-15 15:55:18',
    farmer: 'Vikram Rao',
    crop: 'Soyabean',
    quantity: '60 Qtl',
    amount: '₹2,67,000',
    verified: true,
    blockNumber: '1847295',
    merkleRoot: '0xmno345...pqr678'
  },
];

const stats = [
  { label: 'Total Transactions', value: '12,847', icon: Database },
  { label: 'Verified', value: '12,802', icon: CheckCircle },
  { label: 'Pending', value: '45', icon: XCircle },
  { label: 'Success Rate', value: '99.6%', icon: ShieldCheck },
];

export default function MerkleAuditLogsPage() {
  const router = useRouter();
  const { role, loading } = useUser();
  const [logs, setLogs] = useState(auditLogs);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && role === 'farmer') {
      router.push('/farmer');
    }
  }, [role, loading, router]);

  const handleVerify = async (txnId: string) => {
    setVerifyingId(txnId);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLogs(logs.map(log => 
      log.txnId === txnId ? { ...log, verified: true } : log
    ));
    setVerifyingId(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shortenHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
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
          <ShieldCheck className="h-8 w-8 text-blue-600" />
          Merkle Audit Logs
        </h1>
        <p className="text-slate-600">
          Blockchain-verified transaction records with tamper-proof hashes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-blue-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-blue-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by transaction ID or farmer name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <Button variant="outline" className="border-blue-200 text-blue-700">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Audit Logs Table */}
      <Card className="border-blue-200 bg-white">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Transaction Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Farmer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Crop Details</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Tamper-Proof Hash</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Block</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      {log.verified ? (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Pending
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm font-mono text-blue-600">{log.txnId}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{log.timestamp}</td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-800">{log.farmer}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-slate-800">{log.crop}</div>
                      <div className="text-xs text-slate-500">{log.quantity} • {log.amount}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                          {shortenHash(log.id)}
                        </code>
                        <button 
                          onClick={() => copyToClipboard(log.id)}
                          className="p-1 hover:bg-slate-100 rounded"
                        >
                          <Copy className="h-3 w-3 text-slate-400" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-600">#{log.blockNumber}</td>
                    <td className="py-3 px-4">
                      {!log.verified ? (
                        <Button 
                          size="sm" 
                          onClick={() => handleVerify(log.txnId)}
                          disabled={verifyingId === log.txnId}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {verifyingId === log.txnId ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <ShieldCheck className="h-4 w-4 mr-1" />
                              Verify
                            </>
                          )}
                        </Button>
                      ) : (
                        <span className="text-sm text-green-600 font-medium">Confirmed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}