import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<string | undefined | false>) {
  return twMerge(clsx(inputs));
}

export function formatPay(min: number, max: number) {
  if (min === max) {
    return `₹${min.toLocaleString()}`;
  }
  return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
