import { tinaField } from 'tinacms/dist/react';

type WorkItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _raw?: any;
  title: string;
  description: string;
  href?: string | null;
  imageUrl: string;
};

type WorksSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  kicker: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  items: WorkItem[];
};

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <>
      <div className="h-[513px] overflow-hidden bg-brand-muted/20 md:h-[580px]">
        <img
          data-tina-field={item._raw ? tinaField(item._raw, 'imageUrl') : undefined}
          className="h-full w-full object-cover"
          src={item.imageUrl}
          alt={item.title}
        />
      </div>
      <h3
        data-tina-field={item._raw ? tinaField(item._raw, 'title') : undefined}
        className="mt-2 text-[22px] font-medium leading-none tracking-[-2px] text-brand-white md:text-h3"
      >
        {item.title}
      </h3>
      <p
        data-tina-field={item._raw ? tinaField(item._raw, 'description') : undefined}
        className="mt-1 text-meta text-brand-muted"
      >
        {item.description}
      </p>
    </>
  );
}

export default function WorksSection({ _block, title, items }: WorksSectionProps) {
  return (
    <section className="px-[10px] py-[40px] md:px-[80px]" id="works">
      <div className="mx-auto max-w-[1140px]">
        <h2
          data-tina-field={_block ? tinaField(_block, 'title') : undefined}
          className="mb-[32px] text-h2 font-medium text-brand-white"
        >
          {title}
        </h2>
        <div className="flex flex-col gap-[40px] md:flex-row md:flex-wrap">
          {items.map((item) =>
            item.href ? (
              <a key={item.title} href={item.href} className="flex flex-col md:w-[calc(50%-20px)]">
                <WorkCard item={item} />
              </a>
            ) : (
              <div key={item.title} className="flex flex-col md:w-[calc(50%-20px)]">
                <WorkCard item={item} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
