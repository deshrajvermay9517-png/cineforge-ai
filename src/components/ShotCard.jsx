import React, { useState } from 'react';
import { Eye, Video, Compass, Volume2, Aperture, Layers, Grid, Sliders, Clock } from 'lucide-react';
import LightingDiagram from './LightingDiagram';

export default function ShotCard({ shot, colorPalette }) {
  const [showDiagram, setShowDiagram] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [duration, setDuration] = useState(shot.durationSeconds || 4);

  const primaryColor = colorPalette && colorPalette[1] ? colorPalette[1] : '#06b6d4';
  const secondaryColor = colorPalette && colorPalette[2] ? colorPalette[2] : '#3b82f6';

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Header & Duration */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '12px',
            fontWeight: '800',
            fontFamily: 'var(--font-mono)',
            color: '#04101d',
            background: 'linear-gradient(135deg, #06b6d4, #38bdf8)',
            padding: '3px 8px',
            borderRadius: '6px'
          }}>
            SHOT #{shot.number}
          </span>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc' }}>
            {shot.name}
          </h3>
        </div>
        
        <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {duration}s
        </span>
      </div>

      {/* Badges Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        <span className="badge badge-sky">{shot.type}</span>
        <span className="badge badge-cyan">{shot.angle}</span>
        <span className="badge badge-violet">{shot.movement}</span>
      </div>

      {/* Visual Canvas Keyframe Preview */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '170px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, #090d16, ${primaryColor}25, ${secondaryColor}35)`,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
      }}>
        {/* Letterbox Bar (Top & Bottom Anamorphic Effect) */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '16px', background: '#000', opacity: 0.85, zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '16px', background: '#000', opacity: 0.85, zIndex: 1 }} />

        {/* Rule of Thirds SVG Overlay */}
        {showGrid && (
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
            <line x1="33.3%" y1="0" x2="33.3%" y2="100%" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="3,3" />
            <line x1="66.6%" y1="0" x2="66.6%" y2="100%" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="3,3" />
            <line x1="0" y1="33.3%" x2="100%" y2="33.3%" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="3,3" />
            <line x1="0" y1="66.6%" x2="100%" y2="66.6%" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="3,3" />
          </svg>
        )}

        {/* Keyframe Specs Overlay */}
        <div style={{ zIndex: 3, display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#38bdf8', background: 'rgba(0, 0, 0, 0.7)', padding: '2px 6px', borderRadius: '4px' }}>
            {shot.lens}
          </span>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#f59e0b', background: 'rgba(0, 0, 0, 0.7)', padding: '2px 6px', borderRadius: '4px' }}>
            {shot.aperture} | {shot.shutterAngle || '180°'}
          </span>
        </div>

        {/* Framing Watermark Icon */}
        <div style={{ zIndex: 3, textAlignment: 'center', alignSelf: 'center', opacity: 0.4 }}>
          <Layers size={34} color="#38bdf8" />
        </div>

        {/* Bottom Status Overlay & Grid Toggle */}
        <div style={{ zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#06b6d4', background: 'rgba(0, 0, 0, 0.7)', padding: '2px 6px', borderRadius: '4px' }}>
            {shot.depthOfField || 'Medium Focus'}
          </span>

          <button
            onClick={() => setShowGrid(!showGrid)}
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              color: showGrid ? '#06b6d4' : '#64748b',
              padding: '2px 6px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px'
            }}
            title="Toggle Rule of Thirds Grid"
          >
            <Grid size={12} /> {showGrid ? 'Grid On' : 'Grid Off'}
          </button>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5', minHeight: '36px' }}>
        {shot.description}
      </p>

      {/* Duration Slider Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(30, 41, 59, 0.3)', padding: '8px 12px', borderRadius: '8px' }}>
        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', whiteSpace: 'nowrap' }}>Duration:</span>
        <input
          type="range"
          min="1"
          max="12"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          style={{ flex: 1, accentColor: '#06b6d4', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: '700' }}>{duration}s</span>
      </div>

      {/* Sound Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', background: 'rgba(30, 41, 59, 0.4)', padding: '6px 10px', borderRadius: '6px' }}>
        <Volume2 size={13} color="#f59e0b" />
        <span>{shot.soundTag}</span>
      </div>

      {/* Toggle Diagram Button */}
      <button
        onClick={() => setShowDiagram(!showDiagram)}
        className="btn-secondary"
        style={{ width: '100%', justifyContent: 'center', fontSize: '12px', padding: '8px' }}
      >
        <Compass size={14} color="#06b6d4" />
        {showDiagram ? 'Hide 2D Lighting Rig' : 'View Top-Down Lighting Rig'}
      </button>

      {/* Conditional Diagram Display */}
      {showDiagram && (
        <LightingDiagram
          setup={shot.cameraSetup}
          shotNumber={shot.number}
          focalLength={shot.focalLength}
        />
      )}
    </div>
  );
}
