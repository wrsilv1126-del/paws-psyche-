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
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 border border-[#D4AF37]/30 rounded-full bg-[#2e1a47]/50">
            <Orbit className="w-5 h-5 text-[#D4AF37] animate-spin-slow" />
            <div className="absolute inset-0 border border-[#D4AF37]/10 rounded-full scale-110"></div>
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
