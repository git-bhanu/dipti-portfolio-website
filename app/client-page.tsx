"use client";

import { useTina } from 'tinacms/dist/react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/sections/HeroSection';
import WorksSection from '@/components/sections/WorksSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CtaSection from '@/components/sections/CtaSection';
import { tinaImageUrl } from '@/lib/tina-image';
import PageTransition from '@/components/shared/PageTransition';

type ClientPageProps = {
  query: string;
  variables: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina(props);
  const page = data.sitePage;

  return (
    <main className="min-h-screen bg-brand-black">
      <Header brand={page.brand} links={page.navigation ?? []} />

      <PageTransition>
      {page.blocks?.map((block: any, i: number) => {
        switch (block.__typename) {
          case 'SitePageBlocksHero':
            return (
              <HeroSection
                key={i}
                _block={block}
                title={block.title}
                description={block.description}
                ctaLabel={block.ctaLabel}
                ctaHref={block.ctaHref}
              />
            );

          case 'SitePageBlocksWorks':
            return (
              <WorksSection
                key={i}
                _block={block}
                title={block.title}
                subtitle={block.subtitle ?? ''}
                items={(block.items ?? [])
                  .map((item: any) => item?.project)
                  .filter((p: any) => p?.__typename === 'Project')
                  .map((p: any) => ({
                    title: p.title,
                    slug: p._sys?.filename ?? '',
                    image: tinaImageUrl(p.cardImage ?? p.image),
                    imageAlt: p.imageAlt ?? '',
                    subtitle: p.subtitle ?? '',
                  }))}
                kicker=""
                ctaLabel=""
                ctaHref=""
              />
            );

          case 'SitePageBlocksServices':
            return (
              <ServicesSection
                key={i}
                _block={block}
                title={block.title}
                description={block.description ?? ''}
                kicker=""
                items={(block.items ?? []).map((s: any) => ({
                  _raw: s,
                  title: s.title,
                  imageUrl: tinaImageUrl(s.imageUrl),
                  description: s.description,
                }))}
              />
            );

          case 'SitePageBlocksProcess':
            return (
              <ProcessSection
                key={i}
                _block={block}
                title={block.title}
                description={block.description ?? ''}
                imageUrl={tinaImageUrl(block.imageUrl)}
                items={(block.items ?? []).map((item: any) => ({ ...item, _raw: item }))}
                kicker=""
              />
            );

          case 'SitePageBlocksCta':
            return (
              <CtaSection
                key={i}
                _block={block}
                title={block.title}
                description={block.description ?? ''}
                buttonLabel={block.buttonLabel ?? ''}
                buttonHref={block.buttonHref ?? ''}
                galleryImages={(block.galleryImages ?? []).map(tinaImageUrl)}
                featuredImage={tinaImageUrl(block.featuredImage)}
                kicker=""
                caption=""
              />
            );

          default:
            return null;
        }
      })}
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
