import React from 'react';
import { Info, Film, Sparkles, X, Target, Cpu, CheckCircle } from 'lucide-react';

export default function AboutModal({ onClose }) {
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
        maxWidth: '680px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '28px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.85)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Info size={22} color="#06b6d4" />
            <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#f8fafc' }}>
              About CineForge AI
            </h2>
            <span className="badge badge-amber">IBM AI BUILDERS '26</span>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Theme Alignment Box */}
        <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#38bdf8', marginBottom: '4px' }}>
            <Sparkles size={16} /> July Theme: "Reimagine Creative Industries with AI"
          </div>
          <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5' }}>
            CineForge AI addresses the multi-week pre-visualization bottleneck in filmmaking and advertising. It transforms screenplay text into structured director shot decks, top-down 2D lighting rigs, and dynamic animatic motion previews.
          </p>
        </div>

        {/* Core Capabilities List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '14px', color: '#f8fafc', fontWeight: '700' }}>Key Architectural Highlights</h3>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckCircle size={18} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px', color: '#f8fafc' }}>Semantic Screenplay Engine:</strong>
              <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>Parses sluglines, character dialogue, emotional arc, lighting style, and color grading swatches.</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckCircle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px', color: '#f8fafc' }}>2D Parametric SVG Lighting Rig:</strong>
              <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>Computes top-down camera positions, FOV angle cones, and 3-point lighting setup (Key, Fill, Rim).</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <CheckCircle size={18} color="#a855f7" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px', color: '#f8fafc' }}>Canvas 60fps Animatic Engine:</strong>
              <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>HTML5 Canvas rendering smooth Ken-Burns pan/zoom transform matrices with Web Audio soundscapes.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={onClose} className="btn-primary">
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
