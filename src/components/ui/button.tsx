import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition";

    const variants: Record<"default" | "ghost", string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "bg-transparent text-white hover:bg-white/20",
    };

    return (
      <button
        ref={ref}
        className={'${base} ${variants[variant]} ${className}'}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";