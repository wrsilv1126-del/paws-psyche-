/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, Shield, Search, Lock, UserCheck } from 'lucide-react';
import { LeadProfile } from '../types';

interface RegistryLedgerProps {
  registry: any[];
}

export default function RegistryLedger({ registry }: RegistryLedgerProps) {
  return (
    <section className="py-16 px-6 md:px-12 bg-[#12071d]/90 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#170a25] to-[#0e0417] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#D4AF37] uppercase">
              RESERVAL ENROLLMENT LEDGER
            </p>
            <h3 className="font-serif text-2xl text-[#f5f1ea] leading-tight font-light italic">
              Confidential Intake Registry
            </h3>
            <p className="text-stone-400 text-xs font-sans leading-relaxed">
              Real-time monitoring of biological submissions under sensory status analysis.
            </p>
          </div>
          <div className="flex items-center gap-4 text-stone-500 font-mono text-[11px] bg-[#1a0c29] px-4 py-2 rounded-sm border border-white/10">
            <div className="flex items-center gap-1.5 text-[#D4AF37]">
              <Lock className="w-3.5 h-3.5" /> SECURE LEDGER
            </div>
            <span>|</span>
            <span>INTAKE CAPACITY: 12 / SEASON</span>
          </div>
        </div>

        {/* List of filings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registry.map((lead, idx) => (
            <div 
              key={lead.id || idx} 
              className="bg-black/35 border border-white/10 p-5 rounded-sm space-y-4 hover:border-[#D4AF37]/35 transition-all duration-300"
            >
              {/* Header metrics */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="block font-mono text-[9px] text-[#D4AF37] font-semibold">{lead.id || `REG-0${idx + 100}`}</span>
                  <span className="block text-mono text-[10px] text-stone-500 font-mono">
                    {lead.submittedAt ? new Date(lead.submittedAt).toLocaleDateString() : 'REALTIME'}
                  </span>
                </div>
                
                {/* Status Badge */}
                <div className={`px-2.5 py-0.5 rounded-sm font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 ${
                  lead.status === 'approved' 
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800' 
                    : 'bg-[#2e1a47] text-[#D4AF37] border border-[#D4AF37]/20'
                }`}>
                  <span className={`w-1 h-1 rounded-full ${lead.status === 'approved' ? 'bg-emerald-400' : 'bg-[#D4AF37] animate-pulse'}`}></span>
                  {lead.status === 'approved' ? 'INNER CIRCLE STATUS' : 'UNDER EVALUATION'}
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-1.5 border-t border-white/5 pt-3">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-stone-400 font-light">Canine Guardian:</span>
                  <span className="text-stone-200 font-medium font-serif">{lead.canineBreed}</span>
                </div>
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-stone-400 font-light">Biometrics:</span>
                  <span className="text-stone-300">{lead.ageAndWeight || lead.ageAndWeight || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-stone-400 font-light">Target Challenge:</span>
                  <span className="text-[#D4AF37] font-mono text-[10px] uppercase font-medium">{lead.behavioralChallenge}</span>
                </div>
              </div>

              {/* Diagnosis teaser snippet */}
              {lead.aiAnalysis && (
                <div className="bg-white/5 p-3 rounded-sm border-l-2 border-[#D4AF37]/20">
                  <p className="text-[10.5px] text-stone-400 font-serif italic leading-relaxed text-right">
                    "{lead.aiAnalysis.recommendationLetter ? lead.aiAnalysis.recommendationLetter.slice(0, 95) + '...' : 'Canine telemetry cataloged into neural diagnostic review pool.'}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Security Warning */}
        <div className="flex justify-center items-center gap-2 font-mono text-[9px] text-stone-600 uppercase tracking-widest pt-4">
          <Shield className="w-3.5 h-3.5 text-stone-700" />
          <span>Biometric database strictly compliant with Paws & Psyche research guidelines</span>
        </div>

      </div>
    </section>
  );
}
