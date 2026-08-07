import client from '@/tina/__generated__/client';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import PageTransition from '@/components/shared/PageTransition';
import ContactForm from '@/components/sections/ContactForm';

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
          <div className="w-full px-5 md:px-[8vw]">
            <div className="flex flex-col gap-[48px] md:flex-row md:items-start md:justify-between md:gap-[64px]">
              <div className="flex flex-col gap-[16px] md:w-[420px] md:shrink-0 md:pt-[24px]">
                <h1 className="text-h2 font-medium text-brand-white md:text-h1">Start a Project</h1>
                <p className="text-meta text-brand-muted md:text-[20px] md:tracking-[-0.6px]">
                  Let&apos;s create a brand that&apos;s clear, distinctive, and built to last.
                </p>
              </div>
              <div className="flex md:flex-1 md:justify-end">
                <ContactForm toEmail={page.footer?.email ?? ''} />
              </div>
            </div>
          </div>
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
