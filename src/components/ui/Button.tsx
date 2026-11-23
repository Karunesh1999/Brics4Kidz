import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'icon' | 'stripe';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-headline rounded font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-sm",
      accent: "bg-accent text-accent-foreground hover:bg-accent-hover font-bold shadow-sm",
      destructive: "bg-destructive text-destructive-foreground hover:opacity-90 shadow-sm",
      outline: "border border-border bg-card text-foreground hover:bg-surface-low shadow-sm",
      ghost: "text-foreground hover:bg-surface-low",
      icon: "w-10 h-10 rounded bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
      stripe: "bg-stripe text-white hover:bg-stripe-hover shadow-md font-bold",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-label-sm",
      md: "px-4 py-2.5 text-label-lg",
      lg: "px-6 py-3.5 text-label-lg",
      icon: "w-10 h-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== 'icon' && sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
