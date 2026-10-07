'use client';

import React, { useState } from 'react';
import { ContentHero } from '@/components/ContentHero';
import { X } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  url: string;
  spanClass: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    url: '/photos/gallery/IMG_0054.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
  },
  {
    id: 'g2',
    url: '/photos/gallery/IMG_0053.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'g3',
    url: '/photos/gallery/IMG_0055.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-2',
  },
  {
    id: 'g4',
    url: '/photos/gallery/IMG_0056.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'g5',
    url: '/photos/gallery/IMG_0057.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1',
  },
  {
    id: 'g6',
    url: '/photos/gallery/IMG_0058.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-2',
  },
  {
    id: 'g7',
    url: '/photos/gallery/IMG_0059.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'g8',
    url: '/photos/gallery/IMG_0061.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'g9',
    url: '/photos/gallery/IMG_0063.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'g10',
    url: '/photos/gallery/IMG_0064.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'g11',
    url: '/photos/gallery/IMG_0067.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-2',
  },
  {
    id: 'g12',
    url: '/photos/gallery/IMG_2172.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
  },
  {
    id: 'g13',
    url: '/photos/gallery/IMG_3315.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'g14',
    url: '/photos/gallery/IMG_3709.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'g15',
    url: '/photos/gallery/IMG_3710.JPG.jpeg',
    spanClass: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1',
  },
  {
    id: 'g16',
    url: '/photos/hero/IMG_0046.JPG.jpg',
    spanClass: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1',
  },
];

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <div className="space-y-12 pb-20">
      <ContentHero
        badge="visual tour"
        title="resort photo gallery"
        subtitle="explore our resort through local high-resolution photography showcasing our luxury villas, pools, beach cove, and dining."
        bgPhoto="/photos/gallery/IMG_0054.JPG.jpeg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dynamic Collage Grid with varied sizes and zero gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[260px] gap-4 grid-flow-row-dense">
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative overflow-hidden bg-[#1f2d27] cursor-pointer border border-[#e8e4de] shadow-xs hover:shadow-xl transition-all duration-300 rounded-none ${photo.spanClass}`}
            >
              <img
                src={photo.url}
                alt="Resort Gallery Photo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Sharp Edges, No Hover Text) */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#1f2d27] rounded-none border border-white/20 shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-none transition-colors border border-white/20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-[80vh] w-full bg-[#1f2d27] flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt="Resort Gallery Photo Full View"
                className="w-full h-full object-contain rounded-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
