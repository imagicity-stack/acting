'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

const schema = z.object({
  name: z.string().min(2),
  age: z.coerce.number().min(16),
  gender: z.string().min(1),
  city: z.string().min(2),
  languages: z.string().min(2),
  skills: z.string().min(2),
  experienceLevel: z.string().min(2)
});

type FormValues = z.infer<typeof schema>;

export default function ActorProfilePage() {
  const profile = useAppStore((state) => state.actorProfile);
  const updateProfile = useAppStore((state) => state.updateActorProfile);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      city: profile.city,
      languages: profile.languages.join(', '),
      skills: profile.skills.join(', '),
      experienceLevel: profile.experienceLevel
    }
  });

  const onSubmit = handleSubmit((data) => {
    updateProfile({
      id: profile.id,
      name: data.name,
      age: data.age,
      gender: data.gender,
      city: data.city,
      languages: data.languages.split(',').map((item) => item.trim()),
      skills: data.skills.split(',').map((item) => item.trim()),
      experienceLevel: data.experienceLevel
    });
    toast({
      id: crypto.randomUUID(),
      title: 'Profile updated',
      description: 'Your profile details were saved.'
    });
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Actor profile</h1>
        <p className="text-sm text-white/60">Keep your profile fresh for casting matches.</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Profile details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs text-white/60">Name</label>
              <Input {...register('name')} />
              {errors.name && <p className="text-xs text-warning-strong">Name is required.</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/60">Age</label>
              <Input type="number" {...register('age')} />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/60">Gender</label>
              <Input {...register('gender')} />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/60">City</label>
              <Input {...register('city')} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs text-white/60">Languages</label>
              <Input {...register('languages')} placeholder="Hindi, English" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs text-white/60">Skills tags</label>
              <Input {...register('skills')} placeholder="drama, dance, improv" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs text-white/60">Experience level</label>
              <Input {...register('experienceLevel')} placeholder="Intermediate" />
            </div>
          </div>
          <Button type="submit">Save profile</Button>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Portfolio</h2>
          <div className="grid gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl bg-white/5 p-4 text-sm text-white/70">
                <p className="font-semibold text-white">Portfolio item {item}</p>
                <p className="text-xs text-white/50">Image or video placeholder</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 text-sm text-white/70">
            <span>Notifications</span>
            <input type="checkbox" defaultChecked className="h-5 w-5 accent-accent-teal" />
          </div>
        </Card>
      </form>
    </motion.div>
  );
}
