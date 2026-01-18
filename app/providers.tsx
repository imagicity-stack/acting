'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ToastViewport } from '@/components/ui/toast';
import { useAppStore } from '@/store/useAppStore';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    if (theme === 'light') {
      body.classList.add('light');
    } else {
      body.classList.remove('light');
    }
  }, [theme, mounted]);

  return (
    <>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
      <ToastViewport />
    </>
  );
}
