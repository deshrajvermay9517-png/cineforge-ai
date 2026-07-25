import React from 'react';
import { Heart, Award, Code, X, ShieldCheck } from 'lucide-react';

export default function CreditsModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      backgroundColor: 'rgba(4, 6, 11, 0.94)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel glass-panel-glow" style={{
        width: '100%',
        maxWidth: '560px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '28px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.85)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={22} color="#f59e0b" />
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc' }}>
              Credits & Acknowledgments
            </h2>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Hackathon Sponsor */}
          <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '4px' }}>
              Hackathon Challenge Sponsor
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#f8fafc' }}>
              IBM AI Builders Challenge — July 2026
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
              Theme: "Reimagine Creative Industries with AI"
            </p>
          </div>

          {/* Core Technologies */}
          <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#a855f7', textTransform: 'uppercase', marginBottom: '8px' }}>
              Core Technical Stack & Libraries
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
              <div>• <strong>React 18</strong> (UI Engine)</div>
              <div>• <strong>Vite 8</strong> (Build Tooling)</div>
              <div>• <strong>Lucide React</strong> (Vector Icons)</div>
              <div>• <strong>HTML5 Canvas</strong> (Motion Engine)</div>
              <div>• <strong>Web Audio API</strong> (Soundscapes)</div>
              <div>• <strong>Plus Jakarta Sans</strong> (Typography)</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Built with ❤️ for IBM AI Builders Challenge
          </span>
          <button onClick={onClose} className="btn-secondary" style={{ fontSize: '12px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
