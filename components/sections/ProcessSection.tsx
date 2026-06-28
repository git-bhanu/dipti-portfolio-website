import { tinaField } from 'tinacms/dist/react';

type ProcessStep = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _raw?: any;
  title: string;
  description: string;
};

type ProcessSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  kicker: string;
  title: string;
  imageUrl: string;
  items: ProcessStep[];
};

export default function ProcessSection({ _block, title, items }: ProcessSectionProps) {
  return (
    <section className="py-[40px]" id="process">
      <div className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
        <h2
          data-tina-field={_block ? tinaField(_block, 'title') : undefined}
          className="mb-[32px] text-h2 font-medium text-brand-white"
        >
          {title}
        </h2>
        <div className="flex flex-col gap-[32px]">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-1 md:max-w-[600px] md:flex-row md:gap-[4px]">
              <p
                data-tina-field={item._raw ? tinaField(item._raw, 'title') : undefined}
                className="shrink-0 text-[18px] font-semibold leading-[22.4px] tracking-[-1px] text-brand-white md:w-[200px] md:text-meta md:font-bold md:tracking-[-0.64px]"
              >
                {item.title}
              </p>
              <p
                data-tina-field={item._raw ? tinaField(item._raw, 'description') : undefined}
                className="text-meta text-brand-muted"
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
