'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone?: 'success' | 'info' | 'warning';
}

let listeners: Array<(toast: ToastItem) => void> = [];

export function toast(toastItem: ToastItem) {
  listeners.forEach((listener) => listener(toastItem));
}

export function ToastViewport() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (toastItem: ToastItem) => {
      setToasts((prev) => [toastItem, ...prev]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== toastItem.id));
      }, 3200);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  }, []);

  return (
    <div className="fixed right-6 top-6 z-50 flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toastItem) => (
          <motion.div
            key={toastItem.id}
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className={cn(
              'glass flex items-start gap-3 rounded-2xl p-4 text-sm',
              toastItem.tone === 'warning' && 'border-warning/40',
              toastItem.tone === 'info' && 'border-accent-violet/40'
            )}
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent-teal" />
            <div>
              <p className="text-sm font-semibold text-white">{toastItem.title}</p>
              {toastItem.description && (
                <p className="mt-1 text-xs text-white/70">{toastItem.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
