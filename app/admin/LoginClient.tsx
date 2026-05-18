'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signIn } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

type LoginFormData = { email: string; password: string };

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-secondary-400 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Lock className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-white mb-2">Admin Login</h1>
          <p className="text-neutral-300">Access the admin dashboard</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-neutral-700 font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="admin@isportmedicalcentre.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-neutral-700 font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">Admin access only. Please contact the administrator if you need access.</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
