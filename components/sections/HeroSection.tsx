import { tinaField } from "tinacms/dist/react";

type HeroSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function HeroSection({
  _block,
  title,
  description,
  ctaLabel = "Start a Project",
  ctaHref = "#contact",
}: HeroSectionProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-8 py-[80px] md:gap-[64px]">
      <div className="flex flex-col items-center gap-6 md:gap-[32px]">
        <h1
          data-tina-field={_block ? tinaField(_block, "title") : undefined}
          className="max-w-[300px] text-center text-[32px] font-medium leading-tight tracking-[-2.24px] text-brand-white md:max-w-[980px] md:text-[72px]"
        >
          {title}
        </h1>
        <p
          data-tina-field={
            _block ? tinaField(_block, "description") : undefined
          }
          className="text-center text-[18px] tracking-[-0.54px] text-brand-muted font-normal md:text-[20px]"
        >
          {description}
        </p>
      </div>
      <a
        href={ctaHref}
        data-tina-field={_block ? tinaField(_block, "ctaLabel") : undefined}
        className="flex h-[40px] items-center justify-center rounded-[8px] bg-brand-white px-6 text-[14px] font-medium tracking-[-0.42px] text-brand-black"
      >
        {ctaLabel}
      </a>
    </section>
  );
}
