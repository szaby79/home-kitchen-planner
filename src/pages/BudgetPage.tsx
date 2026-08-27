import { Clock3, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function BudgetPage() {
  return (
    <div className="page-container max-w-2xl">
      <div className="bg-card border rounded-2xl p-8 sm:p-12 text-center shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/15 mb-5">
          <WalletCards className="w-8 h-8 text-accent" />
        </div>
        <h1 className="section-title mb-3">Háztartási budget</h1>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold mb-5">
          <Clock3 className="w-4 h-4" /> Hamarosan elérhető
        </div>
        <p className="text-muted-foreground max-w-md mx-auto mb-7">
          Itt később megadhatod a heti keretedet, és könnyebben tervezheted majd az ételek várható költségét.
        </p>
        <Button asChild>
          <Link to="/planner">Vissza a heti tervezőhöz</Link>
        </Button>
      </div>
    </div>
  );
}
