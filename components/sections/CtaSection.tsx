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
  personName?: string;
  personRole?: string;
  personPhoto?: string;
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
  personName,
  personRole,
  personPhoto,
}: Pick<CtaSectionProps, '_block' | 'title' | 'description' | 'buttonLabel' | 'buttonHref' | 'personName' | 'personRole' | 'personPhoto'>) {
  const paragraphs = description.split('\n').map((line) => line.trim()).filter(Boolean);

  return (
    <div className="flex flex-col items-start">
      <h2
        data-tina-field={_block ? tinaField(_block, 'title') : undefined}
        className="text-h3 font-medium leading-tight text-brand-white md:max-w-[520px] md:text-h2"
      >
        {title}
      </h2>

      <div data-tina-field={_block ? tinaField(_block, 'description') : undefined} className="mt-[20px] flex flex-col gap-[12px]">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-[20px] font-normal leading-[100%] tracking-[-0.6px] text-brand-muted">
            {paragraph}
          </p>
        ))}
      </div>

      {(personName || personPhoto) && (
        <div className="mt-[32px] flex items-center gap-[12px]">
          {personPhoto && (
            <img
              data-tina-field={_block ? tinaField(_block, 'personPhoto') : undefined}
              src={personPhoto}
              alt={personName ?? ''}
              className="h-[64px] w-[64px] shrink-0 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            {personName && (
              <span data-tina-field={_block ? tinaField(_block, 'personName') : undefined} className="text-[13px] font-medium uppercase tracking-[-0.26px] text-brand-muted">
                {personName}
              </span>
            )}
            {personRole && (
              <span data-tina-field={_block ? tinaField(_block, 'personRole') : undefined} className="text-[13px] text-brand-muted">
                {personRole}
              </span>
            )}
          </div>
        </div>
      )}

      <a
        href={buttonHref}
        data-tina-field={_block ? tinaField(_block, 'buttonLabel') : undefined}
        className="mt-[32px] text-[14px] font-medium tracking-[-0.42px] text-brand-white underline underline-offset-4"
      >
        {buttonLabel}
      </a>
    </div>
  );
}

export default function CtaSection({
  _block,
  title,
  description,
  buttonLabel,
  buttonHref,
  personName,
  personRole,
  personPhoto,
  galleryImages,
  featuredImage,
}: CtaSectionProps) {
  return (
    <section className="py-[64px]" id="contact">
      <div className="w-full px-5 md:px-[8vw]">
        {/* Mobile: text → photo */}
        <div className="flex flex-col gap-[32px] md:hidden">
          <CtaContent
            _block={_block}
            title={title}
            description={description}
            buttonLabel={buttonLabel}
            buttonHref={buttonHref}
            personName={personName}
            personRole={personRole}
            personPhoto={personPhoto}
          />
          <PhotoMosaic galleryImages={galleryImages} featuredImage={featuredImage} className="h-[360px] w-full" />
        </div>

        {/* Desktop: photo → text */}
        <div className="hidden items-center justify-center gap-[48px] md:flex">
          <PhotoMosaic galleryImages={galleryImages} featuredImage={featuredImage} className="aspect-[440/446] w-[560px] shrink-0" />
          <CtaContent
            _block={_block}
            title={title}
            description={description}
            buttonLabel={buttonLabel}
            buttonHref={buttonHref}
            personName={personName}
            personRole={personRole}
            personPhoto={personPhoto}
          />
        </div>
      </div>
    </section>
  );
}
