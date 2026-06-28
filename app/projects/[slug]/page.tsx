import client from '@/tina/__generated__/client';
import { notFound } from 'next/navigation';
import ProjectDetailClientPage from './client-page';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [pageResult, projectsResult] = await Promise.all([
    client.queries.sitePage(
      { relativePath: 'home.json' },
      { fetchOptions: { next: { revalidate: 300 } } },
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client.queries as any).projectConnection(
      {},
      { fetchOptions: { next: { revalidate: 60 } } },
    ),
  ]);

  // Find the project matching the slug
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const edges: any[] = projectsResult.data?.projectConnection?.edges ?? [];
  const project = edges
    .map((e: { node: unknown }) => e?.node)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .find((n: any) => {
      const nodeSlug = (n?.slug ?? n?._sys?.filename ?? '').toLowerCase();
      return nodeSlug === slug.toLowerCase();
    });

  if (!project) notFound();

  return (
    <ProjectDetailClientPage
      query={projectsResult.query}
      data={projectsResult.data}
      variables={projectsResult.variables}
      slug={slug}
      sitePage={pageResult.data.sitePage}
    />
  );
}
