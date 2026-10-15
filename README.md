# Finova — LMS-Integrated Financial Literacy & Dean Analytics Platform

Finova is an LMS-integrated SaaS platform delivering gamified, micro-learning financial education for university students with zero faculty overhead and real-time competency analytics for Academic Deans.

Engineered and validated under the **Wadhwani Foundation Venture Viability Framework** for pilot deployment at **VIT-AP University**, Amaravati, Andhra Pradesh.

---

## 🎨 Design System: Luxury Brown & Warm Beige
- **Primary Backgrounds:** Deep Espresso (`#120D0A`), Roasted Mocha (`#1A130F`), Chestnut Card Surfaces (`#241A14`).
- **Surfacing & Text Contrast:** Cream White (`#FDFBF7`), Warm Latte (`#F5EFEB`), Soft Sand (`#D8C5B2`). High-contrast layering guarantees that no UI element or text is hidden against the background.
- **Accents:** Caramel Gold (`#DDA15E`), Antique Bronze (`#BC6C25`), Success Emerald (`#38A169`), and Terracotta (`#C96846`).
- **Typography:** Display headers in `Plus Jakarta Sans`, body text in `Inter`, data & metrics in `JetBrains Mono`.

---

## 🚀 Key Features

1. **Top Crawling Marquee Ticker:**
   - Real-time continuous financial and institutional indicators (Union Budget Section 87A rebate, EPF statutory interest, 50/30/20 benchmark, CIBIL 750+ score, Section 80E student loan deduction).

2. **Next-Level Animated Crawling Frames & Ambient Particle Engine:**
   - `crawling-border-frame` with rotating conic-gradient golden borders.
   - Interactive HTML5 canvas with floating and crawling particles reacting smoothly to cursor movement.

3. **Authentic Course Curriculum Modules (6 Comprehensive Chapters):**
   - Synthesized from **Zerodha Varsity**, **Khan Academy Finance**, **Investopedia**, and the **Income Tax Department**:
     * **Chapter 01:** *Anatomy of a Corporate Paystub & CTC Architecture (Basic, HRA, EPF, Gratuity, Form 16)*
     * **Chapter 02:** *New vs Old Tax Regime: Section 87A & ITR-1 (Sahaj)*
     * **Chapter 03:** *The 50/30/20 Rule & The 6-Month Emergency Runway*
     * **Chapter 04:** *CIBIL Credit Scores (750+) & The 'Minimum Due' Trap*
     * **Chapter 05:** *Index Funds & The Mathematical Power of Compounding*
     * **Chapter 06:** *Insurance Architecture: Term vs Endowment Traps*
   - Each chapter includes interactive knowledge check questions, real-time feedback, +XP milestone rewards, and audio chimes via the Web Audio API.

4. **Live Student Campus Activity Feed:**
   - Infinite crawling vertical feed displaying simulated real-time student completions, streak unlocks, and Dean NAAC dossier exports.

5. **Interactive Salary, Tax & Budget Engine:**
   - Real-time calculation of Gross Monthly, Net Take-Home, Monthly TDS, EPF, and 50/30/20 budget allocations.
   - Toggle between the **2024–2025 Revised New Regime** (factoring in the ₹75,000 standard deduction and Section 87A rebate) and the Old Regime.

6. **Dean Administrative Analytics Console:**
   - Department filter (*All Academic Cohorts*, *School of Computer Science & Engineering*, *School of Management*, *Biotechnology*, *School of Law*).
   - Interactive SVG Bézier trend curve showing 6-month competency progression with hover tooltips.

7. **Native LMS Integration Showcase:**
   - Canvas LTI 1.3 Advantage and Moodle Gradebook passback mockup preview.

8. **Institutional SaaS Tiers & Campus Demo Booking Modal:**
   - Department Pilot, Campus Enterprise, and Student Freemium tiers.
   - Modal with role selection and instant sandbox provisioning.

---

## ⚡ Deployment on Vercel

Finova is structured as a static application with zero build-step overhead and includes a pre-configured `vercel.json`.

### Option A: Deploy via GitHub (Recommended)
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: Finova luxury brown & beige edition with deep curriculum and crawling animations"
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **"Add New" > "Project"**.
3. Import your `Finova` repository.
4. Leave the Framework Preset as **"Other"** (Root Directory `./`).
5. Click **"Deploy"**. Your application will be live in seconds with global edge CDN caching!

### Option B: Deploy via Vercel CLI
```bash
npx vercel
```

---

## 💻 Local Development
Run any static HTTP server from the root directory:
```bash
python3 -m http.server 4242
# or
npx serve .
```
Then visit `http://localhost:4242/` in your browser.
