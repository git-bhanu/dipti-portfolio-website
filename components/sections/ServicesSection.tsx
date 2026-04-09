type Service = {
  title: string;
  description: string;
  images: string[];
};

type ServicesSectionProps = {
  kicker: string;
  title: string;
  description: string;
  items: Service[];
};

export default function ServicesSection({ kicker, title, description, items }: ServicesSectionProps) {
  return (
    <section className="pb-[72px]" id="services">
      <div className="mb-[18px] flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="mb-4 text-[0.74rem] uppercase tracking-[0.06em] text-[#9a9a97]">{kicker}</p>
          <h2 className="m-0 text-[2.45rem] leading-none font-normal tracking-[-0.05em]">{title}</h2>
          <p className="mt-2 max-w-[740px] text-[0.9rem] leading-[1.45] text-[#9a9a97]">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="flex min-h-[460px] flex-col border border-white/8 bg-[#1a1a1a] p-3">
            <h3 className="m-0 text-[1.05rem] leading-[1.1] font-normal tracking-[-0.05em]">{item.title}</h3>
            <p className="mt-2.5 mb-4 text-[0.9rem] leading-[1.45] text-[#9a9a97]">{item.description}</p>
            <div className={item.images.length > 1 ? 'mt-auto grid grid-cols-2 gap-2' : 'mt-auto'}>
              {item.images.map((image, index) => (
                <img
                  key={`${item.title}-${index}`}
                  className={item.images.length > 1 ? 'h-[130px] w-full object-cover' : 'h-[300px] w-full object-cover'}
                  src={image}
                  alt={item.title}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
