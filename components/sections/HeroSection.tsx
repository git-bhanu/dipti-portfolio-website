type Link = {
  label: string;
  href: string;
};

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: Link;
  secondaryCta: Link;
  asideLines: string[];
};

export default function HeroSection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  asideLines,
}: HeroSectionProps) {
  return (
    <section className="section hero" id="top">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-copy">{description}</p>
        <div className="hero-actions">
          <a className="button" href={primaryCta.href}>
            {primaryCta.label}
          </a>
          <a className="button-secondary" href={secondaryCta.href}>
            {secondaryCta.label}
          </a>
        </div>
      </div>
      <aside className="hero-panel">
        <p className="hero-panel-copy">
          {asideLines.map((line) => (
            <span key={line} className="hero-panel-line">
              {line}
            </span>
          ))}
        </p>
      </aside>
    </section>
  );
}
