'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';

type GalleryItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _raw?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: any;
  slug: string;
  image: string;
  imageAlt: string;
  tag?: string;
};

type WorkGallerySectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  title: string;
  items: GalleryItem[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') return content.replace(/\n$/, '');
  if (Array.isArray(content)) return content.map(extractText).join('');
  if (content.text) return content.text;
  if (content.children) return extractText(content.children);
  return '';
}

export default function WorkGallerySection({ _block, title, items }: WorkGallerySectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!track) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
        setActive(Math.round(progress * (items.length - 1)));
      });
    }

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (card instanceof HTMLElement) {
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  }

  return (
    <section className="py-[40px]" id="work-gallery">
      <div className="w-full px-5 md:px-[8vw]">
        <h2
          data-tina-field={_block ? tinaField(_block, 'title') : undefined}
          className="mb-[32px] text-h3 font-medium text-brand-white"
        >
          {title}
        </h2>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-[16px] overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <Link
              key={i}
              href={`/projects/${item.slug}`}
              className="group block w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-32px)/3)]"
            >
              <div className="aspect-square overflow-hidden bg-white/10">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  src={item.image}
                  alt={item.imageAlt}
                />
              </div>
              <p className="mt-3 text-[14px] font-medium uppercase tracking-[-0.42px] text-brand-white">
                {extractText(item.title)}
              </p>
              {item.tag && (
                <p
                  data-tina-field={item._raw ? tinaField(item._raw, 'tag') : undefined}
                  className="mt-1 text-[12px] text-brand-muted"
                >
                  {item.tag}
                </p>
              )}
            </Link>
          ))}
        </div>

        {items.length > 1 && (
          <div className="mt-[24px] flex items-center justify-start gap-[8px]">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-[6px] w-[6px] rounded-full transition-colors ${
                  i === active ? 'bg-brand-white' : 'bg-brand-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
