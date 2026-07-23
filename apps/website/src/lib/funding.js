// Figures published by Síkat-Aurora in its own funding report.
// Source: the organization's brand deck / bit.ly/sikatfinance, as of May 4, 2026.
// These are real published numbers — do not adjust them to make a chart look
// tidier. Update them only from a newer transparency report.

export const FUNDING_AS_OF = "May 4, 2026";

export const CASH_DONATIONS = [
  { year: "2021", amount: 161235.0 },
  { year: "2022", amount: 110078.0 },
  { year: "2023", amount: 211911.65 },
  { year: "2024", amount: 384959.5 },
  { year: "2025", amount: 547275.0 },
  // 2026 covers January to early May only, so it is not a full-year figure.
  { year: "2026", amount: 50206.47, partial: true },
];

// NOTE: in the source report the TOTAL (1,415,459.15) is the sum of 2021–2025
// only — it does not include the 2026 row, and expenses/balance are derived
// from it (1,415,459.15 − 1,349,307.83 = 66,151.32). So these summary figures
// are labelled as covering 2021–2025 rather than "to date". If a future report
// folds 2026 in, update TOTALS_PERIOD along with the numbers.
export const TOTALS_PERIOD = "2021–2025";

export const FUNDING_TOTALS = {
  cash: 1415459.15,
  inKind: 72950.0,
  expenses: 1349307.83,
  balance: 66151.32,
};

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

export const formatPeso = (n) => peso.format(n);
