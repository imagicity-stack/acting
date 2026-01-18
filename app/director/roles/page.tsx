'use client';

import { useMemo, useState } from 'react';
import { Grid2x2, List, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Chip } from '@/components/ui/chip';
import { formatPay } from '@/lib/utils';

export default function DirectorRolesPage() {
  const roles = useAppStore((state) => state.roles);
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [query, setQuery] = useState('');
  const [projectType, setProjectType] = useState('all');
  const [location, setLocation] = useState('all');
  const [gender, setGender] = useState('all');
  const [ageRange, setAgeRange] = useState('all');

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesQuery = role.title.toLowerCase().includes(query.toLowerCase());
      const matchesType = projectType === 'all' || role.projectType === projectType;
      const matchesLocation = location === 'all' || role.location === location;
      const matchesGender = gender === 'all' || role.gender === gender;
      const matchesAgeRange =
        ageRange === 'all' ||
        (ageRange === '18-25' && role.ageMin >= 18 && role.ageMax <= 25) ||
        (ageRange === '26-35' && role.ageMin >= 26 && role.ageMax <= 35) ||
        (ageRange === '36+' && role.ageMax >= 36);
      return matchesQuery && matchesType && matchesLocation && matchesGender && matchesAgeRange;
    });
  }, [roles, query, projectType, location, gender, ageRange]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">All roles</h1>
            <p className="text-sm text-white/60">Manage, filter, and review your casting calls.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`rounded-full border px-3 py-2 text-xs ${
                view === 'grid' ? 'border-accent-teal text-accent-teal' : 'border-white/10 text-white/60'
              }`}
              onClick={() => setView('grid')}
              aria-label="Grid view"
            >
              <Grid2x2 className="h-4 w-4" />
            </button>
            <button
              className={`rounded-full border px-3 py-2 text-xs ${
                view === 'table' ? 'border-accent-violet text-accent-violet' : 'border-white/10 text-white/60'
              }`}
              onClick={() => setView('table')}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.5fr_repeat(5,_1fr)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search roles"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={projectType} onChange={(event) => setProjectType(event.target.value)}>
            <option value="all">Project type</option>
            <option value="film">Film</option>
            <option value="ad">Ad</option>
            <option value="web series">Web series</option>
            <option value="music video">Music video</option>
          </Select>
          <Select value={location} onChange={(event) => setLocation(event.target.value)}>
            <option value="all">Location</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
          </Select>
          <Select value={gender} onChange={(event) => setGender(event.target.value)}>
            <option value="all">Gender</option>
            <option value="Any">Any</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </Select>
          <Select value={ageRange} onChange={(event) => setAgeRange(event.target.value)}>
            <option value="all">Age range</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36+">36+</option>
          </Select>
          <Select>
            <option>Pay range</option>
            <option>₹0 - ₹50K</option>
            <option>₹50K - ₹1L</option>
            <option>₹1L+</option>
          </Select>
        </div>
      </Card>

      {view === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">{role.projectName}</p>
                  <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                </div>
                <Chip label={role.status} tone={role.status === 'open' ? 'success' : 'warning'} />
              </div>
              <p className="text-sm text-white/70">{role.description}</p>
              <div className="flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{role.location}</span>
                <span>{role.dates}</span>
                <span>{formatPay(role.payMin, role.payMax)}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="grid grid-cols-6 gap-4 border-b border-white/10 bg-white/5 px-6 py-4 text-xs text-white/60">
            <span>Role</span>
            <span>Status</span>
            <span>Location</span>
            <span>Dates</span>
            <span>Pay</span>
            <span>Applications</span>
          </div>
          <div className="divide-y divide-white/10">
            {filteredRoles.map((role) => (
              <div key={role.id} className="grid grid-cols-6 gap-4 px-6 py-4 text-sm">
                <div>
                  <p className="font-semibold text-white">{role.title}</p>
                  <p className="text-xs text-white/50">{role.projectName}</p>
                </div>
                <Chip label={role.status} tone={role.status === 'open' ? 'success' : 'warning'} />
                <span className="text-white/70">{role.location}</span>
                <span className="text-white/70">{role.dates}</span>
                <span className="text-white/70">{formatPay(role.payMin, role.payMax)}</span>
                <span className="text-white/70">{Math.floor(Math.random() * 18) + 4}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
}
