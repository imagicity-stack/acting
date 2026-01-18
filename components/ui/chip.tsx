import { cn } from '@/lib/utils';

export function Chip({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'success' | 'warning' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        tone === 'neutral' && 'bg-white/10 text-white',
        tone === 'success' && 'bg-emerald-500/20 text-emerald-200',
        tone === 'warning' && 'bg-warning/20 text-warning'
      )}
    >
      {label}
    </span>
  );
}
