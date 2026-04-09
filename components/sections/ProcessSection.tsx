type ProcessStep = {
  title: string;
  description: string;
};

type ProcessSectionProps = {
  kicker: string;
  title: string;
  items: ProcessStep[];
};

export default function ProcessSection({ kicker, title, items }: ProcessSectionProps) {
  return (
    <section className="section" id="process">
      <div className="section-header">
        <div>
          <p className="section-kicker">{kicker}</p>
          <h2 className="section-title">{title}</h2>
        </div>
      </div>
      <div className="process-grid">
        {items.map((item, index) => (
          <article key={item.title} className="section-card">
            <span className="process-index">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="process-title">{item.title}</h3>
            <p className="process-copy">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
