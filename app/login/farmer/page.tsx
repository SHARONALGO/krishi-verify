'use client';

import { useState } from 'react';
import { Sprout, LogIn, Loader2, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function FarmerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.session) {
        // Verify user is a farmer
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();

        if (profile?.role === 'farmer') {
          router.push('/farmer');
        } else {
          // Not a farmer, sign out and show error
          await supabase.auth.signOut();
          setError('This account is not registered as a Farmer. Please use Operator login.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4">
      <div className="mb-6 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Sprout className="h-10 w-10 text-emerald-600" />
          <span className="text-2xl font-bold text-emerald-900 tracking-tight">KRISHI-VERIFY</span>
        </Link>
        <h2 className="text-xl font-medium text-forest-800 text-center">Farmer Login</h2>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden">
        <div className="p-4 border-b border-emerald-50 bg-emerald-50/30 flex items-center gap-2">
          <Link href="/login">
            <button className="p-2 hover:bg-emerald-100 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-emerald-600" />
            </button>
          </Link>
          <h3 className="text-emerald-800 font-bold flex items-center gap-2">
            <User className="h-5 w-5" /> Sign In as Farmer
          </h3>
        </div>
        
        <form onSubmit={handleLogin} className="p-6 space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-forest-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-forest-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-100">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><LogIn size={18} /> Sign In</>}
          </button>

          <p className="text-center text-sm text-sage-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup/farmer" className="text-emerald-600 font-bold hover:underline">Sign Up as Farmer</Link>
          </p>
        </form>
      </div>
    </div>
  );
}