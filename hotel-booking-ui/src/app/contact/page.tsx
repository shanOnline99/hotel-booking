'use client';

import React, { useState } from 'react';
import { ContentHero } from '@/components/ContentHero';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="concierge support"
        title="get in touch with tantor"
        subtitle="our team is available 24/7 to assist with room inquiries, special requests, or travel advice."
        bgPhoto="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
                direct contact
              </span>
              <h2 className="font-serif text-3xl font-normal text-[#1e293b]">
                we are here to help
              </h2>
            </div>

            <div className="space-y-4 text-xs text-[#1e293b]">
              <div className="bg-white p-5 rounded-xl border border-[#e8e4de] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <MapPin className="w-4 h-4 text-[#b87352]" />
                  <span>resort location</span>
                </div>
                <p className="text-[#64748b] leading-relaxed">{MOCK_RESORT_INFO.address}</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e8e4de] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Phone className="w-4 h-4 text-[#b87352]" />
                  <span>reservations phone</span>
                </div>
                <p className="text-[#64748b]">{MOCK_RESORT_INFO.phone}</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e8e4de] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Mail className="w-4 h-4 text-[#b87352]" />
                  <span>email concierge</span>
                </div>
                <p className="text-[#64748b]">{MOCK_RESORT_INFO.email}</p>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="bg-[#1f2d27] text-white p-6 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>WhatsApp Concierge</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  need instantaneous answers regarding stay dates or special arrangements? chat directly on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${MOCK_RESORT_INFO.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-lg text-xs font-medium transition-colors shadow-xs"
                >
                  <span>open WhatsApp chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e4de] shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#1e293b]">
                  message sent successfully!
                </h3>
                <p className="text-xs text-[#64748b] max-w-sm mx-auto leading-relaxed">
                  thank you for contacting Tantor Resort. Our reservations team will respond to <strong>{email}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#b87352] text-white text-xs px-4 py-2 rounded-lg font-medium"
                >
                  send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-normal text-[#1e293b] border-b border-[#e8e4de] pb-3">
                  send us a message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                      your name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Julian Vance"
                      className="w-full p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de] text-xs text-[#1e293b] focus:outline-hidden focus:border-[#b87352]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                      email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. julian@example.com"
                      className="w-full p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de] text-xs text-[#1e293b] focus:outline-hidden focus:border-[#b87352]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de] text-xs text-[#1e293b] focus:outline-hidden focus:border-[#b87352]"
                  >
                    <option value="general inquiry">general inquiry</option>
                    <option value="room reservation">room reservation inquiry</option>
                    <option value="wedding & events">weddings & private events</option>
                    <option value="airport transfer">airport transfer request</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="how can we assist with your stay?"
                    className="w-full p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de] text-xs text-[#1e293b] focus:outline-hidden focus:border-[#b87352]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#b87352] hover:bg-[#a25f3f] text-white py-3.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>send inquiry message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
