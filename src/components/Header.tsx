/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Sparkles, Orbit } from 'lucide-react';

interface HeaderProps {
  registryCount: number;
}

export default function Header({ registryCount }: HeaderProps) {
  return (
    <header className="border-b border-[#D4AF37]/15 py-6 px-6 md:px-12 bg-[#170a25]/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 border border-[#D4AF37]/40 rounded-full bg-[#11071d] overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <img 
              src="/logo.png" 
              alt="Paws & Psyche Official Logo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-full pointer-events-none"></div>
          </div>
          <div>
            <h1 className="font-serif text-lg tracking-[0.2em] text-[#f5f1ea] font-medium uppercase flex items-center gap-2">
              Paws <span className="text-[#D4AF37]">&</span> Psyche
            </h1>
            <p className="text-[9px] font-mono tracking-[0.25em] text-[#D4AF37]/75 uppercase">
              Canine Neuro-Aesthetics Lab
            </p>
          </div>
        </div>

        {/* Exclusive status badge */}
        <div className="flex items-center gap-6 text-[11px] font-mono text-[#f5f1ea]">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#2e1a47]/80 border border-[#D4AF37]/20 rounded-full">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            <span className="text-stone-300">NEURAL SAFETY RATED:</span>
            <span className="text-[#D4AF37] font-semibold">CLASS-A</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#D4AF37] uppercase tracking-wider">ACTIVE INTAKE:</span>
            <span className="font-semibold text-stone-200">{registryCount} FILED</span>
          </div>
        </div>
      </div>
    </header>
  );
}
