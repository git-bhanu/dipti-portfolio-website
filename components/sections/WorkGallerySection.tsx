'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { tinaField } from 'tinacms/dist/react';

type GalleryItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _raw?: any;
  mediaType: 'image' | 'video';
  media: string;
  mobileMedia: string;
  title: string;
};

type WorkGallerySectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  title: string;
  subtitle?: string;
  items: GalleryItem[];
};

const AUTO_ADVANCE_MS = 2600;

export default function WorkGallerySection({ _block, title, subtitle, items }: WorkGallerySectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // active-dot tracking on scroll
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

  // auto-advance to next card, pauses on interaction / lightbox open
  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length < 2) return;

    const id = setInterval(() => {
      if (!track || pausedRef.current) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      let nearest = 0;
      let nearestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        if (!(child instanceof HTMLElement)) return;
        const dist = Math.abs(child.offsetLeft - track.scrollLeft);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
      });

      const nextIndex = nearest + 1 >= items.length ? 0 : nearest + 1;
      const nextCard = track.children[nextIndex];
      if (nextCard instanceof HTMLElement) {
        track.scrollTo({
          left: nextIndex === 0 ? 0 : nextCard.offsetLeft,
          behavior: 'smooth',
        });
      }
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(id);
  }, [items.length]);

  useEffect(() => {
    pausedRef.current = openIndex !== null;
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null);
    }
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  function pause() {
    pausedRef.current = true;
  }

  function resume() {
    if (openIndex === null) pausedRef.current = false;
  }

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (card instanceof HTMLElement) {
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  }

  const openItem = openIndex !== null ? items[openIndex] : null;

  return (
    <section className="py-[40px]" id="work-gallery">
      <div className="w-full px-5 md:px-[8vw]">
        <h2
          data-tina-field={_block ? tinaField(_block, 'title') : undefined}
          className="text-h3 font-medium text-brand-white"
        >
          {title}
        </h2>
        {subtitle && (
          <p
            data-tina-field={_block ? tinaField(_block, 'subtitle') : undefined}
            className="mt-2 mb-[32px] text-[16px] text-brand-muted"
          >
            {subtitle}
          </p>
        )}
        {!subtitle && <div className="mb-[32px]" />}

        <div
          ref={trackRef}
          onPointerEnter={pause}
          onPointerLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          className="flex snap-x snap-mandatory gap-[16px] overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Expand ${item.title}`}
              onClick={() => setOpenIndex(i)}
              className="block w-[85%] shrink-0 snap-start text-left sm:w-[60%] lg:w-[calc((100%-32px)/3)]"
            >
              <div
                data-tina-field={item._raw ? tinaField(item._raw, 'media') : undefined}
                className="aspect-[3/4] cursor-pointer overflow-hidden bg-white/10 lg:aspect-[16/10]"
              >
                {item.mediaType === 'video' ? (
                  <video
                    className="h-full w-full object-cover"
                    src={item.media}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <>
                    <img
                      className="block h-full w-full object-cover lg:hidden"
                      src={item.mobileMedia}
                      alt={item.title}
                    />
                    <img
                      className="hidden h-full w-full object-cover lg:block"
                      src={item.media}
                      alt={item.title}
                    />
                  </>
                )}
              </div>
            </button>
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

      {mounted && openItem && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 text-3xl leading-none text-brand-white/80 hover:text-brand-white"
          >
            &times;
          </button>
          {openItem.mediaType === 'video' ? (
            <video
              className="max-h-[90vh] max-w-[90vw] object-contain"
              src={openItem.media}
              autoPlay
              muted
              loop
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <>
              <img
                className="block max-h-[90vh] max-w-[90vw] object-contain lg:hidden"
                src={openItem.mobileMedia}
                alt={openItem.title}
                onClick={(e) => e.stopPropagation()}
              />
              <img
                className="hidden max-h-[90vh] max-w-[90vw] object-contain lg:block"
                src={openItem.media}
                alt={openItem.title}
                onClick={(e) => e.stopPropagation()}
              />
            </>
          )}
        </div>,
        document.body,
      )}
    </section>
  );
}
