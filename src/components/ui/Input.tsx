import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  cn?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ cn, className, ...props }, ref) => {
    const defaultClasses = 'bg-transparent border border-lighter_dark focus:outline-none';
    
    return (
      <input
        ref={ref}
        className={twMerge(clsx(defaultClasses, cn, className))}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;