import { tinaField } from 'tinacms/dist/react';

type Testimonial = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _raw?: any;
  image: string;
  quote: string;
  name: string;
  role?: string;
};

type TestimonialsSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  title: string;
  items: Testimonial[];
};

export default function TestimonialsSection({ _block, title, items }: TestimonialsSectionProps) {
  return (
    <section className="py-[80px]" id="testimonials">
      <div className="w-full px-5 md:px-[8vw]">
        <h2
          data-tina-field={_block ? tinaField(_block, 'title') : undefined}
          className="mb-[40px] text-h3 font-medium text-brand-white"
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-[32px] md:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-[24px]">
              <div className="aspect-[16/10] overflow-hidden bg-white/10">
                <img
                  data-tina-field={item._raw ? tinaField(item._raw, 'image') : undefined}
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <p
                data-tina-field={item._raw ? tinaField(item._raw, 'quote') : undefined}
                className="text-meta text-brand-muted"
              >
                {item.quote}
              </p>
              <div>
                <p
                  data-tina-field={item._raw ? tinaField(item._raw, 'name') : undefined}
                  className="text-[14px] font-medium uppercase tracking-[-0.42px] text-brand-white"
                >
                  {item.name}
                </p>
                {item.role && (
                  <p
                    data-tina-field={item._raw ? tinaField(item._raw, 'role') : undefined}
                    className="text-[14px] text-brand-muted"
                  >
                    {item.role}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
