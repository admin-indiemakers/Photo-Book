'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const customEase = [0.16, 1, 0.3, 1] as const;

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

    try {
      const { adminCreateUser } = await import('@/app/actions/auth');
      const result = await adminCreateUser(email, password, name);
      
      if (result.success) {
        // Log them in now that the account is created and auto-confirmed
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) {
          setError(loginError.message);
        } else {
          router.push('/');
        }
      } else {
        // Supabase often returns a unique constraint error if user exists
        if (result.error?.includes('already registered')) {
          setError('An account with this email address already exists. Please sign in.');
        } else {
          setError(result.error || 'Failed to create account');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden text-black font-sans selection:bg-[#f26523] selection:text-white">
      {/* Left side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: customEase }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black"
      >
        <img 
          src="/images/hero.png" 
          alt="Premium photobook" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: customEase }}
          className="absolute bottom-20 left-20 text-white pr-12"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight font-light">Begin your<br/>story today.</h2>
          <p className="text-gray-300 max-w-md text-lg font-light leading-relaxed">
            Join thousands of creators who trust Offline Living to turn their digital memories into beautiful, heirloom-quality artifacts.
          </p>
        </motion.div>
      </motion.div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 md:py-12 sm:px-12 lg:px-24 xl:px-32 bg-white relative">
        
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f26523] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: customEase }}
          className="w-full max-w-md mx-auto relative z-10"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-8 md:mb-10 group">
            <span className="font-serif text-2xl tracking-wide text-black hover:text-[#f26523] transition-colors">Offline Living</span>
          </Link>
          
          <h2 className="text-3xl md:text-4xl font-serif text-black mb-2 md:mb-3">
            Create your account
          </h2>
          <p className="text-gray-500 mb-6 md:mb-8 font-light text-base md:text-lg">
            Already have an account?{' '}
            <Link href="/login" className="text-black font-medium hover:text-[#f26523] transition-colors">
              Sign in
            </Link>
          </p>

          <form className="space-y-6" onSubmit={handleSignup}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100 flex items-start gap-3"
              >
                <span>{error}</span>
              </motion.div>
            )}
            
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="block w-full px-4 py-3 bg-transparent border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#f26523] transition-colors text-black"
                placeholder="Jane Doe"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                className="block w-full px-4 py-3 bg-transparent border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#f26523] transition-colors text-black"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                className="block w-full px-4 py-3 bg-transparent border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#f26523] transition-colors text-black"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-400 pt-1">Must be at least 8 characters long.</p>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden group rounded-full border border-black px-8 py-4 bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <div className="absolute inset-0 bg-[#f26523] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 font-medium tracking-wide flex justify-center items-center">
                  {loading ? 'Creating account...' : 'Create account'}
                </span>
              </button>
            </div>
            
            <p className="text-xs text-center text-gray-500 pt-4">
              By creating an account, you agree to our <a href="#" className="text-black hover:text-[#f26523] transition-colors">Terms of Service</a> and <a href="#" className="text-black hover:text-[#f26523] transition-colors">Privacy Policy</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
