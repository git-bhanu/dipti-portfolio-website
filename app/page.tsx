import fs from 'fs';
import path from 'path';
import client from '@/tina/__generated__/client';
import ClientPage from './client-page';

function templateToTypename(template: string) {
  return `SitePageBlocks${template.charAt(0).toUpperCase()}${template.slice(1)}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeBlocks(blocks: any[]) {
  return (blocks ?? []).map((b) => ({
    ...b,
    __typename: b.__typename ?? templateToTypename(b._template),
  }));
}

async function getSitePage() {
  try {
    const result = await client.queries.sitePage(
      { relativePath: 'home.json' },
      { fetchOptions: { next: { revalidate: 60 } } }
    );
    return result;
  } catch {
    const filePath = path.join(process.cwd(), 'content/page/home.json');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    raw.blocks = normalizeBlocks(raw.blocks);
    return {
      query: '',
      variables: { relativePath: 'home.json' },
      data: { sitePage: raw },
    };
  }
}

export default async function Page() {
  const result = await getSitePage();

  return (
    <ClientPage
      query={result.query}
      data={result.data}
      variables={result.variables}
    />
  );
}
