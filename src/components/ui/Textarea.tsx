import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  cn?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ cn, className, ...props }, ref) => {
    const defaultClasses = 'bg-transparent border border-lighter_dark focus:outline-none';
    
    return (
      <textarea
        ref={ref}
        className={twMerge(clsx(defaultClasses, cn, className))}
        rows={5}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;