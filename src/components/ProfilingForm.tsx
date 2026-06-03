/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Sparkles, AlertCircle, Info, Landmark } from 'lucide-react';
import { BehavioralChallenge } from '../types';

interface ProfilingFormProps {
  onSubmit: (formData: {
    protectorName: string;
    privateEmail: string;
    canineBreed: string;
    ageAndWeight: string;
    behavioralChallenge: BehavioralChallenge;
  }) => void;
  isSubmitting: boolean;
}

export default function ProfilingForm({ onSubmit, isSubmitting }: ProfilingFormProps) {
  // Form coordinates
  const [protectorName, setProtectorName] = useState('');
  const [privateEmail, setPrivateEmail] = useState('');
  const [canineBreed, setCanineBreed] = useState('');
  const [ageAndWeight, setAgeAndWeight] = useState('');
  const [behavioralChallenge, setBehavioralChallenge] = useState<BehavioralChallenge>('Separation Anxiety');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Descriptives for behavioral challenges to display underneath
  const challengeExplanations: Record<BehavioralChallenge, string> = {
    'Separation Anxiety': 'Autonomic hyper-attachment resulting in distress spikes during isolation.',
    'Hyper-vigilance': 'Continuous thalamic scanning of acoustic stimuli and micro-vibrations.',
    'Boredom/Apathy': 'Under-stimulation of critical cognitive receptors in flat architectural layouts.',
    'Sensory Overload': 'Receptor saturation caused by persistent human, electrical, and structural noise.'
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!protectorName.trim()) newErrors.protectorName = "Protector's Name is required";
    if (!privateEmail.trim()) {
      newErrors.privateEmail = "Private Email is required";
    } else if (!/\S+@\S+\.\S+/.test(privateEmail)) {
      newErrors.privateEmail = "Provide a valid security-grade email";
    }
    if (!canineBreed.trim()) newErrors.canineBreed = "Canine Breed is required";
    if (!ageAndWeight.trim()) newErrors.ageAndWeight = "Age and Weight is required (e.g. 3 Years, 25kg)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        protectorName,
        privateEmail,
        canineBreed,
        ageAndWeight,
        behavioralChallenge
      });
    }
  };

  return (
    <div className="relative">
      {/* Decorative metal corner accents from Elegant Dark */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]/30 -m-2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37]/30 -m-2 pointer-events-none"></div>

      <form 
        onSubmit={handleFormSubmit}
        className="relative z-10 bg-black/50 backdrop-blur-md p-10 md:p-14 rounded-sm border border-white/10 shadow-2xl space-y-7"
      >
        <div className="text-left border-b border-[#D4AF37]/20 pb-5">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase mb-1">
            BIOLOGICAL INTAKE PORTAL
          </p>
          <h2 className="font-serif text-xl md:text-2xl text-[#f5f1ea] leading-snug font-medium italic">
            Tell us about the mind you are <br />trying to protect.
          </h2>
          <p className="text-stone-400 text-[11px] font-sans mt-3 leading-relaxed">
            Please catalog their biometrics so we can calculate neural stress levels and verify qualification index.
          </p>
        </div>

        <div className="space-y-6 pt-1">
          {/* Protector Name */}
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-mono flex items-center justify-between">
              <span>Protector's Name *</span>
              {errors.protectorName && (
                <span className="text-rose-400 capitalize text-[10px] font-sans flex items-center gap-1 font-light tracking-normal">
                  <AlertCircle className="w-3 h-3" /> {errors.protectorName}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                value={protectorName}
                onChange={(e) => {
                  setProtectorName(e.target.value);
                  if (errors.protectorName) setErrors(prev => ({ ...prev, protectorName: '' }));
                }}
                disabled={isSubmitting}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] hover:border-white/40 outline-none transition-colors placeholder:text-white/10 uppercase font-light text-white"
                placeholder="ALEXANDER VAULT"
              />
            </div>
          </div>

          {/* Private Email */}
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-mono flex items-center justify-between">
              <span>Private Email *</span>
              {errors.privateEmail && (
                <span className="text-rose-400 capitalize text-[10px] font-sans flex items-center gap-1 font-light tracking-normal">
                  <AlertCircle className="w-3 h-3" /> {errors.privateEmail}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                value={privateEmail}
                onChange={(e) => {
                  setPrivateEmail(e.target.value);
                  if (errors.privateEmail) setErrors(prev => ({ ...prev, privateEmail: '' }));
                }}
                disabled={isSubmitting}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] hover:border-white/40 outline-none transition-colors placeholder:text-white/10 uppercase font-light text-white"
                placeholder="V-CLASS@SECURE.COM"
              />
            </div>
          </div>

          {/* Breeds & biometrics side-by-side */}
          <div className="grid grid-cols-2 gap-6">
            {/* Canine Breed */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-mono flex items-center justify-between">
                <span>Canine Breed *</span>
                {errors.canineBreed && (
                  <span className="text-rose-400 text-[10px] font-sans">Required</span>
                )}
              </label>
              <input
                type="text"
                value={canineBreed}
                onChange={(e) => {
                  setCanineBreed(e.target.value);
                  if (errors.canineBreed) setErrors(prev => ({ ...prev, canineBreed: '' }));
                }}
                disabled={isSubmitting}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] hover:border-white/40 outline-none transition-colors placeholder:text-white/10 uppercase font-light text-white"
                placeholder="RHODESIAN RIDGEBACK"
              />
            </div>

            {/* Age & Weight */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-mono flex items-center justify-between">
                <span>Age & Weight *</span>
                {errors.ageAndWeight && (
                  <span className="text-rose-400 text-[10px] font-sans">Required</span>
                )}
              </label>
              <input
                type="text"
                value={ageAndWeight}
                onChange={(e) => {
                  setAgeAndWeight(e.target.value);
                  if (errors.ageAndWeight) setErrors(prev => ({ ...prev, ageAndWeight: '' }));
                }}
                disabled={isSubmitting}
                className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] hover:border-white/40 outline-none transition-colors placeholder:text-white/10 uppercase font-light text-white"
                placeholder="4Y / 38KG"
              />
            </div>
          </div>

          {/* Primary Behavioral Challenge dropdown */}
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-mono">
              Primary Behavioral Challenge *
            </label>
            <select
              value={behavioralChallenge}
              onChange={(e) => setBehavioralChallenge(e.target.value as BehavioralChallenge)}
              disabled={isSubmitting}
              className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm focus:border-[#D4AF37] outline-none cursor-pointer uppercase font-light text-stone-200"
            >
              <option value="Separation Anxiety" className="bg-[#170a25] text-white">SEPARATION ANXIETY</option>
              <option value="Hyper-vigilance" className="bg-[#170a25] text-white">HYPER-VIGILANCE</option>
              <option value="Boredom/Apathy" className="bg-[#170a25] text-white">BOREDOM / APATHY</option>
              <option value="Sensory Overload" className="bg-[#170a25] text-white">SENSORY OVERLOAD</option>
            </select>

            {/* Mini descriptor explaining the dropdown selection */}
            <div className="mt-3 p-3 bg-white/5 border border-white/5 rounded-sm flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-[10px] text-stone-400 font-sans leading-relaxed italic">
                {challengeExplanations[behavioralChallenge]}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full select-none cursor-pointer text-center relative overflow-hidden bg-[#D4AF37] text-[#2E1A47] py-5 rounded-sm font-mono text-xs font-bold tracking-[0.35em] uppercase hover:bg-[#F5F5F5] hover:text-[#170a25] transition-all duration-500 shadow-xl disabled:opacity-40"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#2E1A47]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                CALCULATING COGNITIVE PROFILE...
              </span>
            ) : (
              <span>REQUEST ACCESS TO THE INNER CIRCLE</span>
            )}
          </motion.button>
        </div>

        {/* Security assurance */}
        <div className="text-[8.5px] font-mono text-stone-500 text-center uppercase tracking-widest pt-1 italic">
          Strictly confidential verification required. Paws & Psyche.
        </div>
      </form>
    </div>
  );
}
