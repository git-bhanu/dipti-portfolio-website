import client from '@/tina/__generated__/client';
import ProjectsClientPage from './client-page';

export default async function ProjectsPage() {
  const [projectsResult, pageResult] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client.queries as any).projectConnection(
      {},
      { fetchOptions: { next: { revalidate: 60 } } },
    ),
    client.queries.sitePage(
      { relativePath: 'home.json' },
      { fetchOptions: { next: { revalidate: 300 } } },
    ),
  ]);

  return (
    <ProjectsClientPage
      query={projectsResult.query}
      data={projectsResult.data}
      variables={projectsResult.variables}
      sitePage={pageResult.data.sitePage}
    />
  );
}
