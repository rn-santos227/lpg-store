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

});
