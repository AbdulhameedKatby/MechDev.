'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
// We assume LabSlider is exported from a components folder at the root.
import LabSlider from '../../../components/LabSlider';
// Fallback if the real computeHoopStress doesn't exist, we use the requested import path.
// But we'll also implement a local fallback function just in case it's a mock.
import { computeHoopStress } from '../../../lib/calculations/physics';

const PRESETS = {
  cessna172: { name: 'Cessna 172', diameter: 1.1, pressure: 0, thickness: 0.8, material: 'Aluminium' as const },
  comet: { name: 'De Havilland Comet', diameter: 2.9, pressure: 57, thickness: 0.7, material: 'Aluminium' as const },
  b707: { name: 'Boeing 707', diameter: 3.76, pressure: 60, thickness: 1.2, material: 'Aluminium' as const },
  b747: { name: 'Boeing 747', diameter: 6.5, pressure: 60, thickness: 1.6, material: 'Aluminium' as const },
  a380: { name: 'Airbus A380', diameter: 7.14, pressure: 60, thickness: 1.8, material: 'Aluminium' as const },
  a350: { name: 'A350 CFRP', diameter: 5.96, pressure: 64, thickness: 2.5, material: 'CFRP' as const }
};

export default function FuselageStructuralStressLab() {
  const [diameter, setDiameter] = useState<number>(4.0); // m
  const [pressure, setPressure] = useState<number>(50); // kPa
  const [thickness, setThickness] = useState<number>(2.0); // mm
  const [material, setMaterial] = useState<'Aluminium' | 'CFRP'>('Aluminium');

  // Computations
  const hoopStress = useMemo(() => {
    try {
      return computeHoopStress(pressure * 1000, diameter / 2, thickness / 1000) / 1e6; // MPa
    } catch (e) {
      // Local fallback calculation if import fails or is a mock
      const P = pressure * 1000; // Pa
      const r = diameter / 2; // m
      const t = thickness / 1000; // m
      return (P * r) / t / 1e6; // MPa
    }
  }, [pressure, diameter, thickness]);

  const longitudinalStress = hoopStress / 2;
  
  const yieldStrength = material === 'Aluminium' ? 320 : 800; // MPa (2024-T3 vs CFRP)
  const safetyFactor = yieldStrength / hoopStress;

  // Window stress concentration
  const windowKtRound = 1.1;
  const windowKtSquare = 3.0; // Comet tragedy

  const maxLocalStressSquare = hoopStress * windowKtSquare;
  
  const fatigueLife = useMemo(() => {
    if (hoopStress === 0) return "Infinite";
    if (safetyFactor < 1.0) return "< 1 Flight (Failure)";
    if (safetyFactor < 1.5) return "100 - 1,000 Cycles";
    if (safetyFactor < 2.5) return "10,000 - 50,000 Cycles";
    return "> 100,000 Cycles";
  }, [safetyFactor, hoopStress]);

  const applyPreset = (key: keyof typeof PRESETS) => {
    const p = PRESETS[key];
    setDiameter(p.diameter);
    setPressure(p.pressure);
    setThickness(p.thickness);
    setMaterial(p.material);
  };

  return (
    <div className="min-h-screen bg-[#07032a] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="border-b border-[#0e9954]/30 pb-6">
          <h1 className="text-4xl font-bold text-[#38bdf8] mb-2">Fuselage Hoop Stress & Pressurization Lab</h1>
          <p className="text-lg text-slate-400">
            Explore the internal forces that keep passenger cabins safe at high altitudes. Adjust structural parameters 
            and observe real-time stress distributions and fatigue life estimation.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Controls Section */}
          <div className="space-y-8 bg-[#040118] p-6 rounded-xl border border-[#0e9954]/30">
            <h2 className="text-2xl font-semibold text-[#0e9954] mb-4">Design Parameters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Fuselage Diameter: <span className="text-amber-500">{diameter.toFixed(2)} m</span>
                </label>
                <input 
                  type="range" min="2.0" max="8.0" step="0.1" 
                  value={diameter} onChange={(e) => setDiameter(parseFloat(e.target.value))}
                  className="w-full accent-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Cabin Pressure Differential: <span className="text-amber-500">{pressure.toFixed(1)} kPa ({(pressure * 0.145038).toFixed(1)} psi)</span>
                </label>
                <input 
                  type="range" min="0" max="80" step="1" 
                  value={pressure} onChange={(e) => setPressure(parseFloat(e.target.value))}
                  className="w-full accent-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Skin Wall Thickness: <span className="text-amber-500">{thickness.toFixed(2)} mm</span>
                </label>
                <input 
                  type="range" min="0.5" max="4.0" step="0.1" 
                  value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))}
                  className="w-full accent-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Material</label>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setMaterial('Aluminium')}
                    className={`px-4 py-2 rounded border ${material === 'Aluminium' ? 'bg-[#0e9954]/20 border-[#0e9954] text-white' : 'border-slate-600 text-slate-400 hover:border-slate-400'}`}
                  >
                    2024-T3 Aluminium
                  </button>
                  <button 
                    onClick={() => setMaterial('CFRP')}
                    className={`px-4 py-2 rounded border ${material === 'CFRP' ? 'bg-[#0e9954]/20 border-[#0e9954] text-white' : 'border-slate-600 text-slate-400 hover:border-slate-400'}`}
                  >
                    Carbon Fiber (CFRP)
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Historical Presets</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key as keyof typeof PRESETS)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results & Visualization Section */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#040118] p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-sm text-slate-400 mb-1">Hoop Stress (σ_hoop)</div>
                <div className={`text-3xl font-bold ${hoopStress > yieldStrength ? 'text-red-500' : 'text-[#38bdf8]'}`}>
                  {isFinite(hoopStress) ? hoopStress.toFixed(1) : '0'} <span className="text-lg">MPa</span>
                </div>
              </div>
              <div className="bg-[#040118] p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-sm text-slate-400 mb-1">Longitudinal Stress</div>
                <div className="text-3xl font-bold text-[#38bdf8]">
                  {isFinite(longitudinalStress) ? longitudinalStress.toFixed(1) : '0'} <span className="text-lg">MPa</span>
                </div>
              </div>
              <div className="bg-[#040118] p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-sm text-slate-400 mb-1">Yield Safety Factor</div>
                <div className={`text-3xl font-bold ${safetyFactor < 1.5 ? 'text-amber-500' : 'text-[#0e9954]'}`}>
                  {isFinite(safetyFactor) ? safetyFactor.toFixed(2) : '∞'}
                </div>
              </div>
              <div className="bg-[#040118] p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-sm text-slate-400 mb-1">Est. Fatigue Life</div>
                <div className="text-xl font-bold text-slate-200 mt-2">
                  {fatigueLife}
                </div>
              </div>
            </div>

            {/* Cross Section Visualization */}
            <div className="bg-[#040118] p-6 rounded-xl border border-slate-800 flex justify-center items-center relative overflow-hidden h-64">
              <svg viewBox="-100 -100 200 200" className="w-full h-full drop-shadow-lg">
                <circle cx="0" cy="0" r="70" fill="none" stroke="#38bdf8" strokeWidth={Math.max(1, thickness * 2)} className="opacity-80" />
                <circle cx="0" cy="0" r="66" fill="#0e9954" className="opacity-10" />
                
                {/* Radial arrows representing internal pressure */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                  <g key={angle} transform={`rotate(${angle})`}>
                    <line x1="20" y1="0" x2={60 + (pressure / 80) * 20} y2="0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                    <polygon points={`${60 + (pressure / 80) * 20},0 ${55 + (pressure / 80) * 20},-3 ${55 + (pressure / 80) * 20},3`} fill="#f59e0b" />
                  </g>
                ))}
              </svg>
              <div className="absolute top-4 left-4 text-xs text-slate-400 bg-[#07032a]/80 p-2 rounded">
                Cross-Section Stress Vectors
              </div>
            </div>

          </div>
        </div>

        {/* Case Study / Educational Text */}
        <div className="bg-[#040118] p-8 rounded-xl border border-amber-500/30">
          <h2 className="text-2xl font-bold text-amber-500 mb-4">Case Study: The De Havilland Comet</h2>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p className="mb-4">
              The De Havilland Comet was the world's first commercial jet airliner. It flew higher and faster than 
              previous aircraft, requiring a pressurized cabin. However, early models suffered catastrophic inflight 
              breakups due to metal fatigue exacerbated by <strong>square windows</strong>.
            </p>
            <div className="bg-[#07032a] p-4 rounded-lg font-mono text-sm mb-4 border border-slate-700">
              <p>Stress Concentration Factor (K_t):</p>
              <p>Round Window: ~1.1</p>
              <p>Square Window (Comet): ~3.0</p>
            </div>
            <p className="mb-4">
              With your current settings, the baseline hoop stress is <strong>{isFinite(hoopStress) ? hoopStress.toFixed(1) : 0} MPa</strong>. 
              Around a perfectly round window, this stress only increases slightly. But with a square window like the early Comet, 
              stress at the corners spikes to <strong>{(isFinite(hoopStress) ? maxLocalStressSquare : 0).toFixed(1)} MPa</strong>!
            </p>
            <p>
              This localized high stress caused microscopic cracks to form at the window corners during each pressurization cycle 
              (each flight). Over time, these cracks grew until the fuselage could no longer contain the pressure, leading to 
              explosive decompression. This tragedy taught aerospace engineers the crucial importance of round windows and fatigue testing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
