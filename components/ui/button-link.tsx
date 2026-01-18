import Link from 'next/link';
import { buttonStyles } from '@/components/ui/button';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  onClick?: () => void;
}

export function ButtonLink({ href, children, variant = 'primary', onClick }: ButtonLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={buttonStyles(variant)}>
      {children}
    </Link>
  );
}
