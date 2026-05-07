# Retail Credit Risk Reference — US Consumer Lending

> A comprehensive knowledge base for retail credit risk in the US, from basic terminology through advanced modeling and regulatory concepts. Built as a portfolio reference site using GitHub Pages.

**Live Site:** `https://[your-username].github.io/retail-credit-risk/`

---

## What's Covered

| Section | Topics |
|---------|--------|
| **01 — Basics** | Product types (mortgage, cards, auto, HELOC, personal), the credit management cycle |
| **02 — Metrics** | PD, LGD, EAD, Expected Loss, NCO, DPD, DTI, LTV, FICO score bands |
| **03 — Models** | WoE scorecards, logistic regression, survival analysis, ML approaches, bureau scores |
| **04 — Lifecycle** | Origination through charge-off, collections strategy, roll rates, champion/challenger |
| **05 — Regulation** | ECOA, FCRA, TILA, FDCPA, SCRA, CARD Act, HMDA, CFPB, Basel III, CECL |
| **06 — Advanced** | DFAST/CCAR stress testing, vintage analysis, CECL methodologies, fair lending, SR 11-7 |
| **07 — Glossary** | 44 searchable definitions from Adverse Action to Weight of Evidence |

---

## Setup: GitHub Pages Deployment

### Step 1 — Create a new GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `retail-credit-risk`
3. Set to Public, do NOT initialize with README

### Step 2 — Push this code

```bash
git init
git add .
git commit -m "Initial commit: Retail Credit Risk reference site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/retail-credit-risk.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` auto-deploys on every push

### Step 4 — Access your live site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/retail-credit-risk/
```

---

## Run Locally (No Build Required)

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .
```

Open `http://localhost:8080`

---

## Repository Structure

```
retail-credit-risk/
├── index.html                     Main single-page site
├── css/
│   └── style.css                  All styles (no framework)
├── js/
│   └── main.js                    Tabs, accordion, glossary search
├── .github/
│   └── workflows/
│       └── deploy.yml             GitHub Pages CI/CD
└── README.md
```

---

## Key Concepts

**Quantitative:** PD/LGD/EAD/EL, NCO rate, Gini/KS/AUC-ROC, PSI/CSI

**Modeling:** WoE scorecards, logistic regression, survival models, XGBoost/RF/Neural nets, SHAP explainability

**Regulatory:** ECOA disparate impact, FCRA, Basel III capital rules, CECL (ASC 326), DFAST/CCAR, SR 11-7

**Advanced:** Vintage cohort analysis, CECL methodologies, risk-based pricing, alternative data, FinTech innovation

---

## Sources

Federal Reserve, CFPB, OCC, FDIC, BIS Basel Committee, FASB ASC 326, FICO, VantageScore documentation.

*For educational and portfolio purposes. Does not constitute financial or legal advice.*
