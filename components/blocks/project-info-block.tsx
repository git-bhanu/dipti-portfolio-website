'use client';

import { tinaField } from 'tinacms/dist/react';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';

type LeftItem = {
  label?: string | null;
  value?: TinaMarkdownContent | null;
};

type ProjectInfoBlockData = {
  leftItems?: LeftItem[] | null;
  infoText?: TinaMarkdownContent | null;
  liveSiteUrl?: string | null;
};

const valueComponents: Components<object> = {
  p: (props) => <span className='block mb-1 last:mb-0'>{props?.children}</span>,
  break: () => <br />,
  bold: (props) => <strong className='font-bold'>{props?.children}</strong>,
  italic: (props) => <em className='italic'>{props?.children}</em>,
};

export function ProjectInfoBlock({ block }: { block: ProjectInfoBlockData }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 text-[16px] md:text-[18px] leading-snug font-sans'>
      {/* Left: labeled sections */}
      <div className='flex flex-col gap-6'>
        {block.leftItems?.map((item, i) => (
          <div key={i}>
            {item.label && (
              <p
                className='text-[11px] tracking-[0.12em] uppercase text-brand-muted mb-1'
                data-tina-field={tinaField(item, 'label')}
              >
                {item.label}
              </p>
            )}
            {item.value && (
              <div
                className='text-brand-white'
                data-tina-field={tinaField(item, 'value')}
              >
                <TinaMarkdown content={item.value} components={valueComponents} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right: info text + live link */}
      <div className='pt-6 md:pt-0 flex flex-col gap-6'>
        {block.infoText && (
          <div
            className='text-brand-white'
            data-tina-field={tinaField(block, 'infoText')}
          >
            <p className='text-[11px] tracking-[0.12em] uppercase text-brand-muted mb-1'>Info</p>
            <TinaMarkdown content={block.infoText} components={valueComponents} />
          </div>
        )}
        {block.liveSiteUrl && (
          <div data-tina-field={tinaField(block, 'liveSiteUrl')}>
            <a
              href={block.liveSiteUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-brand-white underline underline-offset-4 hover:text-brand-muted transition-colors'
            >
              See live project
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
