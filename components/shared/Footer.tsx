type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  brand: string;
  links: FooterLink[];
  email: string;
  instagramHref: string;
};

export default function Footer({ brand, links, email, instagramHref }: FooterProps) {
  return (
    <footer className="pt-[60px]">
      <div className="flex flex-col items-start justify-between gap-5 pb-1 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-[0.74rem] uppercase tracking-[0.06em] text-[#9a9a97]">Get in touch</p>
          <div className="text-[0.88rem] font-medium uppercase tracking-[0.01em]">{brand}</div>
          <p className="mt-2.5 max-w-[320px] text-[0.9rem] leading-[1.45] text-[#9a9a97]">
            Designing websites that bring clarity and drive action.
          </p>
        </div>
        <div>
          <nav
            className="flex flex-col items-start gap-3 text-[0.88rem] uppercase tracking-[0.01em] md:flex-row md:items-center md:gap-[18px]"
            aria-label="Footer navigation"
          >
            {links.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-[18px] flex flex-col items-start gap-3 text-[0.88rem] uppercase tracking-[0.01em] text-[#9a9a97] md:flex-row md:items-center md:gap-[18px]">
            <a href={`mailto:${email}`}>{email}</a>
            <a href={instagramHref} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
