'use client';

import Link from 'next/link';
import { Bookmark, Calendar, MapPin, Users } from 'lucide-react';
import { Role } from '@/lib/types';
import { Chip } from '@/components/ui/chip';
import { formatPay } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

interface RoleCardProps {
  role: Role;
  href?: string;
}

export function RoleCard({ role, href }: RoleCardProps) {
  const toggleSave = useAppStore((state) => state.toggleSaveRole);
  const savedRoleIds = useAppStore((state) => state.savedRoleIds);
  const appliedRoleIds = useAppStore((state) => state.appliedRoleIds);
  const isSaved = savedRoleIds.includes(role.id);
  const isApplied = appliedRoleIds.includes(role.id);

  const content = (
    <div className="glass flex h-full flex-col justify-between rounded-2xl p-6">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">{role.projectName}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{role.title}</h3>
            <p className="mt-2 text-sm text-white/70 line-clamp-2">{role.description}</p>
          </div>
          <button
            onClick={(event) => {
              event.preventDefault();
              toggleSave(role.id);
            }}
            aria-label={isSaved ? 'Unsave role' : 'Save role'}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-accent-teal text-accent-teal' : ''}`} />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {role.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {role.dates}
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4" />
            {role.ageMin}-{role.ageMax}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-white">{formatPay(role.payMin, role.payMax)}</p>
          {isApplied ? (
            <Chip label="Applied" tone="success" />
          ) : (
            <Button variant="outline" className="px-4 py-2 text-xs">
              Apply now
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
