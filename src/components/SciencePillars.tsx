/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, Activity, ShieldAlert } from 'lucide-react';

export default function SciencePillars() {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-[#D4AF37]" />,
      num: "01 / FOUNDATIONAL GAP",
      title: "The Evolutionary Gap",
      copy: "We extract them from the wild and place them inside silent concrete boxes. Our instruments are engineered to bridge the evolutionary gap between their biology and your modern life."
    },
    {
      icon: <Activity className="w-5 h-5 text-[#D4AF37]" />,
      num: "02 / BIO-RECEPTIVITY",
      title: "Sensory Regulation",
      copy: "True safety is not just a locked door; it is sensory regulation. We replace harsh plastics and cheap nylon with high-density eco-leather and brushed metals, curated to calm their nervous system."
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#D4AF37]" />,
      num: "03 / PROTECTOR NOMEN",
      title: "The Informed Protector",
      copy: "You do not compromise on the design of your home. Do not compromise on the sensory instruments of the creature that guards your soul."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#1c0c2a]/90 backdrop-blur-sm border-t border-white/5 relative overflow-hidden">
      {/* Background design accents */}
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/3 blur-[120px] pointer-events-none"></div>
      <div className="absolute left-10 bottom-10 w-80 h-80 rounded-full bg-[#7042b4]/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">
            Scientific Framework & Foundations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5f1ea] leading-tight font-light italic">
            Bridging Neuroscience & Design Integrity
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37]/40 mx-auto mt-4"></div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, index) => (
            <div 
              key={index} 
              className="group relative bg-[#0a0311]/60 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10 p-8 rounded-sm transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle top-hover-line */}
              <div className="absolute top-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#D4AF37] to-purple-500 group-hover:w-full transition-all duration-300"></div>
              
              <div className="space-y-6">
                {/* Meta details */}
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] tracking-wider text-[#D4AF37]/60">{p.num}</span>
                  <div className="p-2 border border-[#D4AF37]/15 rounded-sm bg-[#1e102f]/40">
                    {p.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-[#f5f1ea] tracking-wide font-medium">
                    {p.title}
                  </h3>
                  <p className="text-stone-300 font-sans text-[13px] leading-relaxed font-light">
                    {p.copy}
                  </p>
                </div>
              </div>

              {/* Graphic baseline accent */}
              <div className="w-8 h-[1px] bg-[#D4AF37]/20 mt-12 group-hover:w-16 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
