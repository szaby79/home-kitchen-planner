import { MouseEvent, ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type AppBackLinkProps = {
  fallback: string;
  children: ReactNode;
  className?: string;
};

export default function AppBackLink({ fallback, children, className }: AppBackLinkProps) {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      event.preventDefault();
      navigate(-1);
    }
  };

  return (
    <Link to={fallback} replace onClick={handleClick} className={className}>
      <ArrowLeft className="h-4 w-4" /> {children}
    </Link>
  );
}
