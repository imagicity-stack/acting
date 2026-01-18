'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { formatDate } from '@/lib/utils';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const notifications = useAppStore((state) => state.notifications);
  const markNotificationRead = useAppStore((state) => state.markNotificationRead);
  const unreadCount = notifications.filter((note) => !note.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle notifications"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-warning text-xs font-semibold text-slate-900">
            {unreadCount}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-3 w-80 rounded-2xl border border-white/10 bg-surface p-4 shadow-glass"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Notifications</p>
              <button
                className="text-xs text-accent-teal"
                onClick={() => notifications.forEach((note) => markNotificationRead(note.id))}
              >
                Mark all read
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {notifications.slice(0, 3).map((note) => (
                <button
                  key={note.id}
                  onClick={() => markNotificationRead(note.id)}
                  className="flex w-full flex-col gap-1 rounded-xl bg-white/5 p-3 text-left text-xs text-white/70 transition hover:bg-white/10"
                >
                  <span className="text-sm font-semibold text-white">{note.title}</span>
                  <span>{note.body}</span>
                  <span className="text-[10px] text-white/40">{formatDate(note.createdAt)}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
