'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';
import { RoleCard } from '@/components/RoleCard';
import { getRecommendedRoles } from '@/lib/matching';
import { formatDate } from '@/lib/utils';

export default function ActorDashboard() {
  const roles = useAppStore((state) => state.roles);
  const notifications = useAppStore((state) => state.notifications);
  const actorProfile = useAppStore((state) => state.actorProfile);
  const savedRoleIds = useAppStore((state) => state.savedRoleIds);
  const appliedRoleIds = useAppStore((state) => state.appliedRoleIds);

  const recommended = getRecommendedRoles(roles, actorProfile).slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <div>
            <h1 className="text-xl font-semibold text-white">Your notifications</h1>
            <p className="text-sm text-white/60">Stay ahead with casting updates.</p>
          </div>
          <div className="space-y-3">
            {notifications.map((note) => (
              <div key={note.id} className="rounded-xl bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">{note.title}</p>
                <p className="text-xs text-white/60">{note.body}</p>
                <p className="text-[10px] text-white/40">{formatDate(note.createdAt)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Quick access</h2>
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
              <span>Saved roles</span>
              <span>{savedRoleIds.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
              <span>Applied roles</span>
              <span>{appliedRoleIds.length}</span>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-white/50">Profile score</p>
              <p className="text-2xl font-semibold text-white">92%</p>
            </div>
          </div>
        </Card>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Recommended for you</h2>
          <p className="text-sm text-white/60">Based on your skills and availability.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommended.map((role) => (
            <RoleCard key={role.id} role={role} href={`/actor/roles/${role.id}`} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
