import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
};


