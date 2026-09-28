import React from 'react';

interface ContentHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  bgPhoto?: string;
}

export const ContentHero: React.FC<ContentHeroProps> = ({
  badge,
  title,
  subtitle,
  bgPhoto = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80',
}) => {
  return (
    <section className="relative bg-[#1f2d27] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={bgPhoto}
          alt={title}
          className="w-full h-full object-cover opacity-25 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f2d27] via-[#1f2d27]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#d9a05b] font-semibold">
          {badge}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
