'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Bell,
  Briefcase,
  Calendar,
  ChevronDown,
  CircleUser,
  LayoutGrid,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Users2
} from 'lucide-react';

const people = [
  {
    name: 'Henry Paulist',
    email: 'henry.p@mail.com',
    role: 'Senior Creative Director',
    completion: 100
  },
  {
    name: 'Evan Jefferson',
    email: 'jefferson@gmail.com',
    role: 'Creative Director',
    completion: 82
  },
  {
    name: 'Mark Thomson',
    email: 'mark.t@gmail.com',
    role: 'Senior UI Designer',
    completion: 66
  },
  {
    name: 'Alice McKenzie',
    email: 'alice.m@gmail.com',
    role: 'Senior Copywriter',
    completion: 100
  },
  {
    name: 'Jack Ro',
    email: 'jack.ro@gmail.com',
    role: 'Art Director',
    completion: 33
  },
  {
    name: 'Anastasia Groetze',
    email: 'anastasia.g@gmail.com',
    role: 'Senior UX Designer',
    completion: 48
  }
];

const sidebarLinks = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'People', icon: Users2, active: true },
  { label: 'Finances', icon: Briefcase },
  { label: 'Statistics', icon: ShieldCheck },
  { label: 'Documents', icon: MessageSquare },
  { label: 'Calendar', icon: Calendar }
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#E7EAF4] px-6 py-10 text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex min-h-[720px] max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-2xl"
      >
        <aside className="flex w-64 flex-col gap-8 border-r border-slate-100 bg-white px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#4C6FFF]">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Lumina</p>
              <p className="text-xs text-slate-400">Casting Hub</p>
            </div>
            <ChevronDown className="ml-auto h-4 w-4 text-slate-400" />
          </div>

          <Link
            href="/director/dashboard"
            className="rounded-2xl bg-gradient-to-r from-[#5B7CFF] to-[#728BFF] px-4 py-2 text-center text-sm font-semibold text-white shadow-lg"
          >
            Request for talent
          </Link>

          <nav className="space-y-2">
            {sidebarLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.label === 'People') {
                    router.push('/actor/roles');
                  } else if (item.label === 'Dashboard') {
                    router.push('/director/dashboard');
                  }
                }}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                  item.active ? 'bg-[#EEF1FF] text-[#5B7CFF]' : 'text-slate-500'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-6">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="h-8 w-8 rounded-full bg-[#EEF1FF]" />
              Support
            </div>
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5B7CFF] text-white shadow-lg"
              onClick={() => router.push('/auth/login')}
              aria-label="Open account menu"
            >
              <CircleUser className="h-5 w-5" />
            </button>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-100 px-8 py-5">
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-400">
              <Search className="h-4 w-4" />
              Search by name
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <span>29 Aug 2019</span>
              <div className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#5B7CFF]" />
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5B7CFF] to-[#9AB0FF] text-xs font-semibold text-white">
                  CM
                </div>
                Charles Merl
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </header>

          <div className="flex flex-1 gap-6 bg-[#F6F7FB] px-8 py-6">
            <main className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900">People</h1>
                  <div className="mt-2 flex gap-6 text-sm text-slate-400">
                    <span className="font-semibold text-slate-700">All</span>
                    <span>Organization</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-400">
                  <Search className="h-4 w-4" />
                  Search by name
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                <button
                  className="rounded-full bg-[#E7ECFF] px-4 py-2 text-[#5B7CFF]"
                  onClick={() => router.push('/actor/roles')}
                >
                  Design Team
                </button>
                <button
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-500"
                  onClick={() => router.push('/director/roles')}
                >
                  Position
                </button>
                <button
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-500"
                  onClick={() => router.push('/actor/dashboard')}
                >
                  More
                </button>
                <div className="ml-auto flex items-center gap-2 text-slate-400">
                  Sort by:
                  <span className="text-slate-700">All</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex rounded-full border border-slate-200 bg-white p-1">
                  <button
                    className="rounded-full bg-[#EEF1FF] px-3 py-2 text-[#5B7CFF]"
                    onClick={() => router.push('/actor/roles')}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-full px-3 py-2 text-slate-400"
                    onClick={() => router.push('/actor/profile')}
                    aria-label="List view"
                  >
                    <Users2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {people.map((person) => (
                  <motion.div
                    key={person.email}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-full bg-[#EEF1FF]" />
                      <button
                        className="text-slate-300"
                        onClick={() => router.push('/actor/profile')}
                        aria-label="Open profile options"
                      >
                        •••
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-sm font-semibold text-slate-800">{person.name}</h3>
                      <p className="text-xs text-slate-400">{person.email}</p>
                    </div>
                    <div className="mt-4 h-1 w-full rounded-full bg-slate-100">
                      <div
                        className="h-1 rounded-full bg-gradient-to-r from-[#5B7CFF] to-[#8EA1FF]"
                        style={{ width: `${person.completion}%` }}
                      />
                    </div>
                    <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {person.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </main>

            <aside className="w-72 space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-white p-6">
                <p className="text-xs text-slate-400">Selected</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">Design Team</h2>
                <div className="mt-6 flex items-center justify-center">
                  <div className="relative h-32 w-32 rounded-full border-8 border-[#EEF1FF]">
                    <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-slate-800">
                      74%
                    </div>
                    <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#5B7CFF]" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">Projects</h3>
                  <Settings className="h-4 w-4 text-slate-300" />
                </div>
                <div className="mt-4 grid gap-4">
                  {[
                    { label: 'Total', value: '148', color: '#5B7CFF' },
                    { label: 'Completed', value: '56', color: '#4ADE80' },
                    { label: 'In progress', value: '76', color: '#FDBA74' },
                    { label: 'Waiting', value: '16', color: '#FACC15' }
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-[#F6F7FB] p-4">
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className="text-xl font-semibold" style={{ color: item.color }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="w-full rounded-3xl border border-slate-100 bg-white p-5 text-left"
                onClick={() => router.push('/actor/notifications')}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5B7CFF] text-white">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Declaration center</p>
                    <p className="text-sm font-semibold text-slate-800">Internal messages</p>
                  </div>
                </div>
              </button>
            </aside>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
