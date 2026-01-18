'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/toast';
import { useAppStore } from '@/store/useAppStore';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setUserRole = useAppStore((state) => state.setUserRole);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(() => {
    const storedRole = window.localStorage.getItem('lumina-role');
    const role = storedRole === 'director' ? 'director' : 'actor';
    setUserRole(role);
    toast({
      id: crypto.randomUUID(),
      title: 'Welcome back',
      description: 'Redirecting to your dashboard.'
    });
    router.push(role === 'director' ? '/director/dashboard' : '/actor/dashboard');
  });

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-md">
        <Card className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Sign in</h1>
            <p className="text-sm text-white/60">Access your casting workspace.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-white/60">Email</label>
              <Input type="email" placeholder="you@studio.com" {...register('email')} />
              {errors.email && <p className="text-xs text-warning-strong">Enter a valid email.</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/60">Password</label>
              <Input type="password" placeholder="••••••" {...register('password')} />
              {errors.password && (
                <p className="text-xs text-warning-strong">Password must be at least 6 characters.</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-xs text-white/60">
            New here?{' '}
            <Link href="/auth/signup" className="text-accent-teal">
              Create an account
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
