'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';

const richComponents: Components<object> = {
  p: (props) => <span className='block'>{props?.children}</span>,
  break: () => <br />,
  bold: (props) => <strong className='font-semibold'>{props?.children}</strong>,
  italic: (props) => <em className='italic'>{props?.children}</em>,
};

function formatDate(iso: string | null | undefined): React.ReactNode {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    const day = d.getUTCDate();
    const suffix =
      day === 1 || day === 21 || day === 31 ? 'st'
      : day === 2 || day === 22 ? 'nd'
      : day === 3 || day === 23 ? 'rd'
      : 'th';
    const month = d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
    const year = d.getUTCFullYear();
    return <>{day}<sup>{suffix}</sup> {month} {year}</>;
  } catch {
    return iso;
  }
}

export interface ProjectCardData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: any;
  image?: string | null;
  imageAlt?: string | null;
  cardImage?: string | null;
  cardImageAlt?: string | null;
  date?: string | null;
  category?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any;
}

interface ProjectListCardProps {
  project: ProjectCardData;
  href: string;
  sizes?: string;
}

function extractText(node: unknown): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  const n = node as { text?: string; children?: unknown[] };
  if (n.text) return n.text;
  if (n.children) return n.children.map(extractText).join('');
  return '';
}

export function ProjectListCard({ project, href, sizes }: ProjectListCardProps) {
  const thumbSrc = project.cardImage ?? project.image;

  return (
    <Link href={href} className='group block'>
      <article>
        <div className='relative aspect-[4/3] w-full overflow-hidden bg-brand-offwhite'>
          {thumbSrc ? (
            <Image
              src={thumbSrc}
              alt={project.cardImageAlt ?? project.imageAlt ?? extractText(project.title)}
              fill
              sizes={sizes ?? '(max-width: 767px) 100vw, 33vw'}
              className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
            />
          ) : (
            <div className='absolute inset-0 bg-brand-offwhite' />
          )}
        </div>

        <div className='pt-4 pb-2'>
          {(project.date || project.category) && (
            <p className='text-meta font-normal text-brand-muted mb-2'>
              {project.date && <span>{formatDate(project.date)}</span>}
              {project.date && project.category && ' · '}
              {project.category && <span className='font-medium text-brand-black'>{project.category}</span>}
            </p>
          )}

          <h3 className='text-h3 font-medium leading-none tracking-tight text-brand-black'>
            <TinaMarkdown content={project.title} components={richComponents} />
          </h3>

          {project.description && (
            <div className='mt-2 text-meta text-brand-muted line-clamp-2'>
              <TinaMarkdown content={project.description} components={richComponents} />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
