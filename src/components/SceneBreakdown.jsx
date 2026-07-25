import React from 'react';
import { Clapperboard, SunMoon, Palette, Music, Clock, Users, Flame, Film, Thermometer, Disc, Monitor } from 'lucide-react';

export default function SceneBreakdown({ meta }) {
  if (!meta) return null;

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header slugline & Badges */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Clapperboard size={22} color="#38bdf8" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
              PRE-VIS SCENE INTELLIGENCE DECK
            </div>
            <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
              {meta.location}
            </h2>
          </div>
        </div>

        {/* Technical Specification Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge badge-sky">
            <Film size={12} /> {meta.aspectRatio}
          </span>
          <span className="badge badge-amber">
            <Thermometer size={12} /> {meta.colorTemp}
          </span>
          <span className="badge badge-violet">
            <Disc size={12} /> {meta.iso}
          </span>
          <span className="badge badge-cyan">
            <Monitor size={12} /> {meta.resolution}
          </span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {/* Mood & Genre */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', fontWeight: '700' }}>
            <Flame size={14} color="#f43f5e" /> Emotional Tone
          </div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#f8fafc' }}>
            {meta.mood}
          </div>
        </div>

        {/* Lighting Profile */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', fontWeight: '700' }}>
            <Palette size={14} color="#06b6d4" /> Lighting Setup
          </div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#38bdf8' }}>
            {meta.lightingStyle}
          </div>
        </div>

        {/* Color Grading Swatches */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', fontWeight: '700' }}>
            <Palette size={14} color="#a855f7" /> Color Grading Palette
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            {meta.colorPalette.map((color, i) => (
              <div
                key={i}
                title={color}
                style={{
                  width: '26px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: color,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: `0 0 8px ${color}55`
                }}
              />
            ))}
          </div>
        </div>

        {/* Audio Atmosphere */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', fontWeight: '700' }}>
            <Music size={14} color="#f59e0b" /> Audio Atmosphere
          </div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {meta.audioAtmosphere}
          </div>
        </div>
      </div>
    </div>
  );
}
