# CineForge AI — Multimodal Film Pre-Visualization Studio
> **IBM AI Builders Challenge — July Theme: "Reimagine Creative Industries with AI"**

![IBM AI Builders Challenge](https://img.shields.io/badge/IBM_AI_BUILDERS-JULY_2026_THEME-0284c7?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Submission_Ready-10b981?style=for-the-badge)

CineForge AI is an intelligent pre-visualization platform built to solve the multi-week pre-production bottleneck in filmmaking, advertising, and commercial video production. By parsing raw screenplays, CineForge AI automatically derives structured director shot decks, 2D top-down camera & 3-point lighting setups, cinematic visual keyframes, and a 60fps animatic timeline studio with Web Audio synthesized soundscapes.

---

## 🌟 July Theme Alignment: "Reimagine Creative Industries with AI"

Pre-visualization (pre-vis) is the critical bridge between writing a screenplay and shooting it on set. Traditionally, filmmakers spend weeks and tens of thousands of dollars creating storyboards, camera blocking sheets, and lighting maps. 

**CineForge AI reimagines cinema pre-production by:**
- Democratizing director-level cinematography insights for indie creators and commercial ad agencies.
- Automating technical camera specs (Focal Lengths, Anamorphic ratios, Apertures, Camera Movements).
- Rendering 2D parametric vector lighting rigs (Key, Fill, Rim lights with FOV cones).
- Generating synchronized animatic motion previews with synthesized Web Audio ambient soundscapes.

---

## 📸 Key Capabilities

1. **Screenplay AI Breakdown Engine**:
   - Parses Fountain/Standard screenplay text into scene headers, location, time of day, character roster, emotional tone, and color grading swatches.
2. **Director's Shot Deck**:
   - Auto-synthesizes shot lists with specs (*18mm Anamorphic, 35mm Prime, 85mm Macro*), framing (*Extreme Wide, Medium Close-Up, Dutch Angle*), and camera movement (*Dolly Push-In, Steadicam Orbit*).
3. **Parametric SVG Lighting & Rig Diagram**:
   - Generates top-down 2D set layouts per shot displaying subject position, camera angle cone, and 3-point lighting setups (Key, Fill, Rim lights).
4. **Animatic Timeline Studio & Canvas Engine**:
   - 60fps HTML5 Canvas playback engine with Ken-Burns pan/zoom transform matrices, rule-of-thirds grid, and live Web Audio waveform visualizer.
5. **Production Export Suite**:
   - One-click export to **PDF Storyboard Treatment**, **Standalone HTML Web Document**, **Shot List JSON**, or **Download All**.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Icons**: Lucide React (`lucide-react`)
- **Styling**: Modern Vanilla CSS with CSS Variables (Dark Glassmorphism UI, Neon Amber/Teal accents)
- **Visuals & Diagramming**: SVG Parametric Vector Engine & HTML5 Canvas Procedural Motion Engine
- **Audio Engine**: Web Audio API Soundscape Synthesizer
- **Exporting Suite**: Native Print API + HTML-to-PDF / JSON export formatting

---

## 🧑‍⚖️ 2-Minute Judge Testing Instructions

1. **Launch Studio**:
   - Open `http://localhost:5173` in your browser.
2. **Screenplay Input & Presets**:
   - Click one of the pre-loaded presets in the top bar or input section (e.g. **"Neo-Tokyo: Alleyway Excursion"** or **"The Midnight Vault"**).
   - Toggle **Script View** to inspect Courier monospace screenplay formatting.
   - Click **"Generate Pre-Vis Deck"**.
3. **Scene Intelligence & Shot Deck**:
   - Observe the derived **Emotional Tone**, **Lighting Profile**, and **Color Grading Palette**.
   - Scroll through the 5 generated shot cards. Toggle the **Rule-of-Thirds Grid** or adjust the **Duration Slider** on any card.
   - Click **"View Top-Down Lighting Rig"** to inspect the 2D vector camera cone and 3-point lighting setup.
4. **Animatic Timeline Studio**:
   - Click **"Animatic Studio"** in the top navbar.
   - Hit **Play** to observe 60fps canvas Ken-Burns motion pan/zoom, Web Audio synth soundscapes, and filmstrip scrubbing.
5. **Export Suite**:
   - Click **"Export Suite"** and select **"Download All (PDF + HTML + JSON)"**.

---

## Live App Links

- **Live Application Link**: [MatchMind AI Live Demo](https://matchmind-ai-deshraj.vercel.app)

---

## 📦 Quickstart & Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/cineforge-ai.git

# 2. Navigate to directory
cd cineforge-ai

# 3. Install dependencies
npm install

# 4. Launch dev server
npm run dev

# 5. Build production bundle
npm run build
```

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for details.
