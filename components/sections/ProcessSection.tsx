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

export default function ProcessSection({ title, items }: ProcessSectionProps) {
  return (
    <section className="px-6 py-[40px] md:px-[80px]" id="process">
      <div className="mx-auto max-w-[1140px]">
        <h2 className="mb-[32px] text-h2 font-medium text-brand-white">{title}</h2>
        <div className="flex flex-col gap-[32px]">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-1 md:max-w-[600px] md:flex-row md:gap-[4px]">
              <p className="shrink-0 text-[18px] font-semibold leading-[22.4px] tracking-[-1px] text-brand-white md:w-[200px] md:text-meta md:font-bold md:tracking-[-0.64px]">
                {item.title}
              </p>
              <p className="text-meta text-brand-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
