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
  { word: 'Adverse Action', abbr: '', def: 'A denial, revocation, or unfavorable change in credit terms. Under ECOA, lenders must provide written notice stating the principal reasons for the adverse action within 30 days.' },
  { word: 'Amortization', abbr: '', def: 'The process of spreading loan payments over time, with each payment covering both interest and principal. Early payments are primarily interest; later payments are primarily principal.' },
  { word: 'AUC-ROC', abbr: 'Area Under Curve', def: 'A model discrimination metric measuring the probability that a randomly chosen defaulter receives a higher risk score than a randomly chosen non-defaulter. Range: 0.5 (random) to 1.0 (perfect).' },
  { word: 'Basel III', abbr: '', def: 'International regulatory framework requiring banks to hold minimum capital against risk-weighted assets. US implementation through OCC/Fed rules requires minimum 8% total capital ratio.' },
  { word: 'Behavioral Score', abbr: '', def: 'A credit score calculated on existing account holders using transaction history, payment behavior, and account usage patterns. Distinct from application/bureau scores used at origination.' },
  { word: 'CECL', abbr: 'Current Expected Credit Loss', def: 'FASB accounting standard (ASC 326) effective from 2020 for large institutions. Requires lifetime loss estimation at origination, replacing the prior incurred loss model (IAS 39).' },
  { word: 'Charge-Off', abbr: 'C/O', def: 'The removal of a delinquent loan balance from a lender\'s books as a recognized loss. Regulatory requirement at 180 DPD for credit cards, 120 DPD for most closed-end consumer loans.' },
  { word: 'Champion/Challenger', abbr: 'C/C', def: 'A testing framework that splits account traffic between a current best-practice strategy (champion) and a new experimental strategy (challenger) to empirically test performance before full rollout.' },
  { word: 'Concentration Risk', abbr: '', def: 'Excessive exposure to a single borrower, sector, geography, or product. Regulators monitor through concentration limits and stress tests to prevent systemic risk.' },
  { word: 'Credit Bureau', abbr: '', def: 'An agency that collects and maintains consumer credit data. The three major US bureaus are Equifax, Experian, and TransUnion. Data is shared with lenders for credit evaluation.' },
  { word: 'Credit Utilization', abbr: '', def: 'The ratio of current revolving balances to total available credit limits. A key FICO factor (30% of score); above 30% is considered elevated risk by scoring models.' },
  { word: 'CSI', abbr: 'Characteristic Stability Index', def: 'Measures the shift in the distribution of an individual model input variable over time. Used to diagnose which characteristics are driving population drift detected by PSI.' },
  { word: 'Days Past Due', abbr: 'DPD', def: 'A measure of loan delinquency. Standard buckets: 0–29 DPD (current), 30–59, 60–89, 90+ DPD. Bureau reporting typically begins at 30 DPD. Charge-off at 180 DPD for cards.' },
  { word: 'Debt-to-Income', abbr: 'DTI', def: 'Monthly debt obligations divided by gross monthly income. The primary affordability measure in mortgage underwriting. QM (Qualified Mortgage) maximum is 43%.' },
  { word: 'Default', abbr: '', def: 'Failure to meet the contractual repayment terms of a loan. Operationally defined as 90+ DPD for modeling; regulatory charge-off definition varies by product type.' },
  { word: 'Disparate Impact', abbr: '', def: 'When a facially neutral lending policy disproportionately harms a protected class under ECOA. Legally actionable even without discriminatory intent. Tested via statistical analysis.' },
  { word: 'DFAST', abbr: 'Dodd-Frank Act Stress Test', def: 'Annual regulatory stress test required for US banks with over $100B in assets. Projects 9-quarter losses under Baseline, Adverse, and Severely Adverse Fed-specified scenarios.' },
  { word: 'EAD', abbr: 'Exposure at Default', def: 'The total credit exposure at the time of default. For revolving products, includes current balance plus a Credit Conversion Factor applied to undrawn commitment.' },
  { word: 'ECOA', abbr: 'Equal Credit Opportunity Act', def: 'Federal law prohibiting credit discrimination based on race, color, religion, national origin, sex, marital status, age, or receipt of public assistance. Enforced by CFPB and other regulators.' },
  { word: 'EL', abbr: 'Expected Loss', def: 'The statistical average credit loss from a portfolio. Calculated as PD × LGD × EAD. Used in CECL provisioning, risk-based pricing, and capital allocation.' },
  { word: 'FCRA', abbr: 'Fair Credit Reporting Act', def: 'Federal law governing the collection, dissemination, and use of consumer credit information. Grants consumers rights to dispute inaccurate data and receive free annual bureau reports.' },
  { word: 'FICO Score', abbr: '', def: 'The most widely used consumer credit score in the US, created by Fair Isaac Corporation. Range 300–850. Based on payment history, amounts owed, length of history, new credit, and credit mix.' },
  { word: 'Gini Coefficient', abbr: '', def: 'A model discrimination metric derived from the ROC curve: Gini = 2 × AUC − 1. Range: 0 to 1. Higher values indicate stronger separation between good and bad accounts.' },
  { word: 'HELOC', abbr: 'Home Equity Line of Credit', def: 'A revolving credit line secured by a borrower\'s home equity. Typically has a draw period (5–10 years) followed by a repayment period. Risk driven by CLTV and interest rate sensitivity.' },
  { word: 'Information Value', abbr: 'IV', def: 'A measure of a variable\'s predictive power in credit modeling. IV > 0.3 indicates a strong predictor; IV > 0.5 is suspicious and may signal data leakage.' },
  { word: 'KS Statistic', abbr: 'Kolmogorov-Smirnov', def: 'The maximum difference between cumulative good and bad distributions at any given score. Common credit model discrimination metric; a KS of 40+ is generally considered good.' },
  { word: 'LGD', abbr: 'Loss Given Default', def: 'The fraction of exposure lost when a borrower defaults, after recovery through collections, collateral liquidation, or debt sale. LGD = 1 − Recovery Rate.' },
  { word: 'Loan-to-Value', abbr: 'LTV', def: 'Ratio of loan balance to collateral value. Conventional mortgage threshold: 80% (PMI required above). Risk increases significantly at LTV >90%. Key driver of severity in mortgage defaults.' },
  { word: 'NCO', abbr: 'Net Charge-Off', def: 'Gross charge-offs minus recoveries collected from previously charged-off accounts. Reported as an annualized percentage of average outstanding balances. Primary loss metric for investors.' },
  { word: 'Origination', abbr: '', def: 'The process of creating a new loan, from application through underwriting, approval, and funding. Origination quality is assessed through vintage analysis of subsequent credit performance.' },
  { word: 'PD', abbr: 'Probability of Default', def: 'The estimated likelihood that a borrower will default within a specified time horizon (typically 12 months). Core input to Expected Loss calculations and credit pricing.' },
  { word: 'PSI', abbr: 'Population Stability Index', def: 'Measures drift in the overall score distribution between development and deployment periods. PSI > 0.2 indicates significant population shift requiring model recalibration.' },
  { word: 'QM', abbr: 'Qualified Mortgage', def: 'A CFPB-defined mortgage meeting specific requirements including max 43% DTI, no risky features, and compensation limits for loan originators. Provides legal safe harbor against ability-to-repay claims.' },
  { word: 'RAROC', abbr: 'Risk-Adjusted Return on Capital', def: 'A profitability measure that divides risk-adjusted net income by economic capital. Used to compare returns across products and segments on a risk-normalized basis.' },
  { word: 'Roll Rate', abbr: '', def: 'The proportion of accounts in a delinquency bucket that migrate to the next bucket in a subsequent period. Used to forecast future losses from the current delinquency pipeline.' },
  { word: 'SCRA', abbr: 'Servicemembers Civil Relief Act', def: 'Federal law providing financial protections for active-duty military, including a 6% interest rate cap on pre-service obligations and prohibition on foreclosure without court order.' },
  { word: 'SHAP', abbr: 'SHapley Additive exPlanations', def: 'A game-theoretic method for explaining individual ML model predictions by quantifying each feature\'s contribution. Required by many lenders for ML-based adverse action reason codes.' },
  { word: 'Thin File', abbr: '', def: 'A consumer credit file with insufficient history for traditional scoring (fewer than 3–5 trade lines, or less than 6 months of history). Approximately 26 million Americans are credit invisible.' },
  { word: 'Trended Data', abbr: '', def: 'Credit bureau data showing how account balances and payments have changed over time (24-month history), rather than just a point-in-time snapshot. Key differentiator of VantageScore 4.0.' },
  { word: 'UL', abbr: 'Unexpected Loss', def: 'Credit losses above the expected level (i.e., above EL). Banks hold regulatory capital to absorb unexpected losses and remain solvent during stress scenarios.' },
  { word: 'VantageScore', abbr: '', def: 'A consumer credit score developed jointly by Equifax, Experian, and TransUnion. Range 300–850. Scores consumers with as little as 1 month of credit history, expanding access for thin-file borrowers.' },
  { word: 'Vintage', abbr: '', def: 'A cohort of loans originated in the same time period (month or quarter). Vintage analysis compares loss curves across cohorts to assess underwriting quality and detect policy changes.' },
  { word: 'Weight of Evidence', abbr: 'WoE', def: 'A transformation applied to predictor variables in logistic regression and scorecards. WoE measures the predictive strength of each bin: ln(% Goods / % Bads) for each category.' },
  { word: 'Write-Off', abbr: '', def: 'The accounting recognition of a credit loss by removing a non-collectible asset from the balance sheet. Also called charge-off. Does not extinguish the borrower\'s legal obligation to repay.' },
];

const glossaryGrid = document.getElementById('glossaryGrid');
const glossarySearch = document.getElementById('glossarySearch');

function renderGlossary(filter = '') {
  glossaryGrid.innerHTML = '';
  const filtered = glossaryTerms.filter(t =>
    t.word.toLowerCase().includes(filter) ||
    t.abbr.toLowerCase().includes(filter) ||
    t.def.toLowerCase().includes(filter)
  );
  if (filtered.length === 0) {
    glossaryGrid.innerHTML = '<div style="color:#718096;grid-column:1/-1;padding:2rem 0">No matching terms found.</div>';
    return;
  }
  filtered.forEach(t => {
    const div = document.createElement('div');
    div.className = 'glossary-term';
    div.innerHTML = `
      <div class="term-word">${t.word}${t.abbr ? ` <span class="term-abbr">${t.abbr}</span>` : ''}</div>
      <div class="term-def">${t.def}</div>
    `;
    glossaryGrid.appendChild(div);
  });
}

renderGlossary();
glossarySearch.addEventListener('input', e => renderGlossary(e.target.value.toLowerCase().trim()));

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
