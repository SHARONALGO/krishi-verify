'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; //
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function EmailLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else if (data.session) {
      // Fetch user profile to determine role-based redirect
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.session.user.id)
        .single();
      
      // Redirect based on role
      if (profile?.role === 'farmer') {
        router.push('/farmer');
      } else if (profile?.role === 'operator') {
        router.push('/operator');
      } else {
        // Fallback if role is not set
        router.push('/');
      }
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-emerald-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-emerald-900 flex items-center gap-2">
          <Mail className="text-emerald-600 h-5 w-5" />
          Operator & Farmer Login
        </CardTitle>
        <CardDescription>
          Enter your credentials to access the transparency platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-forest-700">Email Address</label>
            <div className="relative">
              <Input
                type="email"
                placeholder="name@example.com"
                className="pl-10 border-emerald-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-forest-700">Password</label>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10 border-emerald-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-emerald-700 hover:bg-emerald-800" 
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}