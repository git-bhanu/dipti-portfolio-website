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

function PhotoMosaic({ galleryImages, featuredImage, className }: { galleryImages: string[]; featuredImage: string; className?: string }) {
  const [img1, img2] = galleryImages;

  return (
    <div className={`grid shrink-0 grid-cols-2 gap-[6px] ${className ?? ''}`}>
      <div className="row-span-2 overflow-hidden bg-brand-muted/20">
        {img1 && <img src={img1} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="overflow-hidden bg-brand-muted/20">
        {img2 && <img src={img2} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="overflow-hidden bg-brand-muted/20">
        {featuredImage && <img src={featuredImage} alt="" className="h-full w-full object-cover" />}
      </div>
    </div>
  );
}

function CtaContent({ title, description, buttonLabel, buttonHref }: Pick<CtaSectionProps, 'title' | 'description' | 'buttonLabel' | 'buttonHref'>) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-h2 font-medium leading-tight text-brand-white">{title}</h2>
      <p className="mt-[10px] mb-[32px] text-body text-brand-muted">{description}</p>
      <a
        href={buttonHref}
        className="flex h-[40px] items-center justify-center rounded-[8px] bg-brand-white px-6 text-[14px] font-medium tracking-[-0.42px] text-brand-black"
      >
        {buttonLabel}
      </a>
    </div>
  );
}

export default function CtaSection({ title, description, buttonLabel, buttonHref, galleryImages, featuredImage }: CtaSectionProps) {
  return (
    <section className="px-6 py-[64px] md:px-[80px]" id="contact">
      <div className="mx-auto max-w-[1140px]">
        {/* Mobile: text → photo */}
        <div className="flex flex-col gap-[32px] md:hidden">
          <CtaContent title={title} description={description} buttonLabel={buttonLabel} buttonHref={buttonHref} />
          <PhotoMosaic galleryImages={galleryImages} featuredImage={featuredImage} className="h-[344px] w-full" />
        </div>

        {/* Desktop: photo → text */}
        <div className="hidden items-center gap-[32px] md:flex">
          <PhotoMosaic galleryImages={galleryImages} featuredImage={featuredImage} className="h-[447px] w-[440px]" />
          <CtaContent title={title} description={description} buttonLabel={buttonLabel} buttonHref={buttonHref} />
        </div>
      </div>
    </section>
  );
}
