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
    <footer className="site-footer">
      <div className="footer-card">
        <div>
          <p className="section-kicker">Get in touch</p>
          <div className="brand">{brand}</div>
          <p className="footer-copy">Designing websites that bring clarity and drive action.</p>
        </div>
        <div>
          <nav className="footer-links" aria-label="Footer navigation">
            {links.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-meta">
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
