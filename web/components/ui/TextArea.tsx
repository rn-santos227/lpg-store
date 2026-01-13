import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};

export const TextArea = forwardRef(function TextArea(
  { label, helperText, error, className, rows = 4, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const fieldClasses = [
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100",
    error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
});
