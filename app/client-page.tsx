"use client";

import { useTina } from 'tinacms/dist/react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/sections/HeroSection';
import WorksSection from '@/components/sections/WorksSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CtaSection from '@/components/sections/CtaSection';

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

      {page.blocks?.map((block: any, i: number) => {
        switch (block.__typename) {
          case 'SitePageBlocksHero':
            return (
              <HeroSection
                key={i}
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
                title={block.title}
                items={block.items ?? []}
                kicker=""
                ctaLabel=""
                ctaHref=""
              />
            );

          case 'SitePageBlocksServices':
            return (
              <ServicesSection
                key={i}
                title={block.title}
                description={block.description ?? ''}
                kicker=""
                items={(block.items ?? []).map((s: any) => ({
                  title: s.title,
                  description: '',
                  images: [s.imageUrl],
                }))}
              />
            );

          case 'SitePageBlocksProcess':
            return (
              <ProcessSection
                key={i}
                title={block.title}
                items={block.items ?? []}
                kicker=""
                imageUrl=""
              />
            );

          case 'SitePageBlocksCta':
            return (
              <CtaSection
                key={i}
                title={block.title}
                description={block.description ?? ''}
                buttonLabel={block.buttonLabel ?? ''}
                buttonHref={block.buttonHref ?? ''}
                galleryImages={block.galleryImages ?? []}
                featuredImage={block.featuredImage ?? ''}
                kicker=""
                caption=""
              />
            );

          default:
            return null;
        }
      })}

      <Footer
        brand={page.brand}
        links={page.footer?.links ?? []}
        email={page.footer?.email ?? ''}
        instagramHref={page.footer?.instagramHref ?? ''}
      />
    </main>
  );
}
