import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, Layers, Film, FastForward, Sliders, Mic, Radio, RotateCcw } from 'lucide-react';
import AnimaticCanvas from './AnimaticCanvas';

export default function AnimaticPlayer({ shots, meta, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 0.5x, 1x, 1.5x, 2x
  const [progress, setProgress] = useState(0);

  const audioCtxRef = useRef(null);
  const currentShot = shots[currentIndex] || shots[0];

  // Initialize & trigger Web Audio sound FX on shot change
  useEffect(() => {
    if (isPlaying && !isMuted) {
      playSynthesizedSoundscape(currentShot?.soundTag);
    }
  }, [currentIndex, isPlaying, isMuted, volume]);

  // Timer loop for animatic playback
  useEffect(() => {
    let timer;
    let interval;

    if (isPlaying) {
      const baseDurationMs = (currentShot?.durationSeconds || 4) * 1000;
      const shotDurationMs = baseDurationMs / speedMultiplier;
      const startTime = Date.now();

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / shotDurationMs) * 100);
        setProgress(pct);
      }, 30);

      timer = setTimeout(() => {
        if (currentIndex < shots.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setProgress(0);
        } else {
          setCurrentIndex(0); // loop back
          setProgress(0);
        }
      }, shotDurationMs);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentIndex, isPlaying, shots.length, currentShot, speedMultiplier]);

  // Web Audio API Synthesizer with Volume Control
  const playSynthesizedSoundscape = (soundTag) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 60 + (currentIndex * 16);
      osc.type = currentIndex % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      const peakGain = 0.15 * volume;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(peakGain, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ((currentShot?.durationSeconds || 4) / speedMultiplier));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + ((currentShot?.durationSeconds || 4) / speedMultiplier));
    } catch (e) {
      console.warn('Web Audio Playback:', e);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      backgroundColor: 'rgba(4, 6, 11, 0.96)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel glass-panel-glow" style={{
        width: '100%',
        maxWidth: '1040px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        padding: '24px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
      }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Film size={22} color="#06b6d4" />
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc' }}>
              Animatic Timeline Studio
            </h2>
            <span className="badge badge-amber">CANVAS MOTION ENGINE</span>
            <span className="badge badge-sky">{meta?.aspectRatio || '2.39:1'}</span>
          </div>

          <button onClick={onClose} className="btn-secondary" style={{ padding: '8px' }}>
            <X size={18} />
          </button>
        </div>

        {/* HTML5 Canvas Animatic Motion Container */}
        <div style={{ position: 'relative', width: '100%', height: '410px' }}>
          <AnimaticCanvas
            shot={currentShot}
            meta={meta}
            progress={progress}
            isPlaying={isPlaying}
            volume={isMuted ? 0 : volume}
          />
        </div>

        {/* Timeline Scrubber Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
            <span>SHOT #{currentShot?.number} ({currentShot?.type})</span>
            <span style={{ color: '#06b6d4' }}>PROGRESS: {Math.round(progress)}% | {currentShot?.durationSeconds}s</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer' }}
          />
        </div>

        {/* Mini Filmstrip Shot Scrubber Track */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${shots.length}, 1fr)`, gap: '8px' }}>
          {shots.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => { setCurrentIndex(idx); setProgress(0); }}
              style={{
                padding: '10px',
                borderRadius: '8px',
                background: idx === currentIndex ? 'rgba(6, 182, 212, 0.25)' : 'rgba(30, 41, 59, 0.4)',
                border: `1px solid ${idx === currentIndex ? '#06b6d4' : 'rgba(255, 255, 255, 0.05)'}`,
                color: idx === currentIndex ? '#38bdf8' : '#94a3b8',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span>Shot #{s.number}</span>
                <span style={{ color: '#f59e0b' }}>{s.durationSeconds}s</span>
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s.movement}
              </div>
            </div>
          ))}
        </div>

        {/* Audio & Voice-Sync Controls Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '4px' }}>
          {/* Soundscape & Voice-Sync Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Volume Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(30, 41, 59, 0.4)', padding: '6px 12px', borderRadius: '8px' }}>
              <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                {isMuted ? <VolumeX size={16} color="#ef4444" /> : <Volume2 size={16} color="#06b6d4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                style={{ width: '80px', accentColor: '#06b6d4', cursor: 'pointer' }}
              />
            </div>

            <span className="badge badge-violet" style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mic size={12} /> Voice-Sync Guide: ACTIVE
            </span>
          </div>

          {/* Transport Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => { setCurrentIndex(0); setProgress(0); }}
              className="btn-secondary"
              title="Restart Animatic"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={() => { setCurrentIndex(prev => (prev > 0 ? prev - 1 : shots.length - 1)); setProgress(0); }}
              className="btn-secondary"
            >
              <SkipBack size={16} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-primary"
              style={{ width: '110px', justifyContent: 'center' }}
            >
              {isPlaying ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Play</>}
            </button>

            <button
              onClick={() => { setCurrentIndex(prev => (prev < shots.length - 1 ? prev + 1 : 0)); setProgress(0); }}
              className="btn-secondary"
            >
              <SkipForward size={16} />
            </button>
          </div>

          {/* Speed Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '2px', background: 'rgba(30, 41, 59, 0.6)', padding: '2px', borderRadius: '6px' }}>
              {[0.5, 1, 1.5, 2].map(spd => (
                <button
                  key={spd}
                  onClick={() => setSpeedMultiplier(spd)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: speedMultiplier === spd ? '#0284c7' : 'transparent',
                    color: speedMultiplier === spd ? '#fff' : '#94a3b8',
                    fontSize: '10px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <button onClick={onClose} className="btn-secondary">
              Close Studio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
