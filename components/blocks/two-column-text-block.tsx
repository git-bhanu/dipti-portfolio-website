'use client';

import { tinaField } from 'tinacms/dist/react';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';

type TwoColumnTextBlockData = {
  leftColumn?: TinaMarkdownContent | null;
  rightColumn?: TinaMarkdownContent | null;
};

const components: Components<object> = {
  p: (props) => <span className='block mb-4 last:mb-0'>{props?.children}</span>,
  break: () => <br />,
  bold: (props) => <strong className='font-bold'>{props?.children}</strong>,
  italic: (props) => <em className='italic'>{props?.children}</em>,
};

export function TwoColumnTextBlock({ block }: { block: TwoColumnTextBlockData }) {
  if (!block.leftColumn && !block.rightColumn) return null;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 text-[16px] md:text-[18px] leading-snug text-brand-white font-sans'>
      {block.leftColumn && (
        <div data-tina-field={tinaField(block, 'leftColumn')}>
          <TinaMarkdown content={block.leftColumn} components={components} />
        </div>
      )}
      {block.rightColumn && (
        <div className='pt-4 md:pt-0' data-tina-field={tinaField(block, 'rightColumn')}>
          <TinaMarkdown content={block.rightColumn} components={components} />
        </div>
      )}
    </div>
  );
}
