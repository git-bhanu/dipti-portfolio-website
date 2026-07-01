'use client';

import { ProjectListGrid } from '@/components/projects/project-list-grid';
import type { ProjectCardData } from '@/components/projects/project-list-card';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { tinaImageUrl } from '@/lib/tina-image';
import { useTina } from 'tinacms/dist/react';

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

export default function ProjectsClientPage({ query, data, variables, sitePage }: Props) {
  const { data: tinaData } = useTina({ query, data, variables });

  const projects: ProjectNode[] = (tinaData.projectConnection?.edges ?? [])
    .map((e: { node: ProjectNode } | null) => e?.node)
    .filter((n: ProjectNode | null): n is ProjectNode => n != null)
    .sort((a: ProjectNode, b: ProjectNode) => {
      const aO = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const bO = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return aO - bO;
    });

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
              } as ProjectCardData,
            }))}
          />
        </div>
      )}

      <Footer
        brand={page.brand ?? 'Serifs & Systems'}
        links={page.footer?.links ?? []}
        email={page.footer?.email ?? ''}
        instagramHref={page.footer?.instagramHref ?? ''}
      />
    </main>
  );
}
