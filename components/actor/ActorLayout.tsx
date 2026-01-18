'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Bookmark,
  LayoutGrid,
  User2,
  Wand2,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/components/actor/NotificationBell';

const navItems = [
  { href: '/actor/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/actor/roles', label: 'Roles', icon: Wand2 },
  { href: '/actor/profile', label: 'Profile', icon: User2 },
  { href: '/actor/notifications', label: 'Notifications', icon: Bell }
];

const bottomNav = [
  { href: '/actor/dashboard', label: 'Home', icon: LayoutGrid },
  { href: '/actor/roles', label: 'Browse', icon: Search },
  { href: '/actor/profile', label: 'Profile', icon: User2 },
  { href: '/actor/notifications', label: 'Alerts', icon: Bell }
];

export function ActorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex h-full flex-col gap-6 border-r border-white/10 bg-surface px-6 py-8">
          <Link href="/" className="text-xl font-semibold text-gradient">
            Lumina Casting
          </Link>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition',
                    active && 'bg-white/10 text-white'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto space-y-4">
            <Button variant="outline" className="w-full" aria-label="Share profile">
              Share profile
            </Button>
            <div className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-xs text-white/60">
              <span>Saved roles</span>
              <Bookmark className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-background/80 px-6 py-4 backdrop-blur lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Actor Mode</p>
            <p className="text-lg font-semibold text-white">Hey Riya, ready to shine?</p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <ThemeToggle />
          </div>
        </header>
        <main className="px-6 pb-24 pt-8 lg:px-10 lg:pb-10">{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-white/10 bg-surface/90 px-6 py-3 backdrop-blur lg:hidden">
          {bottomNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 text-xs text-white/60',
                  active && 'text-accent-teal'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
