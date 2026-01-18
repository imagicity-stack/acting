'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LandingNavbar } from '@/components/LandingNavbar';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { RoleCard } from '@/components/RoleCard';
import { mockRoles } from '@/lib/mock-data';
import { useAppStore } from '@/store/useAppStore';

const trustIndicators = ['500+ casting calls', '120K actor profiles', 'Top studios onboarded'];

const valueProps = [
  {
    title: 'Curated talent pipeline',
    body: 'Intelligent matching helps directors discover the right faces faster.'
  },
  {
    title: 'Real-time updates',
    body: 'Actors receive instant alerts for roles that match their profile.'
  },
  {
    title: 'Premium collaboration',
    body: 'Organize auditions, shortlist talent, and share feedback seamlessly.'
  }
];

export default function LandingPage() {
  const setUserRole = useAppStore((state) => state.setUserRole);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-radial-glow opacity-70" aria-hidden="true" />
      <LandingNavbar />
      <main className="relative z-10">
        <section className="px-6 py-12 lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Chip label="Premium casting marketplace" />
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                Casting brilliance, <span className="text-gradient">built for bold stories</span>.
              </h1>
              <p className="text-base text-white/70 md:text-lg">
                Lumina connects visionary directors with actors who belong on screen. Launch roles, audit
                portfolios, and manage auditions in one cinematic workspace.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/director/dashboard"
                  onClick={() => {
                    window.localStorage.setItem('lumina-role', 'director');
                    setUserRole('director');
                  }}
                >
                  Continue as Director
                </ButtonLink>
                <ButtonLink
                  href="/actor/dashboard"
                  variant="secondary"
                  onClick={() => {
                    window.localStorage.setItem('lumina-role', 'actor');
                    setUserRole('actor');
                  }}
                >
                  Continue as Actor
                </ButtonLink>
              </div>
              <div className="flex flex-wrap gap-3">
                {trustIndicators.map((item) => (
                  <span key={item} className="text-xs text-white/60">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Featured casting call</p>
                <Chip label="Open" tone="success" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">Neon City · Lead Detective</h2>
              <p className="mt-3 text-sm text-white/70">
                A gritty, neon-lit thriller series searching for a lead detective with cinematic depth.
              </p>
              <div className="mt-6 grid gap-3 text-xs text-white/60 md:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="font-semibold text-white">₹80K - ₹120K</p>
                  <p>Pay range</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="font-semibold text-white">Mumbai</p>
                  <p>Location</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="font-semibold text-white">Aug 12 - Sep 20</p>
                  <p>Shoot dates</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="font-semibold text-white">Self-tape required</p>
                  <p>Requirement</p>
                </div>
              </div>
              <Button className="mt-6 w-full">View details</Button>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-12 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-3">
            {valueProps.map((prop) => (
              <Card key={prop.title} className="space-y-3">
                <h3 className="text-lg font-semibold text-white">{prop.title}</h3>
                <p className="text-sm text-white/70">{prop.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="px-6 py-12 lg:px-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Featured roles</h2>
              <p className="text-sm text-white/60">Updated every morning with new casting calls.</p>
            </div>
            <Link href="/actor/roles" className="text-sm text-accent-teal">
              Browse all
            </Link>
          </div>
          <div className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
            {mockRoles.map((role) => (
              <div key={role.id} className="min-w-[280px] snap-start md:min-w-0">
                <RoleCard role={role} href={`/actor/roles/${role.id}`} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
