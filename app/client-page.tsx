"use client";

import { useTina } from 'tinacms/dist/react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BriefFormSection from '@/components/sections/BriefFormSection';
import WorksSection from '@/components/sections/WorksSection';
import WorkGallerySection from '@/components/sections/WorkGallerySection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';
import { tinaImageUrl } from '@/lib/tina-image';
import PageTransition from '@/components/shared/PageTransition';

type ClientPageProps = {
  query: string;
  variables: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  showHeader?: boolean;
};

export default function ClientPage({ showHeader = true, ...props }: ClientPageProps) {
  const { data } = useTina(props);
  const page = data.sitePage;

  return (
    <main className="min-h-screen bg-brand-black">
      {showHeader && <Header brand={page.brand} links={page.navigation ?? []} />}

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

          case 'SitePageBlocksBriefForm':
            return (
              <BriefFormSection
                key={i}
                _block={block}
                title={block.title}
                description={block.description ?? ''}
                toEmail={page.footer?.email ?? ''}
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
                ctaLabel={block.ctaLabel ?? ''}
                ctaHref={block.ctaHref ?? ''}
              />
            );

          case 'SitePageBlocksWorkGallery':
            return (
              <WorkGallerySection
                key={i}
                _block={block}
                title={block.title}
                subtitle={block.subtitle ?? ''}
                items={(block.items ?? []).map((item: any) => ({
                  _raw: item,
                  mediaType: item.mediaType === 'video' ? 'video' : 'image',
                  media: tinaImageUrl(item.media),
                  title: item.title,
                }))}
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

          case 'SitePageBlocksTestimonials':
            return (
              <TestimonialsSection
                key={i}
                _block={block}
                title={block.title}
                items={(block.items ?? []).map((t: any) => ({
                  _raw: t,
                  image: tinaImageUrl(t.image),
                  quote: t.quote,
                  name: t.name,
                  role: t.role ?? '',
                }))}
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
                personName={block.personName ?? ''}
                personRole={block.personRole ?? ''}
                personPhoto={tinaImageUrl(block.personPhoto)}
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
