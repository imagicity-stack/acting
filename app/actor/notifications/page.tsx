'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

export default function ActorNotificationsPage() {
  const notifications = useAppStore((state) => state.notifications);
  const pushNotification = useAppStore((state) => state.pushNotification);

  const simulateNotification = () => {
    pushNotification({
      id: `note-${Date.now()}`,
      userId: 'actor-1',
      type: 'role',
      title: 'New role match: Midnight Signal',
      body: 'Supporting Hacker role just opened in Bengaluru.',
      createdAt: new Date().toISOString(),
      read: false
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Notifications</h1>
          <p className="text-sm text-white/60">Stay updated with casting activity.</p>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <Button variant="secondary" onClick={simulateNotification}>
            Simulate new role notification
          </Button>
        )}
      </div>
      <Card className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-sm text-white/60">You are all caught up.</p>
        ) : (
          notifications.map((note) => (
            <div key={note.id} className="rounded-xl bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{note.title}</p>
                <span className="text-[10px] text-white/40">{formatDate(note.createdAt)}</span>
              </div>
              <p className="text-xs text-white/60">{note.body}</p>
            </div>
          ))
        )}
      </Card>
    </motion.div>
  );
}
