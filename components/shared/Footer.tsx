type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  brand?: string;
  links: FooterLink[];
  email: string;
  instagramHref: string;
};

export default function Footer({ email, instagramHref }: FooterProps) {
  return (
    <footer className="border-t border-brand-muted/40 px-4 py-[40px] md:px-[80px]">
      <div>
        <h2 className="text-h2 font-medium text-brand-white">Get in touch</h2>

        {/* Mobile: links row then copyright below */}
        <div className="mt-6 flex flex-col gap-6 md:hidden">
          <div className="flex gap-[40px]">
            <a href={`mailto:${email}`} className="p-2 text-nav font-normal uppercase text-brand-white">
              Email
            </a>
            <a href={instagramHref} target="_blank" rel="noreferrer" className="p-2 text-nav font-normal uppercase text-brand-white">
              Instagram
            </a>
          </div>
          <span className="p-2 text-nav font-normal uppercase text-brand-white">©2026</span>
        </div>

        {/* Desktop: links left, copyright right */}
        <div className="mt-2 hidden items-start justify-between md:flex">
          <div className="flex gap-[40px]">
            <a href={`mailto:${email}`} className="p-2 text-nav font-normal uppercase text-brand-white">
              Email
            </a>
            <a href={instagramHref} target="_blank" rel="noreferrer" className="p-2 text-nav font-normal uppercase text-brand-white">
              Instagram
            </a>
          </div>
          <span className="p-2 text-nav font-normal uppercase text-brand-white">©2026</span>
        </div>
      </div>
    </footer>
  );
}
