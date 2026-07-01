import { tinaField } from 'tinacms/dist/react';

type CtaSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
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
  const [img1, img2, img3] = galleryImages;

  return (
    <div className={`flex shrink-0 gap-[6px] ${className ?? ''}`}>
      {/* Left col: tall top, short bottom */}
      <div className="flex flex-1 flex-col gap-[6px]">
        <div className="flex-[3] overflow-hidden bg-brand-muted/20">
          {img1 && <img src={img1} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="flex-[2] overflow-hidden bg-brand-muted/20">
          {img3 && <img src={img3} alt="" className="h-full w-full object-cover" />}
        </div>
      </div>
      {/* Right col: short top, tall bottom */}
      <div className="flex flex-1 flex-col gap-[6px]">
        <div className="flex-[2] overflow-hidden bg-brand-muted/20">
          {img2 && <img src={img2} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="flex-[3] overflow-hidden bg-brand-muted/20">
          {featuredImage && <img src={featuredImage} alt="" className="h-full w-full object-cover" />}
        </div>
      </div>
    </div>
  );
}

function CtaContent({
  _block,
  title,
  description,
  buttonLabel,
  buttonHref,
}: Pick<CtaSectionProps, '_block' | 'title' | 'description' | 'buttonLabel' | 'buttonHref'>) {
  return (
    <div className="flex flex-col items-start">
      <h2
        data-tina-field={_block ? tinaField(_block, 'title') : undefined}
        className="text-h2 font-medium leading-tight text-brand-white"
      >
        {title}
      </h2>
      <p
        data-tina-field={_block ? tinaField(_block, 'description') : undefined}
        className="mt-[10px] mb-[32px] text-meta text-brand-muted"
      >
        {description}
      </p>
      <a
        href={buttonHref}
        data-tina-field={_block ? tinaField(_block, 'buttonLabel') : undefined}
        className="flex h-[40px] items-center justify-center rounded-[8px] bg-brand-white px-6 text-[14px] font-medium tracking-[-0.42px] text-brand-black"
      >
        {buttonLabel}
      </a>
    </div>
  );
}

export default function CtaSection({ _block, title, description, buttonLabel, buttonHref, galleryImages, featuredImage }: CtaSectionProps) {
  return (
    <section className="py-[64px]" id="contact">
      <div className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
        {/* Mobile: text → photo */}
        <div className="flex flex-col gap-[32px] md:hidden">
          <CtaContent _block={_block} title={title} description={description} buttonLabel={buttonLabel} buttonHref={buttonHref} />
          <PhotoMosaic galleryImages={galleryImages} featuredImage={featuredImage} className="h-[360px] w-full" />
        </div>

        {/* Desktop: photo → text */}
        <div className="hidden items-center gap-[48px] md:flex">
          <PhotoMosaic galleryImages={galleryImages} featuredImage={featuredImage} className="min-h-[480px] w-[55%] shrink-0" />
          <CtaContent _block={_block} title={title} description={description} buttonLabel={buttonLabel} buttonHref={buttonHref} />
        </div>
      </div>
    </section>
  );
}
