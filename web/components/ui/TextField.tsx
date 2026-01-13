import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};

export const TextField = forwardRef(function TextField(
  { label, helperText, error, className, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {

});
