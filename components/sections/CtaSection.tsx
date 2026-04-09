type CtaSectionProps = {
  kicker: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  caption: string;
  formTitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  locationPlaceholder: string;
  submitLabel: string;
};

export default function CtaSection({
  kicker,
  title,
  description,
  buttonLabel,
  buttonHref,
  caption,
  formTitle,
  namePlaceholder,
  emailPlaceholder,
  locationPlaceholder,
  submitLabel,
}: CtaSectionProps) {
  return (
    <section className="section" id="contact">
      <div className="cta-panel">
        <div>
          <p className="section-kicker">{kicker}</p>
          <h2 className="cta-title">{title}</h2>
          <p className="cta-copy">{description}</p>
          <p className="cta-caption">{caption}</p>
          <a className="button cta-button" href={buttonHref}>
            {buttonLabel}
          </a>
        </div>
        <div className="cta-form-card">
          <p className="cta-form-title">{formTitle}</p>
          <form className="cta-form">
            <input className="cta-input" type="text" placeholder={namePlaceholder} />
            <input className="cta-input" type="email" placeholder={emailPlaceholder} />
            <input className="cta-input" type="text" placeholder={locationPlaceholder} />
            <a className="button cta-submit" href={buttonHref}>
              {submitLabel}
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}
