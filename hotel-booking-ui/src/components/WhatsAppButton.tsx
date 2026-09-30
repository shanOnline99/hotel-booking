'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCheck, Sparkles } from 'lucide-react';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'hello! welcome to Tantor Resort concierge support. how may we assist with your stay today?',
      time: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Simulate concierge quick reply
    setTimeout(() => {
      let replyText =
        'Thank you for contacting Tantor Resort! Our reservations team has received your inquiry and will reach back shortly on WhatsApp.';
      if (text.toLowerCase().includes('rate') || text.toLowerCase().includes('price')) {
        replyText =
          'Our room rates start from $320/night. You can check current availability and special packages directly on our website or book via WhatsApp!';
      } else if (text.toLowerCase().includes('avail') || text.toLowerCase().includes('room')) {
        replyText =
          'We currently have Grand Ocean Villas and Palm Garden Suites available for upcoming dates. Let us know your preferred check-in date!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  const quickPrompts = [
    'check room availability',
    'airport transfer options',
    'special honeymoon offers',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="whatsapp-modal mb-4 w-[90vw] sm:w-[380px] bg-white rounded-2xl shadow-xl border border-[#e8e4de] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#1f2d27] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative rounded-xl">
                <img
                  src="/photos/logo/logo.jpg"
                  alt="Tantor Concierge Logo"
                  className="w-10 h-10 object-cover border border-white/20"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#1f2d27] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-serif text-base font-semibold text-white">Tantor Concierge</h4>
                <p className="text-[11px] text-white/70">typically replies within minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-[#faf8f5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#b87352] text-white rounded-br-xs'
                      : 'bg-white text-[#1e293b] border border-[#e8e4de] rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#64748b] mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-white border-t border-[#e8e4de] flex items-center gap-1.5 overflow-x-auto text-xs">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-[#faf8f5] hover:bg-[#f1ede8] text-[#1e293b] px-2.5 py-1 rounded-full border border-[#e8e4de] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#e8e4de] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type your message..."
              className="flex-1 text-sm bg-[#faf8f5] px-3.5 py-2 rounded-lg border border-[#e8e4de] focus:outline-hidden focus:border-[#b87352]"
            />
            <button
              type="submit"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-2 rounded-lg transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct WhatsApp External Link */}
          <div className="bg-[#faf8f5] px-4 py-2 text-center border-t border-[#e8e4de]">
            <a
              href={`https://wa.me/${MOCK_RESORT_INFO.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#64748b] hover:text-[#25D366] underline font-medium inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-[#25D366]" /> open directly in WhatsApp app
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-btn relative group bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
        aria-label="Contact via WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="sr-only">WhatsApp Concierge</span>
      </button>
    </div>
  );
};
