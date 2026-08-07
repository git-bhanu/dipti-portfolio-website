import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[104px] w-full resize-none border-b border-brand-offwhite/50 bg-transparent py-[10px] text-[16px] font-semibold leading-[32px] text-brand-white outline-none transition-colors placeholder:font-semibold placeholder:text-brand-muted focus:border-brand-white disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
