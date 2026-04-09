type NavLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  brand: string;
  locationTag: string;
  links: NavLink[];
};

export default function Header({ brand, locationTag, links }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="brand-wrap">
        <a href="#top" className="brand">
          {brand}
        </a>
        <span className="location-tag">{locationTag}</span>
      </div>
      <nav className="nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={`${link.label}-${link.href}`} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
