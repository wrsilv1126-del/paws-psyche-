/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Orbit, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';
import Header from './components/Header';
import SciencePillars from './components/SciencePillars';
import ProfilingForm from './components/ProfilingForm';
import ThankYouView from './components/ThankYouView';
import RegistryLedger from './components/RegistryLedger';

import heroImage from './assets/images/private_reserve_hero_1780443894628.png';

export default function App() {
  const [viewState, setViewState] = useState<'landing' | 'success'>('landing');
  const [registry, setRegistry] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  // Custom states following application submission
  const [appliedLead, setAppliedLead] = useState<any>(null);
  const [applicationId, setApplicationId] = useState<string>('');
  const [analysisReport, setAnalysisReport] = useState<any>(null);

  // Fetch initial registry lead entries
  const fetchRegistry = async () => {
    try {
      const response = await fetch('/api/registry');
      if (response.ok) {
        const data = await response.json();
        setRegistry(data);
      }
    } catch (e) {
      console.warn("Could not retrieve secure registry logs: ", e);
    }
  };

  useEffect(() => {
    fetchRegistry();
  }, []);

  // Handle biological profiling submission
  const handleProfilingSubmit = async (formData: {
    protectorName: string;
    privateEmail: string;
    canineBreed: string;
    ageAndWeight: string;
    behavioralChallenge: string;
  }) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('/api/profile-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Unable to catalog biometrics. Laboratory server rejected.");
      }

      const result = await response.json();

      if (result.success) {
        setAppliedLead(formData);
        setApplicationId(result.applicationId);
        setAnalysisReport(result.analysis);
        setViewState('success');
        
        // Refresh the ledger
        fetchRegistry();
      } else {
        throw new Error(result.error || "Biological calculation error.");
      }

    } catch (err: any) {
      console.error(err);
      setSubmissionError(err.message || "An unknown laboratory stress test failure occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setViewState('landing');
    setAppliedLead(null);
    setAnalysisReport(null);
    setApplicationId('');
  };

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#f5f5f5] font-sans overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] relative flex flex-col justify-between">
      
      {/* Background Underlay combining deep gradients and our cinematic dog collar frame image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cinematic blurry image overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 opacity-15 filter blur-sm"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        {/* Precise deep gradients according to #2E1A47 (Deep Amethyst) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b0a2c] via-[#2E1A47]/95 to-[#12071d] mix-blend-multiply"></div>
        
        {/* Background Subtle Texture / Gradient Overlay from Elegant Dark */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #D4AF37 0%, transparent 50%)' }}></div>
      </div>

      {/* Stylized Border Accents from Elegant Dark */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#D4AF37]/25 m-4 z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#D4AF37]/25 m-4 z-10 pointer-events-none"></div>

      {/* Header bar showing real-time logs volume */}
      <Header registryCount={registry.length} />

      {/* Main Structural Layout Wrapper */}
      <main className="flex-grow relative z-10">
        
        <AnimatePresence mode="wait">
          {viewState === 'landing' ? (
            <motion.div
              key="landing-flow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              
              {/* Left Column: Premium Headlines and Exclusivity Hook */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                
                <div className="space-y-4">
                  {/* Pré-Headline in gold finish */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2"
                  >
                    <span className="w-6 h-[1px] bg-[#D4AF37]"></span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.4em] brushed-gold-text">
                      BEYOND OBEDIENCE. BEYOND LUXURY.
                    </span>
                  </motion.div>

                  {/* Editorial Serifed Heading */}
                  <h1 className="font-serif text-5xl sm:text-6xl font-light tracking-tight text-white leading-[1.1] italic">
                    The Silent Revolution in <br />
                    <span className="text-[#f5f5f5]/90 font-sans not-italic font-normal tracking-tight">Canine Neuro-Aesthetics.</span>
                  </h1>
                </div>

                {/* Real-time Cinematic Hero Asset Frame */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="relative group overflow-hidden rounded-md border border-[#D4AF37]/20 bg-[#0a0311]/60 p-2 max-w-lg mx-auto lg:mx-0 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 to-transparent pointer-events-none z-10"></div>
                  <img 
                    src={heroImage} 
                    alt="Paws & Psyche Neuro-Harmonizer Collar" 
                    className="w-full aspect-[16/10] md:aspect-[16/9] object-cover filter brightness-[0.9] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Elegant caption bar */}
                  <div className="pt-2 px-1 flex justify-between items-center text-[9px] uppercase tracking-widest font-mono text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80 animate-pulse"></span>
                      Specimen 819-A // Neuro-Regulator Active
                    </span>
                    <span className="text-[#D4AF37]">Paws & Psyche</span>
                  </div>
                </motion.div>

                {/* Scarcity hook paragraph */}
                <p className="font-serif text-[#f5f5f5]/70 font-light text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 border-l lg:border-l-2 border-[#D4AF37]/35 pl-0 lg:pl-6 italic">
                  Apply to join the Private Reserve. Our sensory regulation collection is strictly limited to ensure the highest standards of safety and neuro-scientific integrity.
                </p>

                {/* Interactive metrics ticker */}
                <div className="grid grid-cols-3 gap-6 pt-6 max-w-lg mx-auto lg:mx-0 border-t border-white/10 font-mono text-[11px] text-[#f5f1ea]/80">
                  <div className="space-y-0.5">
                    <span className="block text-stone-500 uppercase text-[9px] tracking-wider">ALLOTMENT STATUS</span>
                    <span className="text-[#D4AF37] font-semibold">91% RESERVED</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-stone-500 uppercase text-[9px] tracking-wider">RESONATOR MATS</span>
                    <span className="text-white font-semibold">LIMIT 3 / REGION</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-stone-550 uppercase text-[9px] tracking-wider text-stone-400">AUDIT DURATION</span>
                    <span className="text-white font-semibold">≤ 24 LAB HOURS</span>
                  </div>
                </div>

                {/* Submission Error Banner */}
                {submissionError && (
                  <div className="bg-rose-950/40 border border-rose-800 p-4 rounded-xl text-rose-300 flex items-start gap-3 max-w-xl text-xs font-sans text-left mt-6">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold uppercase tracking-wider block mb-1">Laboratory Connection Error</span>
                      <p>{submissionError}</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Biological profiling intake form */}
              <div className="lg:col-span-5 relative">
                {/* Visual backdrop halo */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-[#dfba73]/10 rounded-3xl blur-2xl pointer-events-none"></div>
                <ProfilingForm onSubmit={handleProfilingSubmit} isSubmitting={isSubmitting} />
              </div>

            </motion.div>
          ) : (
            <motion.div key="success-flow">
              <ThankYouView
                applicationId={applicationId}
                leadData={appliedLead || {
                  protectorName: '',
                  privateEmail: '',
                  canineBreed: '',
                  ageAndWeight: '',
                  behavioralChallenge: 'Separation Anxiety'
                }}
                analysis={analysisReport || {
                  neuroAnalysis: '',
                  sensoryDiagnosis: '',
                  prescribedRegimen: {
                    frequencyhz: '432Hz Core Harmonic',
                    materials: '',
                    regulationExercise: ''
                  },
                  innerCircleScore: '90%',
                  recommendationLetter: ''
                }}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scientific pillars explaining Paws & Psyche's collection authority */}
        <SciencePillars />

        {/* Confidential Ledger of under-review/approved candidate profiles */}
        {registry.length > 0 && <RegistryLedger registry={registry} />}

      </main>

      {/* Lab footer mark */}
      <footer className="border-t border-white/5 py-8 px-12 bg-black/30 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase opacity-40 font-light text-center md:text-left font-mono">
          <div>P&P — Neuro-Regulated Instruments</div>
          <div>001-A // GENEVA // LONDON // NEW YORK</div>
          <div>© 2026 Paws & Psyche</div>
          <div className="flex gap-4">
            <span className="hover:text-[#D4AF37] tracking-normal transition-colors cursor-pointer">[ PRIVATE CONTRACT ]</span>
            <span className="hover:text-[#D4AF37] tracking-normal transition-colors cursor-pointer">[ LAB GUIDELINES ]</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
