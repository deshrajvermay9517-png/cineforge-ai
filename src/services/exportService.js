/**
 * CineForge AI - Production Export Suite (PDF, HTML, JSON, Package All)
 */

// Helper to trigger file downloads in browser
function downloadFile(content, fileName, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 1. Export as PDF (via formatted Print Window)
export function exportDirectorTreatmentPDF(breakdownData) {
  if (!breakdownData) return;
  const { meta, shots } = breakdownData;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate the PDF print treatment.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>CineForge AI - Director's Treatment & Pre-Vis Shot Sheet</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; margin: 0; }
        .header { border-bottom: 2px solid #38bdf8; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
        .title { font-size: 26px; font-weight: 800; color: #f8fafc; margin: 0; }
        .subtitle { font-size: 14px; color: #0284c7; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
        .meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 30px; }
        .meta-card { font-size: 12px; }
        .meta-label { color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; font-weight: 600; }
        .meta-value { color: #f8fafc; font-size: 14px; font-weight: 700; }
        .shot-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .shot-table th { background: #1e293b; color: #38bdf8; text-align: left; padding: 12px; font-size: 11px; text-transform: uppercase; border-bottom: 2px solid #334155; }
        .shot-table td { padding: 12px; border-bottom: 1px solid #334155; font-size: 13px; color: #cbd5e1; }
        .badge { display: inline-block; padding: 3px 8px; background: #0284c7; color: #fff; border-radius: 4px; font-size: 10px; font-weight: 700; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #334155; text-align: center; font-size: 12px; color: #64748b; }
        @media print {
          body { background: #fff; color: #000; padding: 20px; }
          .meta-grid { background: #f1f5f9; }
          .meta-value { color: #000; }
          .shot-table th { background: #e2e8f0; color: #000; }
          .shot-table td { color: #334155; border-bottom: 1px solid #cbd5e1; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="title">CINEFORGE AI DIRECTOR'S TREATMENT</h1>
          <div class="subtitle">${meta.location}</div>
        </div>
        <div style="text-align: right;">
          <div class="badge">PRE-VIS PDF DECK</div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 5px;">Date: ${new Date().toLocaleDateString()}</div>
        </div>
      </div>
      <div class="meta-grid">
        <div class="meta-card"><div class="meta-label">Mood</div><div class="meta-value">${meta.mood}</div></div>
        <div class="meta-card"><div class="meta-label">Aspect Ratio</div><div class="meta-value">${meta.aspectRatio}</div></div>
        <div class="meta-card"><div class="meta-label">Color Temp</div><div class="meta-value">${meta.colorTemp}</div></div>
        <div class="meta-card"><div class="meta-label">Runtime</div><div class="meta-value">${meta.estimatedDurationSeconds}s (${shots.length} shots)</div></div>
      </div>
      <h2 style="font-size: 16px; color: #38bdf8;">PRODUCTION SHOT SHEET</h2>
      <table class="shot-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Framing & Angle</th>
            <th>Lens Specs</th>
            <th>Movement</th>
            <th>Lighting</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${shots.map(s => `
            <tr>
              <td><strong>#${s.number}</strong></td>
              <td><span class="badge">${s.type}</span><br><small>${s.angle}</small></td>
              <td><strong>${s.lens}</strong><br><small>${s.aperture}</small></td>
              <td>${s.movement}</td>
              <td>${s.lighting}</td>
              <td>${s.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="footer">CineForge AI — Designed for IBM AI Builders Challenge: "Reimagine Creative Industries with AI"</div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

// 2. Export Storyboard as HTML File
export function exportDirectorTreatmentHTML(breakdownData, scriptText) {
  if (!breakdownData) return;
  const { meta, shots } = breakdownData;

  const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CineForge AI Pre-Vis Export - ${meta.location}</title>
  <style>
    body { font-family: sans-serif; background: #0b0f19; color: #f8fafc; padding: 40px; }
    h1 { color: #06b6d4; }
    .card { background: #131a2a; border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px; }
    .badge { background: #0284c7; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #1e293b; padding: 10px; text-align: left; }
    th { background: #1e293b; color: #38bdf8; }
  </style>
</head>
<body>
  <h1>CineForge AI Pre-Visualization Package</h1>
  <div class="card">
    <h2>Scene: ${meta.location}</h2>
    <p><strong>Mood:</strong> ${meta.mood} | <strong>Aspect Ratio:</strong> ${meta.aspectRatio} | <strong>Color Temp:</strong> ${meta.colorTemp}</p>
    <p><strong>Audio Atmosphere:</strong> ${meta.audioAtmosphere}</p>
  </div>
  <div class="card">
    <h3>Shot Breakdown (${shots.length} Shots)</h3>
    <table>
      <thead>
        <tr><th>Shot</th><th>Type</th><th>Lens</th><th>Movement</th><th>Description</th></tr>
      </thead>
      <tbody>
        ${shots.map(s => `<tr><td>#${s.number}</td><td><span class="badge">${s.type}</span></td><td>${s.lens}</td><td>${s.movement}</td><td>${s.description}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>`;

  downloadFile(htmlString, `cineforge_storyboard_${Date.now()}.html`, 'text/html');
}

// 3. Export Shot List as JSON File
export function exportShotListJSON(breakdownData, scriptText) {
  if (!breakdownData) return;

  const exportPayload = {
    app: 'CineForge AI Studio',
    version: '1.0.0-hackathon',
    theme: 'IBM AI Builders Challenge - Reimagine Creative Industries with AI',
    exportedAt: new Date().toISOString(),
    scriptText,
    breakdown: breakdownData
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);
  downloadFile(jsonString, `cineforge_shotlist_${Date.now()}.json`, 'application/json');
}

// 4. One-Click Download All
export function exportDownloadAll(breakdownData, scriptText) {
  if (!breakdownData) return;
  // Trigger JSON download
  exportShotListJSON(breakdownData, scriptText);
  // Trigger HTML download
  setTimeout(() => {
    exportDirectorTreatmentHTML(breakdownData, scriptText);
  }, 400);
  // Trigger PDF print window
  setTimeout(() => {
    exportDirectorTreatmentPDF(breakdownData);
  }, 800);
}
