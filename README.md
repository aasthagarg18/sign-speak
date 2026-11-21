# SignSpeak — Vintage Botanical ISL Communication Platform

> **"Every Sign Deserves to Be Understood."**
> An AI-powered Indian Sign Language (ISL) communication, translation, and accessibility platform designed with a sophisticated **Vintage Botanical** aesthetic.

---

## 🌿 Design Direction: Vintage Botanical

SignSpeak combines the elegance of vintage botanical natural textures and editorial typography with a modern accessibility SaaS platform:

- **Warm Ivory (`#F8F5ED`):** 50% Main canvas background
- **Soft Ivory (`#FFFDF8`):** Elevated cards, surfaces, and dialogs
- **Forest Green (`#263F32`):** 20% Primary brand anchor and headers
- **Deep Forest (`#1C3027`):** Contrast sections, navigation, and badges
- **Beige (`#E8DDCA`) & Taupe (`#A89986`):** 15% Section dividers, card borders, and secondary text
- **Sage (`#A8B49A`) & Olive (`#777A45`):** 10% Soft status highlights and tags
- **Rust (`#A65338`) & Terracotta (`#C4775C`):** 5% Primary call-to-actions, buttons, and alert states
- **Editorial Typography:** *Playfair Display* for editorial headings, paired with *DM Sans* for clean, legible body text.

---

## 🌟 Key Application Screens

### 1. 🌿 Editorial Landing Page
- **Hero Section:** Strong headline *"Every Sign Deserves to Be Understood."* with primary Rust action *"Start Communicating"* and *"Explore Features"*.
- **Floating Botanical Cards Composition:** Real-time sign preview with animated Namaste greeting, audio wave telemetry, and 98.4% match rating.
- **Core Modalities Showcase:** Detailed presentation of the 4 communication pathways.
- **How It Works (3 Steps):** Clear 1-2-3 guide to frictionless bidirectional translation.
- **Accessibility & Social Impact:** Highlighting 18M+ Deaf Indians, privacy-first computing, and WCAG AAA compliance.
- **Polished Footer:** Botanical wordmark and accessibility badges.

### 2. 📊 SaaS Dashboard
- **Personalized Welcome Banner:** Botanical foliage motif with fast launch actions.
- **4 Feature Cards:** Direct access to Sign-to-Text, Sign-to-Speech, Text-to-Sign, and Speech-to-Sign.
- **Frequent Workspaces:** Quick access to 2-Way Chat, Sign-o-Pedia, Practice Studio, and Emergency SOS.
- **Platform Telemetry:** 60+ Documented Signs, 21 MediaPipe Keypoints, 100% In-Browser Privacy, WCAG AAA.
- **Recent Sessions Activity:** Recent translated phrases with instant vocalization.
- **Sign of the Day:** Featured daily ISL vocabulary snippet.

### 3. 🤟 Sign-to-Text (Live Camera Vision)
- **MediaPipe Hands Integration:** Real-time 21-point 3D hand landmark tracking rendered directly on the user's hand with earthy forest green and terracotta skeletal bones.
- **Kinematic ISL Classifier:** Identifies Thumbs Up, Peace/V, Pointing, Open Palm, Namaste, Water, Love (ILY), Fist, L-Shape, OK/Pinch, and two-handed gestures.
- **Hold-to-Add Confirmation:** Holding a gesture steadily for ~0.8s automatically appends it to the sentence with audio feedback.
- **Interactive Simulator Bar:** Fast one-click gesture test tray.

### 4. 🔊 Sign-to-Speech (Vocal Synthesis)
- Browser `SpeechSynthesis` with auto-selection of **Indian English (`en-IN`)** and **Hindi (`hi-IN`)** voices.
- Waveform indicator, speech speed (0.5x–1.75x), pitch adjustment, and auto-vocalize toggle.

### 5. ✍️ Text-to-Sign & 🎙️ Speech-to-Sign
- **Text-to-Sign:** Tokenizes English and Indian phrases into ISL glosses with finger-spelling fallback, played in an animated avatar demonstration player.
- **Speech-to-Sign:** Live microphone recognition with interim transcription streaming directly into sequential ISL demonstrations.

### 6. 🔄 2-Way Live Conversation Room
- Split-screen dialogue bridge for Deaf Signers and Hearing Non-Signers.
- Pre-loaded scenarios: Healthcare Clinic, University Classroom, Transit Ticket Counter.
- Export complete conversation transcripts to `.txt`.

### 7. 📚 ISL Sign-o-Pedia & 🎯 Practice Studio
- **Sign-o-Pedia:** Searchable library of 60+ ISL signs with handshape, movement, and facial expression guides.
- **Practice & Quiz Studio:** Gamified sign identification quizzes, streak counters, and celebratory confetti.

### 8. 🚨 Emergency Quick-Cards (SOS)
- One-tap high-visibility emergency assistance (Doctor, Police, Fire, "I am Deaf", Hospital) with loud audio siren alarms.

---

## ♿ Accessibility (WCAG 2.1 AAA)

- **High Contrast Mode:** Pure black and high-contrast yellow/white borders.
- **Dyslexia-Friendly Typography:** Enhanced letter spacing and line height.
- **Deaf Visual Notification Flash:** Perimeter beacon glow upon sign or speech arrival.
- **Reduced Motion:** Respects user system preferences and toggles.
- **Font Scaling:** 100%, 115%, and 130% sizes.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.
