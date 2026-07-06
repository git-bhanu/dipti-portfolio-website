'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { tinaField } from 'tinacms/dist/react';

type ServiceItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _raw?: any;
  title: string;
  imageUrl: string;
  description?: string;
};

type ServicesSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block?: any;
  kicker: string;
  title: string;
  description: string;
  items: ServiceItem[];
};

function ServiceCard({ item }: { item: ServiceItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative h-[490px] w-full overflow-hidden bg-brand-muted/20 md:flex-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.imageUrl && (
        <motion.img
          data-tina-field={item._raw ? tinaField(item._raw, 'imageUrl') : undefined}
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ filter: hovered ? 'blur(4px)' : 'blur(0px)', scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      )}

      {/* Black overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: hovered ? 0.55 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />

      {/* Content — top aligned */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-[22px]">
        <div className="flex-1 pr-4">
          <h3
            data-tina-field={item._raw ? tinaField(item._raw, 'title') : undefined}
            className="text-[33px] font-medium leading-none tracking-[-2px] text-brand-white"
          >
            {item.title}
          </h3>

          {/* Description slides down below title */}
          {item.description && (
            <motion.p
              data-tina-field={item._raw ? tinaField(item._raw, 'description') : undefined}
              className="mt-4 text-base leading-relaxed text-brand-white"
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {item.description}
            </motion.p>
          )}
        </div>

        {/* + / — icon */}
        <div className="relative mt-2 flex h-[25px] w-[25px] shrink-0 items-center justify-center text-brand-white">
          <span className="absolute block h-[1.5px] w-[14px] rounded-full bg-current" />
          <motion.span
            className="absolute block h-[14px] w-[1.5px] rounded-full bg-current"
            animate={{ opacity: hovered ? 0 : 1, scaleY: hovered ? 0 : 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection({ _block, title, description, items }: ServicesSectionProps) {
  return (
    <section className="py-[40px]" id="services">
      <div className="w-full px-5 md:px-[8vw]">
        <div className="mb-[32px]">
          <h2
            data-tina-field={_block ? tinaField(_block, 'title') : undefined}
            className="text-h2 font-medium text-brand-white"
          >
            {title}
          </h2>
          <p
            data-tina-field={_block ? tinaField(_block, 'description') : undefined}
            className="mt-2 text-meta text-brand-muted"
          >
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-[30px] md:flex-row">
          {items.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
