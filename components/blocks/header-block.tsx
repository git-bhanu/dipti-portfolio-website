'use client';

import { tinaField } from 'tinacms/dist/react';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';

type HeaderBlockData = {
  level?: string | null;
  heading?: TinaMarkdownContent | null;
};

const components: Components<object> = {
  p: (props) => <span className='block mb-4 last:mb-0'>{props?.children}</span>,
  break: () => <br />,
  bold: (props) => <strong className='font-bold'>{props?.children}</strong>,
  italic: (props) => <em className='italic'>{props?.children}</em>,
};

export function HeaderBlock({ block }: { block: HeaderBlockData }) {
  if (!block.heading) return null;

  const level = block.level ?? 'h2';
  const Tag = level as 'h2' | 'h3' | 'h6';
  const sizeClass =
    level === 'h3'
      ? 'text-[22px] md:text-[36px] font-medium'
      : level === 'h6'
        ? 'text-[12px] md:text-[14px] font-medium uppercase tracking-wide'
        : 'text-[28px] md:text-[48px] font-medium';

  return (
    <Tag
      data-tina-field={tinaField(block, 'heading')}
      className={`font-sans ${sizeClass} leading-tight tracking-tight text-brand-white`}
    >
      <TinaMarkdown content={block.heading} components={components} />
    </Tag>
  );
}
