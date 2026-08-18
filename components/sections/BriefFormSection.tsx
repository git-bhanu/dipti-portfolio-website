'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';

import BriefForm from '@/components/sections/BriefForm';

type BriefFormSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  title: string;
  description?: string;
  toEmail: string;
};

function ThankYou() {
  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col items-center text-center">
      <img src="/verified.svg" alt="" className="h-[40px] w-[40px]" />
      <h1 className="mt-[24px] text-h2 font-medium text-brand-white">Thank you.</h1>
      <p className="mt-[16px] text-meta text-brand-muted">
        I&apos;ll review your enquiry personally and get back to you soon within 2 working days.
      </p>
      <Link
        href="/"
        className="mt-[32px] flex h-[40px] items-center justify-center rounded-[8px] bg-brand-white px-6 text-[14px] font-medium tracking-[-0.42px] text-brand-black"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function BriefFormSection({ _block, title, description, toEmail }: BriefFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="flex min-h-[calc(100vh-80px)] items-center py-[40px] md:py-[64px]">
        <div className="w-full px-5 md:px-[8vw]">
          <ThankYou />
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center py-[40px] md:py-[64px]">
      <div className="w-full px-5 md:px-[8vw]">
        <div className="flex flex-col gap-[48px] md:flex-row md:items-start md:justify-between md:gap-[64px]">
          <div className="flex flex-col gap-[16px] md:w-[420px] md:shrink-0 md:pt-[24px]">
            <h1
              data-tina-field={_block ? tinaField(_block, 'title') : undefined}
              className="text-h2 font-medium text-brand-white md:text-h1"
            >
              {title}
            </h1>
            {description && (
              <p
                data-tina-field={_block ? tinaField(_block, 'description') : undefined}
                className="text-meta text-brand-muted md:text-[20px] md:tracking-[-0.6px]"
              >
                {description}
              </p>
            )}
          </div>
          <div className="flex md:flex-1 md:justify-end">
            <BriefForm toEmail={toEmail} onSubmitted={() => setSubmitted(true)} />
          </div>
        </div>
      </div>
    </section>
  );
}
