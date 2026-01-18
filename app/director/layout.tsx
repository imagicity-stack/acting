import { DirectorLayout } from '@/components/director/DirectorLayout';

export default function DirectorRootLayout({ children }: { children: React.ReactNode }) {
  return <DirectorLayout>{children}</DirectorLayout>;
}
