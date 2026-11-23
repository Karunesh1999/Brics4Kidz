import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 gap-4">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-2xl">
        404
      </div>
      <h1 className="font-headline text-headline-lg text-foreground font-bold">Page Not Found</h1>
      <p className="font-body text-body-md text-muted-foreground max-w-sm">
        The page you are looking for might have been moved or doesn't exist.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" className="gap-2">
          <Home size={16} />
          <span>Return to Home</span>
        </Button>
      </Link>
    </div>
  );
};
