'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Chip } from '@/components/ui/chip';
import { toast } from '@/components/ui/toast';
import { useAppStore } from '@/store/useAppStore';
import { Role } from '@/lib/types';
import { formatPay } from '@/lib/utils';

const schema = z.object({
  projectName: z.string().min(2),
  projectType: z.enum(['film', 'ad', 'web series', 'music video']),
  title: z.string().min(2),
  description: z.string().min(10),
  gender: z.string().min(1),
  ageMin: z.coerce.number().min(10),
  ageMax: z.coerce.number().min(10),
  tags: z.string().optional(),
  language: z.string().min(1),
  location: z.string().min(2),
  dates: z.string().min(2),
  duration: z.string().min(2),
  travelStay: z.string().min(1),
  payType: z.enum(['fixed', 'range']),
  payMin: z.coerce.number().min(1000),
  payMax: z.coerce.number().min(1000),
  paymentTerms: z.string().min(2),
  requirements: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export default function NewRolePage() {
  const addRole = useAppStore((state) => state.addRole);
  const [showPreview, setShowPreview] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: 'film',
      payType: 'fixed',
      travelStay: 'no',
      paymentTerms: 'per project'
    }
  });

  const values = watch();
  const previewTags = useMemo(
    () => values.tags?.split(',').map((tag) => tag.trim()).filter(Boolean) ?? [],
    [values.tags]
  );

  const onSubmit = handleSubmit((data) => {
    const newRole: Role = {
      id: `role-${Date.now()}`,
      directorId: 'director-1',
      projectName: data.projectName,
      projectType: data.projectType,
      title: data.title,
      description: data.description,
      gender: data.gender,
      ageMin: data.ageMin,
      ageMax: data.ageMax,
      location: data.location,
      dates: data.dates,
      duration: data.duration,
      payType: data.payType,
      payMin: data.payMin,
      payMax: data.payMax,
      tags: previewTags,
      requirements: data.requirements?.split(',').map((req) => req.trim()).filter(Boolean) ?? [],
      status: 'open',
      createdAt: new Date().toISOString()
    };
    addRole(newRole);
    toast({
      id: crypto.randomUUID(),
      title: 'Role published',
      description: 'Your casting call is now live.'
    });
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Publish a new role</h1>
          <p className="text-sm text-white/60">Build a casting call with live preview.</p>
        </div>
        <Button variant="secondary" onClick={() => setShowPreview((prev) => !prev)}>
          {showPreview ? 'Hide preview' : 'Show preview'}
        </Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <form onSubmit={onSubmit} className="space-y-6">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Project info</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">Project name</label>
                <Input {...register('projectName')} placeholder="Project Neon" />
                {errors.projectName && <p className="text-xs text-warning-strong">Required field.</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Project type</label>
                <Select {...register('projectType')}>
                  <option value="film">Film</option>
                  <option value="ad">Ad</option>
                  <option value="web series">Web series</option>
                  <option value="music video">Music video</option>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Role details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">Role title</label>
                <Input {...register('title')} placeholder="Lead Detective" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Gender</label>
                <Input {...register('gender')} placeholder="Any" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-white/60">Description</label>
                <Textarea rows={4} {...register('description')} placeholder="Describe the role..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Age min</label>
                <Input type="number" {...register('ageMin')} placeholder="22" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Age max</label>
                <Input type="number" {...register('ageMax')} placeholder="32" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Skills tags</label>
                <Input {...register('tags')} placeholder="drama, action, thriller" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Language</label>
                <Input {...register('language')} placeholder="Hindi, English" />
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Logistics</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">Location</label>
                <Input {...register('location')} placeholder="Mumbai" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Shoot dates</label>
                <Input {...register('dates')} placeholder="Aug 12 - Sep 20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Duration</label>
                <Input {...register('duration')} placeholder="4 weeks" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Travel/stay</label>
                <Select {...register('travelStay')}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Pay</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs text-white/60">Pay type</label>
                <Select {...register('payType')}>
                  <option value="fixed">Fixed</option>
                  <option value="range">Range</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Payment terms</label>
                <Select {...register('paymentTerms')}>
                  <option value="per project">Per project</option>
                  <option value="per day">Per day</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Pay min</label>
                <Input type="number" {...register('payMin')} placeholder="80000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/60">Pay max</label>
                <Input type="number" {...register('payMax')} placeholder="120000" />
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Requirements</h2>
            <div className="space-y-2">
              <label className="text-xs text-white/60">Requirements checklist</label>
              <Input {...register('requirements')} placeholder="audition required, self-tape" />
            </div>
          </Card>

          <Button type="submit" className="w-full">
            Publish role
          </Button>
        </form>

        {showPreview && (
          <Card className="sticky top-28 hidden h-fit space-y-4 lg:block">
            <div>
              <p className="text-xs text-white/40">Live preview</p>
              <h3 className="text-xl font-semibold text-white">
                {values.title || 'Role title'}
              </h3>
              <p className="text-sm text-white/60">{values.projectName || 'Project name'}</p>
            </div>
            <p className="text-sm text-white/70">
              {values.description || 'Role description will appear here.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {previewTags.length > 0 ? previewTags.map((tag) => <Chip key={tag} label={tag} />) : <Chip label="Tags" />}
            </div>
            <div className="space-y-2 text-xs text-white/60">
              <p>Location: {values.location || 'Location'}</p>
              <p>Dates: {values.dates || 'Shoot dates'}</p>
              <p>Pay: {values.payMin ? formatPay(values.payMin, values.payMax || values.payMin) : 'Pay'} </p>
            </div>
          </Card>
        )}
      </div>

      {showPreview && (
        <Card className="mt-6 space-y-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/40">Live preview</p>
              <h3 className="text-lg font-semibold text-white">{values.title || 'Role title'}</h3>
            </div>
            <Chip label={values.projectType || 'Project type'} />
          </div>
          <p className="text-sm text-white/70">
            {values.description || 'Role description will appear here.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {previewTags.length > 0 ? previewTags.map((tag) => <Chip key={tag} label={tag} />) : <Chip label="Tags" />}
          </div>
          <div className="space-y-2 text-xs text-white/60">
            <p>Location: {values.location || 'Location'}</p>
            <p>Dates: {values.dates || 'Shoot dates'}</p>
            <p>Pay: {values.payMin ? formatPay(values.payMin, values.payMax || values.payMin) : 'Pay'}</p>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
