import { tinaField } from "tinacms/dist/react";

type WorkItem = {
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  subtitle: string;
};

type WorksSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  kicker: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  items: WorkItem[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content.replace(/\n$/, "");
  if (Array.isArray(content)) return content.map(extractText).join("");
  if (content.text) return content.text;
  if (content.children) return extractText(content.children);
  return "";
}

export default function WorksSection({
  _block,
  title,
  subtitle,
  items,
}: WorksSectionProps) {
  return (
    <section className="py-[40px]" id="works">
      <div className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
        <h2
          data-tina-field={_block ? tinaField(_block, "title") : undefined}
          className="text-[48px] font-medium text-brand-white"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 mb-[32px] text-[16px] text-brand-muted">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-[32px]" />}
        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`/projects/${item.slug}`}
              className="group block"
            >
              <div className="aspect-[4/5] overflow-hidden bg-white/10">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  src={item.image}
                  alt={item.imageAlt}
                />
              </div>
              <h3 className="mt-3 text-[22px] font-medium leading-tight tracking-tight text-brand-white md:text-[32px]">
                {extractText(item.title)}
              </h3>
              {item.subtitle && (
                <p className="mt-1 text-[14px] text-brand-muted md:text-[16px]">{item.subtitle}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
