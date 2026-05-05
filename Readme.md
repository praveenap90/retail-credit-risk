# 📊 Retail Credit Risk — A to Z

> A comprehensive reference guide covering retail credit risk from foundational terminology to advanced modelling concepts. Built as a GitHub Pages portfolio site.



---

## 📖 What's Covered

| Chapter | Topic | Key Concepts |
|---------|-------|-------------|
| 01 | **Foundations & Terminology** | PD, LGD, EAD, EL, UL, CCF, Default Definition |
| 02 | **Origination & Underwriting** | 5 Cs of Credit, Credit Decision Pipeline, DTI, LTV, Affordability |
| 03 | **Credit Scoring** | Application, Behavioural & Bureau Scores, WOE, IV, Gini, PSI, KS |
| 04 | **Portfolio Management** | NPL Ratio, Roll Rates, Vintage Analysis, Concentration Risk, RAROC |
| 05 | **Collections & Recovery** | Delinquency Stages, Forbearance, UTP, Cure Rate, Vulnerable Customers |
| 06 | **Regulation & Accounting** | Basel III, IRB Approach, IFRS 9 ECL, Staging, SICR, CECL |
| 07 | **Advanced Risk Concepts** | Economic Capital, RAROC, EVA, FTP, ICAAP, Stress Testing, TTC vs PIT PD |
| 08 | **Modern Credit Modelling** | ML Scorecards, XGBoost, SHAP, LIME, Model Risk Governance, Fairness & Bias |

---

## 🗂 Repository Structure

```
retail-credit-risk/
├── index.html          # Main GitHub Pages site (single-file, self-contained)
├── README.md           # This file
└── _config.yml         # GitHub Pages configuration
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create a new GitHub repository

```bash
git init
git add .
git commit -m "Initial commit: Retail Credit Risk reference guide"
git branch -M main
git remote add origin https://github.com/<your-username>/retail-credit-risk.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select branch: `main`, folder: `/ (root)`
5. Click **Save**

Your site will be live at:
```
https://<your-username>.github.io/retail-credit-risk/
```

*(Allow 1–2 minutes for the initial build)*

---

## 🔑 Key Concepts Quick Reference

### The Credit Risk Trinity

```
EL = PD × LGD × EAD

PD  = Probability of Default (% likelihood of default in 12 months)
LGD = Loss Given Default    (% of EAD lost after recovery)
EAD = Exposure at Default   (balance at time of default, inc. CCF)
```

### IFRS 9 Staging

```
Stage 1  →  12-month ECL     (no significant change in credit risk)
Stage 2  →  Lifetime ECL     (significant increase in credit risk / SICR)
Stage 3  →  Lifetime ECL     (credit-impaired / default)
```

### Scorecard Performance Benchmarks

| Metric | Weak | Acceptable | Good | Strong |
|--------|------|-----------|------|--------|
| Gini | < 25% | 25–40% | 40–60% | > 60% |
| KS | < 20% | 20–35% | 35–50% | > 50% |
| PSI (stable) | > 0.25 | 0.1–0.25 | < 0.1 | — |

### Basel Capital — IRB vs Standardised

| Exposure Type | SA Risk Weight | IRB Range |
|---------------|---------------|-----------|
| Residential Mortgage (LTV ≤ 80%) | 35% | 5–35% |
| Qualifying Revolving Retail | 75% | 6–75% |
| Other Retail | 75% | 10–75% |

---

## 📚 Key Regulatory References

- **Basel III / CRR3** — Capital requirements, IRB approach, output floor
- **IFRS 9** — Expected Credit Loss, three-stage model
- **ASC 326 / CECL** — US GAAP equivalent of IFRS 9
- **EBA GL/2020/06** — Loan origination and monitoring standards
- **FCA Consumer Duty (PS22/9)** — Good outcomes for retail customers
- **PRA SS1/23** — Model risk management (UK banks)
- **Fed SR 11-7** — Model risk management guidance (US)
- **ECOA / Regulation B** — Fair lending, adverse action notices
- **GDPR Article 22** — Automated decision-making rights

---

## 🛠 Tech Stack

- Pure HTML5 / CSS3 — no JavaScript frameworks, no build step
- [Google Fonts](https://fonts.google.com/) — DM Serif Display, DM Sans, JetBrains Mono
- Fully responsive; works on mobile and desktop
- Single-file architecture for GitHub Pages simplicity

---

## 📝 Usage

This site is designed as a portfolio reference. Feel free to fork it and customise it for your own use. If you find errors or want to suggest additions, open an issue or pull request.

---

## ⚖️ Disclaimer

This reference guide is intended for educational and portfolio purposes only. Regulatory requirements vary by jurisdiction and are subject to change. Always refer to the most current regulatory texts and seek qualified professional advice for production implementations.

---

*Retail Credit Risk Reference · Portfolio Edition · 2025*
