import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-stone-800 placeholder:text-stone-400 transition focus:outline-none focus:ring-2 focus:ring-rose-200 ${
          error
            ? "border-rose-400 focus:border-rose-400"
            : "border-rose-100 focus:border-rose-300"
        } ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
