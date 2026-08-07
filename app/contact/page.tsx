import client from '@/tina/__generated__/client';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import PageTransition from '@/components/shared/PageTransition';
import ContactSection from '@/components/sections/ContactSection';

export default async function ContactPage() {
  const pageResult = await client.queries.sitePage(
    { relativePath: 'home.json' },
    { fetchOptions: { next: { revalidate: 300 } } }
  );
  const page = pageResult.data.sitePage;

  const navLinks = (page.navigation ?? [])
    .filter((l) => l != null)
    .map(({ label, href }) => ({ label, href }));

  const footerLinks = (page.footer?.links ?? [])
    .filter((l) => l != null)
    .map(({ label, href }) => ({ label, href }));

  return (
    <main className="min-h-screen bg-brand-black">
      <Header brand={page.brand} links={navLinks} />
      <PageTransition>
        <section className="flex min-h-[calc(100vh-80px)] items-center py-[40px] md:py-[64px]">
          <ContactSection
            title="Start a Project"
            description="Let's create a brand that's clear, distinctive, and built to last."
            toEmail={page.footer?.email ?? ''}
          />
        </section>
      </PageTransition>
      <Footer
        brand={page.brand}
        links={footerLinks}
        email={page.footer?.email ?? ''}
        instagramHref={page.footer?.instagramHref ?? ''}
      />
    </main>
  );
}
