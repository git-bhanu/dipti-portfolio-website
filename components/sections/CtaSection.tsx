type CtaSectionProps = {
  kicker: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  caption: string;
  galleryImages: string[];
  featuredImage: string;
};

export default function CtaSection({
  kicker,
  title,
  description,
  buttonLabel,
  buttonHref,
  caption,
  galleryImages,
  featuredImage,
}: CtaSectionProps) {
  return (
    <section className="pb-[72px]" id="contact">
      <div className="grid max-w-[420px] grid-cols-1 items-start gap-[18px] pt-2 xl:mx-auto xl:max-w-none xl:grid-cols-[120px_120px_minmax(0,360px)] xl:justify-center">
        <div className="grid gap-2.5">
          {galleryImages.map((image, index) => (
            <img
              key={`${image}-${index}`}
              className="aspect-[0.74] w-full object-cover"
              src={image}
              alt={title}
            />
          ))}
        </div>
        <div>
          <img className="aspect-[0.52] w-full object-cover" src={featuredImage} alt={title} />
        </div>
        <div>
          <p className="mb-4 text-[0.74rem] uppercase tracking-[0.06em] text-[#9a9a97]">{kicker}</p>
          <h2 className="m-0 max-w-[10ch] text-[2rem] leading-[0.98] font-normal tracking-[-0.05em] md:text-[2.35rem]">
            {title}
          </h2>
          <p className="mt-2.5 max-w-[300px] text-[0.9rem] leading-[1.45] text-[#9a9a97]">{description}</p>
          <p className="mt-[14px] text-[0.9rem] leading-[1.45] text-[#9a9a97]">{caption}</p>
          <a
            className="mt-[18px] inline-flex min-h-[42px] items-center justify-center rounded-full border border-white/14 px-[18px] text-[0.82rem] uppercase"
            href={buttonHref}
          >
            {buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
