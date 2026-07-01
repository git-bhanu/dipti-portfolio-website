import fs from 'fs';
import path from 'path';
import client from '@/tina/__generated__/client';
import ProjectsClientPage from './client-page';

async function getSitePage() {
  try {
    const r = await client.queries.sitePage(
      { relativePath: 'home.json' },
      { fetchOptions: { next: { revalidate: 300 } } },
    );
    return r.data.sitePage;
  } catch {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/page/home.json'), 'utf-8'));
  }
}

export default async function ProjectsPage() {
  const [projectsResult, sitePage] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client.queries as any).projectConnection(
      {},
      { fetchOptions: { next: { revalidate: 60 } } },
    ),
    getSitePage(),
  ]);

  return (
    <ProjectsClientPage
      query={projectsResult.query}
      data={projectsResult.data}
      variables={projectsResult.variables}
      sitePage={sitePage}
    />
  );
}
