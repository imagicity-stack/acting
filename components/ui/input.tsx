import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn('input-field w-full px-4 py-2 text-sm', className)}
      {...props}
    />
  );
}
