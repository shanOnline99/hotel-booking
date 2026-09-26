'use client';

import React, { useState, useEffect } from 'react';

interface HeroSliderProps {
  items: string[];
  tagline?: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ items }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length]);

  const isVideo = (url: string) => {
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov');
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Media Slides with slide + fade-through-black transition */}
      {items.map((mediaUrl, idx) => {
        const isActive = idx === currentIdx;
        const isPast = idx < currentIdx;
        const videoMedia = isVideo(mediaUrl);

        return (
          <div
            key={mediaUrl}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isActive
                ? 'translate-x-0 opacity-100 scale-100 z-10'
                : isPast
                  ? '-translate-x-full opacity-0 scale-95 z-0'
                  : 'translate-x-full opacity-0 scale-95 z-0'
              }`}
          >
            {videoMedia ? (
              <video
                src={mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-[0.70]"
              />
            ) : (
              <img
                src={mediaUrl}
                alt={`Tantor Resort Habarana ${idx + 1}`}
                className="w-full h-full object-cover brightness-[0.70]"
              />
            )}
          </div>
        );
      })}

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1f2d27] via-[#1f2d27]/40 to-black/40 pointer-events-none z-15" />

      {/* Slide Indicators / Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-36 sm:bottom-44 md:bottom-48 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${idx === currentIdx ? 'w-8 bg-[#d9a05b]' : 'w-2 bg-white/40 hover:bg-white'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
