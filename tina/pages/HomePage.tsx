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
  const workItems = works.items;
  const serviceItems = services.items;
  const processItems = process.items;
  const footerLinks = footer.links;
  const primaryCta = hero.primaryCta;
  const secondaryCta = hero.secondaryCta;

  return (
    <main className="page-shell">
      <div className="container">
        <div className="site-frame">
          <Header brand={page.brand} locationTag={page.locationTag} links={navigation} />
          <HeroSection {...hero} primaryCta={primaryCta} secondaryCta={secondaryCta} />
          <WorksSection {...works} items={workItems} />
          <ServicesSection {...services} items={serviceItems} />
          <ProcessSection {...process} items={processItems} />
          <CtaSection {...cta} />
          <Footer
            brand={page.brand}
            links={footerLinks}
            email={footer.email}
            instagramHref={footer.instagramHref}
          />
        </div>
      </div>
    </main>
  );
}
