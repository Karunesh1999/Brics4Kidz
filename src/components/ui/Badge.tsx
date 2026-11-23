import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'surface';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => {
  const variantStyles = {
    default: "bg-surface-container text-foreground",
    primary: "bg-primary/10 text-primary font-bold border border-primary/20",
    secondary: "bg-secondary/10 text-secondary font-bold border border-secondary/20",
    accent: "bg-accent text-accent-foreground font-bold shadow-xs",
    destructive: "bg-destructive/10 text-destructive font-bold border border-destructive/20",
    outline: "border border-border bg-card text-muted-foreground",
    surface: "bg-surface-low text-muted-foreground border border-border/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-body leading-tight whitespace-nowrap",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
