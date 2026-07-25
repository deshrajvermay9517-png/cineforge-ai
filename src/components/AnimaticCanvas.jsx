import React, { useRef, useEffect } from 'react';

export default function AnimaticCanvas({ shot, meta, progress, isPlaying, volume }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set high DPI canvas resolution
    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 450;
    canvas.width = width;
    canvas.height = height;

    const primaryColor = meta?.colorPalette?.[1] || '#06b6d4';
    const secondaryColor = meta?.colorPalette?.[2] || '#a855f7';
    const accentColor = meta?.colorPalette?.[0] || '#0f172a';

    // Particle system for ambient volumetric atmospheric particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.6 + 0.2
    }));

    const render = () => {
      // 1. Clear background
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, width, height);

      // 2. Ken-Burns Transform Calculation
      ctx.save();
      const p = progress / 100; // 0.0 to 1.0

      let zoom = 1.0 + (p * 0.2); // Default dolly push-in
      let panX = p * 25;
      let panY = -p * 15;

      if (shot?.movement?.includes('DOLLY OUT')) {
        zoom = 1.25 - (p * 0.2);
        panX = -p * 20;
      } else if (shot?.movement?.includes('CRANE')) {
        panY = p * 40;
        zoom = 1.1 + (p * 0.15);
      } else if (shot?.movement?.includes('HANDHELD') || shot?.movement?.includes('ORBIT')) {
        panX = Math.sin(p * Math.PI * 2) * 15;
        panY = Math.cos(p * Math.PI * 2) * 10;
        zoom = 1.05 + Math.sin(p * Math.PI) * 0.08;
      }

      ctx.translate(width / 2, height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-width / 2 + panX, -height / 2 + panY);

      // 3. Draw Gradient Radial Lighting Backdrop
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.4, 10,
        width * 0.5, height * 0.5, width * 0.75
      );
      grad.addColorStop(0, primaryColor + '66');
      grad.addColorStop(0.5, secondaryColor + '33');
      grad.addColorStop(1, accentColor);
      ctx.fillStyle = grad;
      ctx.fillRect(-width * 0.2, -height * 0.2, width * 1.4, height * 1.4);

      // 4. Draw Atmospheric Particles
      particles.forEach(pt => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.x < 0) pt.x = width;
        if (pt.x > width) pt.x = 0;
        if (pt.y < 0) pt.y = height;
        if (pt.y > height) pt.y = 0;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pt.alpha})`;
        ctx.fill();
      });

      // 5. Draw Stylized Character & Framing Composition Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;

      // Character Silhouette composition based on shot type
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;

      if (shot?.type?.includes('EXTREME CLOSE-UP') || shot?.type?.includes('CLOSE-UP')) {
        // Face / Head Close Up
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.45, height * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Eyes horizon guide line
        ctx.beginPath();
        ctx.moveTo(width * 0.3, height * 0.45);
        ctx.lineTo(width * 0.7, height * 0.45);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.stroke();
      } else if (shot?.type?.includes('WIDE')) {
        // Two Subject Silhouettes Wide Shot
        ctx.beginPath();
        ctx.arc(width * 0.35, height * 0.55, height * 0.14, 0, Math.PI * 2);
        ctx.arc(width * 0.65, height * 0.52, height * 0.14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        // Medium Shot Silhouette
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.48, height * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Restore transform matrix before drawing HUD Overlays
      ctx.restore();

      // 6. Draw Rule of Thirds Overlay Grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(width / 3, 0); ctx.lineTo(width / 3, height);
      ctx.moveTo((width / 3) * 2, 0); ctx.lineTo((width / 3) * 2, height);
      ctx.moveTo(0, height / 3); ctx.lineTo(width, height / 3);
      ctx.moveTo(0, (height / 3) * 2); ctx.lineTo(width, (height / 3) * 2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // 7. Draw Audio Waveform Visualizer at Bottom
      if (isPlaying && volume > 0) {
        ctx.fillStyle = '#06b6d4';
        const numBars = 32;
        const barWidth = width / numBars;
        for (let i = 0; i < numBars; i++) {
          const barHeight = Math.sin(p * 20 + i) * 12 + Math.random() * 10 + 6;
          ctx.fillRect(i * barWidth + 2, height - 32 - barHeight, barWidth - 4, barHeight);
        }
      }

      // 8. Draw Anamorphic Letterbox Masking Bars (Top & Bottom)
      const letterboxHeight = height * 0.12;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, letterboxHeight);
      ctx.fillRect(0, height - letterboxHeight, width, letterboxHeight);

      // Top Letterbox Specs Text
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`CAM REC ● 24 FPS | MOTION: ${shot?.movement || 'STATIC'}`, 16, 20);

      ctx.fillStyle = '#f59e0b';
      ctx.textAlign = 'right';
      ctx.fillText(`FOV: ${shot?.cameraSetup?.fov || 55}° | ${meta?.aspectRatio || '2.39:1'}`, width - 16, 20);
      ctx.textAlign = 'left';

      // 9. Draw Subtitle Sync Ticker (Bottom Letterbox)
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`"${shot?.description || ''}"`, width / 2, height - 12);
      ctx.textAlign = 'left';

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shot, meta, progress, isPlaying, volume]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '380px' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '14px',
          display: 'block',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 0 30px rgba(0,0,0,0.8)'
        }}
      />
    </div>
  );
}
