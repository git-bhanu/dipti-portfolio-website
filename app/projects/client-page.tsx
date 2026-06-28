'use client';

import { HeaderBlock } from '@/components/blocks/header-block';
import { ImageBlock } from '@/components/blocks/image-block';
import { SpaceBlock } from '@/components/blocks/space-block';
import { TwoColumnTextBlock } from '@/components/blocks/two-column-text-block';
import { VideoBlock } from '@/components/blocks/video-block';
import { ProjectListGrid } from '@/components/projects/project-list-grid';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { tinaImageUrl } from '@/lib/tina-image';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sitePage?: any;
};

export default function ProjectsClientPage(props: Props) {
  return (
    <Suspense fallback={null}>
      <ProjectsContent {...props} />
    </Suspense>
  );
}

function ProjectsContent({ query, data, variables, sitePage }: Props) {
  const { data: tinaData } = useTina({ query, data, variables });
  const searchParams = useSearchParams();

  const [displayProject, setDisplayProject] = useState<ProjectNode | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const projects: ProjectNode[] = (tinaData.projectConnection?.edges ?? [])
    .map((e: { node: ProjectNode } | null) => e?.node)
    .filter((n: ProjectNode | null): n is ProjectNode => n != null)
    .sort((a: ProjectNode, b: ProjectNode) => {
      const aO = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const bO = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return aO - bO;
    });

  const projectSlug = (p: ProjectNode) =>
    (p.slug ?? p._sys?.filename ?? '').toLowerCase();

  const open = useCallback(
    (slug: string) => {
      const found = projects.find((p) => projectSlug(p) === slug);
      if (!found) return;
      setDisplayProject(found);
      window.history.pushState({}, '', `/projects?project=${encodeURIComponent(slug)}`);
      document.documentElement.style.overflow = 'hidden';
    },
    [projects],
  );

  const close = useCallback(() => {
    setPanelOpen(false);
    setTimeout(() => {
      setDisplayProject(null);
      document.documentElement.style.overflow = '';
    }, 480);
    window.history.pushState({}, '', '/projects');
  }, []);

  useEffect(() => {
    if (displayProject) {
      const id = requestAnimationFrame(() => setPanelOpen(true));
      return () => cancelAnimationFrame(id);
    }
  }, [displayProject]);

  useEffect(() => {
    const slug = searchParams?.get('project');
    if (slug) open(slug);
    // Only run on mount to restore URL state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handlePop = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('project');
      if (slug) {
        open(slug);
      } else {
        close();
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [open, close]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  const page = sitePage ?? {};

  return (
    <main className='min-h-screen bg-brand-black'>
      <Header brand={page.brand ?? 'Serifs & Systems'} links={page.navigation ?? []} />

      <section className='pt-10 pb-4 px-5 md:px-10'>
        <h1 className='text-h2 font-medium text-brand-white mb-8'>Projects</h1>
      </section>

      {projects.length === 0 ? (
        <p className='px-5 py-12 text-meta text-brand-muted md:px-10'>No projects yet.</p>
      ) : (
        <div className='bg-white pt-8 pb-4'>
          <ProjectListGrid
            items={projects.map((p) => ({
              id: p.id,
              slug: p.slug,
              _sys: p._sys,
              data: {
                ...p,
                image: tinaImageUrl(p.image),
                cardImage: tinaImageUrl(p.cardImage),
              },
            }))}
            onItemClick={open}
          />
        </div>
      )}

      <Footer
        brand={page.brand ?? 'Serifs & Systems'}
        links={page.footer?.links ?? []}
        email={page.footer?.email ?? ''}
        instagramHref={page.footer?.instagramHref ?? ''}
      />

      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden='true'
        className='fixed inset-0 z-[99] bg-black/60 transition-opacity duration-300'
        style={{
          opacity: panelOpen ? 1 : 0,
          pointerEvents: panelOpen ? 'auto' : 'none',
        }}
      />

      {/* Close button */}
      <button
        type='button'
        onClick={close}
        aria-label='Close'
        className='fixed right-5 top-5 z-[101] flex size-11 items-center justify-center rounded-full bg-brand-black text-brand-white transition-all duration-200 md:right-10'
        style={{
          opacity: panelOpen ? 1 : 0,
          transform: panelOpen ? 'scale(1)' : 'scale(0.85)',
          pointerEvents: panelOpen ? 'auto' : 'none',
        }}
      >
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} className='size-5'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>

      {/* Detail panel */}
      <div
        ref={panelRef}
        className='fixed inset-x-0 bottom-0 top-[56px] z-[100] overflow-y-auto rounded-t-2xl bg-white'
        style={{
          transform: panelOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: panelOpen ? 'auto' : 'none',
        }}
      >
        {displayProject && (
          <DetailPanel
            project={displayProject}
            allProjects={projects}
            onItemClick={(slug) => {
              open(slug);
              panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onScrollTop={() => panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        )}
      </div>
    </main>
  );
}

const titleComponents: Components<object> = {
  p: (props) => <span className='block'>{props?.children}</span>,
  bold: (props) => <strong className='font-bold'>{props?.children}</strong>,
  italic: (props) => <em className='italic'>{props?.children}</em>,
};

const descComponents: Components<object> = {
  p: (props) => <span className='block'>{props?.children}</span>,
  bold: (props) => <strong className='font-semibold'>{props?.children}</strong>,
  italic: (props) => <em className='italic'>{props?.children}</em>,
};

function blockWrapperClass(width: string | null | undefined, verticalPadding: string) {
  switch (width) {
    case 'full':
      return `w-full ${verticalPadding}`;
    case 'wide':
      return `w-full px-[5vw] md:px-[8vw] ${verticalPadding}`;
    case 'narrow':
    default:
      return `w-full px-[5vw] md:px-[10vw] md:max-w-[75vw] ${verticalPadding}`;
  }
}

function DetailPanel({
  project,
  allProjects,
  onItemClick,
  onScrollTop,
}: {
  project: ProjectNode;
  allProjects: ProjectNode[];
  onItemClick: (slug: string) => void;
  onScrollTop?: () => void;
}) {
  const projectSlug = (p: ProjectNode) => (p.slug ?? p._sys?.filename ?? '').toLowerCase();
  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 3);
  const projectImage = tinaImageUrl(project.image);
  const relatedThumb = (p: ProjectNode) => tinaImageUrl(p.cardImage ?? p.image);

  function formatDate(iso: string): React.ReactNode {
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

  return (
    <>
      {/* Hero */}
      <div className='px-5 pt-8 pb-4 md:px-[8vw] md:pt-16'>
        {(project.date || project.category) && (
          <p className='text-meta text-brand-muted mb-3'>
            {project.date && <span>{formatDate(project.date)}</span>}
            {project.date && project.category && ' · '}
            {project.category && <strong className='font-medium text-brand-black'>{project.category}</strong>}
          </p>
        )}
        <h1 className='text-h1 font-medium leading-none tracking-tight text-brand-black'>
          <TinaMarkdown content={project.title} components={titleComponents} />
        </h1>
        {project.description && (
          <div className='mt-4 text-body text-brand-muted max-w-2xl'>
            <TinaMarkdown content={project.description} components={descComponents} />
          </div>
        )}
      </div>

      <div className='mx-5 border-b border-black/10 md:mx-[8vw]' />

      {/* Hero image */}
      {projectImage && (
        <div className='mt-6 px-5 md:px-[8vw]'>
          <div className='relative aspect-video w-full overflow-hidden bg-brand-offwhite'>
            <Image
              src={projectImage}
              alt={project.imageAlt ?? ''}
              fill
              className='object-cover'
              sizes='100vw'
              priority
            />
          </div>
        </div>
      )}

      {/* Blocks */}
      {project.blocks && project.blocks.length > 0 && (
        <div className='mt-8'>
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
              case 'ProjectBlocksVideo':
                return (
                  <div key={i} className={blockWrapperClass('wide', 'py-6')}>
                    <VideoBlock block={block} />
                  </div>
                );
              case 'ProjectBlocksImage': {
                return (
                  <div key={i} className={blockWrapperClass(block.width, 'py-2 md:py-4')}>
                    <ImageBlock block={block} />
                  </div>
                );
              }
              case 'ProjectBlocksSpace':
                return <SpaceBlock key={i} block={block} />;
              default:
                return null;
            }
          })}
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className='mt-20 px-5 pb-12 pt-10 md:px-[8vw]'>
          <p className='text-meta font-medium uppercase tracking-widest text-brand-muted mb-8'>
            More Projects
          </p>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {related.map((p) => {
              const thumb = relatedThumb(p);
              return (
                <button
                  key={p.id}
                  type='button'
                  onClick={() => onItemClick(projectSlug(p))}
                  className='group text-left'
                >
                  <div className='relative aspect-[4/3] w-full overflow-hidden bg-brand-offwhite mb-3'>
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
                  <h3 className='text-[18px] font-medium leading-tight text-brand-black'>
                    <TinaMarkdown content={p.title} components={titleComponents} />
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Back to top */}
      <div className='flex justify-center px-5 pb-10'>
        <button
          type='button'
          onClick={onScrollTop}
          className='inline-flex items-center gap-2 rounded-lg border border-black/10 px-6 py-3 text-meta font-medium text-brand-black transition-colors hover:bg-brand-black hover:text-brand-white'
        >
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} className='size-4'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
          </svg>
          Back to top
        </button>
      </div>
    </>
  );
}
