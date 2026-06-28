import { tinaField } from 'tinacms/dist/react';

type ServiceItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _raw?: any;
  title: string;
  imageUrl: string;
};

type ServicesSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  kicker: string;
  title: string;
  description: string;
  items: ServiceItem[];
};

export default function ServicesSection({ _block, title, description, items }: ServicesSectionProps) {
  return (
    <section className="py-[40px]" id="services">
      <div className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
        <div className="mb-[32px]">
          <h2
            data-tina-field={_block ? tinaField(_block, 'title') : undefined}
            className="text-h2 font-medium text-brand-white"
          >
            {title}
          </h2>
          <p
            data-tina-field={_block ? tinaField(_block, 'description') : undefined}
            className="mt-2 text-body text-brand-white"
          >
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-[30px] md:flex-row">
          {items.map((item) => (
            <div
              key={item.title}
              className="relative h-[490px] w-full overflow-hidden bg-brand-muted/20 md:flex-1"
            >
              {item.imageUrl && (
                <img
                  data-tina-field={item._raw ? tinaField(item._raw, 'imageUrl') : undefined}
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-[22px]">
                <h3
                  data-tina-field={item._raw ? tinaField(item._raw, 'title') : undefined}
                  className="text-[33px] font-medium leading-none tracking-[-2px] text-brand-white"
                >
                  {item.title}
                </h3>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-brand-white"
                >
                  <path d="M6 6h13M19 6v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 6L6 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
