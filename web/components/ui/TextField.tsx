import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  labelClassName?: string;
  variant?: "default" | "amber";
};

export const TextField = forwardRef(function TextField(
  {
    label,
    helperText,
    error,
    className,
    labelClassName,
    variant = "default",
    ...props
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const baseClasses =
    variant === "amber"
      ? "w-full rounded-full border border-amber-100 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
      : "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const fieldClasses = [
    baseClasses,
    error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "flex flex-col gap-1 text-sm font-medium text-gray-700",
    labelClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={labelClasses}>
      {label && <span>{label}</span>}
      <input ref={ref} className={fieldClasses} {...props} />
      {error ? (
        <span className="text-xs font-normal text-rose-600">{error}</span>
      ) : helperText ? (
        <span className="text-xs font-normal text-gray-500">{helperText}</span>
      ) : null}
    </label>
  );
});
