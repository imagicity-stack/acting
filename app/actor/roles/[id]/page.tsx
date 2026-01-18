'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';
import { formatPay } from '@/lib/utils';
import { toast } from '@/components/ui/toast';

const schema = z.object({
  message: z.string().min(10),
  portfolioLinks: z.string().min(3),
  availability: z.string().min(2),
  selfTape: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export default function ActorRoleDetailPage() {
  const params = useParams();
  const roleId = Array.isArray(params.id) ? params.id[0] : params.id;
  const roles = useAppStore((state) => state.roles);
  const addApplication = useAppStore((state) => state.addApplication);
  const appliedRoleIds = useAppStore((state) => state.appliedRoleIds);
  const [open, setOpen] = useState(false);

  const role = useMemo(() => roles.find((item) => item.id === roleId), [roles, roleId]);
  const applied = role ? appliedRoleIds.includes(role.id) : false;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    if (!role) return;
    addApplication({
      id: `app-${Date.now()}`,
      roleId: role.id,
      actorId: 'actor-1',
      message: data.message,
      portfolioLinks: data.portfolioLinks.split(',').map((link) => link.trim()),
      availability: data.availability,
      status: 'applied',
      createdAt: new Date().toISOString()
    });
    toast({
      id: crypto.randomUUID(),
      title: 'Application sent',
      description: 'Your submission was delivered to the director.'
    });
    setOpen(false);
  });

  if (!role) {
    return (
      <Card className="text-sm text-white/60">
        Role not found. Return to the roles feed.
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.6fr]">
        <Card className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{role.projectName}</p>
              <h1 className="text-2xl font-semibold text-white">{role.title}</h1>
              <p className="text-sm text-white/60">{role.location}</p>
            </div>
            <Chip label={role.status} tone={role.status === 'open' ? 'success' : 'warning'} />
          </div>
          <p className="text-sm text-white/70">{role.description}</p>
          <div className="flex flex-wrap gap-2">
            {role.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </div>
          <div className="grid gap-4 text-sm text-white/70 md:grid-cols-2">
            <div>
              <p className="text-xs text-white/50">Age range</p>
              <p>{role.ageMin} - {role.ageMax}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Shoot dates</p>
              <p>{role.dates}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Duration</p>
              <p>{role.duration}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Pay</p>
              <p>{formatPay(role.payMin, role.payMax)}</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Requirements</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/70">
              {role.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="sticky top-24 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Apply</p>
              <p className="text-lg font-semibold text-white">Ready to audition?</p>
            </div>
            <Button className="w-full" onClick={() => setOpen(true)} disabled={applied}>
              {applied ? 'Applied' : 'Apply now'}
            </Button>
            <p className="text-xs text-white/60">
              Applications close in 6 days. Submit your materials early.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="text-sm font-semibold text-white">Role insights</p>
            <div className="rounded-xl bg-white/5 p-3 text-xs text-white/60">
              24 actors viewed · 6 shortlisted
            </div>
            <div className="rounded-xl bg-white/5 p-3 text-xs text-white/60">
              Director responds in ~48 hours
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-24 left-0 right-0 z-40 flex justify-center lg:hidden">
        <Button className="w-[90%]" onClick={() => setOpen(true)} disabled={applied}>
          {applied ? 'Applied' : 'Apply for this role'}
        </Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Apply for role">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-white/60">Message to director</label>
            <Textarea rows={4} {...register('message')} placeholder="Share why you're perfect for this role." />
            {errors.message && <p className="text-xs text-warning-strong">Message is required.</p>}
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/60">Portfolio links</label>
            <Input {...register('portfolioLinks')} placeholder="https://reel.com, https://imdb.com" />
            {errors.portfolioLinks && (
              <p className="text-xs text-warning-strong">Add at least one link.</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/60">Availability</label>
            <Input {...register('availability')} placeholder="Available from Aug 10 - Sep 30" />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white/60">Self-tape link (optional)</label>
            <Input {...register('selfTape')} placeholder="https://drive.com/self-tape" />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
            Uploads: drag & drop headshots, reels, or scripts (placeholder UI only).
          </div>
          <Button type="submit" className="w-full">
            Submit application
          </Button>
        </form>
      </Modal>
    </motion.div>
  );
}
