/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BehavioralChallenge = 
  | 'Separation Anxiety' 
  | 'Hyper-vigilance' 
  | 'Boredom/Apathy' 
  | 'Sensory Overload';

export interface LeadProfile {
  id: string;
  protectorName: string;
  privateEmail: string;
  canineBreed: string;
  ageAndWeight: string;
  behavioralChallenge: BehavioralChallenge;
  submittedAt: string;
  status: 'reviewing' | 'approved' | 'inner_circle';
}

export interface BehavioralDetails {
  challenge: BehavioralChallenge;
  neuroScientificTherapy: string;
  biometricReceptorsGoal: string;
  sensoryRegulationTactic: string;
  soundPathwaveFrequency: string;
}
