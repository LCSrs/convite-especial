import { type LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({ children, required, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-stone-700 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="ml-0.5 text-rose-500">*</span>}
    </label>
  );
}
