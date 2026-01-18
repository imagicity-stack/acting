'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatDate } from '@/lib/utils';
import { Application } from '@/lib/types';

export default function DirectorApplicationsPage() {
  const roles = useAppStore((state) => state.roles);
  const applications = useAppStore((state) => state.applications);
  const updateStatus = useAppStore((state) => state.updateApplicationStatus);
  const [activeApplication, setActiveApplication] = useState<Application | null>(null);

  const grouped = useMemo(() => {
    return roles.map((role) => ({
      role,
      applications: applications.filter((app) => app.roleId === role.id)
    }));
  }, [roles, applications]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Applications</h1>
        <p className="text-sm text-white/60">Review and action applications by role.</p>
      </div>
      {grouped.map(({ role, applications: roleApps }) => (
        <Card key={role.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{role.title}</h2>
              <p className="text-xs text-white/50">{role.projectName}</p>
            </div>
            <Chip label={`${roleApps.length} applications`} />
          </div>
          <div className="space-y-3">
            {roleApps.length === 0 ? (
              <div className="rounded-xl bg-white/5 p-4 text-sm text-white/60">
                No applications yet. We’ll notify you once actors apply.
              </div>
            ) : (
              roleApps.map((application) => (
                <div key={application.id} className="flex flex-col gap-4 rounded-xl bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Actor #{application.actorId}</p>
                    <p className="text-xs text-white/50">Applied {formatDate(application.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Chip label={application.status} tone={application.status === 'shortlisted' ? 'success' : 'neutral'} />
                    <Button variant="outline" className="px-3 py-2 text-xs" onClick={() => setActiveApplication(application)}>
                      Quick view
                    </Button>
                    <Button variant="secondary" className="px-3 py-2 text-xs" onClick={() => updateStatus(application.id, 'shortlisted')}>
                      Shortlist
                    </Button>
                    <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => updateStatus(application.id, 'rejected')}>
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      ))}

      <Modal
        open={Boolean(activeApplication)}
        onClose={() => setActiveApplication(null)}
        title="Application details"
      >
        {activeApplication && (
          <div className="space-y-4 text-sm text-white/70">
            <div>
              <p className="text-base font-semibold text-white">Actor #{activeApplication.actorId}</p>
              <p>Profile score: 87</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Message</p>
              <p>{activeApplication.message}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Portfolio</p>
              <ul className="list-disc pl-4">
                {activeApplication.portfolioLinks.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Notes</p>
              <p>Strong fit for the tone; schedule callback.</p>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
