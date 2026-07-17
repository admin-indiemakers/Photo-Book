'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (signupError) {
      if (signupError.message.includes('rate limit')) {
        // Fallback to server action to bypass rate limit
        const { adminCreateUser } = await import('@/app/actions/auth');
        const result = await adminCreateUser(email, password, name);
        if (result.success) {
          // Log them in now that the account is created
          await supabase.auth.signInWithPassword({ email, password });
          router.push('/');
          return;
        } else {
          setError(result.error || 'Failed to create account');
          setLoading(false);
          return;
        }
      }

      setError(signupError.message);
      setLoading(false);
      return;
    }

    // Supabase returns a fake user with empty identities if email exists and confirmations are ON
    if (data?.user?.identities && data.user.identities.length === 0) {
      setError('An account with this email address already exists. Please sign in.');
      setLoading(false);
      return;
    }

    if (data?.user) {
      // Add user to the customers table bypassing RLS using server action
      const { syncCustomerData } = await import('@/app/actions/auth');
      await syncCustomerData(data.user.id, email, name);
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-theme-ivory overflow-hidden">
      {/* Left side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1a1a18]"
      >
        <img 
          src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=1200&q=80" 
          alt="Premium thick layflat pages" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a18]/90 via-[#1a1a18]/20 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute bottom-16 left-16 text-white pr-12"
        >
          <h2 className="text-5xl font-serif mb-4 leading-tight">Begin your<br/>story today.</h2>
          <p className="text-white/80 max-w-md text-lg">
            Join thousands of creators who trust Offline Living to turn their digital memories into beautiful, heirloom-quality photobooks.
          </p>
        </motion.div>
      </motion.div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto w-full max-w-sm"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
            <svg className="w-8 h-8 text-theme-black group-hover:text-[#E85D26] transition-colors" viewBox="0 0 40 40" fill="none">
              <path d="M20 4C16 4 12 8 10 12C8 16 8 20 10 24C12 28 16 30 18 32C19 33 19.5 34 20 36C20.5 34 21 33 22 32C24 30 28 28 30 24C32 20 32 16 30 12C28 8 24 4 20 4Z" fill="currentColor"/>
            </svg>
            <span className="font-serif text-xl tracking-wide text-theme-black">Offline Living</span>
          </Link>
          
          <h2 className="text-3xl font-serif font-medium text-theme-black mb-2">
            Create your account
          </h2>
          <p className="text-[#1a1a18]/60 mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-theme-black font-medium hover:text-[#E85D26] hover:underline transition-colors">
              Sign in
            </Link>
          </p>

          <form className="space-y-5" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-theme-black mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="appearance-none block w-full px-4 py-3 bg-white border border-[#1a1a18]/20 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E85D26] focus:border-[#E85D26] transition-all text-theme-black"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-theme-black mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="appearance-none block w-full px-4 py-3 bg-white border border-[#1a1a18]/20 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E85D26] focus:border-[#E85D26] transition-all text-theme-black"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-theme-black mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 bg-white border border-[#1a1a18]/20 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E85D26] focus:border-[#E85D26] transition-all text-theme-black"
                placeholder="••••••••"
              />
              <p className="text-xs text-[#1a1a18]/50 mt-2">Must be at least 8 characters long.</p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-[#1a1a18] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85D26] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
            
            <p className="text-xs text-center text-[#1a1a18]/50 pt-2">
              By creating an account, you agree to our <a href="#" className="underline hover:text-theme-black">Terms of Service</a> and <a href="#" className="underline hover:text-theme-black">Privacy Policy</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
