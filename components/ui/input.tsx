import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full border-b border-brand-offwhite/50 bg-transparent py-[10px] text-[16px] font-semibold leading-[32px] text-brand-white outline-none transition-colors placeholder:font-semibold placeholder:text-brand-muted focus:border-brand-white disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
