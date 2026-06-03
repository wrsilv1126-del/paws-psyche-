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
          <img 
            src="/logo.png" 
            alt="Paws & Psyche Official Logo" 
            className="h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
          />
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
