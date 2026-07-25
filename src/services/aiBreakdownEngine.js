/**
 * CineForge AI - Enhanced Screenplay Breakdown & Cinematography Engine
 */

export function analyzeScreenplay(scriptText, selectedPreset = null) {
  if (!scriptText || scriptText.trim().length === 0) {
    return null;
  }

  const lines = scriptText.split('\n').map(l => l.trim()).filter(Boolean);
  
  // 1. Slugline extraction
  let location = 'INT/EXT. UNKNOWN LOCATION - SCENE 1';
  let timeOfDay = 'NIGHT';
  let isInt = true;

  const sluglineMatch = lines.find(line => line.startsWith('INT.') || line.startsWith('EXT.') || line.startsWith('INT/EXT.'));
  if (sluglineMatch) {
    location = sluglineMatch;
    if (sluglineMatch.includes('EXT.')) isInt = false;
    if (sluglineMatch.includes('NIGHT')) timeOfDay = 'NIGHT';
    else if (sluglineMatch.includes('DAY')) timeOfDay = 'DAY';
    else if (sluglineMatch.includes('DAWN') || sluglineMatch.includes('DUSK')) timeOfDay = 'TWILIGHT';
  }

  // 2. Character & Action Extraction
  const characterSet = new Set();
  lines.forEach(line => {
    if (/^[A-Z]{2,}(?:\s+\([A-Z\.\s]+\))?$/.test(line) && !line.startsWith('INT') && !line.startsWith('EXT')) {
      characterSet.add(line.replace(/\s*\([^\)]+\)/, ''));
    }
  });
  const characters = Array.from(characterSet);

  // 3. Mood, Palette & Advanced Metadata
  const textLower = scriptText.toLowerCase();
  let mood = selectedPreset?.genre || 'Dramatic Tension';
  let lightingStyle = 'Low-Key Chiaroscuro';
  let colorPalette = ['#0f172a', '#38bdf8', '#e0f2fe', '#0284c7'];
  let audioAtmosphere = 'Subtle Drone, Ambient Rain, Distant Hum';
  let aspectRatio = selectedPreset?.aspectRatio || '2.39:1 Anamorphic';
  let colorTemp = selectedPreset?.colorTemp || '5600K Daylight';
  let iso = selectedPreset?.iso || 'ISO 800 - Fine Grain';

  if (textLower.includes('neon') || textLower.includes('cyber') || textLower.includes('rain') || textLower.includes('tokyo')) {
    mood = 'Sci-Fi Cyberpunk';
    lightingStyle = 'Neon Rim + Volumetric Steam';
    colorPalette = ['#0d0915', '#ec4899', '#06b6d4', '#3b82f6', '#f43f5e'];
    audioAtmosphere = 'Synthetic Rain, Neon Transformer Hum, Distant Siren, High-Pitch Cyber Whir';
    aspectRatio = '2.39:1 Anamorphic';
    colorTemp = '7000K Neon Cyan';
    iso = 'ISO 1600 - Cyber Grain';
  } else if (textLower.includes('laser') || textLower.includes('vault') || textLower.includes('bank') || textLower.includes('bypass')) {
    mood = 'Action Thriller';
    lightingStyle = 'Obsidian Low-Key + Laser Scan Glare';
    colorPalette = ['#09090b', '#10b981', '#ef4444', '#f59e0b', '#27272a'];
    audioAtmosphere = 'Vault Ozone Hum, Ticking Timer Riser, Boot Echoes, Electric Laser Whine';
    aspectRatio = '2.39:1 Anamorphic';
    colorTemp = '3200K Laser Red/Emerald';
    iso = 'ISO 400 - Ultra Sharp';
  } else if (textLower.includes('lightning') || textLower.includes('storm') || textLower.includes('glass') || textLower.includes('doctor')) {
    mood = 'Gothic Mystery';
    lightingStyle = 'Lightning Strobe + Copper Plasma Glow';
    colorPalette = ['#1c1917', '#f59e0b', '#7c3aed', '#d97706', '#44403c'];
    audioAtmosphere = 'Thunder Cracks, Rattling Glassware, Copper Vacuum Tube Resonant Drone';
    aspectRatio = '1.85:1 Academy';
    colorTemp = '4200K Amber Storm';
    iso = 'ISO 3200 - Vintage Film Grain';
  } else if (textLower.includes('detective') || textLower.includes('chinatown') || textLower.includes('coffee') || textLower.includes('jack')) {
    mood = 'Neo-Noir Crime';
    lightingStyle = 'Sodium Vapor Venetian Blind Shadows';
    colorPalette = ['#18181b', '#f59e0b', '#e4e4e7', '#71717a'];
    audioAtmosphere = 'Rain on Window, Solitary Saxophone Drone, Clock Ticking, Lighter Flick';
    aspectRatio = '2.39:1 Anamorphic';
    colorTemp = '3000K Sodium Vapor';
    iso = 'ISO 1250 - Monochrome Grain';
  } else if (textLower.includes('airlock') || textLower.includes('station') || textLower.includes('space') || textLower.includes('eva')) {
    mood = 'Deep Space Sci-Fi';
    lightingStyle = 'Emergency Strobe + High-Intensity Halogen';
    colorPalette = ['#020617', '#38bdf8', '#ef4444', '#94a3b8'];
    audioAtmosphere = 'Pressurized Suit Breathing, Magnetic Boot Clacks, Heavy Bulkhead Thud';
    aspectRatio = '2.76:1 Ultra Panavision';
    colorTemp = '6500K Cold Vacuum';
    iso = 'ISO 800 - Crisp Digital';
  }

  // 4. Shot Breakdown Generation
  const shots = generateShotList(lines, mood, isInt, characters);

  return {
    meta: {
      location,
      timeOfDay,
      isInt,
      characters,
      mood,
      lightingStyle,
      colorPalette,
      audioAtmosphere,
      aspectRatio,
      colorTemp,
      iso,
      resolution: '4K DCI (4096x2160)',
      totalShots: shots.length,
      estimatedDurationSeconds: shots.reduce((acc, s) => acc + s.durationSeconds, 0)
    },
    shots
  };
}

function generateShotList(lines, mood, isInt, characters) {
  return [
    {
      id: 'shot-1',
      number: 1,
      name: 'Establishing Atmosphere & Environment',
      type: 'EXTREME WIDE SHOT',
      angle: 'HIGH ANGLE OVERHEAD',
      lens: '18mm Ultra-Wide Anamorphic',
      focalLength: '18mm',
      aperture: 'f/4.0',
      movement: 'CRANE DOWN SLOWLY',
      lighting: isInt ? 'Dim Overhead Practical' : 'Volumetric Atmospheric Key',
      description: lines[1] || 'Wide panoramic view establishing the environmental scale and atmospheric lighting.',
      durationSeconds: 5,
      soundTag: 'Environmental Ambient Riser',
      depthOfField: 'Deep Focus (8m - ∞)',
      shutterAngle: '180° Cinema Standard',
      cameraSetup: {
        camX: 50,
        camY: 85,
        fov: 75,
        targetX: 50,
        targetY: 35,
        keyLight: { x: 20, y: 30, color: '#38bdf8', label: 'Key: Soft Top Light' },
        fillLight: { x: 80, y: 40, color: '#64748b', label: 'Fill: Ambient Shadow' },
        rimLight: { x: 50, y: 15, color: '#f43f5e', label: 'Rim: Horizon Glare' }
      }
    },
    {
      id: 'shot-2',
      number: 2,
      name: 'Subject Entry & Character Tracking',
      type: 'MEDIUM WIDE SHOT',
      angle: 'EYE LEVEL TRACKING',
      lens: '35mm Cine Prime',
      focalLength: '35mm',
      aperture: 'f/2.8',
      movement: 'STEADICAM PUSH-IN',
      lighting: 'Side Key + High-Contrast Shadow',
      description: lines[3] || `${characters[0] || 'Protagonist'} enters the frame in sharp focus against a blurred background.`,
      durationSeconds: 4,
      soundTag: 'Character Footsteps & Gear Rustle',
      depthOfField: 'Medium Focus (2.5m - 5m)',
      shutterAngle: '180° Cinema Standard',
      cameraSetup: {
        camX: 30,
        camY: 70,
        fov: 55,
        targetX: 50,
        targetY: 45,
        keyLight: { x: 15, y: 40, color: '#ec4899', label: 'Key: Neon Side Glow' },
        fillLight: { x: 75, y: 70, color: '#1e293b', label: 'Fill: Deep Shadow' },
        rimLight: { x: 60, y: 25, color: '#06b6d4', label: 'Rim: Cyber Edge' }
      }
    },
    {
      id: 'shot-3',
      number: 3,
      name: 'Dramatic Dialogue & Emotional Beat',
      type: 'MEDIUM CLOSE-UP (MCU)',
      angle: 'SLIGHT LOW ANGLE',
      lens: '50mm Anamorphic Prime',
      focalLength: '50mm',
      aperture: 'f/1.8',
      movement: 'STATIC TRIPOD WITH RACK FOCUS',
      lighting: 'Chiaroscuro Split Light',
      description: lines[5] || 'Tight framing on emotional facial reaction; background bokeh highlights light sources.',
      durationSeconds: 4,
      soundTag: 'Dialogue Pulse & Low Sub-Bass',
      depthOfField: 'Shallow Focus Bokeh (1.2m)',
      shutterAngle: '144° Crisp Action',
      cameraSetup: {
        camX: 50,
        camY: 65,
        fov: 40,
        targetX: 50,
        targetY: 40,
        keyLight: { x: 30, y: 35, color: '#f59e0b', label: 'Key: Warm 45°' },
        fillLight: { x: 70, y: 55, color: '#334155', label: 'Fill: Soft Bounce' },
        rimLight: { x: 45, y: 15, color: '#38bdf8', label: 'Rim: Hair Light' }
      }
    },
    {
      id: 'shot-4',
      number: 4,
      name: 'High-Tension Macro Insert',
      type: 'EXTREME CLOSE-UP (ECU)',
      angle: 'DUTCH TILT ANGLE',
      lens: '85mm Macro Cine',
      focalLength: '85mm',
      aperture: 'f/1.4',
      movement: 'HANDHELD MICRO-WHIP PAN',
      lighting: 'Strobe Flash + Sharp Specular',
      description: lines[7] || 'Micro insert shot focusing on tactical equipment, eyes recalibrating, or lock mechanism.',
      durationSeconds: 3,
      soundTag: 'High Frequency Metallic Click',
      depthOfField: 'Ultra Shallow Bokeh (0.5m)',
      shutterAngle: '90° High Speed Strobe',
      cameraSetup: {
        camX: 45,
        camY: 60,
        fov: 25,
        targetX: 50,
        targetY: 45,
        keyLight: { x: 25, y: 40, color: '#ef4444', label: 'Key: Laser Spot' },
        fillLight: { x: 80, y: 60, color: '#0f172a', label: 'Fill: Black Card' },
        rimLight: { x: 55, y: 20, color: '#10b981', label: 'Rim: Specular Edge' }
      }
    },
    {
      id: 'shot-5',
      number: 5,
      name: 'Climactic Scene Re-Establishment',
      type: 'WIDE ANGLE OVER THE SHOULDER',
      angle: 'LOW ANGLE HERO FRAMING',
      lens: '24mm Wide Anamorphic',
      focalLength: '24mm',
      aperture: 'f/2.0',
      movement: 'SLOW BACKWARD DOLLY OUT',
      lighting: 'Full Volumetric Backdrop Strobe',
      description: lines[9] || 'Both characters locked in high-tension confrontation as environmental threat escalates.',
      durationSeconds: 6,
      soundTag: 'Climactic Orchestral Swell & Sirens',
      depthOfField: 'Deep Focus (3m - ∞)',
      shutterAngle: '180° Cinema Standard',
      cameraSetup: {
        camX: 65,
        camY: 80,
        fov: 65,
        targetX: 40,
        targetY: 30,
        keyLight: { x: 85, y: 35, color: '#3b82f6', label: 'Key: Searchlight Beam' },
        fillLight: { x: 20, y: 70, color: '#1e293b', label: 'Fill: Low Fill' },
        rimLight: { x: 35, y: 15, color: '#ec4899', label: 'Rim: Neon Counter' }
      }
    }
  ];
}
