'use client';

import type { ReactNode } from 'react';

export type Annotation = {
  id?: string | null;
  text?: string | null;
};

export function AnnotatedLayout({
  children,
  annotations,
  className,
}: {
  children: ReactNode;
  annotations: Annotation[];
  className?: string;
}) {
  return (
    <section className={`w-full flex flex-col md:block md:relative ${className ?? ''}`}>
      <div className='md:w-[60%]'>{children}</div>
      {annotations.length > 0 && (
        <div className='md:absolute md:right-0 md:bottom-0'>
          <AnnotationPanel annotations={annotations} />
        </div>
      )}
    </section>
  );
}

export function AnnotationPanel({ annotations }: { annotations: Annotation[] }) {
  return (
    <div className='w-full md:w-60 pt-4 pb-6'>
      <hr className='border-black/10 w-full' />
      {annotations.map((a, i) => (
        <div key={a.id ?? i} className='w-full md:w-60'>
          <div className='py-3 px-4'>
            <span className='font-sans text-[10px] text-brand-muted'>[{a.id}]</span>
            <p className='font-sans mt-2 text-[12px] text-brand-black/70 leading-normal'>{a.text}</p>
          </div>
        </div>
      ))}
      <hr className='border-black/10 w-full' />
    </div>
  );
}
