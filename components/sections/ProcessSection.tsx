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
  description?: string;
  imageUrl?: string;
  items: ProcessStep[];
};

export default function ProcessSection({ _block, title, description, imageUrl, items }: ProcessSectionProps) {
  return (
    <section className="py-[60px]" id="process">
      <div className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
        <div className="flex flex-col gap-[48px] md:flex-row md:gap-[80px]">

          {/* Left: heading + steps */}
          <div className="flex flex-col gap-[40px] md:w-[60%]">
            <div>
              <h2
                data-tina-field={_block ? tinaField(_block, 'title') : undefined}
                className="text-h2 font-medium text-brand-white"
              >
                {title}
              </h2>
              {description && (
                <p
                  data-tina-field={_block ? tinaField(_block, 'description') : undefined}
                  className="mt-3 text-meta text-brand-muted"
                >
                  {description}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-[28px]">
              {items.map((item) => (
                <div key={item.title} className="flex flex-row gap-[40px]">
                  <p
                    data-tina-field={item._raw ? tinaField(item._raw, 'title') : undefined}
                    className="w-[180px] shrink-0 text-meta font-bold text-brand-white"
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

          {/* Right: image */}
          {imageUrl && (
            <div
              data-tina-field={_block ? tinaField(_block, 'imageUrl') : undefined}
              className="min-h-[50vh] overflow-hidden md:w-[40%]"
            >
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
