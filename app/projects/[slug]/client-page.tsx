'use client';

import { HeaderBlock } from '@/components/blocks/header-block';
import { ImageBlock } from '@/components/blocks/image-block';
import { ProjectInfoBlock } from '@/components/blocks/project-info-block';
import { SpaceBlock } from '@/components/blocks/space-block';
import { TwoColumnTextBlock } from '@/components/blocks/two-column-text-block';
import { VideoBlock } from '@/components/blocks/video-block';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import PageTransition from '@/components/shared/PageTransition';
import { tinaImageUrl } from '@/lib/tina-image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProjectNode = Record<string, any>;

type Props = {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sitePage?: any;
};

const titleComponents: Components<object> = {
  p: (props) => <span className='block'>{props?.children}</span>,
  bold: (props) => <strong className='font-bold'>{props?.children}</strong>,
  italic: (props) => <em className='italic'>{props?.children}</em>,
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') return content.replace(/\n$/, '');
  if (Array.isArray(content)) return content.map(extractText).join('');
  if (content.text) return content.text;
  if (content.children) return extractText(content.children);
  return '';
}

function blockWrapperClass(width: string | null | undefined, verticalPadding: string) {
  switch (width) {
    case 'full':
      return `w-full ${verticalPadding}`;
    case 'wide':
      return `w-full px-5 md:px-[8vw] ${verticalPadding}`;
    case 'narrow':
    default:
      return `w-full px-5 md:px-[10vw] md:max-w-[75vw] ${verticalPadding}`;
  }
}


export default function ProjectDetailClientPage({ query, data, variables, slug, sitePage }: Props) {
  const { data: tinaData } = useTina({ query, data, variables });

  const projects: ProjectNode[] = (tinaData.projectConnection?.edges ?? [])
    .map((e: { node: ProjectNode } | null) => e?.node)
    .filter((n: ProjectNode | null): n is ProjectNode => n != null)
    .sort((a: ProjectNode, b: ProjectNode) => {
      const aO = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const bO = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return aO - bO;
    });

  const projectSlug = (p: ProjectNode) => (p.slug ?? p._sys?.filename ?? '').toLowerCase();

  const project = projects.find((p) => projectSlug(p) === slug.toLowerCase());
  const related = projects.filter((p) => projectSlug(p) !== slug.toLowerCase()).slice(0, 3);

  const page = sitePage ?? {};

  if (!project) return null;

  const heroImage = tinaImageUrl(project.image);

  return (
    <main className='min-h-screen bg-brand-black'>
      <div className='bg-brand-black'>
        <Header brand={page.brand ?? 'Serifs & Systems'} links={page.navigation ?? []} />
      </div>

      <PageTransition>
      {/* Header */}
      <div className='px-5 pt-10 pb-6 md:px-[8vw] md:pt-16'>
        <h1 className='text-h1 font-medium leading-none tracking-tight text-brand-white'>
          {extractText(project.title)}
        </h1>
        {project.subtitle && (
          <p className='mt-3 text-[16px] md:text-[18px] text-brand-muted leading-snug'>
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Hero image */}
      {heroImage && (
        <div className='mt-8 px-5 md:px-[8vw]'>
          <div className='relative aspect-video w-full overflow-hidden bg-white/10'>
            <Image
              src={heroImage}
              alt={project.imageAlt ?? ''}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 84vw'
              priority
            />
          </div>
        </div>
      )}

      {/* Content blocks */}
      {project.blocks && project.blocks.length > 0 && (
        <div className='mt-10'>
          {project.blocks.map((block: ProjectNode, i: number) => {
            switch (block?.__typename) {
              case 'ProjectBlocksHeader':
                return (
                  <div key={i} className={blockWrapperClass('wide', 'pb-2 md:py-4')}>
                    <HeaderBlock block={block} />
                  </div>
                );
              case 'ProjectBlocksTwoColumnText':
                return (
                  <div key={i} className={blockWrapperClass('wide', 'py-4')}>
                    <TwoColumnTextBlock block={block} />
                  </div>
                );
              case 'ProjectBlocksProjectInfo':
                return (
                  <div key={i} className={blockWrapperClass('wide', 'py-4')}>
                    <ProjectInfoBlock block={block} />
                  </div>
                );
              case 'ProjectBlocksVideo':
                return (
                  <div key={i} className={blockWrapperClass('wide', 'py-6')}>
                    <VideoBlock block={block} />
                  </div>
                );
              case 'ProjectBlocksImage':
                return (
                  <div key={i} className={blockWrapperClass(block.width, 'py-2 md:py-4')}>
                    <ImageBlock block={block} />
                  </div>
                );
              case 'ProjectBlocksSpace':
                return <SpaceBlock key={i} block={block} />;
              default:
                return null;
            }
          })}
        </div>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <div className='mt-20 px-5 pb-16 pt-12 md:px-[8vw]'>
          <h2 className='text-[32px] md:text-[48px] font-medium leading-none tracking-tight text-brand-white mb-10'>
            Next Projects
          </h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {related.map((p) => {
              const thumb = tinaImageUrl(p.cardImage ?? p.image);
              const title = extractText(p.title);
              return (
                <Link
                  key={p.id}
                  href={`/projects/${projectSlug(p)}`}
                  className='group block'
                >
                  <div className='relative aspect-[4/3] w-full overflow-hidden bg-white/10 mb-4'>
                    {thumb && (
                      <Image
                        src={thumb}
                        alt={p.imageAlt ?? ''}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                        sizes='(max-width: 767px) 100vw, 33vw'
                      />
                    )}
                  </div>
                  <h3 className='text-[20px] font-medium leading-tight text-brand-white'>
                    {title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      </PageTransition>

      <div className='bg-brand-black'>
        <Footer
          brand={page.brand ?? 'Serifs & Systems'}
          links={page.footer?.links ?? []}
          email={page.footer?.email ?? ''}
          instagramHref={page.footer?.instagramHref ?? ''}
        />
      </div>
    </main>
  );
}
