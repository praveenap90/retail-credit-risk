// ===== NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== TABS =====
document.querySelectorAll('.tab-buttons').forEach(group => {
  group.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      const parent = btn.closest('.tabs-wrap');
      parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + tabId).classList.add('active');
    });
  });
});

// ===== ACCORDION =====
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // close all others
    document.querySelectorAll('.acc-btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

// ===== GLOSSARY =====
const glossaryTerms = [
  { word: 'Adverse Action', abbr: '', cat: 'regulation', def: 'A denial, revocation, or unfavorable change in credit terms. Under ECOA, lenders must provide written notice stating the principal reasons within 30 days.' },
  { word: 'Amortization', abbr: '', cat: 'products', def: 'The process of spreading loan payments over time, with each payment covering both interest and principal. Early payments are primarily interest; later payments are primarily principal.' },
  { word: 'AUC-ROC', abbr: 'Area Under Curve', cat: 'models', def: 'A model discrimination metric measuring the probability that a randomly chosen defaulter receives a higher risk score than a randomly chosen non-defaulter. Range: 0.5 (random) to 1.0 (perfect).' },
  { word: 'Basel III', abbr: '', cat: 'regulation', def: 'International regulatory framework requiring banks to hold minimum capital against risk-weighted assets. US implementation requires minimum 8% total capital ratio (CET1: 4.5%, Tier 1: 6%).' },
  { word: 'Behavioral Score', abbr: '', cat: 'models', def: 'A credit score calculated on existing account holders using transaction history, payment behavior, and account usage patterns. Distinct from application/bureau scores used at origination.' },
  { word: 'CECL', abbr: 'Current Expected Credit Loss', cat: 'regulation', def: 'FASB accounting standard (ASC 326) effective from 2020. Requires lifetime loss estimation at origination, replacing the prior incurred loss model. Day 1 reserve impact goes through retained earnings.' },
  { word: 'Charge-Off', abbr: 'C/O', cat: 'collections', def: 'The removal of a delinquent loan balance from the books as a recognized loss. 180 DPD for credit cards; 120 DPD for most closed-end consumer loans. Recovery efforts continue post charge-off.' },
  { word: 'Champion/Challenger', abbr: 'C/C', cat: 'models', def: 'A testing framework that splits account traffic between a current best strategy (champion) and a new approach (challenger) — typically 80/20 — to empirically measure performance before full rollout.' },
  { word: 'Concentration Risk', abbr: '', cat: 'metrics', def: 'Excessive exposure to a single borrower, sector, geography, or product. Regulators monitor through concentration limits and stress tests to prevent systemic portfolio losses.' },
  { word: 'Credit Bureau', abbr: '', cat: 'regulation', def: 'An agency that collects and maintains consumer credit data. The three major US bureaus are Equifax, Experian, and TransUnion. Data is shared with lenders under FCRA guidelines.' },
  { word: 'Credit Utilization', abbr: '', cat: 'metrics', def: 'The ratio of current revolving balances to total available credit limits. A key FICO factor (30% of score). Above 30% is elevated risk; above 70% is high risk.' },
  { word: 'CSI', abbr: 'Characteristic Stability Index', cat: 'models', def: 'Measures the shift in the distribution of an individual model input variable over time. Used to diagnose which characteristics are driving population drift detected by PSI.' },
  { word: 'Days Past Due', abbr: 'DPD', cat: 'collections', def: 'A measure of loan delinquency. Standard buckets: 0–29 (current), 30–59, 60–89, 90+ DPD. Bureau reporting typically begins at 30 DPD. Charge-off at 180 DPD for credit cards.' },
  { word: 'Debt-to-Income', abbr: 'DTI', cat: 'metrics', def: 'Monthly debt obligations divided by gross monthly income. Primary affordability measure in mortgage underwriting. QM (Qualified Mortgage) hard cap is 43%. Auto lending threshold typically 40–50%.' },
  { word: 'Default', abbr: '', cat: 'metrics', def: 'Failure to meet contractual repayment terms. Operationally defined as 90+ DPD for PD modeling. Regulatory charge-off definition varies by product (180 DPD for cards, 120 DPD for installment).' },
  { word: 'Disparate Impact', abbr: '', cat: 'regulation', def: 'When a facially neutral lending policy disproportionately harms a protected class under ECOA. Legally actionable even without discriminatory intent. Tested via regression and the four-fifths rule.' },
  { word: 'DFAST', abbr: 'Dodd-Frank Act Stress Test', cat: 'regulation', def: 'Annual regulatory stress test for US banks with >$100B assets. Projects 9-quarter losses under three Fed-specified scenarios: Baseline, Adverse, and Severely Adverse.' },
  { word: 'EAD', abbr: 'Exposure at Default', cat: 'metrics', def: 'The total credit exposure when default occurs. For revolving products: EAD = Balance + CCF × Unused Limit. Credit Conversion Factor (CCF) captures pre-default drawdown behavior.' },
  { word: 'ECOA', abbr: 'Equal Credit Opportunity Act', cat: 'regulation', def: 'Federal law prohibiting credit discrimination based on race, color, religion, national origin, sex, marital status, or age. Enforced by CFPB. Requires Adverse Action Notice within 30 days.' },
  { word: 'EL', abbr: 'Expected Loss', cat: 'metrics', def: 'The statistical average credit loss. EL = PD × LGD × EAD. Used in CECL provisioning, risk-based pricing (break-even APR), and economic capital allocation.' },
  { word: 'FCRA', abbr: 'Fair Credit Reporting Act', cat: 'regulation', def: 'Federal law governing credit bureau data collection and use. Grants consumers rights to dispute inaccurate data (bureaus must investigate within 30 days) and receive free annual bureau reports.' },
  { word: 'FICO Score', abbr: '', cat: 'models', def: 'The most widely used US consumer credit score (300–850). Factors: 35% payment history, 30% amounts owed, 15% length of history, 10% new credit, 10% credit mix.' },
  { word: 'Gini Coefficient', abbr: '', cat: 'models', def: 'Model discrimination metric: Gini = 2 × AUC − 1. Range 0–1. Target >40% for production models. Measures rank-ordering ability — how well the model separates good from bad accounts.' },
  { word: 'HELOC', abbr: 'Home Equity Line of Credit', cat: 'products', def: 'A revolving credit line secured by home equity. Draw period (5–10 years) followed by repayment period. Risk driven by CLTV and interest rate sensitivity. Lender may freeze draws if CLTV exceeds limits.' },
  { word: 'Information Value', abbr: 'IV', cat: 'models', def: 'Measures a variable\'s predictive power: <0.02 useless, 0.02–0.1 weak, 0.1–0.3 medium, 0.3–0.5 strong, >0.5 suspicious (check for data leakage). Used in WoE scorecard development.' },
  { word: 'KS Statistic', abbr: 'Kolmogorov-Smirnov', cat: 'models', def: 'The maximum difference between cumulative good and bad distributions at any score. KS of 40+ is generally considered a good performing model. Complement to Gini for discrimination assessment.' },
  { word: 'LGD', abbr: 'Loss Given Default', cat: 'metrics', def: 'The fraction of exposure lost when a borrower defaults, net of recovery. LGD = 1 − Recovery Rate. Unsecured products: LGD 75–100%. Secured (auto): 30–60%. Mortgage: 20–50% depending on HPI.' },
  { word: 'Loan-to-Value', abbr: 'LTV', cat: 'metrics', def: 'Ratio of loan balance to collateral value. Conventional mortgage threshold: 80% (PMI required above). Risk increases sharply at LTV >90%. Key driver of LGD in secured lending.' },
  { word: 'NCO', abbr: 'Net Charge-Off', cat: 'metrics', def: 'Gross charge-offs minus recoveries, expressed as an annualized % of average balances. The primary credit loss metric reported to investors and regulators. Formula: (C/O − Recoveries) / Avg Balances.' },
  { word: 'Negative Equity', abbr: '', cat: 'products', def: 'Occurs when the borrower owes more than the collateral is worth (LTV > 100%). Increases default incentives (no equity to protect) and loss severity (lender cannot recover full balance via repossession).' },
  { word: 'Origination', abbr: '', cat: 'products', def: 'The process of creating a new loan, from application through underwriting, approval, and funding. Origination quality is assessed through vintage analysis of subsequent credit performance.' },
  { word: 'PD', abbr: 'Probability of Default', cat: 'metrics', def: 'The estimated likelihood a borrower will default within a defined horizon (typically 12 months). Core input to EL = PD × LGD × EAD and CECL lifetime loss estimates.' },
  { word: 'PSI', abbr: 'Population Stability Index', cat: 'models', def: 'Measures drift in the overall score distribution between development and deployment. PSI <0.1 = stable; 0.1–0.2 = investigate; >0.2 = significant shift, model recalibration required.' },
  { word: 'QM', abbr: 'Qualified Mortgage', cat: 'regulation', def: 'A CFPB-defined mortgage meeting specific underwriting requirements (max 43% DTI, no risky features). Provides legal safe harbor against ability-to-repay lawsuits under TILA.' },
  { word: 'RAROC', abbr: 'Risk-Adjusted Return on Capital', cat: 'metrics', def: 'Profitability measure = Risk-adjusted net income / Economic capital. Used to compare returns across products, segments, and vintages on a risk-normalized basis. Hurdle rate typically 12–15%.' },
  { word: 'Roll Rate', abbr: '', cat: 'collections', def: 'Proportion of accounts in a delinquency bucket migrating to the next bucket. Rising roll rates are a key leading indicator of future charge-offs. Used to forecast losses from the current DPD pipeline.' },
  { word: 'SCRA', abbr: 'Servicemembers Civil Relief Act', cat: 'regulation', def: 'Provides financial protections for active-duty military: 6% interest rate cap on pre-service obligations, prohibition on foreclosure without court order. Lenders must check DMDC database.' },
  { word: 'SHAP', abbr: 'SHapley Additive exPlanations', cat: 'models', def: 'A game-theoretic method for explaining individual ML model predictions by quantifying each feature\'s contribution. Increasingly required for ML credit models to generate adverse action reason codes.' },
  { word: 'Thin File', abbr: '', cat: 'products', def: 'A consumer with insufficient credit history for traditional scoring (fewer than 3–5 trade lines, or less than 6 months of history). Approximately 26 million Americans are credit invisible per CFPB.' },
  { word: 'Trended Data', abbr: '', cat: 'models', def: 'Credit bureau data showing 24-month trajectory of balances and payments, not just a snapshot. Key differentiator of VantageScore 4.0 vs FICO. Reveals paydown velocity and balance cycling behavior.' },
  { word: 'UL', abbr: 'Unexpected Loss', cat: 'metrics', def: 'Credit losses above the expected level (EL). Banks hold regulatory capital (CET1 buffer) to absorb unexpected losses and remain solvent under stress. UL drives economic capital requirements.' },
  { word: 'VantageScore', abbr: '', cat: 'models', def: 'Consumer credit score (300–850) developed jointly by Equifax, Experian, and TransUnion. Incorporates trended data and alternative data. Scores consumers with ≥1 month of credit history (vs FICO\'s 6 months).' },
  { word: 'Vintage', abbr: '', cat: 'collections', def: 'A cohort of loans originated in the same time period (month or quarter). Vintage analysis plots cumulative loss curves to compare underwriting quality across origination periods and detect policy drift.' },
  { word: 'Weight of Evidence', abbr: 'WoE', cat: 'models', def: 'Scorecard variable transformation: WoE = ln(% Events / % Non-Events) per bin. Positive WoE = lower risk bin; negative = higher risk. Enables logistic regression on categorical and binned continuous variables.' },
  { word: 'Write-Off', abbr: '', cat: 'collections', def: 'Accounting recognition of a credit loss — removing a non-collectible asset from the balance sheet. Also called charge-off. Does not extinguish the borrower\'s legal debt obligation; recovery can continue.' },
];

// ===== FLASHCARD ENGINE =====
const catColors = {
  metrics: { bg: '#E3F2FD', border: '#1a56a0', text: '#1a56a0', label: 'Metrics' },
  models:  { bg: '#EDE7F6', border: '#7c3aed', text: '#7c3aed', label: 'Models' },
  regulation: { bg: '#FCE4EC', border: '#b91c1c', text: '#b91c1c', label: 'Regulation' },
  products:   { bg: '#E0F7FA', border: '#0f7a6e', text: '#0f7a6e', label: 'Products' },
  collections:{ bg: '#FFF3E0', border: '#b45309', text: '#b45309', label: 'Collections' },
};

let activeFilter = 'all';
let searchQuery = '';
let currentDeckIndex = 0;
let deckFlipped = false;
let flippedCount = 0;
let shuffled = false;
let deckTerms = [];
let gridMode = true;

function filteredTerms() {
  return glossaryTerms.filter(t => {
    const matchCat = activeFilter === 'all' || t.cat === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchQ = !q || t.word.toLowerCase().includes(q) || t.abbr.toLowerCase().includes(q) || t.def.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
}

function renderGrid() {
  const terms = filteredTerms();
  const grid = document.getElementById('fcGrid');
  const empty = document.getElementById('fcEmpty');
  const stat = document.getElementById('fcStatShowing');
  grid.innerHTML = '';
  if (terms.length === 0) { empty.style.display = 'block'; grid.style.display = 'none'; }
  else { empty.style.display = 'none'; grid.style.display = 'grid'; }
  stat.textContent = `${terms.length} card${terms.length !== 1 ? 's' : ''}`;

  terms.forEach((t, i) => {
    const c = catColors[t.cat] || catColors.metrics;
    const card = document.createElement('div');
    card.className = 'fc-card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="fc-card-inner">
        <div class="fc-card-front" style="border-top-color:${c.border}">
          <div class="fc-cat-badge" style="background:${c.bg};color:${c.text}">${c.label}</div>
          <div class="fc-card-word">${t.word}</div>
          ${t.abbr ? `<div class="fc-card-abbr">${t.abbr}</div>` : ''}
          <div class="fc-card-tap">Tap to reveal ↓</div>
        </div>
        <div class="fc-card-back" style="background:${c.bg};border-top-color:${c.border}">
          <div class="fc-cat-badge" style="background:rgba(255,255,255,0.7);color:${c.text}">${c.label}</div>
          <div class="fc-card-def">${t.def}</div>
          <div class="fc-card-back-word" style="color:${c.text}">${t.word}</div>
        </div>
      </div>`;
    card.addEventListener('click', () => {
      const wasFlipped = card.classList.contains('flipped');
      card.classList.toggle('flipped');
      if (!wasFlipped) { flippedCount++; document.getElementById('fcStatFlipped').textContent = `${flippedCount} flipped`; }
    });
    grid.appendChild(card);
  });
}

function updateDeckCard() {
  if (deckTerms.length === 0) return;
  const t = deckTerms[currentDeckIndex];
  const c = catColors[t.cat] || catColors.metrics;
  const inner = document.getElementById('fcDeckInner');
  deckFlipped = false;
  inner.classList.remove('flipped');
  document.getElementById('fcDeckCat').textContent = c.label;
  document.getElementById('fcDeckCat').style.color = c.text;
  document.getElementById('fcDeckTerm').textContent = t.word;
  document.getElementById('fcDeckAbbr').textContent = t.abbr || '';
  document.getElementById('fcDeckDef').textContent = t.def;
  document.getElementById('fcDeckBackTerm').textContent = t.word;
  document.getElementById('fcCurrent').textContent = currentDeckIndex + 1;
  document.getElementById('fcTotal').textContent = deckTerms.length;
  const pct = ((currentDeckIndex + 1) / deckTerms.length) * 100;
  document.getElementById('fcProgressFill').style.width = pct + '%';
  // card color
  document.getElementById('fcDeckCard').style.setProperty('--deck-border', c.border);
  document.getElementById('fcDeckCard').style.setProperty('--deck-bg', c.bg);
}

function initDeck() {
  deckTerms = [...filteredTerms()];
  currentDeckIndex = 0;
  deckFlipped = false;
  updateDeckCard();
}

// Mode toggle
document.getElementById('fcModeGrid').addEventListener('click', () => {
  gridMode = true;
  document.getElementById('fcModeGrid').classList.add('active');
  document.getElementById('fcModeDeck').classList.remove('active');
  document.getElementById('fcGridView').style.display = 'block';
  document.getElementById('fcDeckView').style.display = 'none';
  document.getElementById('fcStats').style.display = 'flex';
});
document.getElementById('fcModeDeck').addEventListener('click', () => {
  gridMode = false;
  document.getElementById('fcModeDeck').classList.add('active');
  document.getElementById('fcModeGrid').classList.remove('active');
  document.getElementById('fcGridView').style.display = 'none';
  document.getElementById('fcDeckView').style.display = 'flex';
  document.getElementById('fcStats').style.display = 'none';
  initDeck();
});

// Filters
document.getElementById('fcFilters').querySelectorAll('.fc-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fc-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.cat;
    if (gridMode) renderGrid();
    else initDeck();
  });
});

// Search
document.getElementById('fcSearch').addEventListener('input', e => {
  searchQuery = e.target.value;
  if (gridMode) renderGrid();
  else initDeck();
});

// Deck flip
document.getElementById('fcDeckCard').addEventListener('click', () => {
  deckFlipped = !deckFlipped;
  document.getElementById('fcDeckInner').classList.toggle('flipped', deckFlipped);
});

// Deck nav
document.getElementById('fcNext').addEventListener('click', () => {
  if (currentDeckIndex < deckTerms.length - 1) { currentDeckIndex++; updateDeckCard(); }
});
document.getElementById('fcPrev').addEventListener('click', () => {
  if (currentDeckIndex > 0) { currentDeckIndex--; updateDeckCard(); }
});
document.getElementById('fcShuffle').addEventListener('click', () => {
  deckTerms = deckTerms.sort(() => Math.random() - 0.5);
  currentDeckIndex = 0; updateDeckCard();
});
document.getElementById('fcRestart').addEventListener('click', () => {
  currentDeckIndex = 0; deckFlipped = false; updateDeckCard();
});

// Keyboard nav in deck mode
document.addEventListener('keydown', e => {
  if (gridMode) return;
  if (e.key === 'ArrowRight') document.getElementById('fcNext').click();
  if (e.key === 'ArrowLeft') document.getElementById('fcPrev').click();
  if (e.key === ' ') { e.preventDefault(); document.getElementById('fcDeckCard').click(); }
});

// Init count badges
document.getElementById('fc-count-all').textContent = glossaryTerms.length;

renderGrid();
document.getElementById('fcStatShowing').textContent = `${glossaryTerms.length} cards`;
document.getElementById('fcStatFlipped').textContent = '0 flipped';

// ===== NAV SCROLL HIGHLIGHT =====
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    a.style.borderBottomColor = a.getAttribute('href') === '#' + current ? 'var(--gold)' : 'transparent';
  });

  // sticky nav opacity
  document.getElementById('nav').style.boxShadow = window.scrollY > 60 ? '0 2px 20px rgba(0,0,0,0.4)' : 'none';
});

// ===== ANIMATE VINTAGE BARS ON SCROLL =====
const vintageObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.vbar-fill').forEach(bar => {
        bar.style.width = bar.style.width; // trigger repaint
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.vintage-visual').forEach(v => vintageObserver.observe(v));

// ===== CASE STUDIES ACCORDION (independent of main accordion) =====
document.querySelectorAll('.case-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.case-btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
      // reinit mermaid for newly revealed diagrams
      if (typeof mermaid !== 'undefined') {
        setTimeout(() => mermaid.init(undefined, btn.nextElementSibling.querySelectorAll('.mermaid')), 100);
      }
    }
  });
});

// ===== INTERVIEW Q&A CARD TOGGLE =====
document.querySelectorAll('.iqa-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});
