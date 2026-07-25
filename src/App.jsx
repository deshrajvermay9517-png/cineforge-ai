import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScriptInput from './components/ScriptInput';
import SceneBreakdown from './components/SceneBreakdown';
import ShotDeck from './components/ShotDeck';
import AnimaticPlayer from './components/AnimaticPlayer';
import ExportModal from './components/ExportModal';
import AboutModal from './components/AboutModal';
import CreditsModal from './components/CreditsModal';
import { SAMPLE_SCRIPTS } from './data/sampleScripts';
import { analyzeScreenplay } from './services/aiBreakdownEngine';

export default function App() {
  const [activePreset, setActivePreset] = useState(SAMPLE_SCRIPTS[0]);
  const [scriptText, setScriptText] = useState(SAMPLE_SCRIPTS[0].script);
  const [breakdownData, setBreakdownData] = useState(null);
  
  // Modals state
  const [animaticOpen, setAnimaticOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);

  // Auto-analyze initial preset script on load
  useEffect(() => {
    handleAnalyze(SAMPLE_SCRIPTS[0]);
  }, []);

  const handleAnalyze = (preset = activePreset) => {
    const result = analyzeScreenplay(scriptText, preset);
    setBreakdownData(result);
  };

  const handleSelectPreset = (preset) => {
    setActivePreset(preset);
    setScriptText(preset.script);
    const result = analyzeScreenplay(preset.script, preset);
    setBreakdownData(result);
  };

  const handleReset = () => {
    setScriptText('');
    setBreakdownData(null);
    setActivePreset(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onOpenExport={() => setExportOpen(true)}
        onOpenAnimatic={() => setAnimaticOpen(true)}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenCredits={() => setCreditsOpen(true)}
        hasData={Boolean(breakdownData)}
      />

      <main style={{
        flex: 1,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        {/* Screenplay Input Studio */}
        <ScriptInput
          scriptText={scriptText}
          setScriptText={setScriptText}
          onAnalyze={() => handleAnalyze(activePreset)}
          activePresetId={activePreset?.id}
          onSelectPreset={handleSelectPreset}
        />

        {/* Generated Scene Intelligence Header */}
        {breakdownData && (
          <SceneBreakdown meta={breakdownData.meta} />
        )}

        {/* Director's Shot Deck Grid & Table */}
        {breakdownData && (
          <ShotDeck
            shots={breakdownData.shots}
            colorPalette={breakdownData.meta?.colorPalette}
          />
        )}

        {/* Animatic Modal Timeline Player */}
        {animaticOpen && breakdownData && (
          <AnimaticPlayer
            shots={breakdownData.shots}
            meta={breakdownData.meta}
            onClose={() => setAnimaticOpen(false)}
          />
        )}

        {/* Export Modal */}
        {exportOpen && breakdownData && (
          <ExportModal
            breakdownData={breakdownData}
            scriptText={scriptText}
            onClose={() => setExportOpen(false)}
          />
        )}

        {/* About Project Modal */}
        {aboutOpen && (
          <AboutModal onClose={() => setAboutOpen(false)} />
        )}

        {/* Credits Modal */}
        {creditsOpen && (
          <CreditsModal onClose={() => setCreditsOpen(false)} />
        )}
      </main>
    </div>
  );
}
