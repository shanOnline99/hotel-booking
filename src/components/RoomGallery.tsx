'use client';

import React, { useState } from 'react';
import { Maximize, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface RoomGalleryProps {
  photos: string[];
  roomName: string;
}

export const RoomGallery: React.FC<RoomGalleryProps> = ({ photos, roomName }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const prevPhoto = () => {
    setActiveIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setActiveIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="relative h-[360px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-[#e8e4de] bg-[#1f2d27] group">
        <img
          src={photos[activeIdx]}
          alt={`${roomName} photo ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Expand Modal Trigger */}
        <button
          onClick={() => setModalOpen(true)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#1e293b] p-3 rounded-xl border border-[#e8e4de] text-xs font-medium flex items-center gap-2 hover:bg-white transition-all shadow-md"
        >
          <Maximize className="w-4 h-4" />
          <span className="hidden sm:inline">view full gallery ({photos.length})</span>
        </button>

        {/* Carousel Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1e293b] p-2.5 rounded-full border border-[#e8e4de] transition-all opacity-0 group-hover:opacity-100 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1e293b] p-2.5 rounded-full border border-[#e8e4de] transition-all opacity-0 group-hover:opacity-100 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {photos.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setActiveIdx(index)}
              className={`relative h-20 w-32 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                index === activeIdx
                  ? 'border-[#b87352] ring-2 ring-[#b87352]/20'
                  : 'border-[#e8e4de] opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={photo}
                alt={`${roomName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-lg font-normal text-white">{roomName}</h3>
              <p className="text-xs text-white/60">
                photo {activeIdx + 1} of {photos.length}
              </p>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Image */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            <img
              src={photos[activeIdx]}
              alt={`${roomName} full view ${activeIdx + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto pt-2">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setActiveIdx(index)}
                className={`h-12 w-20 rounded-md overflow-hidden border ${
                  index === activeIdx ? 'border-[#d9a05b] opacity-100' : 'border-transparent opacity-50'
                }`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
