'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ClipboardList, FilePlus2, Users2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/director/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/director/roles', label: 'Roles', icon: ClipboardList },
  { href: '/director/roles/new', label: 'New Role', icon: FilePlus2 },
  { href: '/director/applications', label: 'Applications', icon: Users2 }
];

export function DirectorLayout({ children }: { children: React.ReactNode }) {
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
          <div className="mt-auto space-y-3">
            <Button variant="outline" className="w-full">
              Invite collaborators
            </Button>
            <p className="text-xs text-white/50">Director mode tools for premium casting.</p>
          </div>
        </div>
      </div>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-background/80 px-6 py-4 backdrop-blur lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Director Mode</p>
            <p className="text-lg font-semibold text-white">Welcome back, Arjun</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="secondary">Preview public listing</Button>
          </div>
        </header>
        <main className="px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
