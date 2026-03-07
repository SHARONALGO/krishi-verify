'use client';

import { Github, ExternalLink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function VerifyButton() {
  return (
    <Card className="border-emerald-300 bg-emerald-50/30">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <Shield className="mr-2 h-5 w-5" />
          Verify Transparency
        </CardTitle>
        <CardDescription>
          All transaction data is publicly auditable on our GitHub repository
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-forest-700">
          Our commitment to transparency means all procurement data, hashes, and 
          verification logs are openly available for public audit. You can verify 
          any transaction independently.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1"
            onClick={() => window.open('https://github.com/krishi-verify/transparency-logs', '_blank')}
          >
            <Github className="mr-2 h-4 w-4" />
            Verify on GitHub
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.open('https://krishi-verify.github.io/audit', '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Audit Trail
          </Button>
        </div>

        <div className="rounded-lg bg-white p-4 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-emerald-800">Latest Commit</span>
            <span className="text-xs text-sage-600">2 minutes ago</span>
          </div>
          <code className="block text-xs font-mono text-forest-700 break-all">
            commit a7f3b2c9d8e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9
          </code>
          <p className="text-xs text-sage-600 mt-2">
            Added 23 new verified transactions to Merkle tree
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
