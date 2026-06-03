/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Lock, 
  Activity, 
  Play, 
  Square, 
  Layers, 
  VolumeX, 
  CheckCircle,
  Clock,
  Volume2
} from 'lucide-react';
import { LeadProfile, BehavioralDetails } from '../types';

interface ThankYouViewProps {
  applicationId: string;
  leadData: {
    protectorName: string;
    privateEmail: string;
    canineBreed: string;
    ageAndWeight: string;
    behavioralChallenge: string;
  };
  analysis: {
    neuroAnalysis: string;
    sensoryDiagnosis: string;
    prescribedRegimen: {
      frequencyhz: string;
      materials: string;
      regulationExercise: string;
    };
    innerCircleScore: string;
    recommendationLetter: string;
  };
  onReset: () => void;
}

export default function ThankYouView({ applicationId, leadData, analysis, onReset }: ThankYouViewProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [synthFrequency, setSynthFrequency] = useState(432);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Extract number from frequency hz string (e.g. "432Hz Ambient" -> 432)
  useEffect(() => {
    if (analysis && analysis.prescribedRegimen?.frequencyhz) {
      const match = analysis.prescribedRegimen.frequencyhz.match(/(\d+)/);
      if (match) {
        setSynthFrequency(parseInt(match[1], 10));
      }
    }
  }, [analysis]);

  // Handle playing custom prescribed frequency using Web Audio API
  const toggleFrequencySynthersizer = () => {
    if (isPlayingAudio) {
      stopSynthesizer();
    } else {
      startSynthesizer();
    }
  };

  const startSynthesizer = () => {
    try {
      // Lazy init AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(synthFrequency, ctx.currentTime);
      
      // Let's create an elegant, ultra-quiet therapeutic resonance volume (low decibel)
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5); // Slow, gradual ambient entry

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlayingAudio(true);
    } catch (e) {
      console.error("Synthesizer failed to spin up: ", e);
    }
  };

  const stopSynthesizer = () => {
    try {
      if (gainNodeRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8); // Smooth graceful fadeout
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
          }
          if (audioContextRef.current) {
            audioContextRef.current.close();
          }
          oscillatorRef.current = null;
          gainNodeRef.current = null;
          audioContextRef.current = null;
          setIsPlayingAudio(false);
        }, 850);
      } else {
        setIsPlayingAudio(false);
      }
    } catch (e) {
      setIsPlayingAudio(false);
    }
  };

  // Turn off sound automatically if component unmounts
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8 py-4 px-4"
    >
      {/* Editorial Hook Alert State */}
      <div className="bg-black/45 backdrop-blur-md border border-white/10 rounded-sm p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-4 bg-[#D4AF37]/10 border-l border-b border-[#D4AF37]/25 font-mono text-[9px] text-[#D4AF37] uppercase rounded-bl-sm tracking-[0.15em] flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-[#D4AF37]" /> MEMBERSHIP REGISTERED
        </div>

        <div className="space-y-4 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2e1a47]/70 border border-[#D4AF37]/25 rounded-sm font-mono text-[10px] text-[#D4AF37]">
            <CheckCircle className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>EXCLUSIVITY LOCK ACTIVATED</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-[#f5f1ea] leading-tight font-light italic">
            Your application is under review.
          </h2>
          
          <p className="text-[#D4AF37] font-serif text-lg leading-relaxed italic pr-4">
            "Check your private email for your Inner Circle status."
          </p>

          <p className="text-stone-300 font-sans text-xs leading-relaxed font-light">
            We have generated a personalized biological profiling dossier of the mind you are guarding. Our sensory regulation collections are strictly allocated down to the individual thread. You will receive an invitation at <span className="font-medium text-[#D4AF37] font-mono select-all">{leadData.privateEmail}</span> once biological review completes.
          </p>
        </div>
      </div>

      {/* Main Scientific Clinical File Dashboard */}
      <div className="bg-black/45 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden shadow-2xl">
        
        {/* Dossier Header */}
        <div className="bg-[#241339]/40 border-b border-white/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
          <div>
            <div className="font-mono text-[9px] text-[#D4AF37] tracking-[0.2em] font-semibold uppercase">
              CONFIDENTIAL NEURO-DIAGNOSTIC REPORT
            </div>
            <h3 className="font-serif text-xl text-[#f5f1ea] font-medium leading-none mt-1.5">
              Subject: {leadData.canineBreed}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block font-mono text-[9px] text-stone-500 uppercase">INTAKE QUEUE ID</span>
              <span className="font-mono text-xs text-[#D4AF37] font-semibold">{applicationId}</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="text-left">
              <span className="block font-mono text-[9px] text-stone-500 uppercase">NEURAL COMPATIBILITY</span>
              <span className="font-mono text-xs text-stone-200 font-semibold">{analysis.innerCircleScore || "91% COMPLEMENTARY"}</span>
            </div>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="p-6 md:p-8 space-y-8 text-left">
          
          {/* Quick Biometrics Ledger */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-black/30 border border-white/5 rounded-sm font-mono text-[11px]">
            <div>
              <span className="block text-stone-500 uppercase tracking-wider text-[9px]">CANINE GUARDIAN</span>
              <span className="text-stone-200 font-medium">{leadData.canineBreed}</span>
            </div>
            <div>
              <span className="block text-stone-500 uppercase tracking-wider text-[9px]">AGE & PROFILE WEIGHT</span>
              <span className="text-stone-200 font-medium">{leadData.ageAndWeight}</span>
            </div>
            <div>
              <span className="block text-stone-500 uppercase tracking-wider text-[9px]">PROTECTOR COGNOMEN</span>
              <span className="text-stone-200 font-medium">{leadData.protectorName}</span>
            </div>
            <div>
              <span className="block text-stone-500 uppercase tracking-wider text-[9px]">STRESS RECEPTOR CHALLENGE</span>
              <span className="text-[#D4AF37] font-semibold uppercase">{leadData.behavioralChallenge}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Biological Diagnostics */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Neurobiological Assessment */}
              <div className="space-y-2">
                <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] uppercase font-semibold flex items-center gap-2 italic">
                  <Activity className="w-4 h-4" /> I. Neural Architecture
                </h4>
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                  <p className="text-stone-300 font-sans text-xs leading-relaxed font-light">
                    {analysis.neuroAnalysis}
                  </p>
                </div>
              </div>

              {/* Sensory Synthesis */}
              <div className="space-y-2">
                <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] uppercase font-semibold flex items-center gap-2 italic">
                  <Layers className="w-4 h-4" /> II. Receptor Diagnosis
                </h4>
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                  <p className="text-stone-300 font-sans text-xs leading-relaxed font-light">
                    {analysis.sensoryDiagnosis}
                  </p>
                </div>
              </div>

              {/* Recommendation letter of entry */}
              <div className="border-t border-white/5 pt-6 space-y-2">
                <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase">LAB DETERMINATION</span>
                <p className="text-stone-400 font-serif text-xs italic leading-relaxed">
                  "{analysis.recommendationLetter}"
                </p>
                <div className="flex items-center gap-2 font-mono text-[8px] text-stone-600 mt-2">
                  <span>SIGNED: DR. ARIS THORNE, PRINCIPAL NEURO-AESTHETE</span>
                  <span>/</span>
                  <span className="text-[#D4AF37]/45">PAWS & PSYCHE LABS</span>
                </div>
              </div>

            </div>

            {/* Column 2: Prescribed Sensory Regimen with active custom Audio Oscillator */}
            <div className="space-y-6">
              
              {/* Prescription Card */}
              <div className="bg-[#1e102f]/45 border border-white/10 rounded-sm p-5 space-y-5">
                <div className="font-mono text-[10px] text-[#D4AF37] border-b border-white/10 pb-2 uppercase tracking-widest font-semibold flex items-center justify-between">
                  <span>PRESCRIBED SYSTEM</span>
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>

                {/* Tactile Elements */}
                <div className="space-y-1.5 text-left">
                  <span className="block font-mono text-[8.5px] text-stone-500 uppercase">Tactile Grounding Elements</span>
                  <p className="text-stone-200 font-sans text-[11px] leading-relaxed font-light">
                    {analysis.prescribedRegimen?.materials || "High-density fine tanning, heavy copper grounding buckle"}
                  </p>
                </div>

                {/* Behavioral Exercise */}
                <div className="space-y-1.5 text-left">
                  <span className="block font-mono text-[8.5px] text-stone-500 uppercase">Spatial Regulation Tactic</span>
                  <p className="text-stone-200 font-sans text-[11px] leading-relaxed font-light font-serif italic">
                    "{analysis.prescribedRegimen?.regulationExercise || "Muzzle darkness isolation calibration and pacing"}"
                  </p>
                </div>

                {/* SoundWave therapy with Web Audio synthesizer */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <span className="block font-mono text-[8.5px] text-stone-500 uppercase text-left">Aesthetic Sound-Wave Frequency</span>
                  
                  <div className="bg-black/30 border border-white/5 p-3 rounded-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[12px] text-[#D4AF37] font-semibold">{analysis.prescribedRegimen?.frequencyhz || "432Hz Core Harmonic"}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" style={{ animationDuration: isPlayingAudio ? '1s' : '0s' }}></span>
                    </div>

                    {/* Active playing button */}
                    <button
                      type="button"
                      onClick={toggleFrequencySynthersizer}
                      className={`w-full py-2.5 px-3 rounded-sm font-mono text-[10px] select-none cursor-pointer uppercase font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                        isPlayingAudio 
                          ? 'bg-rose-950/40 text-rose-300 border border-rose-800' 
                          : 'bg-[#D4AF37] text-[#2E1A47] hover:bg-[#F5F5F5] hover:text-[#170a25]'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" /> Stop Healing Sound
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 animate-bounce" /> Play Calming Sound
                        </>
                      )}
                    </button>
                    
                    <span className="block text-[8.5px] text-stone-500 mt-2 font-mono text-center">
                      {isPlayingAudio ? "Resonating wave..." : "Click to test custom calibrated acoustic curve"}
                    </span>
                  </div>
                </div>

              </div>
              
            </div>

          </div>

        </div>

        {/* Dossier Footer */}
        <div className="bg-black/20 py-4 px-6 border-t border-white/5 text-center font-mono text-[8.5px] text-stone-500 uppercase tracking-widest">
          PAWS & PSYCHE PRIVATE RESERVE REGISTRY INDEX - SYSTEM-R-35
        </div>
      </div>

      {/* Standard structural single-view page back tracker */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={stopSynthesizer}
          onMouseDown={onReset}
          className="inline-flex items-center gap-2 text-[11px] font-mono select-none cursor-pointer text-[#D4AF37] hover:text-[#F5F5F5] uppercase tracking-widest transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" /> [ Apply with a Different Canine Mind ]
        </button>
      </div>

    </motion.div>
  );
}
