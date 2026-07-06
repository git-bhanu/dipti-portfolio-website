import client from '@/tina/__generated__/client';
import { tinaImageUrl } from '@/lib/tina-image';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import PageTransition from '@/components/shared/PageTransition';
import Link from 'next/link';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') return content.replace(/\n$/, '');
  if (Array.isArray(content)) return content.map(extractText).join('');
  if (content.text) return content.text;
  if (content.children) return extractText(content.children);
  return '';
}

export default async function WorksPage() {
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

  const page = pageResult.data.sitePage;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = (projectsResult.data?.projectConnection?.edges ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((e: any) => e?.node)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((n: any) => n != null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .sort((a: any, b: any) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));

  return (
    <main className="min-h-screen bg-brand-black">
      <Header brand={page.brand} links={page.navigation ?? []} />
      <PageTransition>
        <section className="py-[40px]">
          <div className="w-full px-5 md:px-[8vw]">
            <h1 className="text-[48px] font-medium text-brand-white">Works</h1>
            <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-2">
              {projects.map((project: any) => {
                const slug = (project.slug ?? project._sys?.filename ?? '').toLowerCase();
                const image = tinaImageUrl(project.cardImage ?? project.image);
                return (
                  <Link key={slug} href={`/projects/${slug}`} className="group block">
                    <div className="aspect-[4/5] overflow-hidden bg-white/10">
                      {image && (
                        <Image
                          src={image}
                          alt={project.imageAlt ?? ''}
                          width={800}
                          height={1000}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <h2 className="mt-3 text-[22px] font-medium leading-tight tracking-tight text-brand-white md:text-[32px]">
                      {extractText(project.title)}
                    </h2>
                    {project.subtitle && (
                      <p className="mt-1 text-[14px] text-brand-muted md:text-[16px]">
                        {project.subtitle}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </PageTransition>
      <Footer
        brand={page.brand}
        links={page.footer?.links ?? []}
        email={page.footer?.email ?? ''}
        instagramHref={page.footer?.instagramHref ?? ''}
      />
    </main>
  );
}
