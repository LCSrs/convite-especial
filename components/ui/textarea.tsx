import { forwardRef, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full resize-y rounded-xl border bg-white px-4 py-3 text-base text-stone-800 placeholder:text-stone-400 transition focus:outline-none focus:ring-2 focus:ring-rose-200 ${
          error
            ? "border-rose-400 focus:border-rose-400"
            : "border-rose-100 focus:border-rose-300"
        } ${className}`}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
