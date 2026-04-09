type Service = {
  title: string;
  description: string;
};

type ServicesSectionProps = {
  kicker: string;
  title: string;
  description: string;
  items: Service[];
};

export default function ServicesSection({ kicker, title, description, items }: ServicesSectionProps) {
  return (
    <section className="section" id="services">
      <div className="section-header">
        <div>
          <p className="section-kicker">{kicker}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-intro">{description}</p>
        </div>
      </div>
      <div className="services-grid">
        {items.map((item) => (
          <article key={item.title} className="section-card">
            <h3 className="service-title">{item.title}</h3>
            <p className="service-copy">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
