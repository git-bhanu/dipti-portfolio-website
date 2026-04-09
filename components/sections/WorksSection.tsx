type WorkItem = {
  title: string;
  description: string;
  href?: string | null;
};

type WorksSectionProps = {
  kicker: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  items: WorkItem[];
};

export default function WorksSection({ kicker, title, ctaLabel, ctaHref, items }: WorksSectionProps) {
  return (
    <section className="section" id="works">
      <div className="section-header">
        <div>
          <p className="section-kicker">{kicker}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        <a className="section-link" href={ctaHref}>
          {ctaLabel}
        </a>
      </div>
      <div className="works-grid">
        {items.map((item) => {
          const content = (
            <>
              <h3 className="work-title">{item.title}</h3>
              <p className="work-copy">{item.description}</p>
            </>
          );

          return item.href ? (
            <a key={item.title} className="work-card" href={item.href}>
              {content}
            </a>
          ) : (
            <div key={item.title} className="work-card">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
