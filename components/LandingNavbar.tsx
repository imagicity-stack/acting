'use client';

import Link from 'next/link';
import { ButtonLink } from '@/components/ui/button-link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function LandingNavbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-6 lg:px-12">
      <Link href="/" className="text-xl font-semibold text-gradient">
        Lumina Casting
      </Link>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <ButtonLink href="/auth/login" variant="ghost">
          Login
        </ButtonLink>
      </div>
    </nav>
  );
}
