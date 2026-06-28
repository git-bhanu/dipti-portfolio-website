'use client';

import Image from 'next/image';
import { useState } from 'react';

type VideoBlockData = {
  posterImage?: string | null;
  youtubeUrl?: string | null;
  duration?: string | null;
};

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  return match?.[1] ?? null;
}

export function VideoBlock({ block }: { block: VideoBlockData }) {
  const [playing, setPlaying] = useState(false);

  const hasYouTube = Boolean(block.youtubeUrl);
  const hasPoster = Boolean(block.posterImage);

  if (!hasPoster && !hasYouTube) return null;

  const videoId = block.youtubeUrl ? extractYouTubeId(block.youtubeUrl) : null;

  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-brand-offwhite'>
      {playing && videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          allow='autoplay; fullscreen'
          allowFullScreen
          className='absolute inset-0 h-full w-full border-0'
        />
      ) : (
        <>
          {block.posterImage && (
            <Image
              src={block.posterImage}
              alt=''
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, calc(100vw - 120px)'
            />
          )}
          {videoId && (
            <button
              type='button'
              onClick={() => setPlaying(true)}
              className='absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30'
              aria-label='Play video'
            >
              <span className='flex size-16 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-lg'>
                <svg viewBox='0 0 24 24' fill='currentColor' className='size-7 translate-x-0.5'>
                  <path d='M8 5v14l11-7z' />
                </svg>
              </span>
              {block.duration && (
                <span className='absolute bottom-4 right-4 rounded bg-black/60 px-2 py-1 text-[12px] text-white'>
                  {block.duration}
                </span>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}
