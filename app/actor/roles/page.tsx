'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { RoleCard } from '@/components/RoleCard';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const PAGE_SIZE = 4;

export default function ActorRolesPage() {
  const roles = useAppStore((state) => state.roles);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('all');
  const [projectType, setProjectType] = useState('all');
  const [gender, setGender] = useState('all');
  const [ageRange, setAgeRange] = useState('all');
  const [tag, setTag] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesQuery = role.title.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = location === 'all' || role.location === location;
      const matchesType = projectType === 'all' || role.projectType === projectType;
      const matchesGender = gender === 'all' || role.gender === gender;
      const matchesAge =
        ageRange === 'all' ||
        (ageRange === '18-25' && role.ageMin >= 18 && role.ageMax <= 25) ||
        (ageRange === '26-35' && role.ageMin >= 26 && role.ageMax <= 35) ||
        (ageRange === '36+' && role.ageMax >= 36);
      const matchesTag = tag === 'all' || role.tags.includes(tag);
      return matchesQuery && matchesLocation && matchesType && matchesGender && matchesAge && matchesTag;
    });
  }, [roles, query, location, projectType, gender, ageRange, tag]);

  const visibleRoles = useMemo(() => filteredRoles.slice(0, page * PAGE_SIZE), [filteredRoles, page]);

  useEffect(() => {
    setPage(1);
  }, [query, location, projectType, gender, ageRange, tag]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 600);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Browse roles</h1>
          <p className="text-sm text-white/60">Infinite feed of casting calls curated for you.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(5,_1fr)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search by role or project"
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
          <Select value={tag} onChange={(event) => setTag(event.target.value)}>
            <option value="all">Tags</option>
            <option value="drama">Drama</option>
            <option value="dance">Dance</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
          </Select>
          <Select>
            <option>Pay</option>
            <option>₹0 - ₹50K</option>
            <option>₹50K - ₹1L</option>
            <option>₹1L+</option>
          </Select>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleRoles.map((role) => (
          <RoleCard key={role.id} role={role} href={`/actor/roles/${role.id}`} />
        ))}
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={`skeleton-${index}`} className="h-[280px]" />
          ))}
      </div>

      {visibleRoles.length < filteredRoles.length && (
        <button
          onClick={loadMore}
          className="mx-auto flex items-center justify-center rounded-full border border-white/10 px-6 py-2 text-sm text-white/70 transition hover:border-white/30"
          aria-label="Load more roles"
        >
          {loading ? 'Loading…' : 'Load more roles'}
        </button>
      )}

      {filteredRoles.length === 0 && (
        <Card className="text-center text-sm text-white/60">
          No roles match your filters. Try adjusting your search.
        </Card>
      )}
    </motion.div>
  );
}
