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
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['director', 'actor'])
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const setUserRole = useAppStore((state) => state.setUserRole);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { role: 'actor' } });

  const onSubmit = handleSubmit((data) => {
    window.localStorage.setItem('lumina-role', data.role);
    setUserRole(data.role);
    toast({
      id: crypto.randomUUID(),
      title: 'Account created',
      description: 'Welcome to Lumina.'
    });
    router.push(data.role === 'director' ? '/director/dashboard' : '/actor/dashboard');
  });

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-md">
        <Card className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Create account</h1>
            <p className="text-sm text-white/60">Join the casting network in minutes.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-white/60">Full name</label>
              <Input type="text" placeholder="Your name" {...register('name')} />
              {errors.name && <p className="text-xs text-warning-strong">Name is required.</p>}
            </div>
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
            <div className="space-y-2">
              <label className="text-xs text-white/60">Sign up as</label>
              <div className="grid grid-cols-2 gap-3">
                {['actor', 'director'].map((role) => (
                  <label
                    key={role}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
                  >
                    <span className="capitalize">{role}</span>
                    <input
                      type="radio"
                      value={role}
                      {...register('role')}
                      className="h-4 w-4 accent-accent-teal"
                      aria-label={`Select ${role} role`}
                    />
                  </label>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
          <p className="text-xs text-white/60">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent-teal">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
