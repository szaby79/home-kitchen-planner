import { CircleHelp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

type HelpLinkProps = {
  section: string;
  label: string;
  className?: string;
};

export default function HelpLink({ section, label, className }: HelpLinkProps) {
  const { tr } = useLanguage();
  const accessibleLabel = tr(`${label} – súgó megnyitása`, `Open help for ${label}`);

  return (
    <a
      href={`/help#${section}`}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className={cn('inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}
    >
      <CircleHelp className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
