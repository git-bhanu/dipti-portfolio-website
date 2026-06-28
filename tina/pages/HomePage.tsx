import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import CtaSection from '@/components/sections/CtaSection';
import HeroSection from '@/components/sections/HeroSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WorksSection from '@/components/sections/WorksSection';
import homeContent from '@/content/page/home.json';

type HomePageContent = typeof homeContent;

type HomePageProps = {
  page: HomePageContent;
};

export default function HomePage({ page }: HomePageProps) {
  const hero = page.hero;
  const works = page.works;
  const services = page.services;
  const process = page.process;
  const cta = page.cta;
  const footer = page.footer;
  const navigation = page.navigation;

  return (
    <main className="min-h-screen bg-black">
      <Header brand={page.brand} links={navigation} />
      <HeroSection
        {...hero}
        ctaLabel="Start a Project"
        ctaHref={cta.buttonHref}
      />
      <WorksSection {...works} items={works.items} />
      <ServicesSection {...services} items={services.items} />
      <ProcessSection {...process} items={process.items} />
      <CtaSection {...cta} />
      <Footer
        brand={page.brand}
        links={footer.links}
        email={footer.email}
        instagramHref={footer.instagramHref}
      />
    </main>
  );
}
