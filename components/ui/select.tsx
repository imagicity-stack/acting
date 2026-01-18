import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn('input-field w-full px-4 py-2 text-sm', className)} {...props}>
      {children}
    </select>
  );
}
