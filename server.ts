/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory ledger representing the "Inner Circle Membership Registry"
interface RegistryLead {
  id: string;
  protectorName: string;
  privateEmail: string;
  canineBreed: string;
  ageAndWeight: string;
  behavioralChallenge: string;
  submittedAt: string;
  status: 'reviewing' | 'approved';
  aiAnalysis?: any;
}

const leadsRegistry: RegistryLead[] = [
  {
    id: "REG-9912",
    protectorName: "Marcus Vance",
    privateEmail: "m.vance@archstone.com",
    canineBreed: "Siberian Husky",
    ageAndWeight: "3 Years, 27kg",
    behavioralChallenge: "Sensory Overload",
    submittedAt: new Date(Date.now() - 36 * 3600000).toISOString(),
    status: 'approved',
    aiAnalysis: {
      neuroAnalysis: "Husky lineage maintains cold-climate acoustic tracking patterns that suffer high-frequency reverb inside modern urban high-rises, resulting in stress spikes.",
      sensoryDiagnosis: "Tactile hyper-reactivity caused by static charge from standard nylon harness webbing rubbing against undercoat.",
      prescribedRegimen: {
        frequencyhz: "417Hz Grounding Pathwaves",
        materials: "High-density full-grain eco-leather infused with silver threading to dispel static friction, with solid brass buckles.",
        regulationExercise: "Thermal decompression intervals of 15 minutes post outdoor excursions."
      },
      innerCircleScore: "92% Overload Vulnerability",
      recommendationLetter: "Highly recommended for sensory regulation instrumentation. Siberian lineage requires immediate grounding fibers."
    }
  },
  {
    id: "REG-8541",
    protectorName: "Eleanor Sterling",
    privateEmail: "sterling@privateholdings.io",
    canineBreed: "French Bulldog",
    ageAndWeight: "1.5 Years, 11kg",
    behavioralChallenge: "Separation Anxiety",
    submittedAt: new Date(Date.now() - 14 * 3600000).toISOString(),
    status: 'reviewing',
    aiAnalysis: {
      neuroAnalysis: "Vagus nerve compression potential associated with brachycephalic airway geometry, exacerbating panic responses during acute isolation intervals.",
      sensoryDiagnosis: "Auditory sensitivity to HVAC hums and structural building echoes when placed in empty, low-frequency soundscapes.",
      prescribedRegimen: {
        frequencyhz: "528Hz Sympathetic Resonance",
        materials: "Ultra-supple organic tanned leather elements lined with sound-dampening wool-felt, utilizing non-resonant titanium fasteners.",
        regulationExercise: "Scent-anchored crate transitions utilizing specific plant-derived calmants."
      },
      innerCircleScore: "86% Separation Stress Risk",
      recommendationLetter: "Profile shows typical neural strain from sensory vacuum in home custody. Recommend immediate enrollment."
    }
  }
];

// Lazy Gemini Client Initialization
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// Generate an elegant local scientific fallback report when Gemini isn't available
function generateFallbackAnalysis(breed: string, challenge: string, ageWeight: string) {
  const challengesMap: Record<string, any> = {
    "Separation Anxiety": {
      neuroAnalysis: `The biological nervous system of the "${breed}" is hardwired for symbiotic pack vigilance. Domestic structures create a "sensory vacuum" that amplifies micro-vibrations, leading to state anxiety and protective over-arousal.`,
      sensoryDiagnosis: "Auditory hyper-focus on structural settling noises combined with tactile feedback triggers from synthetics that generate localized static charge.",
      prescribedRegimen: {
        frequencyhz: "528Hz Bio-Cohesive Pathwaves",
        materials: "Premium full-grain natural eco-leather coupled with solid brushed brass buckles to minimize static electricity transfer.",
        regulationExercise: "Olfactory anchoring coupled with systematic 3-minute tactile de-sensitization."
      },
      innerCircleScore: "84% Autonomic Arousal Index"
    },
    "Hyper-vigilance": {
      neuroAnalysis: `Your "${breed}" has a highly sensitive auditory cortex designed to map outdoor coordinates. High-density modern residences trigger acoustic clipping, causing persistent thalamic fight-or-flight signaling.`,
      sensoryDiagnosis: "Constant peripheral scanning, high-frequency tail-ground grounding loss, and physical reaction to electromagnetic static.",
      prescribedRegimen: {
        frequencyhz: "396Hz Autonomic Stabilization",
        materials: "Anodized space-grade brushed titanium fasteners mounted to structural calming fibers.",
        regulationExercise: "Static decompression intervals with systematic soundproofing barriers."
      },
      innerCircleScore: "91% Cortisol Saturation Potential"
    },
    "Boredom/Apathy": {
      neuroAnalysis: `Lack of behavioral-sensory enrichment creates neural atrophy in the fronto-striatal pathway. The working drive of the "${breed}" requires dedicated sensory regulation puzzles to restore cognitive balance.`,
      sensoryDiagnosis: "Tactile under-stimulation resulting in minor self-mutilation (licking paws) and auditory desensitization to positive stimulus.",
      prescribedRegimen: {
        frequencyhz: "432Hz Cognitive Vitality Tuning",
        materials: "Contrast-textured vegetable-tanned leather combined with heavy-density zinc alloy weight anchors to restore proprioception.",
        regulationExercise: "Active sensory-foraging intervals twice daily using weight-regulated collars."
      },
      innerCircleScore: "78% Neurological Atrophy Score"
    },
    "Sensory Overload": {
      neuroAnalysis: `An overload of synthetic sound waves and artificial light wavelengths pollutes the canine neuro-receptors. The "${breed}" absorbs modern domestic high-frequency hums with no grounding mechanism.`,
      sensoryDiagnosis: "Vagus nerve over-triggering, acoustic visual stress triggers from LED screen flicker frequencies, and chemical sensitivity to cheap polymers.",
      prescribedRegimen: {
        frequencyhz: "417Hz Purifying Sinusoids",
        materials: "High-density natural fibers, surgical-grade matte titanium clips, and vegetable-dyed premium cowhide.",
        regulationExercise: "Full sensory dark-room therapy of 20 minutes following heavy industrial sound exposure."
      },
      innerCircleScore: "95% Neural-Acoustic Overload Index"
    }
  };

  const basis = challengesMap[challenge] || challengesMap["Separation Anxiety"];
  return {
    neuroAnalysis: basis.neuroAnalysis,
    sensoryDiagnosis: basis.sensoryDiagnosis,
    prescribedRegimen: basis.prescribedRegimen,
    innerCircleScore: basis.innerCircleScore,
    recommendationLetter: `Our diagnostic algorithms designate this ${breed} (${ageWeight}) as a prime candidate for sensory-aesthetic regulation. The neurological strain index dictates immediate equipment transition.`
  };
}

// API: Process Canine Biological Profiling & application submission
app.post('/api/profile-analysis', async (req, res) => {
  try {
    const { protectorName, privateEmail, canineBreed, ageAndWeight, behavioralChallenge } = req.body;

    if (!protectorName || !privateEmail || !canineBreed || !behavioralChallenge) {
      return res.status(400).json({ error: "Missing required profiling parameters" });
    }

    let aiAnalysis: any = null;
    const client = getAiClient();

    if (client) {
      try {
        const prompt = `
          Analyze the neuro-aesthetic profile of a canine with the following attributes:
          - Breed: ${canineBreed}
          - Age and Weight: ${ageAndWeight}
          - Primary Behavioral Challenge: ${behavioralChallenge}

          Deliver a highly scientific, editorial, and sophisticated analysis. Avoid generic pet-store talk. Use severe, formal terminology emphasizing canine neurobiology, sensory over-stimulation, evolutionary biological gaps between their canine ancestry and modern human concrete/apartment living, touch receptor responses, and the Paws & Psyche research framework.

          Your response must strictly match the following JSON schema:
          {
            "neuroAnalysis": "A deep 2-3 sentence scientific/evolutionary analysis explaining how this breed's sensory system is over-stimulated in modern domestic concrete boxes.",
            "sensoryDiagnosis": "Explanation of how the behavioral challenge manifests biochemically and tactilely (e.g., cheap synthetic nylon harnesses causing static charge, auditory-cortex over-triggering).",
            "prescribedRegimen": {
              "frequencyhz": "Recommended precise sonic frequency (e.g., '432Hz Natural Earth Vibrations' or '528Hz Cellular Resonance')",
              "materials": "Solfeggio-matched organic material suggestions (e.g. vegetable-tanned high-density full-grain leather, brushed brass grounding fasteners, titanium weight elements)",
              "regulationExercise": "Specific sensory regulation exercise (e.g. '3-step spatial grounding', '15-minute darkness-anchor transition')"
            },
            "innerCircleScore": "A scientific index percentage scoring their sensory-overload risk (e.g., '91% Neural Overload Risk Index' or '87% Cortisol Vulnerability Score')",
            "recommendationLetter": "A 1-2 sentence recommendation on eligibility for Paws & Psyche's Private Reserve collection."
          }
        `;

        const response = await client.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: {
            temperature: 0.7,
            responseMimeType: 'application/json',
            systemInstruction: "You are a Senior Principal Canine Neuro-Aesthete and biological engineering expert representing 'Paws & Psyche'. Your tone is extremely elegant, sophisticated, clinical, and scientific. You write about canine anxiety through a neurological and physical engineering lens, focusing on full-grain organic materials, sensory receptors, static electricity dispersal, sound-wave frequency therapy, and architectural gaps."
          }
        });

        if (response.text) {
          aiAnalysis = JSON.parse(response.text.trim());
        }
      } catch (gemError) {
        console.warn("Gemini call failed, utilizing premium rules-based engine: ", gemError);
        aiAnalysis = generateFallbackAnalysis(canineBreed, behavioralChallenge, ageAndWeight);
      }
    } else {
      // Key absent: execute the beautiful rules fallback immediately of high-fidelity copy
      aiAnalysis = generateFallbackAnalysis(canineBreed, behavioralChallenge, ageAndWeight);
    }

    // Save of the application to our in-memory membership registry
    const newLead: RegistryLead = {
      id: `REG-${Math.floor(1000 + Math.random() * 9000)}`,
      protectorName,
      privateEmail,
      canineBreed,
      ageAndWeight: ageAndWeight || "N/A",
      behavioralChallenge,
      submittedAt: new Date().toISOString(),
      status: 'reviewing',
      aiAnalysis
    };

    leadsRegistry.unshift(newLead);

    // Simulate CRM Integration (The Exclusivity Loop)
    console.log(`\n======================================================`);
    console.log(`[CRM SYSTEM] Biological Intake Processed: ${protectorName} (${privateEmail})`);
    console.log(`[CRM SYSTEM] THE EXCLUSIVITY LOOP TRIGGERED:`);
    console.log(`   --> [DISPATCH: INSTANT] Email 01: INTAKE CONFIRMED: Welcome to the Inner Circle.`);
    console.log(`   --> [SCHEDULED: +48h] Email 02: FILE 01: The 3 Silent Signs of Sensory Mismatch.`);
    console.log(`   --> [SCHEDULED: +96h] Email 03: SECURE CLEARANCE: The First Collection is Nearing Capacity.`);
    console.log(`======================================================\n`);

    // REAL AUTOMATION TRIGGER (ZAPIER / MAKE)
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (zapierWebhookUrl && zapierWebhookUrl.startsWith('http')) {
      try {
        await fetch(zapierWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            protectorName,
            privateEmail,
            canineBreed,
            ageAndWeight,
            behavioralChallenge,
            applicationId: newLead.id,
            analysis: aiAnalysis
          }),
        });
        console.log(`[ZAPIER] ✅ Successfully pushed lead to Webhook.`);
      } catch (error) {
        console.error(`[ZAPIER] ❌ Failed to push to Webhook:`, error);
      }
    } else {
      console.log(`[ZAPIER] ⚠️ No valid ZAPIER_WEBHOOK_URL found in .env. Skipping real automation trigger.`);
    }

    return res.json({
      success: true,
      applicationId: newLead.id,
      analysis: aiAnalysis
    });

  } catch (error: any) {
    console.error("Profiling error:", error);
    return res.status(500).json({ error: error.message || "Neurobiological diagnostic failed" });
  }
});

// GET endpoint to retrieve current membership logs / registry preview
app.get('/api/registry', (req, res) => {
  return res.json(leadsRegistry);
});

// Start express server configuration
async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Private Reserve server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
