/**
 * Finova - Core Application Engine (Brown & Beige Luxury Edition)
 * Next-level animations, particle engine, authentic deep course content,
 * salary calculator, and Dean analytics console.
 */

// --- Web Audio SFX Engine (Warm Acoustic/Bronze Chimes) ---
class WarmAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof AudioContext !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playWarmTone(freq, duration = 0.2, gainLevel = 0.08) {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle'; // warm acoustic harmonic
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      // Warm pentatonic chime: D4, F#4, A4, D5
      [293.66, 369.99, 440.00, 587.33].forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.07);
        gain.gain.setValueAtTime(0.06, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.4);
      });
    } catch(e) {}
  }

  playCorrect() {
    this.playWarmTone(523.25, 0.12, 0.08); // C5
    setTimeout(() => this.playWarmTone(659.25, 0.18, 0.1), 80); // E5
    setTimeout(() => this.playWarmTone(783.99, 0.25, 0.12), 160); // G5
  }

  playError() {
    this.playWarmTone(220, 0.25, 0.08);
  }
}

const sound = new WarmAudioEngine();

// --- Ambient Particle & Neural Mesh Canvas Engine ---
class AmbientParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 55;
    this.mouse = { x: null, y: null, radius: 140 };

    this.resize();
    this.initParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    const colors = [
      'rgba(221, 161, 94, ', // caramel
      'rgba(224, 169, 109, ', // gold
      'rgba(245, 239, 235, ', // warm beige
      'rgba(188, 108, 37, '   // bronze
    ];

    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 1,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse repulsion
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= (dx / dist) * force * 2.5;
          p.y -= (dy / dist) * force * 2.5;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.colorBase + p.alpha + ')';
      this.ctx.fill();

      // Connect near neighbors
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(221, 161, 94, ${0.15 * (1 - dist / 110)})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// --- AUTHENTIC DEEP COURSE CURRICULUM (ZERODHA VARSITY, KHAN ACADEMY, INVESTOPEDIA) ---
const comprehensiveCourseDatabase = [
  {
    id: "salary-architecture",
    number: "01",
    tag: "Workforce Entry & Payroll",
    title: "Anatomy of a Corporate Paystub & CTC Architecture",
    subtitle: "Decoding Basic, HRA, EPF, Gratuity, Professional Tax, and Form 16",
    readTime: "6 min in-depth chapter",
    sourceBadge: "Curriculum Source: Zerodha Varsity & National Tax Slabs",
    xpReward: 60,
    quickSummary: "CTC represents total cost to the company, not your bank deposit. Up to 20% is withheld for statutory savings and employer obligations.",
    fullContent: `
      <h3>1. The Difference Between CTC, Gross, and Net Take-Home</h3>
      <p>When an engineering, law, or business graduate signs an offer letter stating an <strong>Annual Cost to Company (CTC) of ₹12,00,000</strong>, the immediate assumption is often that ₹1,00,000 will arrive in their bank account on the 31st of every month. In reality, net in-hand pay is typically between <strong>₹78,000 and ₹84,000</strong>.</p>
      
      <p>CTC is an umbrella accounting figure representing every rupee the firm expends to employ you. It includes:</p>
      <ul>
        <li><strong>Fixed Monthly Gross:</strong> The sum of Basic Pay, House Rent Allowance (HRA), Special Allowance, and Conveyance.</li>
        <li><strong>Statutory Provident Fund (EPF):</strong> 12% employee contribution deducted from your pay, plus 12% matching employer contribution (often deducted from your gross package).</li>
        <li><strong>Gratuity:</strong> A statutory retirement benefit mandated under the Payment of Gratuity Act, calculated as <code>(15 / 26) × Last Drawn Basic Salary × Years of Service</code>. Many firms deduct the annual gratuity accrual (~4.81% of basic) from your CTC.</li>
        <li><strong>Annual Variable Bonus / Performance Pay:</strong> Disbursed annually based on company performance ratings.</li>
      </ul>

      <h3>2. The HRA Exemption Calculation (Section 10(13A))</h3>
      <p>If you opt for the Old Tax Regime and live in rented accommodation, you can claim an income tax deduction on House Rent Allowance under Section 10(13A). The exempt amount is strictly the <em>lowest</em> of the following three figures:</p>
      <ul>
        <li>Actual HRA received from your employer.</li>
        <li>Actual rent paid minus 10% of Basic Salary.</li>
        <li>50% of Basic Salary (for metro cities: Mumbai, Delhi, Kolkata, Chennai) or 40% for non-metros.</li>
      </ul>

      <h3>3. Form 16: Your Annual Proof of Tax Compliance</h3>
      <p>Every salaried employee receives <strong>Form 16</strong> from their employer at the end of the financial year (typically by mid-June). It is bifurcated into:</p>
      <ul>
        <li><strong>Part A:</strong> Contains PAN, TAN of employer, quarter-wise TDS deposited with the Central Government, and TRACES verification certificate.</li>
        <li><strong>Part B:</strong> Complete breakdown of salary paid, standard deduction of ₹75,000, allowances exempt under section 10, and net taxable computation.</li>
      </ul>
    `,
    quiz: {
      question: "Under standard Indian payroll guidelines, what is Gratuity in an offer letter?",
      options: [
        { text: "A statutory terminal benefit accrued annually and payable upon completion of 5 continuous years of service.", correct: true, feedback: "Spot on! Gratuity is governed by the Payment of Gratuity Act and requires 5 continuous years of tenure to vest." },
        { text: "A monthly tip given by HR for punctuality in college seminars.", correct: false, feedback: "Incorrect. Gratuity is a statutory terminal retirement provision, not an attendance tip." },
        { text: "A government tax levied on students with professional degrees.", correct: false, feedback: "False. Gratuity is paid to the employee by the employer." },
        { text: "An optional discount coupon for campus bookstores.", correct: false, feedback: "Completely fictitious." }
      ]
    }
  },
  {
    id: "tax-regimes",
    number: "02",
    tag: "Income Tax & Compliance",
    title: "New vs Old Tax Regime: Section 87A & ITR-1 (Sahaj)",
    subtitle: "Analyzing the revised Union Budget tax brackets, standard deduction, and break-even points",
    readTime: "7 min in-depth chapter",
    sourceBadge: "Curriculum Source: Income Tax Department India & Union Budget Provisions",
    xpReward: 75,
    quickSummary: "Under the revised New Tax Regime with ₹75k standard deduction and Section 87A rebate, annual salaried earnings up to ₹7.75 Lakhs incur zero net tax.",
    fullContent: `
      <h3>1. The 2024–2025 Revised New Tax Regime Slabs</h3>
      <p>The revised New Tax Regime under Section 115BAC features compressed tax rates designed to reduce documentation overhead for early-career professionals:</p>
      <ul>
        <li><strong>₹0 to ₹3,00,000:</strong> 0% (Nil)</li>
        <li><strong>₹3,00,001 to ₹7,00,000:</strong> 5%</li>
        <li><strong>₹7,00,001 to ₹10,00,000:</strong> 10%</li>
        <li><strong>₹10,00,001 to ₹12,00,000:</strong> 15%</li>
        <li><strong>₹12,00,001 to ₹15,00,000:</strong> 20%</li>
        <li><strong>Above ₹15,00,000:</strong> 30%</li>
      </ul>

      <h3>2. The Magic of Section 87A & Standard Deduction</h3>
      <p>For salaried individuals, two statutory provisions make the New Regime overwhelmingly favorable for fresh graduates:</p>
      <ul>
        <li><strong>Standard Deduction of ₹75,000:</strong> Subtracted straight off gross salary with zero receipts or bills required.</li>
        <li><strong>Section 87A Full Tax Rebate:</strong> If your net taxable income does not exceed ₹7,00,000, 100% of the computed income tax is rebated to zero.</li>
        <li><strong>Net Result:</strong> A graduate with a gross salary of <code>₹7,75,000</code> deducts ₹75,000 standard deduction to arrive at ₹7,00,000 taxable income, resulting in <strong>₹0 tax liability</strong>.</li>
      </ul>

      <h3>3. The Break-Even Analysis: When Does Old Regime Win?</h3>
      <p>The Old Tax Regime only yields greater savings if you have substantial itemized deductions exceeding <strong>₹3,75,000</strong> annually across:</p>
      <ul>
        <li>Section 80C (₹1.5 Lakhs in EPF, ELSS, PPF, Life Insurance).</li>
        <li>Section 80D (₹25,000 to ₹50,000 for Health Insurance).</li>
        <li>Section 24(b) (Up to ₹2,00,000 on home loan interest).</li>
        <li>Section 10(13A) (Substantial HRA exemptions in tier-1 metro cities).</li>
      </ul>
      <p>Since recent college graduates rarely have home loans or surplus capital to lock ₹1.5L into 80C, the New Regime is mathematically superior for >90% of early-career hires.</p>
    `,
    quiz: {
      question: "Under the revised New Tax Regime, what is the maximum salaried income that pays effectively ₹0 income tax?",
      options: [
        { text: "₹7,75,000 (₹75k Standard Deduction + Section 87A rebate up to ₹7L).", correct: true, feedback: "Correct! ₹7,75,000 minus ₹75,000 standard deduction leaves ₹7,00,000, which gets fully rebated under Section 87A." },
        { text: "₹2,50,000.", correct: false, feedback: "Incorrect. ₹2.5L was the historical threshold from decades ago." },
        { text: "₹15,00,000.", correct: false, feedback: "False. Incomes above ₹15L fall into the 30% maximum marginal tax bracket." },
        { text: "There is no tax exemption for private sector graduates.", correct: false, feedback: "Completely incorrect. Section 87A applies to all resident individuals." }
      ]
    }
  },
  {
    id: "emergency-shield",
    number: "03",
    tag: "Liquidity & Safety",
    title: "The 50/30/20 Rule & The 6-Month Emergency Runway",
    subtitle: "Structuring liquid reserves, sweep-in accounts, and avoiding panic loans",
    readTime: "5 min in-depth chapter",
    sourceBadge: "Curriculum Source: Harvard Personal Finance & Investopedia Foundation",
    xpReward: 50,
    quickSummary: "Build a non-negotiable 3 to 6-month living expense runway in high-yield liquid accounts before deploying capital into speculative markets.",
    fullContent: `
      <h3>1. The 50/30/20 Budgeting Matrix for Young Adults</h3>
      <p>Originally formulated by bankruptcy expert and Harvard professor Elizabeth Warren, the 50/30/20 allocation is the gold standard framework for budgeting salary:</p>
      <ul>
        <li><strong>50% for Needs:</strong> Essential living expenses including rent, PG accommodation, utilities, groceries, health insurance, and minimum monthly student loan installments.</li>
        <li><strong>30% for Wants:</strong> Discretionary lifestyle spending: dining out, weekend travel, streaming subscriptions, fitness memberships, and apparel.</li>
        <li><strong>20% for Savings & Debt Acceleration:</strong> Funding your Emergency Runway first, followed by SIP index investments and student loan principal pre-payments.</li>
      </ul>

      <h3>2. The Three-Tier Liquidity Pyramid</h3>
      <p>Young professionals frequently make the mistake of either keeping all savings in a zero-interest checking account, or locking everything in volatile equities. Finova teaches the balanced pyramid:</p>
      <ul>
        <li><strong>Tier 1 — Immediate Cash Buffer (1 Month Expenses):</strong> Kept in your primary bank account with an automated 'sweep-in' fixed deposit feature for instant ATM/UPI access.</li>
        <li><strong>Tier 2 — Liquid Mutual Funds (2-3 Months Expenses):</strong> Overnight or Liquid Mutual Funds offering T+1 instant redemption, outperforming standard savings rates with minimal capital volatility.</li>
        <li><strong>Tier 3 — Short-Term High Yield FDs (2-3 Months Expenses):</strong> Safe, DICGC-insured bank deposits providing guaranteed returns.</li>
      </ul>
    `,
    quiz: {
      question: "Where should a graduate NEVER place their core 6-month emergency fund?",
      options: [
        { text: "In speculative crypto assets or illiquid private lock-in schemes.", correct: true, feedback: "Exactly. High volatility and illiquidity defeat the entire purpose of an emergency safety net." },
        { text: "In a sweep-in high yield bank account.", correct: false, feedback: "Sweep-in accounts are ideal because they provide instant liquidity with better interest." },
        { text: "In a short-term liquid mutual fund with instant redemption.", correct: false, feedback: "Liquid funds are widely recognized as prudent emergency parking instruments." },
        { text: "In an insured bank fixed deposit with overdraft facility.", correct: false, feedback: "This is a legitimate, safe emergency vehicle." }
      ]
    }
  },
  {
    id: "debt-defense",
    number: "04",
    tag: "Debt & Credit Defense",
    title: "CIBIL Credit Scores (750+) & The 'Minimum Due' Trap",
    subtitle: "Understanding 42% APR compounding on credit cards and student loan Section 80E tax relief",
    readTime: "6 min in-depth chapter",
    sourceBadge: "Curriculum Source: TransUnion CIBIL & Consumer Financial Protection Board",
    xpReward: 65,
    quickSummary: "Paying only 'Minimum Amount Due' triggers 36-42% annual compounding interest and revokes the interest-free grace period on every new transaction.",
    fullContent: `
      <h3>1. The 'Minimum Amount Due' (MAD) Deception</h3>
      <p>When you spend ₹40,000 on your first corporate credit card, your monthly statement displays two numbers: <strong>Total Amount Due: ₹40,000</strong> and <strong>Minimum Amount Due: ₹2,000 (5%)</strong>. Many fresh graduates mistakenly believe paying ₹2,000 satisfies the bill without penalty.</p>
      
      <p>What really happens when you only pay the minimum:</p>
      <ul>
        <li><strong>Exorbitant APR:</strong> The remaining ₹38,000 is charged finance charges between <strong>3.5% to 3.75% per month</strong>, compounding to <strong>42% to 48% annually</strong>.</li>
        <li><strong>Loss of the Interest-Free Grace Period:</strong> From the moment you roll over a balance, the standard 45-day interest-free window is revoked. Every coffee or cab fare you charge immediately begins accruing 42% APR from Day 1.</li>
      </ul>

      <h3>2. How to Build a 750+ CIBIL Score Before Age 25</h3>
      <p>A credit score above 750 unlocks lower interest rates on future car loans, mortgages, and personal credit lines. The primary levers are:</p>
      <ul>
        <li><strong>Credit Utilization Ratio (CUR):</strong> Never utilize more than 30% of your sanction limit. On a ₹1,00,000 limit card, keep statement balances below ₹30,000.</li>
        <li><strong>Payment Track Record (35% weight):</strong> Zero missed or late payments. Autopay the 'Total Statement Balance' every month.</li>
        <li><strong>Credit Age & Mix:</strong> Keep your oldest credit card active to demonstrate a long, trustworthy credit history.</li>
      </ul>

      <h3>3. Education Loan Tax Relief Under Section 80E</h3>
      <p>For graduates repaying university student loans, Section 80E of the Income Tax Act provides an extraordinary incentive: <strong>100% of the interest paid on an education loan is tax-deductible for up to 8 continuous assessment years</strong>, with <em>no upper financial cap</em>!</p>
    `,
    quiz: {
      question: "What is the recommended maximum Credit Utilization Ratio (CUR) to maintain a pristine 750+ credit score?",
      options: [
        { text: "Under 30% of your total credit limit.", correct: true, feedback: "Correct! Keeping credit utilization below 30% signals low credit risk to bureaus like CIBIL and Experian." },
        { text: "100% of your credit limit every weekend.", correct: false, feedback: "Maxing out your credit card harms your score and signals financial distress." },
        { text: "Exactly 95% at all times.", correct: false, feedback: "Incorrect. High utilization severely depresses credit scores." },
        { text: "Credit cards have zero impact on credit scores.", correct: false, feedback: "False. Credit card repayment behavior is the #1 driver of young adults' credit scores." }
      ]
    }
  },
  {
    id: "investing-compounding",
    number: "05",
    tag: "Wealth Creation",
    title: "Index Funds & The Mathematical Power of Compounding",
    subtitle: "Rule of 72, SIP rupee cost averaging, and Direct vs Regular expense ratio savings",
    readTime: "6 min in-depth chapter",
    sourceBadge: "Curriculum Source: CFA Institute & John Bogle Index Investing Principles",
    xpReward: 70,
    quickSummary: "Investing ₹5,000/month via SIP in broad index funds at 12% CAGR yields over ₹50 Lakhs in 20 years, with direct plans saving you an extra 25% in fees.",
    fullContent: `
      <h3>1. The Rule of 72 & Compound Growth</h3>
      <p>Albert Einstein famously remarked that compound interest is the eighth wonder of the world. The quickest mental math tool is the <strong>Rule of 72</strong>:</p>
      <p><code>Years to Double Your Money = 72 ÷ Expected Annual Return (%)</code></p>
      <ul>
        <li>At a 6% fixed deposit return: <code>72 ÷ 6 = 12 years</code> to double your money.</li>
        <li>At a 12% broad market equity return: <code>72 ÷ 12 = 6 years</code> to double your money.</li>
      </ul>

      <h3>2. The Costly Trap of 'Regular' Mutual Funds</h3>
      <p>When purchasing mutual funds through traditional banks or distributors, you are typically enrolled in <strong>Regular Plans</strong> which pay an ongoing distributor commission of <strong>1.0% to 1.5%</strong> each year. In contrast, <strong>Direct Plans</strong> eliminate middleman fees.</p>
      <p>A seemingly tiny 1.2% difference in annual expense ratio compounded over a 25-year career reduces your final accumulated wealth by nearly <strong>28% to 35%</strong> due to lost compounding!</p>
    `,
    quiz: {
      question: "Why should a graduate choose a 'Direct Plan' over a 'Regular Plan' for Mutual Funds?",
      options: [
        { text: "Direct plans eliminate distributor commissions, saving ~1-1.5% annually which compounds to millions over decades.", correct: true, feedback: "Accurate! Direct plans have lower expense ratios, resulting in significantly higher long-term compounding." },
        { text: "Direct plans guarantee 100% daily returns with zero market risk.", correct: false, feedback: "No equity investment has zero market risk." },
        { text: "Regular plans are banned by government decree.", correct: false, feedback: "Regular plans are legal, but cost investors higher recurring commissions." },
        { text: "Direct plans can only be purchased in physical paper form.", correct: false, feedback: "Direct plans are 100% digital." }
      ]
    }
  },
  {
    id: "insurance-shield",
    number: "06",
    tag: "Risk Mitigation",
    title: "Insurance Architecture: Term vs Endowment Traps",
    subtitle: "Why mixing investment and insurance destroys wealth, and how to structure Super Top-Ups",
    readTime: "5 min in-depth chapter",
    sourceBadge: "Curriculum Source: Insurance Regulatory and Development Authority (IRDAI) Guidelines",
    xpReward: 60,
    quickSummary: "Never mix investment with insurance. Buy pure Term Life for 10-15x income and Super Top-Up Health coverage to defeat medical inflation.",
    fullContent: `
      <h3>1. The Fundamental Axiom: Never Mix Insurance with Investment</h3>
      <p>Traditional life insurance policies (Endowment plans, Money-Back schemes, and ULIPs with hefty surrender charges) promise both life cover and a 'guaranteed' payout. In reality, their Internal Rate of Return (IRR) is historically a dismal <strong>4.5% to 5.5%</strong> — failing to even beat consumer price inflation.</p>
      <p>The prudent financial strategy is strictly bifurcated:</p>
      <ul>
        <li><strong>Pure Term Insurance:</strong> Pay a modest premium (e.g. ₹8,000/year) for pure protection of ₹1 Crore to ₹1.5 Crore cover until age 60.</li>
        <li><strong>Invest the Difference:</strong> Take the money saved on expensive endowment premiums and invest directly into low-cost index funds and EPF.</li>
      </ul>

      <h3>2. Health Insurance: Corporate Cover vs Personal Base + Super Top-Up</h3>
      <p>While your first employer provides group health insurance (typically ₹3 to ₹5 Lakhs), relying exclusively on corporate insurance leaves you dangerously exposed during job transitions or layoffs. Early-career hires should maintain a personal <strong>Base Health Plan (₹5 Lakhs) paired with a Super Top-Up (₹20-25 Lakhs)</strong> for high-deductible catastrophic security at negligible annual cost.</p>
    `,
    quiz: {
      question: "What is the primary flaw of traditional 'Endowment' or 'Money-Back' insurance plans?",
      options: [
        { text: "They deliver low returns (~4-5% IRR) that fail to beat inflation, while offering inadequate life protection cover.", correct: true, feedback: "Spot on! Endowment plans combine high premiums with low returns and insufficient protection." },
        { text: "They are completely illegal under all global laws.", correct: false, feedback: "They are legal financial products, just poor wealth-building choices." },
        { text: "They deduct 90% of your salary directly into university accounts.", correct: false, feedback: "Fictitious statement." },
        { text: "They provide too much money upon retirement.", correct: false, feedback: "Quite the opposite: returns barely match inflation." }
      ]
    }
  }
];

let activeChapterIdx = 0;
let userCompletedLessons = {};

// --- Gamified Student State ---
const studentState = {
  name: "Abhiram V.",
  university: "VIT-AP University, Amaravati",
  cohort: "B.Tech CSE '26",
  streak: 7,
  xp: 850,
  xpForNextLevel: 1000,
  level: 4,
  levelTitle: "Tax & Budget Strategist"
};

// --- Financial Calculator Core Engine ---
const CalculatorEngine = {
  calculate(inputs) {
    const ctc = Math.max(0, parseFloat(inputs.ctc) || 0);
    const loanEmi = Math.max(0, parseFloat(inputs.loanEmi) || 0);
    const emergencyTargetMonths = Math.max(1, parseFloat(inputs.emergencyTarget) || 4);
    const regime = inputs.regime || 'new';

    const monthlyGross = Math.round(ctc / 12);
    const standardDeductionAnnual = regime === 'new' ? 75000 : 50000;
    const basicMonthly = Math.round(monthlyGross * 0.45);
    const monthlyEPF = Math.round(Math.min(basicMonthly * 0.12, 1800));
    const professionalTaxMonthly = monthlyGross > 15000 ? 200 : 0;

    const annualTaxable = Math.max(0, ctc - standardDeductionAnnual - (monthlyEPF * 12));
    let annualTax = 0;

    if (regime === 'new') {
      if (annualTaxable > 1500000) {
        annualTax = 150000 + (annualTaxable - 1500000) * 0.30;
      } else if (annualTaxable > 1200000) {
        annualTax = 90000 + (annualTaxable - 1200000) * 0.20;
      } else if (annualTaxable > 1000000) {
        annualTax = 60000 + (annualTaxable - 1000000) * 0.15;
      } else if (annualTaxable > 700000) {
        annualTax = 30000 + (annualTaxable - 700000) * 0.10;
      } else if (annualTaxable > 300000) {
        annualTax = (annualTaxable - 300000) * 0.05;
      }

      if (annualTaxable <= 700000) annualTax = 0;
      else annualTax = annualTax * 1.04;
    } else {
      if (annualTaxable > 1000000) {
        annualTax = 112500 + (annualTaxable - 1000000) * 0.30;
      } else if (annualTaxable > 500000) {
        annualTax = 12500 + (annualTaxable - 500000) * 0.20;
      } else if (annualTaxable > 250000) {
        annualTax = (annualTaxable - 250000) * 0.05;
      }
      if (annualTaxable <= 500000) annualTax = 0;
      else annualTax = annualTax * 1.04;
    }

    const monthlyTDS = Math.round(annualTax / 12);
    const netInHand = Math.max(0, monthlyGross - monthlyEPF - professionalTaxMonthly - monthlyTDS);

    const needsBudget = Math.round(netInHand * 0.50);
    const wantsBudget = Math.round(netInHand * 0.30);
    const savingsBudget = Math.round(netInHand * 0.20);

    const estimatedMonthlyEssential = Math.max(loanEmi + 18000, Math.round(netInHand * 0.45));
    const targetEmergencyFundTotal = estimatedMonthlyEssential * emergencyTargetMonths;
    const monthsToEmergencyTarget = savingsBudget > 0 ? (targetEmergencyFundTotal / savingsBudget).toFixed(1) : "N/A";

    return {
      monthlyGross,
      monthlyEPF,
      professionalTaxMonthly,
      monthlyTDS,
      annualTax: Math.round(annualTax),
      netInHand,
      loanEmi,
      needsBudget,
      wantsBudget,
      savingsBudget,
      targetEmergencyFundTotal,
      monthsToEmergencyTarget,
      inHandRatio: monthlyGross > 0 ? ((netInHand / monthlyGross) * 100).toFixed(1) : 0
    };
  }
};

// --- Institutional Dean Analytics Mock Data ---
const DeanAnalytics = {
  currentDept: "all",
  departments: {
    all: {
      name: "All Academic Cohorts (Overall Institution)",
      studentsCount: 4850,
      activeRate: "93.4%",
      competencyScore: 84.6,
      competencyGrowth: "+38% vs Induction",
      avgTimeMinutes: 4.2,
      topSkill: "Tax Filing (ITR-1 & Section 87A)",
      riskCohort: "1st Year Humanities (Nudge sent via Canvas)",
      trajectory: [42, 48, 56, 68, 77, 84.6],
      lmsPassback: "99.8% (Canvas & Moodle)"
    },
    cse: {
      name: "School of Computer Science & Engineering",
      studentsCount: 2240,
      activeRate: "96.8%",
      competencyScore: 89.2,
      competencyGrowth: "+44% vs Induction",
      avgTimeMinutes: 3.8,
      topSkill: "CTC Breakdown & ESOP Taxation",
      riskCohort: "None (High placement drive readiness)",
      trajectory: [48, 57, 69, 78, 84, 89.2],
      lmsPassback: "100.0% (Canvas LTI 1.3)"
    },
    business: {
      name: "School of Management & Commerce",
      studentsCount: 1120,
      activeRate: "95.1%",
      competencyScore: 91.5,
      competencyGrowth: "+32% vs Induction",
      avgTimeMinutes: 4.9,
      topSkill: "Investment Vehicles & Liquid Shields",
      riskCohort: "Off-campus corporate interns",
      trajectory: [62, 68, 75, 82, 88, 91.5],
      lmsPassback: "99.5% (Moodle Native)"
    },
    biotech: {
      name: "Department of Biotechnology & Life Sciences",
      studentsCount: 790,
      activeRate: "88.7%",
      competencyScore: 78.4,
      competencyGrowth: "+41% vs Induction",
      avgTimeMinutes: 4.5,
      topSkill: "Student Loan Repayment (Section 80E)",
      riskCohort: "Graduating batch with higher education loans",
      trajectory: [38, 44, 52, 63, 71, 78.4],
      lmsPassback: "99.2% (Canvas LTI 1.3)"
    },
    law: {
      name: "School of Law & Governance",
      studentsCount: 700,
      activeRate: "90.2%",
      competencyScore: 81.0,
      competencyGrowth: "+35% vs Induction",
      avgTimeMinutes: 5.1,
      topSkill: "Freelance/Stipend TDS & Tax Retainers",
      riskCohort: "Bar Council examination cohort",
      trajectory: [44, 50, 58, 66, 74, 81.0],
      lmsPassback: "99.7% (Canvas LTI 1.3)"
    }
  }
};

// --- DOM Lifecycle ---
document.addEventListener('DOMContentLoaded', () => {
  new AmbientParticleCanvas('ambientCanvas');
  initNavigation();
  initCalculator();
  initCourseCurriculum();
  initDeanDashboard();
  initDemoModal();
  initSoundToggle();
  initInteractiveMockupToggle();
});

// Sound Toggle
function initSoundToggle() {
  const btn = document.getElementById('soundToggleBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isNowOn = sound.toggle();
    btn.innerHTML = isNowOn 
      ? `<svg class="w-4 h-4 text-[#DDA15E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg><span class="hidden sm:inline">SFX: ON</span>`
      : `<svg class="w-4 h-4 text-[#D8C5B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg><span class="hidden sm:inline">SFX: OFF</span>`;
    sound.playWarmTone(440, 0.1);
  });
}

// Navigation & Smooth scroll
function initNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(l => {
      l.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// Hero Tab Switcher (Student Mobile vs Dean Dashboard)
function initInteractiveMockupToggle() {
  const toggleStudent = document.getElementById('heroToggleStudent');
  const toggleDean = document.getElementById('heroToggleDean');
  const viewStudent = document.getElementById('heroViewStudent');
  const viewDean = document.getElementById('heroViewDean');

  if (!toggleStudent || !toggleDean || !viewStudent || !viewDean) return;

  toggleStudent.addEventListener('click', () => {
    sound.playWarmTone(520, 0.08);
    toggleStudent.classList.add('tab-warm-active');
    toggleStudent.classList.remove('tab-warm-inactive');
    toggleDean.classList.remove('tab-warm-active');
    toggleDean.classList.add('tab-warm-inactive');

    viewStudent.classList.remove('hidden');
    viewDean.classList.add('hidden');
  });

  toggleDean.addEventListener('click', () => {
    sound.playWarmTone(580, 0.08);
    toggleDean.classList.add('tab-warm-active');
    toggleDean.classList.remove('tab-warm-inactive');
    toggleStudent.classList.remove('tab-warm-active');
    toggleStudent.classList.add('tab-warm-inactive');

    viewDean.classList.remove('hidden');
    viewStudent.classList.add('hidden');
  });
}

// --- Interactive Salary, Tax & Budget Engine ---
function initCalculator() {
  const ctcInput = document.getElementById('calcCtc');
  const ctcDisplay = document.getElementById('calcCtcDisplay');
  const loanInput = document.getElementById('calcLoan');
  const loanDisplay = document.getElementById('calcLoanDisplay');
  const emergencyInput = document.getElementById('calcEmergency');
  const emergencyDisplay = document.getElementById('calcEmergencyDisplay');
  const regimeNewBtn = document.getElementById('regimeNew');
  const regimeOldBtn = document.getElementById('regimeOld');

  let currentRegime = 'new';

  function update() {
    const ctc = parseFloat(ctcInput.value);
    const loan = parseFloat(loanInput.value);
    const emergencyMonths = parseFloat(emergencyInput.value);

    ctcDisplay.textContent = formatINR(ctc);
    loanDisplay.textContent = formatINR(loan);
    emergencyDisplay.textContent = `${emergencyMonths} Months Runway`;

    const res = CalculatorEngine.calculate({
      ctc,
      loanEmi: loan,
      emergencyTarget: emergencyMonths,
      regime: currentRegime
    });

    document.getElementById('resMonthlyGross').textContent = formatINR(res.monthlyGross);
    document.getElementById('resInHand').textContent = formatINR(res.netInHand);
    document.getElementById('resTDS').textContent = formatINR(res.monthlyTDS);
    document.getElementById('resEPF').textContent = formatINR(res.monthlyEPF);
    document.getElementById('resAnnualTax').textContent = formatINR(res.annualTax);
    document.getElementById('resInHandRatio').textContent = `${res.inHandRatio}%`;

    document.getElementById('resNeeds').textContent = formatINR(res.needsBudget);
    document.getElementById('resWants').textContent = formatINR(res.wantsBudget);
    document.getElementById('resSavings').textContent = formatINR(res.savingsBudget);
    document.getElementById('resEmergencyTarget').textContent = formatINR(res.targetEmergencyFundTotal);
    document.getElementById('resEmergencyTimeline').textContent = `${res.monthsToEmergencyTarget} mos to goal`;
  }

  ctcInput.addEventListener('input', update);
  loanInput.addEventListener('input', update);
  emergencyInput.addEventListener('input', update);

  regimeNewBtn.addEventListener('click', () => {
    currentRegime = 'new';
    sound.playWarmTone(480, 0.06);
    regimeNewBtn.classList.add('bg-[#DDA15E]', 'text-[#120D0A]');
    regimeNewBtn.classList.remove('bg-[#241A14]', 'text-[#D8C5B2]');
    regimeOldBtn.classList.remove('bg-[#DDA15E]', 'text-[#120D0A]');
    regimeOldBtn.classList.add('bg-[#241A14]', 'text-[#D8C5B2]');
    update();
  });

  regimeOldBtn.addEventListener('click', () => {
    currentRegime = 'old';
    sound.playWarmTone(440, 0.06);
    regimeOldBtn.classList.add('bg-[#DDA15E]', 'text-[#120D0A]');
    regimeOldBtn.classList.remove('bg-[#241A14]', 'text-[#D8C5B2]');
    regimeNewBtn.classList.remove('bg-[#DDA15E]', 'text-[#120D0A]');
    regimeNewBtn.classList.add('bg-[#241A14]', 'text-[#D8C5B2]');
    update();
  });

  update();
}

// --- Deep Course Curriculum & Interactive Reader Module ---
function initCourseCurriculum() {
  const tabsContainer = document.getElementById('courseTabsContainer');
  const chapterViewer = document.getElementById('courseChapterViewer');
  const streakCounter = document.getElementById('studentStreakCounter');
  const xpCounter = document.getElementById('studentXpCounter');
  const levelBadge = document.getElementById('studentLevelBadge');
  const xpProgressBar = document.getElementById('studentXpBar');

  function renderStudentHeader() {
    if (streakCounter) streakCounter.textContent = `${studentState.streak} Days 🔥`;
    if (xpCounter) xpCounter.textContent = `${studentState.xp} XP`;
    if (levelBadge) levelBadge.textContent = `Lvl ${studentState.level}: ${studentState.levelTitle}`;
    if (xpProgressBar) {
      const pct = Math.min(100, Math.round((studentState.xp / studentState.xpForNextLevel) * 100));
      xpProgressBar.style.width = `${pct}%`;
    }
  }

  function renderTabs() {
    if (!tabsContainer) return;
    tabsContainer.innerHTML = comprehensiveCourseDatabase.map((ch, idx) => {
      const isActive = idx === activeChapterIdx;
      const isCompleted = userCompletedLessons[ch.id] !== undefined;

      return `
        <button 
          type="button" 
          class="w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
            isActive 
              ? 'bg-[#31231B] border-[#DDA15E] shadow-lg shadow-[#BC6C25]/20' 
              : 'bg-[#1A130F] border-[#DDA15E]/15 hover:border-[#DDA15E]/40 hover:bg-[#241A14]'
          }"
          data-chapter-index="${idx}"
        >
          <div class="flex items-center gap-3 truncate">
            <span class="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
              isCompleted ? 'bg-[#38A169]/20 text-[#38A169] border border-[#38A169]/40' : (isActive ? 'bg-[#DDA15E] text-[#120D0A]' : 'bg-[#241A14] text-[#D8C5B2]')
            }">
              ${isCompleted ? '✓' : ch.number}
            </span>
            <div class="truncate">
              <div class="text-xs font-bold text-[#FDFBF7] truncate">${ch.title}</div>
              <div class="text-[11px] text-[#D8C5B2] font-mono">${ch.readTime}</div>
            </div>
          </div>
          <span class="text-xs font-mono font-semibold ${isActive ? 'text-[#DDA15E]' : 'text-[#D8C5B2]'}">
            +${ch.xpReward} XP
          </span>
        </button>
      `;
    }).join('');

    tabsContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playWarmTone(500, 0.05);
        activeChapterIdx = parseInt(btn.getAttribute('data-chapter-index'), 10);
        renderTabs();
        renderChapter(activeChapterIdx);
      });
    });
  }

  function renderChapter(idx) {
    const ch = comprehensiveCourseDatabase[idx];
    if (!ch || !chapterViewer) return;

    const isAnswered = userCompletedLessons[ch.id] !== undefined;
    const chosenAnswerIdx = userCompletedLessons[ch.id];

    chapterViewer.innerHTML = `
      <div class="border-b border-[#DDA15E]/20 pb-5 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#DDA15E]/15 text-[#DDA15E] border border-[#DDA15E]/30">
              ${ch.tag}
            </span>
            <span class="text-xs text-[#D8C5B2] font-mono">Chapter ${ch.number} of 06</span>
          </div>
          <div class="text-xs font-mono text-[#DDA15E] bg-[#241A14] px-3 py-1 rounded-lg border border-[#DDA15E]/20">
            ⚡ +${ch.xpReward} XP Milestone
          </div>
        </div>

        <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-[#FDFBF7] tracking-tight mb-2">
          ${ch.title}
        </h2>
        <p class="text-sm sm:text-base text-[#D8C5B2] font-medium leading-relaxed">
          ${ch.subtitle}
        </p>

        <div class="mt-3 flex items-center gap-2 text-xs font-mono text-[#E0A96D]">
          <span>🏛️</span>
          <span>${ch.sourceBadge}</span>
        </div>
      </div>

      <!-- Quick Summary Box -->
      <div class="p-4 rounded-2xl bg-[#241A14] border border-[#DDA15E]/25 mb-6 text-sm text-[#F5EFEB] flex items-start gap-3">
        <span class="text-[#DDA15E] text-lg font-bold">💡</span>
        <div>
          <strong class="text-[#FDFBF7]">Executive Concept:</strong> ${ch.quickSummary}
        </div>
      </div>

      <!-- Deep Chapter Text Content -->
      <div class="course-prose text-sm sm:text-base mb-8">
        ${ch.fullContent}
      </div>

      <!-- Interactive Knowledge Check Quiz Box -->
      <div class="p-6 rounded-2xl bg-[#1A130F] border-2 border-[#DDA15E]/30 mb-4">
        <div class="flex items-center justify-between mb-3 text-xs font-mono">
          <span class="text-[#DDA15E] uppercase tracking-wider font-bold">✦ Knowledge Check Challenge</span>
          <span class="text-[#D8C5B2]">Pass to unlock next module</span>
        </div>

        <h4 class="text-base sm:text-lg font-bold text-[#FDFBF7] mb-4">
          ${ch.quiz.question}
        </h4>

        <div class="space-y-3" id="quizOptionsList">
          ${ch.quiz.options.map((opt, oIdx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ";
            if (!isAnswered) {
              btnClass += "bg-[#241A14] border-[#DDA15E]/20 hover:border-[#DDA15E]/60 hover:bg-[#31231B] text-[#FDFBF7] cursor-pointer";
            } else {
              if (opt.correct) {
                btnClass += "bg-[#38A169]/20 border-[#38A169] text-[#FDFBF7] font-semibold";
              } else if (oIdx === chosenAnswerIdx) {
                btnClass += "bg-[#E53E3E]/20 border-[#E53E3E] text-[#FDFBF7]";
              } else {
                btnClass += "bg-[#18120E] border-[#DDA15E]/10 text-[#D8C5B2] opacity-50";
              }
            }

            const letter = String.fromCharCode(65 + oIdx);

            return `
              <button 
                type="button" 
                class="${btnClass}" 
                data-option-idx="${oIdx}"
                ${isAnswered ? 'disabled' : ''}
              >
                <span class="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center font-mono text-xs font-bold ${
                  isAnswered && opt.correct ? 'bg-[#38A169] text-white' : (isAnswered && oIdx === chosenAnswerIdx ? 'bg-[#E53E3E] text-white' : 'bg-[#31231B] text-[#DDA15E]')
                }">
                  ${letter}
                </span>
                <span class="flex-1">${opt.text}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="mt-4 p-4 rounded-xl ${ch.quiz.options[chosenAnswerIdx]?.correct ? 'bg-[#38A169]/20 border border-[#38A169]/40' : 'bg-[#E53E3E]/20 border border-[#E53E3E]/40'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
            <div class="text-xs sm:text-sm text-[#FDFBF7]">
              <strong class="${ch.quiz.options[chosenAnswerIdx]?.correct ? 'text-[#38A169]' : 'text-[#E53E3E]'}">
                ${ch.quiz.options[chosenAnswerIdx]?.correct ? '✓ Verified Understanding!' : '✕ Review Note:'}
              </strong>
              ${ch.quiz.options[chosenAnswerIdx]?.feedback || ch.quiz.options.find(o => o.correct).feedback}
            </div>
            <button 
              id="advanceNextChapterBtn" 
              class="px-4 py-2 rounded-xl btn-gold text-xs whitespace-nowrap shadow"
            >
              Next Chapter →
            </button>
          </div>
        ` : ''}
      </div>
    `;

    if (!isAnswered) {
      chapterViewer.querySelectorAll('#quizOptionsList button').forEach(btn => {
        btn.addEventListener('click', () => {
          const optIdx = parseInt(btn.getAttribute('data-option-idx'), 10);
          handleQuizAnswer(ch, optIdx);
        });
      });
    } else {
      const nextBtn = document.getElementById('advanceNextChapterBtn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          activeChapterIdx = (activeChapterIdx + 1) % comprehensiveCourseDatabase.length;
          renderTabs();
          renderChapter(activeChapterIdx);
        });
      }
    }
  }

  function handleQuizAnswer(ch, optIdx) {
    userCompletedLessons[ch.id] = optIdx;
    const isCorrect = ch.quiz.options[optIdx]?.correct;

    if (isCorrect) {
      sound.playCorrect();
      studentState.xp += ch.xpReward;
      triggerXPToast(ch.xpReward);

      if (studentState.xp >= studentState.xpForNextLevel) {
        studentState.level += 1;
        studentState.levelTitle = "Corporate Wealth Architect";
        studentState.xpForNextLevel += 500;
        triggerLevelCelebration();
      }
    } else {
      sound.playError();
    }

    renderStudentHeader();
    renderTabs();
    renderChapter(activeChapterIdx);
  }

  renderStudentHeader();
  renderTabs();
  renderChapter(0);
}

function triggerXPToast(amount) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-24 right-8 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#DDA15E] to-[#BC6C25] text-[#120D0A] font-mono font-bold text-sm shadow-2xl shadow-[#BC6C25]/50 animate-bounce flex items-center gap-2 border border-[#FDFBF7]/40';
  toast.innerHTML = `<span>⚡ +${amount} XP EARNED</span><span class="text-xs bg-[#120D0A]/20 px-2 py-0.5 rounded">Canvas Synced</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

function triggerLevelCelebration() {
  sound.playChime();
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4';
  modal.innerHTML = `
    <div class="max-w-md w-full bg-[#1A130F] border-2 border-[#DDA15E] rounded-3xl p-8 text-center shadow-2xl relative">
      <div class="text-5xl mb-4 animate-fire-warm">🏆</div>
      <h3 class="text-2xl font-display font-extrabold text-[#FDFBF7] mb-2">Level Up! Level 5 Unlocked</h3>
      <p class="text-sm text-[#D8C5B2] mb-6 leading-relaxed">
        You've attained the status of <strong>Corporate Wealth Architect</strong>. Your verified score and accreditation token have been automatically recorded in the Dean's LMS Gradebook.
      </p>
      <div class="p-3 bg-[#241A14] rounded-xl border border-[#DDA15E]/30 text-xs font-mono text-[#DDA15E] mb-6">
        ✓ LTI 1.3 Advantage Protocol: Roster Record Passed
      </div>
      <button id="closeLevelModalBtn" class="w-full py-3.5 rounded-xl btn-gold text-sm font-bold shadow-lg">
        Continue Career Preparation
      </button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('#closeLevelModalBtn').addEventListener('click', () => {
    modal.remove();
  });
}

// --- Dean Administrative Dashboard & SVG Bezier Graph ---
function initDeanDashboard() {
  const deptSelect = document.getElementById('deanDeptSelect');
  const metricStudents = document.getElementById('deanMetricStudents');
  const metricActive = document.getElementById('deanMetricActive');
  const metricCompetency = document.getElementById('deanMetricCompetency');
  const metricGrowth = document.getElementById('deanMetricGrowth');
  const metricTime = document.getElementById('deanMetricTime');
  const metricTopSkill = document.getElementById('deanMetricTopSkill');
  const metricRisk = document.getElementById('deanMetricRisk');
  const metricLmsStatus = document.getElementById('deanMetricLmsStatus');
  const chartPath = document.getElementById('deanChartPath');
  const chartArea = document.getElementById('deanChartArea');
  const chartPointsGroup = document.getElementById('deanChartPointsGroup');

  if (!deptSelect) return;

  function updateDept(deptKey) {
    const data = DeanAnalytics.departments[deptKey] || DeanAnalytics.departments.all;
    
    if (metricStudents) metricStudents.textContent = data.studentsCount.toLocaleString();
    if (metricActive) metricActive.textContent = data.activeRate;
    if (metricCompetency) metricCompetency.textContent = `${data.competencyScore}%`;
    if (metricGrowth) metricGrowth.textContent = data.competencyGrowth;
    if (metricTime) metricTime.textContent = `${data.avgTimeMinutes}m / day`;
    if (metricTopSkill) metricTopSkill.textContent = data.topSkill;
    if (metricRisk) metricRisk.textContent = data.riskCohort;
    if (metricLmsStatus) metricLmsStatus.textContent = data.lmsPassback;

    renderSvgGraph(data.trajectory);
  }

  function renderSvgGraph(trajectory) {
    if (!chartPath || !chartArea || !chartPointsGroup) return;

    const xStep = 100;
    const xStart = 50;
    const points = trajectory.map((val, idx) => {
      const x = xStart + idx * xStep;
      const y = 170 - (val / 100) * 140;
      return { x, y, val };
    });

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }

    chartPath.setAttribute('d', d);

    const areaD = `${d} L ${points[points.length - 1].x} 185 L ${points[0].x} 185 Z`;
    chartArea.setAttribute('d', areaD);

    const months = ["Month 1 (Induction)", "Month 2", "Month 3 (Mid-term)", "Month 4", "Month 5", "Month 6 (Workplace Ready)"];
    chartPointsGroup.innerHTML = points.map((p, idx) => `
      <g class="cursor-pointer group">
        <circle cx="${p.x}" cy="${p.y}" r="6" class="fill-[#DDA15E] stroke-[#FDFBF7] stroke-2 transition-all duration-200 group-hover:r-8 group-hover:fill-[#E0A96D]"></circle>
        <title>${months[idx]}: ${p.val}% Student Competency</title>
      </g>
    `).join('');
  }

  deptSelect.addEventListener('change', (e) => {
    sound.playWarmTone(520, 0.05);
    updateDept(e.target.value);
  });

  updateDept('all');
}

// --- Request Campus Demo Modal ---
function initDemoModal() {
  const modal = document.getElementById('demoModal');
  const openBtns = document.querySelectorAll('.open-demo-modal-btn');
  const closeBtn = document.getElementById('closeDemoModalBtn');
  const form = document.getElementById('campusDemoForm');
  const confirmation = document.getElementById('demoConfirmation');

  if (!modal) return;

  openBtns.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      sound.playWarmTone(560, 0.06);
      modal.classList.remove('hidden');
      if (confirmation) confirmation.classList.add('hidden');
      if (form) form.classList.remove('hidden');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sound.playChime();
      
      const email = form.querySelector('#demoEmail').value;
      const university = form.querySelector('#demoUniversity').value;
      
      form.classList.add('hidden');
      if (confirmation) {
        confirmation.classList.remove('hidden');
        const summary = confirmation.querySelector('#demoConfirmSummary');
        if (summary) {
          summary.textContent = `A customized Canvas & Moodle LTI 1.3 sandbox package has been generated for ${university || 'your institution'} and dispatched to ${email}.`;
        }
      }
    });
  }
}

// INR Currency Formatter
function formatINR(val) {
  if (isNaN(val)) return '₹0';
  return '₹' + Math.round(val).toLocaleString('en-IN');
}
