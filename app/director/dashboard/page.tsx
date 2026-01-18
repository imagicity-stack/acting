'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { useAppStore } from '@/store/useAppStore';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DirectorDashboard() {
  const roles = useAppStore((state) => state.roles);
  const applications = useAppStore((state) => state.applications);

  const stats = useMemo(() => {
    const totalRoles = roles.length;
    const activeRoles = roles.filter((role) => role.status === 'open').length;
    const applicationsReceived = applications.length;
    const shortlisted = applications.filter((app) => app.status === 'shortlisted').length;
    return [
      { label: 'Total roles posted', value: totalRoles },
      { label: 'Active roles', value: activeRoles },
      { label: 'Applications received', value: applicationsReceived },
      { label: 'Shortlisted', value: shortlisted }
    ];
  }, [roles, applications]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="space-y-2">
            <p className="text-xs text-white/50">{stat.label}</p>
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent roles</h2>
              <p className="text-xs text-white/50">Track live roles and casting status.</p>
            </div>
            <Button variant="secondary">View all roles</Button>
          </div>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex flex-col gap-3 rounded-xl bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{role.title}</p>
                  <p className="text-xs text-white/60">{role.projectName}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                  <span>{role.location}</span>
                  <span>{role.dates}</span>
                  <Chip
                    label={role.status === 'casting soon' ? 'Casting Soon' : role.status}
                    tone={role.status === 'open' ? 'success' : 'warning'}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Recent applications</h2>
            <p className="text-xs text-white/50">Quick view into new submissions.</p>
          </div>
          <div className="space-y-3">
            {applications.map((application) => (
              <div key={application.id} className="rounded-xl bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Actor #{application.actorId}</p>
                    <p className="text-xs text-white/60">Applied {formatDate(application.createdAt)}</p>
                  </div>
                  <Chip
                    label={application.status}
                    tone={application.status === 'applied' ? 'neutral' : 'success'}
                  />
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Button variant="outline" className="px-4 py-2 text-xs">
                    Review
                  </Button>
                  <Button variant="ghost" className="px-4 py-2 text-xs">
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
