import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      fullWidth = false,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200/50 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg hover:shadow-rose-200/60",
      secondary:
        "border border-rose-100 bg-white text-stone-700 hover:border-rose-200 hover:bg-rose-50",
    };

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
          variants[variant]
        } ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
