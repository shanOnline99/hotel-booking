'use client';

import React, { useState } from 'react';
import { ContentHero } from '@/components/ContentHero';
import { Maximize, X, Sparkles } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'villas' | 'pool' | 'dining' | 'beach';
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    title: 'Grand Ocean Villa terrace',
    category: 'villas',
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    title: 'Cliffside infinity pool at sunset',
    category: 'pool',
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    title: 'Oceanfront bistro & organic breakfast',
    category: 'dining',
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    title: 'Palm Garden Suite bedroom',
    category: 'villas',
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    title: 'Private white beach cove',
    category: 'beach',
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    title: 'Open-air botanical spa pavilion',
    category: 'beach',
  },
  {
    id: 'g7',
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    title: 'Sunset lounge cocktails',
    category: 'dining',
  },
  {
    id: 'g8',
    url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    title: 'Forest canopy villa hammock',
    category: 'villas',
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const filtered =
    activeCategory === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12 pb-20">
      <ContentHero
        badge="visual tour"
        title="resort photo gallery"
        subtitle="take a visual journey through our ocean villas, private beach cove, and dining pavilions."
        bgPhoto="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
          {['all', 'villas', 'pool', 'dining', 'beach'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg capitalize font-medium transition-colors shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#1f2d27] text-white shadow-xs'
                  : 'bg-white text-[#1e293b] border border-[#e8e4de] hover:bg-[#faf8f5]'
              }`}
            >
              {cat === 'all' ? 'all photos' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-64 rounded-xl overflow-hidden border border-[#e8e4de] bg-[#1f2d27] cursor-pointer shadow-2xs hover:shadow-md transition-all"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                <span className="font-serif text-sm font-medium">{photo.title}</span>
                <span className="text-[10px] text-white/70 capitalize">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-[#e8e4de] shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-[70vh] w-full bg-[#1f2d27]">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 bg-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-semibold text-[#1e293b]">
                  {selectedPhoto.title}
                </h3>
                <span className="text-xs text-[#64748b] capitalize">
                  category: {selectedPhoto.category}
                </span>
              </div>
              <span className="text-xs font-serif italic text-[#b87352]">Tantor Resort</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
