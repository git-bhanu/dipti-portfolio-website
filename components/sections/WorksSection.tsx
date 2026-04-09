type WorkItem = {
  title: string;
  description: string;
  href?: string | null;
  imageUrl: string;
  eyebrow?: string;
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
    <section className="pb-[72px]" id="works">
      <div className="mb-[18px] flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="mb-4 text-[0.74rem] uppercase tracking-[0.06em] text-[#9a9a97]">{kicker}</p>
          <h2 className="m-0 text-[2.45rem] leading-none font-normal tracking-[-0.05em]">{title}</h2>
        </div>
        <a className="text-[0.82rem] uppercase text-[#f4f4f1]" href={ctaHref}>
          {ctaLabel}
        </a>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item) => {
          const content = (
            <>
              <div className="aspect-[0.82] overflow-hidden bg-[#181818]">
                <img className="h-full w-full object-cover" src={item.imageUrl} alt={item.title} />
              </div>
              {item.eyebrow ? (
                <p className="mt-2.5 mb-1.5 text-[0.72rem] uppercase text-[#9a9a97]">{item.eyebrow}</p>
              ) : null}
              <h3 className="m-0 text-[1.15rem] tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-[3px] text-[0.9rem] leading-[1.45] text-[#9a9a97]">{item.description}</p>
            </>
          );

          return item.href ? (
            <a key={item.title} className="block" href={item.href}>
              {content}
            </a>
          ) : (
            <div key={item.title} className="block">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
