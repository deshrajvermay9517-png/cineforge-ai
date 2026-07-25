import React, { useState } from 'react';
import { LayoutGrid, Table, Film } from 'lucide-react';
import ShotCard from './ShotCard';

export default function ShotDeck({ shots, colorPalette }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  if (!shots || shots.length === 0) return null;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & View Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Film size={20} color="#06b6d4" />
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc' }}>
            Director's Shot Deck
          </h2>
          <span className="badge badge-sky">{shots.length} SHOTS GENERATED</span>
        </div>

        {/* View Switcher Buttons */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(30, 41, 59, 0.6)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'grid' ? '#0284c7' : 'transparent',
              color: viewMode === 'grid' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            <LayoutGrid size={14} /> Shot Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'table' ? '#0284c7' : 'transparent',
              color: viewMode === 'table' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            <Table size={14} /> Shot Table
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {shots.map((shot) => (
            <ShotCard key={shot.id} shot={shot} colorPalette={colorPalette} />
          ))}
        </div>
      ) : (
        /* Table View */
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#38bdf8', textTransform: 'uppercase', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                <th style={{ padding: '12px' }}>Shot</th>
                <th style={{ padding: '12px' }}>Framing & Angle</th>
                <th style={{ padding: '12px' }}>Lens Specs</th>
                <th style={{ padding: '12px' }}>Camera Movement</th>
                <th style={{ padding: '12px' }}>Lighting Setup</th>
                <th style={{ padding: '12px' }}>Duration</th>
                <th style={{ padding: '12px' }}>Action Description</th>
              </tr>
            </thead>
            <tbody>
              {shots.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#e2e8f0' }}>
                  <td style={{ padding: '12px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#06b6d4' }}>#{s.number}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-sky">{s.type}</span>
                    <br /><small style={{ color: '#94a3b8' }}>{s.angle}</small>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>
                    <strong>{s.lens}</strong>
                    <br /><small style={{ color: '#94a3b8' }}>{s.aperture}</small>
                  </td>
                  <td style={{ padding: '12px' }}>{s.movement}</td>
                  <td style={{ padding: '12px', color: '#f59e0b' }}>{s.lighting}</td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>{s.durationSeconds}s</td>
                  <td style={{ padding: '12px', color: '#cbd5e1', maxWidth: '280px' }}>{s.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
