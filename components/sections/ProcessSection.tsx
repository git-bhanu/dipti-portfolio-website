type ProcessStep = {
  title: string;
  description: string;
};

type ProcessSectionProps = {
  kicker: string;
  title: string;
  imageUrl: string;
  items: ProcessStep[];
};

export default function ProcessSection({ kicker, title, imageUrl, items }: ProcessSectionProps) {
  return (
    <section className="pb-[72px]" id="process">
      <div className="mb-[18px] flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="mb-4 text-[0.74rem] uppercase tracking-[0.06em] text-[#9a9a97]">{kicker}</p>
          <h2 className="m-0 text-[2.45rem] leading-none font-normal tracking-[-0.05em]">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 items-start gap-[60px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid max-w-[720px] gap-5">
          {items.map((item, index) => (
            <article key={item.title} className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4">
              <span className="text-[0.82rem] uppercase text-[#9a9a97]">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="m-0 text-[0.98rem] font-normal tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-1 max-w-[420px] text-[0.9rem] leading-[1.45] text-[#9a9a97]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div>
          <img className="aspect-[0.78] w-full object-cover" src={imageUrl} alt={title} />
        </div>
      </div>
    </section>
  );
}
