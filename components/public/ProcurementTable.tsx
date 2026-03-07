'use client';

import { TrendingUp, Sprout, Scale } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProcurementData {
  id: string;
  cropType: string;
  weight: number;
  mspRate: number;
  operator: string;
  timestamp: string;
  status: 'verified' | 'pending';
}

const mockProcurementData: ProcurementData[] = [
  { id: 'TXN001', cropType: 'Wheat', weight: 1500, mspRate: 3412500, operator: 'OP001', timestamp: '2026-03-05T10:30:00Z', status: 'verified' },
  { id: 'TXN002', cropType: 'Rice', weight: 2000, mspRate: 4080000, operator: 'OP002', timestamp: '2026-03-05T09:15:00Z', status: 'verified' },
  { id: 'TXN003', cropType: 'Maize', weight: 1200, mspRate: 2352000, operator: 'OP001', timestamp: '2026-03-05T08:45:00Z', status: 'verified' },
  { id: 'TXN004', cropType: 'Cotton', weight: 800, mspRate: 4816000, operator: 'OP003', timestamp: '2026-03-04T16:20:00Z', status: 'verified' },
  { id: 'TXN005', cropType: 'Soyabean', weight: 950, mspRate: 4393750, operator: 'OP002', timestamp: '2026-03-04T14:10:00Z', status: 'pending' },
];

export function ProcurementTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <TrendingUp className="mr-2 h-5 w-5" />
          Live Procurement Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Crop</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>MSP (₹)</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProcurementData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-sm">{item.id}</TableCell>
                <TableCell className="capitalize">{item.cropType}</TableCell>
                <TableCell>{item.weight.toLocaleString()}</TableCell>
                <TableCell className="font-medium">₹{item.mspRate.toLocaleString('en-IN')}</TableCell>
                <TableCell className="font-mono text-sm">{item.operator}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'verified' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status === 'verified' ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
