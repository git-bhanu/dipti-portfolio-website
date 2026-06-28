type HeroSectionProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  eyebrow?: string;
  formTitle?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  locationLabel?: string;
  locationPlaceholder?: string;
  submitLabel?: string;
};

export default function HeroSection({
  title,
  description,
  ctaLabel = 'Start a Project',
  ctaHref = '#contact',
}: HeroSectionProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-[80px] md:gap-[64px] md:px-[80px]">
      <div className="flex flex-col items-center gap-6 md:gap-[32px]">
        <h1 className="w-[300px] text-center text-[32px] font-medium leading-tight tracking-[-2.24px] text-brand-white md:w-[980px] md:text-h1">
          {title}
        </h1>
        <p className="text-center text-[18px] tracking-[-0.54px] text-brand-muted md:text-body">
          {description}
        </p>
      </div>
      <a
        href={ctaHref}
        className="flex h-[40px] items-center justify-center rounded-[8px] bg-brand-white px-6 text-[14px] font-medium tracking-[-0.42px] text-brand-black"
      >
        {ctaLabel}
      </a>
    </section>
  );
}
