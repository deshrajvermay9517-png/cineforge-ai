import React from 'react';
import { Film, Sparkles, Play, Download, RefreshCw, Info, Award } from 'lucide-react';
import { SAMPLE_SCRIPTS } from '../data/sampleScripts';

export default function Navbar({ onSelectPreset, onReset, onOpenExport, onOpenAnimatic, onOpenAbout, onOpenCredits, hasData }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 28px',
      background: 'rgba(14, 19, 31, 0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #06b6d4, #38bdf8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
        }}>
          <Film size={22} color="#04101d" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '19px', fontWeight: '800', letterSpacing: '-0.5px', color: '#f8fafc' }}>
              CINEFORGE <span style={{ color: '#06b6d4' }}>AI</span>
            </h1>
            <span className="badge badge-amber" style={{ fontSize: '10px' }}>
              IBM AI BUILDERS '26
            </span>
          </div>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>
            Multimodal Film Pre-Visualization Studio
          </p>
        </div>
      </div>

      {/* Center Navigation & Presets */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(30, 41, 59, 0.6)', padding: '4px 10px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <Sparkles size={13} color="#f59e0b" />
          <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '600', marginRight: '4px' }}>Presets:</span>
          {SAMPLE_SCRIPTS.map(s => (
            <button
              key={s.id}
              onClick={() => onSelectPreset(s)}
              className="btn-secondary"
              style={{ padding: '3px 8px', fontSize: '11px', borderRadius: '6px' }}
            >
              {s.genre.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={onOpenAbout} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>
          <Info size={14} color="#06b6d4" /> About
        </button>
        <button onClick={onOpenCredits} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>
          <Award size={14} color="#f59e0b" /> Credits
        </button>

        {hasData && (
          <>
            <button onClick={onOpenAnimatic} className="btn-primary" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
              <Play size={16} /> Animatic Studio
            </button>
            <button onClick={onOpenExport} className="btn-primary">
              <Download size={16} /> Export Suite
            </button>
            <button onClick={onReset} className="btn-secondary" style={{ padding: '9px' }} title="Reset Studio">
              <RefreshCw size={15} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
