'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
}

export function buttonStyles(variant: ButtonProps['variant'], className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-teal',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variant === 'primary' &&
      'bg-gradient-to-r from-accent-teal to-accent-violet text-slate-900 shadow-glow hover:opacity-90',
    variant === 'secondary' && 'bg-white/10 text-white hover:bg-white/20',
    variant === 'ghost' && 'text-white hover:bg-white/10',
    variant === 'outline' && 'border border-white/20 text-white hover:bg-white/10 hover:border-white/40',
    className
  );
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return <button className={buttonStyles(variant, className)} {...props} />;
}
