import React from 'react';
import { Camera, Sun, Lightbulb, Compass } from 'lucide-react';

export default function LightingDiagram({ setup, shotNumber, focalLength }) {
  if (!setup) return null;

  const { camX, camY, fov, targetX, targetY, keyLight, fillLight, rimLight } = setup;

  // Calculate camera orientation angle towards target
  const deltaX = targetX - camX;
  const deltaY = targetY - camY;
  const angleRad = Math.atan2(deltaY, deltaX);
  const angleDeg = (angleRad * 180) / Math.PI;

  // FOV cone lines
  const halfFov = fov / 2;
  const leftAngleRad = ((angleDeg - halfFov) * Math.PI) / 180;
  const rightAngleRad = ((angleDeg + halfFov) * Math.PI) / 180;

  const coneLength = 60;
  const leftX = camX + Math.cos(leftAngleRad) * coneLength;
  const leftY = camY + Math.sin(leftAngleRad) * coneLength;
  const rightX = camX + Math.cos(rightAngleRad) * coneLength;
  const rightY = camY + Math.sin(rightAngleRad) * coneLength;

  return (
    <div style={{
      background: '#090d16',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#38bdf8' }}>
          <Compass size={14} /> TOP-DOWN LIGHTING & CAMERA RIG
        </div>
        <span className="badge badge-sky" style={{ fontSize: '10px' }}>Shot #{shotNumber} | {focalLength}</span>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '220px', background: '#05070c', borderRadius: '10px', overflow: 'hidden' }}>
        {/* SVG Grid */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
            </pattern>
            {/* Camera FOV Gradient */}
            <linearGradient id="fovGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid background */}
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Camera Field of View Cone */}
          <polygon
            points={`${camX},${camY} ${leftX},${leftY} ${rightX},${rightY}`}
            fill="url(#fovGrad)"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="0.5"
            strokeDasharray="1,1"
          />

          {/* Sight line */}
          <line
            x1={camX} y1={camY}
            x2={targetX} y2={targetY}
            stroke="#06b6d4"
            strokeWidth="0.75"
            strokeDasharray="2,2"
          />

          {/* Key Light Vector */}
          <line
            x1={keyLight.x} y1={keyLight.y}
            x2={targetX} y2={targetY}
            stroke={keyLight.color}
            strokeWidth="0.75"
            opacity="0.8"
          />
          <circle cx={keyLight.x} cy={keyLight.y} r="3" fill={keyLight.color} opacity="0.9" />

          {/* Fill Light Vector */}
          <line
            x1={fillLight.x} y1={fillLight.y}
            x2={targetX} y2={targetY}
            stroke={fillLight.color}
            strokeWidth="0.75"
            opacity="0.6"
          />
          <circle cx={fillLight.x} cy={fillLight.y} r="2.5" fill={fillLight.color} opacity="0.8" />

          {/* Rim Light Vector */}
          <line
            x1={rimLight.x} y1={rimLight.y}
            x2={targetX} y2={targetY}
            stroke={rimLight.color}
            strokeWidth="0.75"
            opacity="0.8"
          />
          <circle cx={rimLight.x} cy={rimLight.y} r="2.5" fill={rimLight.color} opacity="0.9" />

          {/* Subject Marker (Center Target) */}
          <circle cx={targetX} cy={targetY} r="3.5" fill="#f8fafc" stroke="#38bdf8" strokeWidth="1" />
          <text x={targetX} y={targetY - 5} fill="#f8fafc" fontSize="3" textAnchor="middle" fontWeight="bold">SUBJECT</text>

          {/* Camera Marker */}
          <circle cx={camX} cy={camY} r="3.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
          <text x={camX} y={camY + 7} fill="#38bdf8" fontSize="3" textAnchor="middle" fontWeight="bold">CAM</text>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: keyLight.color }} />
          <span>{keyLight.label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: fillLight.color }} />
          <span>{fillLight.label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: rimLight.color }} />
          <span>{rimLight.label}</span>
        </div>
      </div>
    </div>
  );
}
