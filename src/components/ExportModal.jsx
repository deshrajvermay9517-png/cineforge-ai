import React from 'react';
import { Download, FileCode, FileText, Printer, X, PackageCheck, Sparkles } from 'lucide-react';
import { exportDirectorTreatmentPDF, exportDirectorTreatmentHTML, exportShotListJSON, exportDownloadAll } from '../services/exportService';

export default function ExportModal({ breakdownData, scriptText, onClose }) {
  if (!breakdownData) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      backgroundColor: 'rgba(4, 6, 11, 0.92)',
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
        boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Download size={22} color="#06b6d4" />
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc' }}>
              Production Export Suite
            </h2>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Info summary */}
        <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#38bdf8', marginBottom: '4px' }}>
            SCENE: {breakdownData.meta.location}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            Package contains {breakdownData.shots.length} shots ({breakdownData.meta.estimatedDurationSeconds}s total), lighting rig maps, specs, and camera parameters.
          </div>
        </div>

        {/* One-Click Download All CTA */}
        <button
          onClick={() => exportDownloadAll(breakdownData, scriptText)}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '15px', background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
        >
          <PackageCheck size={20} /> Download All (PDF + HTML + JSON)
        </button>

        <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
          — OR CHOOSE INDIVIDUAL EXPORT FORMAT —
        </div>

        {/* Individual Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* PDF */}
          <button
            onClick={() => exportDirectorTreatmentPDF(breakdownData)}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '12px 16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Printer size={18} color="#38bdf8" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc' }}>Export Storyboard as PDF</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Print-ready director's treatment layout</div>
              </div>
            </div>
            <span className="badge badge-sky">.PDF</span>
          </button>

          {/* HTML */}
          <button
            onClick={() => exportDirectorTreatmentHTML(breakdownData, scriptText)}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '12px 16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileCode size={18} color="#f59e0b" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc' }}>Export Storyboard as HTML</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Standalone interactive HTML web document</div>
              </div>
            </div>
            <span className="badge badge-amber">.HTML</span>
          </button>

          {/* JSON */}
          <button
            onClick={() => exportShotListJSON(breakdownData, scriptText)}
            className="btn-secondary"
            style={{ justifyContent: 'space-between', padding: '12px 16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={18} color="#a855f7" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc' }}>Export Shot List as JSON</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Structured camera specs & 3D lighting coordinates</div>
              </div>
            </div>
            <span className="badge badge-violet">.JSON</span>
          </button>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '6px' }}>
          <button onClick={onClose} className="btn-secondary" style={{ fontSize: '12px' }}>
            Close Export Suite
          </button>
        </div>
      </div>
    </div>
  );
}
