type HeroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  locationLabel: string;
  locationPlaceholder: string;
  submitLabel: string;
};

export default function HeroSection({
  eyebrow,
  title,
  description,
  formTitle,
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  locationLabel,
  locationPlaceholder,
  submitLabel,
}: HeroSectionProps) {
  return (
    <section
      className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-[1120px] grid-cols-1 items-start gap-9 px-0 pt-[84px] pb-[72px] md:grid-cols-[minmax(0,620px)_340px] md:justify-center md:gap-[92px] md:pt-[188px]"
      id="top"
    >
      <div className="max-w-[620px] pt-2">
        {eyebrow ? (
          <p className="mb-[26px] text-[0.73rem] uppercase tracking-[0.08em] text-[#9a9a97]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-[11ch] text-[clamp(3.4rem,24vw, 100px)] leading-[1] font-normal tracking-[-0.065em] md:max-w-[12ch] md:text-[64px]">
          {title}
        </h1>
        <p className="mt-[26px] max-w-[430px] text-sm leading-[1.42] text-[#9a9a97]">
          {description}
        </p>
      </div>
      <aside className="mt-5 w-full rounded-[20px] border border-white/12 bg-transparent p-7 md:max-w-[340px]">
        <p className="mb-5 text-[0.99rem]">{formTitle}</p>
        <form className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-[0.8rem] text-[#9a9a97]">{nameLabel}</span>
            <input
              className="min-h-12 w-full rounded-[14px] border border-transparent bg-[#2b2b2b] px-[18px] text-[0.95rem] text-[#f4f4f1] placeholder:text-[#7f7f7a]"
              type="text"
              placeholder={namePlaceholder}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[0.8rem] text-[#9a9a97]">{emailLabel}</span>
            <input
              className="min-h-12 w-full rounded-[14px] border border-transparent bg-[#2b2b2b] px-[18px] text-[0.95rem] text-[#f4f4f1] placeholder:text-[#7f7f7a]"
              type="email"
              placeholder={emailPlaceholder}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[0.8rem] text-[#9a9a97]">
              {locationLabel}
            </span>
            <div className="relative">
              <select
                className="min-h-12 w-full appearance-none rounded-[14px] border border-transparent bg-[#2b2b2b] px-[18px] pr-12 text-[0.95rem] text-[#f4f4f1]"
                defaultValue=""
              >
                <option value="" disabled>
                  {locationPlaceholder}
                </option>
                <option value="north-america">North America</option>
                <option value="south-america">South America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
              </select>
              <span className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 text-sm text-[#8b8b88]">
                ▾
              </span>
            </div>
          </label>
          <button
            className="mt-2 min-h-12 w-full rounded-[14px] border-0 bg-[#3a3a3a] font-medium text-[#f4f4f1]"
            type="button"
          >
            {submitLabel}
          </button>
        </form>
      </aside>
    </section>
  );
}
