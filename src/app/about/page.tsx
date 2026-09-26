import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import { ArrowRight, Leaf, Shield, HeartHandshake, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="our story"
        title="the spirit of tantor resort"
        subtitle="crafted with reverence for natural beauty, local heritage, and sustainable coastal living."
        bgPhoto="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Prose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              sanctuary origins
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#1e293b]">
              a harmony of jungle foliage and sea breeze
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Founded in 2018 along a hidden coastal inlet, Tantor Resort was envisioned as an antidote to crowded tourism. Every structure was built using reclaimed local timber, organic volcanic stone, and woven bamboo roofs that complement the surrounding rainforest canopy.
            </p>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              We believe in unhurried luxury — where days are measured by sunrise swim sessions, afternoon sea breezes, and evenings spent under starlit tropical skies.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#e8e4de] shadow-md h-80">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
              alt="Tantor Resort grounds"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              resort philosophy
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#1e293b]">
              our core commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e8e4de] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#b87352]/10 text-[#b87352] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">eco-stewardship</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                100% solar power supplements, zero single-use plastics, and active coral reef restoration projects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e8e4de] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#b87352]/10 text-[#b87352] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">community roots</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                over 85% of our resort team hails from neighboring villages, serving authentic local warmth.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e8e4de] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#b87352]/10 text-[#b87352] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">tailored luxury</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                from custom pillows to private beach dinners, every detail of your stay is personalized.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-[#1f2d27] text-white p-8 sm:p-12 rounded-2xl text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal">
            experience the sanctuary firsthand
          </h3>
          <p className="text-xs text-white/70 max-w-md mx-auto">
            book directly with us to enjoy flexible rates, welcome drinks, and complimentary airport transfers.
          </p>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-[#b87352] hover:bg-[#a25f3f] text-white px-6 py-3 rounded-lg text-xs font-medium transition-colors"
          >
            <span>view available rooms</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
