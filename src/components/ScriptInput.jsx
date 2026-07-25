import React, { useState } from 'react';
import { BookOpen, Wand2, Sparkles, Trash2, Code2, Eye, PlusCircle } from 'lucide-react';
import { SAMPLE_SCRIPTS } from '../data/sampleScripts';

export default function ScriptInput({ scriptText, setScriptText, onAnalyze, activePresetId, onSelectPreset }) {
  const [showPreview, setShowPreview] = useState(false);

  // Helper to append formatting snippets to script
  const insertSnippet = (prefix) => {
    setScriptText(prev => prev ? `${prev}\n\n${prefix}` : prefix);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Meta Stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={20} color="#06b6d4" />
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc' }}>
            Screenplay Input Studio
          </h2>
          <span className="badge badge-sky">Fountain / Standard Format</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            {scriptText.length} CHARS | {scriptText.split('\n').length} LINES
          </div>
          
          {/* Format Preview Toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            {showPreview ? <Code2 size={14} /> : <Eye size={14} />}
            {showPreview ? 'Edit Mode' : 'Script View'}
          </button>

          {scriptText && (
            <button
              onClick={() => setScriptText('')}
              className="btn-secondary"
              style={{ padding: '6px 10px', color: '#ef4444' }}
              title="Clear Editor"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Preset Selector Carousel Cards */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={12} color="#f59e0b" /> Select High-Concept Hackathon Presets:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
          {SAMPLE_SCRIPTS.map(s => {
            const isActive = activePresetId === s.id;
            return (
              <div
                key={s.id}
                onClick={() => onSelectPreset(s)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(6, 182, 212, 0.18)' : 'rgba(30, 41, 59, 0.4)',
                  border: `1px solid ${isActive ? '#06b6d4' : 'rgba(255, 255, 255, 0.06)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 15px rgba(6, 182, 212, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: isActive ? '#38bdf8' : '#f8fafc' }}>
                    {s.title}
                  </span>
                  <span className="badge badge-amber" style={{ fontSize: '8px', padding: '2px 5px' }}>{s.genre.split(' ')[0]}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#06b6d4', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  {s.aspectRatio} | {s.colorTemp}
                </div>
                <p style={{ fontSize: '11px', color: '#94a3b8', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.3' }}>
                  {s.logline}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Screenplay Toolbar Helpers */}
      {!showPreview && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginRight: '4px' }}>Quick Inserts:</span>
          <button onClick={() => insertSnippet('EXT. LOCATION - NIGHT')} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>
            <PlusCircle size={12} /> EXT. SLUGLINE
          </button>
          <button onClick={() => insertSnippet('INT. LOCATION - DAY')} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>
            <PlusCircle size={12} /> INT. SLUGLINE
          </button>
          <button onClick={() => insertSnippet('CHARACTER NAME\n(whispering)\nDialogue text goes here.')} className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>
            <PlusCircle size={12} /> DIALOGUE BLOCK
          </button>
        </div>
      )}

      {/* Editor vs Formatted Script View */}
      {!showPreview ? (
        <textarea
          value={scriptText}
          onChange={(e) => setScriptText(e.target.value)}
          placeholder="Paste screenplay scene here (e.g. INT. DETECTIVE OFFICE - DUSK)..."
          rows={11}
          style={{
            width: '100%',
            backgroundColor: '#070a12',
            color: '#e2e8f0',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            lineHeight: '1.65',
            padding: '18px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            outline: 'none',
            resize: 'vertical',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
          }}
        />
      ) : (
        /* Formatted Screenplay Preview */
        <div style={{
          backgroundColor: '#070a12',
          padding: '24px 40px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontFamily: 'Courier New, Courier, monospace',
          fontSize: '13px',
          color: '#cbd5e1',
          minHeight: '260px',
          maxHeight: '340px',
          overflowY: 'auto',
          lineHeight: '1.6'
        }}>
          {scriptText.split('\n').map((line, idx) => {
            const isSlug = line.startsWith('INT.') || line.startsWith('EXT.');
            const isChar = /^[A-Z]{2,}/.test(line) && !isSlug;
            return (
              <div
                key={idx}
                style={{
                  fontWeight: isSlug ? 'bold' : 'normal',
                  color: isSlug ? '#38bdf8' : isChar ? '#f59e0b' : '#cbd5e1',
                  textAlign: isChar ? 'center' : 'left',
                  marginTop: isSlug ? '14px' : isChar ? '10px' : '0px',
                  marginBottom: isSlug ? '6px' : '0px'
                }}
              >
                {line || '\u00A0'}
              </div>
            );
          })}
        </div>
      )}

      {/* CTA Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#64748b' }}>
          Derives 3D top-down lighting rigs, focal lengths, metadata badges, & animatic timeline
        </span>
        <button
          onClick={onAnalyze}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '15px' }}
        >
          <Wand2 size={18} /> Generate Pre-Vis Deck
        </button>
      </div>
    </div>
  );
}
