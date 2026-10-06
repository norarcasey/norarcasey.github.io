#!/usr/bin/env node
// Drive Dinora locally and screenshot it, with invented money and nothing of Nora's.
//
// Start Dinora's dev server against a URL that does not resolve, on the Node its
// .node-version names (pnpm refuses any other):
//
//   cd ~/src/dinora/apps/web
//   VITE_SUPABASE_URL=https://stub.localhost VITE_SUPABASE_ANON_KEY=stub \
//     fnm exec --using=../../.node-version pnpm exec vite --port 5373 --strictPort
//
// then, from this repo:
//
//   node scripts/shootDinora.mjs /tmp/shots
//
// The app is real: the dev server, the components, the charts, the budget's
// arithmetic. Only the rows are invented, and they are invented from nothing:
// a household with a condo, a car loan, two cards, a euro account and some
// savings, whose every figure comes from the generator below. Nora asked for
// exactly this (CASEY-2): screenshots that look real and show none of her
// finances. No institution she banks with is named, and no amount is hers.
//
// **Nothing can leave this machine.** Dinora's own .env.local points at the
// production project, so this is the Noratives driver's single catch-all: it
// answers what it knows and aborts everything else. Dinora loads its display
// face from the bundle, so unlike Noratives nothing outside is let through.
//
// Every row goes through the app's own Zod schemas, and a row that does not
// fit fails its table's read, which shows as an empty screen with nothing
// said: a shot that comes out blank is the first place to look. The
// PostgREST answers honour `offset`, `limit`, `is` and `gte`, because the app
// pages every table a thousand rows at a time, and a stub that ignored the
// range would hand it the same page until it gave up.
import { mkdirSync } from "node:fs";

import { chromium } from "@playwright/test";

const OUT = process.argv[2];
if (!OUT) throw new Error("usage: node scripts/shootDinora.mjs <out dir>");
const BASE = "http://localhost:5373";
const USER = "11111111-1111-1111-1111-111111111111";
const DESKTOP = { width: 1280, height: 900 };
// 16:9, so the case study's media frame is filled rather than cropped.
const HERO = { width: 1440, height: 810 };
const PHONE = { width: 390, height: 844 };

mkdirSync(OUT, { recursive: true });

// ── Time, all of it relative to the day the shots are taken ─────────────
const DAY_MS = 86_400_000;
const NOW = Date.now();
const iso = (ms) => new Date(ms).toISOString();
const dayOf = (ms) => iso(ms).slice(0, 10);
const daysAgo = (d) => NOW - d * DAY_MS;
const TODAY = dayOf(NOW);
const firstOfMonth = (monthsBack) => {
  const d = new Date(NOW);
  return dayOf(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - monthsBack, 1));
};
const STAMP = iso(daysAgo(0.2));

// A seeded generator, so a re-run draws the same household.
let seed = 20261007;
const rand = () => {
  seed = (seed * 1_103_515_245 + 12_345) % 2 ** 31;
  return seed / 2 ** 31;
};
const between = (lo, hi) => lo + rand() * (hi - lo);
const cents = (dollars) => Math.round(dollars * 100);

let counter = 0;
const uid = (prefix) =>
  `${prefix}0000000-0000-4000-8000-${String(++counter).padStart(12, "0")}`;
const live = (row) => ({ updated_at: STAMP, deleted_at: null, ...row });

// ── Accounts ─────────────────────────────────────────────────────────────
// Balances are what the bank reports: a card or a loan is negative.
const A = {
  checking: ["Chase", "Total Checking", "USD", 6_842.17, "cash", "simplefin"],
  savings: [
    "Ally Bank",
    "Online Savings",
    "USD",
    18_406.55,
    "cash",
    "simplefin",
  ],
  euro: ["BBVA", "Cuenta Online", "EUR", 3_215.4, "cash", "simplefin"],
  sapphire: [
    "Chase",
    "Sapphire Preferred",
    "USD",
    -1_284.33,
    "card",
    "simplefin",
  ],
  amex: [
    "American Express",
    "Blue Cash Everyday",
    "USD",
    -462.1,
    "card",
    "simplefin",
  ],
  brokerage: [
    "Fidelity",
    "Individual Brokerage",
    "USD",
    48_920.12,
    "investment",
    "simplefin",
  ],
  roth: ["Vanguard", "Roth IRA", "USD", 31_505.77, "investment", "simplefin"],
  mortgage: [
    "Rocket Mortgage",
    "Home Loan",
    "USD",
    -246_310.0,
    "loan",
    "plaid",
  ],
  auto: ["Honda Financial", "Auto Loan", "USD", -9_874.45, "loan", "plaid"],
};

const ACCOUNTS = {};
const ACCOUNT_GROUPS = [];
for (const [
  key,
  [institution, name, currency, balance, group, source],
] of Object.entries(A)) {
  const id = uid("a");
  ACCOUNTS[key] = live({
    id,
    institution,
    name,
    currency,
    balance_minor: cents(balance),
    balance_at: iso(daysAgo(0.25)),
    holdings: group === "investment" ? 6 : 0,
    source,
  });
  ACCOUNT_GROUPS.push(live({ id: uid("g"), account_id: id, kind: group }));
}

const BANK_PULLS = [
  live({
    id: uid("p"),
    source: "simplefin",
    outcome: "ok",
    finished_at: iso(daysAgo(0.25)),
    detail: "",
  }),
  live({
    id: uid("p"),
    source: "plaid",
    outcome: "ok",
    finished_at: iso(daysAgo(0.24)),
    detail: "",
  }),
];

// ── A year of balances, one row an account a day ─────────────────────────
// Drawn backwards from today's balance: savings and investments grew into
// it, the loans shrank into it, checking saws around two paydays a month.
const SHAPE = {
  checking: (d) => -900 * Math.sin((2 * Math.PI * d) / 15) - d * 1.2,
  savings: (d) => -d * 22,
  euro: (d) => 120 * Math.sin(d / 9) - d * 1.5,
  sapphire: (d) => 700 * Math.sin((2 * Math.PI * d) / 30),
  amex: (d) => 220 * Math.sin((2 * Math.PI * d) / 30 + 1),
  brokerage: (d) => -d * 31 + 1_400 * Math.sin(d / 23) - 900 * Math.sin(d / 7),
  roth: (d) => -d * 19 + 800 * Math.sin(d / 29),
  mortgage: (d) => -d * 26.5,
  auto: (d) => -d * 11.2,
};
const BALANCE_SNAPSHOTS = [];
for (const [key, account] of Object.entries(ACCOUNTS)) {
  for (let d = 365; d >= 0; d -= 1) {
    const at = dayOf(daysAgo(d));
    const balance =
      account.balance_minor / 100 +
      SHAPE[key](d) -
      SHAPE[key](0) +
      between(-1, 1) * 40;
    BALANCE_SNAPSHOTS.push(
      live({
        id: uid("s"),
        account_id: account.id,
        on_date: at,
        kind: "read",
        currency: account.currency,
        balance_minor: cents(balance),
        as_of: iso(daysAgo(d - 0.75)),
      })
    );
  }
}

// ── The ECB's euro, so the euro account counts in a dollar total ─────────
const FX_RATES = [];
for (let d = 400; d >= 0; d -= 1) {
  const day = new Date(daysAgo(d)).getUTCDay();
  if (day === 0 || day === 6) continue;
  FX_RATES.push(
    live({
      id: uid("f"),
      source: "ecb",
      base: "EUR",
      quote: "USD",
      rate_date: dayOf(daysAgo(d)),
      rate: (1.155 + 0.012 * Math.sin(d / 17)).toFixed(4),
    })
  );
}

// ── A card's terms ───────────────────────────────────────────────────────
const ACCOUNT_TERMS = [
  live({
    id: uid("t"),
    account_id: ACCOUNTS.sapphire.id,
    kind: "credit_limit",
    effective_on: "2024-02-01",
    amount_minor: cents(16_000),
    rate_bp: null,
    ends_on: null,
  }),
  live({
    id: uid("t"),
    account_id: ACCOUNTS.sapphire.id,
    kind: "purchase_apr",
    effective_on: "2024-02-01",
    amount_minor: null,
    rate_bp: 2_149,
    ends_on: null,
  }),
  live({
    id: uid("t"),
    account_id: ACCOUNTS.amex.id,
    kind: "credit_limit",
    effective_on: "2023-06-15",
    amount_minor: cents(7_500),
    rate_bp: null,
    ends_on: null,
  }),
];

// ── What is owned beside the accounts ────────────────────────────────────
const asset = (row) =>
  live({
    id: uid("e"),
    acquired_on: null,
    cost_minor: null,
    financed_by: null,
    address: null,
    postal_code: null,
    vin: null,
    odometer_miles: null,
    odometer_on: null,
    metal: null,
    metal_mg: null,
    fineness: null,
    coin: null,
    coin_quantity: null,
    currency: "USD",
    ...row,
  });
const ASSET = {
  condo: asset({
    name: "Condo",
    kind: "home",
    acquired_on: "2021-05-14",
    cost_minor: cents(318_000),
    financed_by: ACCOUNTS.mortgage.id,
    address: "1427 Linden Ave, Unit 3",
    postal_code: "97214",
  }),
  car: asset({
    name: "2022 Honda CR-V",
    kind: "vehicle",
    acquired_on: "2022-08-20",
    cost_minor: cents(31_850),
    financed_by: ACCOUNTS.auto.id,
    vin: "7FARW2H85NE000000",
    odometer_miles: 38_210,
    odometer_on: dayOf(daysAgo(40)),
  }),
  silver: asset({
    name: "Silver rounds",
    kind: "valuables",
    acquired_on: "2025-03-10",
    cost_minor: cents(660),
    metal: "silver",
    // Twenty troy ounces.
    metal_mg: 622_070,
    fineness: 999,
  }),
  ether: asset({
    name: "Ether",
    kind: "crypto",
    coin: "ETH",
    coin_quantity: "1.85",
  }),
};

const value = (assetId, d, dollars, source, extra = {}) =>
  live({
    id: uid("v"),
    asset_id: assetId,
    valued_on: dayOf(daysAgo(d)),
    amount_minor: cents(dollars),
    source,
    provider: null,
    low_minor: null,
    high_minor: null,
    coin_quantity: null,
    created_at: iso(daysAgo(d)),
    ...extra,
  });
const since = (day) => Math.round((NOW - Date.parse(day)) / DAY_MS);
const ASSET_VALUES = [
  value(ASSET.condo.id, since("2021-05-14"), 318_000, "entered"),
  value(ASSET.condo.id, 420, 362_000, "entered"),
  value(ASSET.condo.id, 45, 365_000, "entered"),
  value(ASSET.car.id, since("2022-08-20"), 31_850, "entered"),
  value(ASSET.car.id, 410, 24_500, "entered"),
];
// A weekly market estimate beside the value entered by hand: the entered one
// wins, and the estimate sits next to it, quieter (ACCT-11).
for (let w = 12; w >= 0; w -= 1) {
  const home = 371_500 + w * -220 + between(-1, 1) * 1_500;
  ASSET_VALUES.push(
    value(ASSET.condo.id, w * 7 + 1, home, "estimate", {
      provider: "rentcast",
      low_minor: cents(home * 0.93),
      high_minor: cents(home * 1.07),
    })
  );
  const car = 23_400 + w * 85 + between(-1, 1) * 200;
  ASSET_VALUES.push(
    value(ASSET.car.id, w * 7 + 2, car, "estimate", {
      provider: "marketcheck",
      low_minor: cents(car * 0.9),
      high_minor: cents(car * 1.1),
    })
  );
}

const METAL_PRICES = [];
for (
  let d = Math.ceil((NOW - Date.parse("2025-03-03")) / DAY_MS);
  d >= 0;
  d -= 1
) {
  const day = new Date(daysAgo(d)).getUTCDay();
  if (day === 0 || day === 6) continue;
  METAL_PRICES.push(
    live({
      id: uid("m"),
      source: "lbma",
      metal: "silver",
      currency: "USD",
      price_date: dayOf(daysAgo(d)),
      price: (49.5 - d * 0.034 + 1.4 * Math.sin(d / 13)).toFixed(3),
    })
  );
}

const CRYPTO_PRICES = [];
for (let d = 400; d >= 0; d -= 1) {
  CRYPTO_PRICES.push(
    live({
      id: uid("c"),
      source: "gemini",
      coin: "ETH",
      currency: "USD",
      price_date: dayOf(daysAgo(d)),
      price: (4_180 + 260 * Math.sin(d / 11) - d * 2.5).toFixed(2),
    })
  );
}

// The nightly jobs value the metal and the coin from those prices, a row a
// night, carrying the quantity the value was taken at.
for (const row of METAL_PRICES) {
  const d = Math.round((NOW - Date.parse(row.price_date)) / DAY_MS);
  ASSET_VALUES.push(
    value(ASSET.silver.id, d, 20 * Number(row.price), "estimate", {
      provider: "lbma",
    })
  );
}
for (const row of CRYPTO_PRICES) {
  const d = Math.round((NOW - Date.parse(row.price_date)) / DAY_MS);
  ASSET_VALUES.push(
    value(ASSET.ether.id, d, 1.85 * Number(row.price), "estimate", {
      provider: "gemini",
      coin_quantity: "1.85",
    })
  );
}

// ── Goals ────────────────────────────────────────────────────────────────
const GOAL = {
  fund: live({
    id: uid("o"),
    name: "Emergency fund",
    kind: "save",
    currency: "USD",
    target_minor: cents(25_000),
    starts_on: firstOfMonth(8),
    target_on: firstOfMonth(-6),
    created_at: iso(daysAgo(240)),
  }),
  car: live({
    id: uid("o"),
    name: "Pay off the car",
    kind: "payoff",
    currency: "USD",
    target_minor: null,
    starts_on: firstOfMonth(10),
    target_on: firstOfMonth(-14),
    created_at: iso(daysAgo(300)),
  }),
};
const GOAL_ACCOUNTS = [
  live({
    id: uid("q"),
    goal_id: GOAL.fund.id,
    account_id: ACCOUNTS.savings.id,
  }),
  live({ id: uid("q"), goal_id: GOAL.car.id, account_id: ACCOUNTS.auto.id }),
];
const GOAL_PLANS = [
  live({
    id: uid("r"),
    goal_id: GOAL.fund.id,
    starts_on: firstOfMonth(8),
    amount_minor: cents(650),
  }),
  live({
    id: uid("r"),
    goal_id: GOAL.car.id,
    starts_on: firstOfMonth(10),
    amount_minor: cents(420),
  }),
];

// ── Categories, budgets and three months of transactions ─────────────────
const category = (name, kind, guesses) =>
  live({
    id: uid("k"),
    name,
    kind,
    guesses_from: guesses,
    created_at: iso(daysAgo(200)),
  });
const CAT = {
  groceries: category("Groceries", "spend", ["Groceries"]),
  dining: category("Restaurants & coffee", "spend", ["Restaurants", "Coffee"]),
  transport: category("Gas & transit", "spend", ["Gas", "Transit"]),
  utilities: category("Utilities", "spend", ["Utilities"]),
  subscriptions: category("Subscriptions", "spend", ["Subscriptions"]),
  shopping: category("Shopping", "spend", ["Shopping"]),
  health: category("Health", "spend", ["Health"]),
  home: category("Home", "spend", []),
  pay: category("Paycheck", "income", ["Payroll"]),
  cardPayment: category("Card payment", "transfer", []),
  mortgage: category("Mortgage", "transfer", []),
  saving: category("Saving", "transfer", []),
};
const CATEGORIES = Object.values(CAT);

const CATEGORY_BUDGETS = [
  [CAT.groceries, 700],
  [CAT.dining, 280],
  [CAT.transport, 220],
  [CAT.utilities, 260],
  [CAT.subscriptions, 70],
  [CAT.shopping, 250],
  [CAT.health, 120],
  [CAT.home, 150],
].map(([cat, dollars]) =>
  live({
    id: uid("b"),
    category_id: cat.id,
    starts_on: firstOfMonth(6),
    amount_minor: cents(dollars),
    currency: "USD",
  })
);

const TRANSACTIONS = [];
const TRANSACTION_CATEGORIES = [];
const spend = (account, d, dollars, payee, sourceCategory, file) => {
  const id = uid("x");
  const at = iso(daysAgo(d) - 3 * 3_600_000);
  TRANSACTIONS.push(
    live({
      id,
      account_id: ACCOUNTS[account].id,
      posted_at: d < 1 ? null : at,
      transacted_at: at,
      amount_minor: cents(dollars),
      payee,
      description: payee.toUpperCase(),
      source_category: sourceCategory,
      pending: d < 1,
    })
  );
  if (file) {
    TRANSACTION_CATEGORIES.push(
      live({ id: uid("y"), transaction_id: id, category_id: file.id })
    );
  }
};

const card = () => (rand() < 0.62 ? "sapphire" : "amex");
for (let d = 182; d >= 0; d -= 1) {
  const weekday = new Date(daysAgo(d)).getUTCDay();
  if (rand() < 0.2)
    spend(
      card(),
      d,
      -between(18, 80),
      rand() < 0.6 ? "Trader Joe's" : "New Seasons Market",
      "Groceries"
    );
  if (weekday === 6 && rand() < 0.55)
    spend(card(), d, -between(70, 160), "Whole Foods Market", "Groceries");
  if (rand() < 0.35)
    spend(
      card(),
      d,
      -between(4.5, 7.25),
      rand() < 0.5 ? "Coava Coffee" : "Stumptown Coffee",
      "Coffee"
    );
  if (rand() < 0.16)
    spend(
      card(),
      d,
      -between(28, 88),
      rand() < 0.5 ? "Pok Pok" : "Lardo",
      "Restaurants"
    );
  if (rand() < 0.1) spend(card(), d, -between(38, 62), "Shell", "Gas");
  if (rand() < 0.12) spend(card(), d, -2.8, "TriMet", "Transit");
  if (rand() < 0.09)
    spend(
      card(),
      d,
      -between(14, 120),
      rand() < 0.5 ? "Amazon" : "Powell's Books",
      "Shopping"
    );
  if (rand() < 0.03)
    spend("sapphire", d, -between(25, 60), "Walgreens", "Health");
}

// The month's fixed charges, on the days they always land.
for (const months of [5, 4, 3, 2, 1, 0]) {
  const start = Date.parse(firstOfMonth(months));
  const on = (day) => Math.round((NOW - (start + (day - 1) * DAY_MS)) / DAY_MS);
  const fixed = [
    [1, "checking", -1_684.22, "Rocket Mortgage", null],
    [3, "checking", 3_412.5, "Northwind Labs Payroll", "Payroll"],
    [5, "sapphire", -15.49, "Netflix", "Subscriptions"],
    [8, "amex", -11.99, "Spotify", "Subscriptions"],
    [12, "checking", -142.6, "Portland General Electric", "Utilities"],
    [14, "checking", -79.99, "Xfinity", "Utilities"],
    [15, "checking", -420.0, "Honda Financial", null],
    [18, "checking", 3_412.5, "Northwind Labs Payroll", "Payroll"],
    [20, "checking", -650.0, "Transfer to Ally Savings", null],
    [22, "checking", -64.3, "NW Natural", "Utilities"],
    // Two a month that no bank names a category for, so the budget has
    // something to ask about (BUD-03: categorized where it is shown).
    [9, "checking", -36.0, "Venmo", null],
    [25, "checking", -18.5, "Venmo", null],
  ];
  for (const [dom, account, dollars, payee, src] of fixed) {
    const d = on(dom);
    if (d < 0) continue;
    const file =
      payee === "Rocket Mortgage"
        ? CAT.mortgage
        : payee === "Honda Financial" || payee.startsWith("Transfer")
          ? CAT.saving
          : undefined;
    spend(account, d, dollars, payee, src, file);
    if (payee.startsWith("Transfer"))
      spend("savings", d, -dollars, "Transfer from Chase", null, CAT.saving);
    if (payee === "Honda Financial")
      spend("auto", d, -dollars, "Payment received", null, CAT.saving);
  }
  // Each card paid in full from checking, both sides filed as one transfer.
  for (const [account, dom, dollars] of [
    ["sapphire", 24, 1_312.4 + months * 57],
    ["amex", 26, 488.15 - months * 31],
  ]) {
    const d = on(dom);
    if (d < 0) continue;
    spend(
      "checking",
      d,
      -dollars,
      `${account === "amex" ? "Amex" : "Chase Card"} Autopay`,
      null,
      CAT.cardPayment
    );
    spend(account, d, dollars, "Payment Thank You", null, CAT.cardPayment);
  }
}

// One rule, so the Rules screen has something in it.
const CATEGORY_RULES = [
  live({
    id: uid("u"),
    payee: "Powell's Books",
    category_id: CAT.shopping.id,
    starts_on: firstOfMonth(3),
    created_at: iso(daysAgo(80)),
  }),
];

const TABLES = {
  accounts: Object.values(ACCOUNTS),
  bank_pulls: BANK_PULLS,
  fx_rates: FX_RATES,
  balance_snapshots: BALANCE_SNAPSHOTS,
  account_groups: ACCOUNT_GROUPS,
  account_terms: ACCOUNT_TERMS,
  assets: Object.values(ASSET),
  asset_values: ASSET_VALUES,
  metal_prices: METAL_PRICES,
  crypto_prices: CRYPTO_PRICES,
  goals: Object.values(GOAL),
  goal_accounts: GOAL_ACCOUNTS,
  goal_plans: GOAL_PLANS,
  transactions: TRANSACTIONS,
  categories: CATEGORIES,
  category_budgets: CATEGORY_BUDGETS,
  transaction_categories: TRANSACTION_CATEGORIES,
  category_rules: CATEGORY_RULES,
};
for (const rows of Object.values(TABLES))
  rows.sort((a, b) => a.id.localeCompare(b.id));

// ── The session, remembered as auth-js would have left it ────────────────
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const exp = Math.floor(NOW / 1000) + 30 * 86_400;
const USER_ROW = {
  id: USER,
  aud: "authenticated",
  role: "authenticated",
  email: "sam@example.test",
  app_metadata: { provider: "email" },
  user_metadata: {},
  created_at: iso(daysAgo(200)),
};
const SESSION = {
  access_token: `${b64({ alg: "HS256", typ: "JWT" })}.${b64({ sub: USER, exp, role: "authenticated" })}.stub`,
  refresh_token: "stub-refresh",
  token_type: "bearer",
  expires_in: 30 * 86_400,
  expires_at: exp,
  user: USER_ROW,
};

/** The PostgREST filters this app sends: eq, in, is, gte, and the range. */
function answer(rows, params) {
  let out = rows;
  let offset = 0;
  let limit = Infinity;
  for (const [key, raw] of params) {
    if (key === "offset") offset = Number(raw);
    else if (key === "limit") limit = Number(raw);
    else if (["select", "order", "on_conflict"].includes(key)) continue;
    else if (raw.startsWith("eq."))
      out = out.filter((r) => String(r[key]) === raw.slice(3));
    else if (raw === "is.null") out = out.filter((r) => r[key] === null);
    else if (raw.startsWith("gte."))
      out = out.filter((r) => r[key] >= raw.slice(4));
    else if (raw.startsWith("in.")) {
      const want = new Set(
        raw
          .slice(3)
          .replace(/^\(|\)$/g, "")
          .split(",")
          .map((s) => s.replace(/^"|"$/g, ""))
      );
      out = out.filter((r) => want.has(String(r[key])));
    } else throw new Error(`a filter the stub does not know: ${key}=${raw}`);
  }
  return out.slice(offset, offset + limit);
}

async function openApp(
  browser,
  viewport,
  { mobile = false, hash = "#/", scheme = "light" } = {}
) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: mobile ? 3 : 2,
    isMobile: mobile,
    hasTouch: mobile,
    colorScheme: scheme,
    serviceWorkers: "block",
  });
  await ctx.addInitScript((session) => {
    window.localStorage.setItem("dinora.auth", JSON.stringify(session));
  }, SESSION);

  // One handler for every request the page makes. Anything not answered here
  // and not served by the dev server is aborted rather than allowed out.
  let escaped = 0;
  await ctx.route("**/*", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const json = (status, body, headers = {}) =>
      route.fulfill({
        status,
        contentType: "application/json",
        headers,
        body: JSON.stringify(body),
      });

    if (url.hostname === "stub.localhost") {
      if (url.pathname.startsWith("/rest/v1/")) {
        const table = url.pathname.slice("/rest/v1/".length);
        if (req.method() !== "GET") return json(201, []);
        if (!(table in TABLES)) {
          console.log("  unknown table:", table);
          return json(404, { code: "PGRST205" });
        }
        const rows = answer(TABLES[table], url.searchParams);
        return json(200, rows, {
          "content-range": `0-${Math.max(rows.length - 1, 0)}/*`,
        });
      }
      if (url.pathname.startsWith("/auth/v1/")) {
        return json(200, url.pathname.endsWith("/user") ? USER_ROW : SESSION);
      }
    }
    if (url.pathname.startsWith("/api/")) return json(503, {});
    if (url.origin === BASE || url.protocol === "data:")
      return route.continue();

    escaped += 1;
    console.log("  blocked:", req.method(), req.url().slice(0, 90));
    return route.abort();
  });

  const page = await ctx.newPage();
  page.on(
    "console",
    (m) =>
      m.type() === "error" &&
      console.log("    console:", m.text().slice(0, 200))
  );
  page.on("pageerror", (e) =>
    console.log("    pageerror:", e.message.slice(0, 200))
  );
  await page.goto(`${BASE}/${hash}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  return { ctx, page, escaped: () => escaped };
}

const shot = async (page, name, opts = {}) => {
  await page.screenshot({ path: `${OUT}/${name}.png`, ...opts });
  console.log("  shot", name);
};

// The month before this one, whole: a budget six days into a month is mostly
// empty bars, and the case study wants the month as it ended.
const LAST_MONTH = `#/budget/${firstOfMonth(1).slice(0, 7)}`;

const browser = await chromium.launch();
const SHOTS = [
  ["dashboard", DESKTOP, "#/"],
  ["hero-dashboard", HERO, "#/"],
  ["budget", DESKTOP, LAST_MONTH],
  ["hero-budget", HERO, LAST_MONTH],
  ["activity", DESKTOP, "#/activity?q=coffee"],
  ["recurring", DESKTOP, "#/activity"],
  ["card", DESKTOP, `#/account/${ACCOUNTS.sapphire.id}`],
  ["condo", DESKTOP, `#/asset/${ASSET.condo.id}`],
  ["silver", DESKTOP, `#/asset/${ASSET.silver.id}`],
  ["ether", DESKTOP, `#/asset/${ASSET.ether.id}`],
  ["goal", DESKTOP, `#/goal/${GOAL.fund.id}`],
  ["categorize", DESKTOP, "#/categorize"],
];
const only = process.argv.slice(3);
for (const [name, viewport, hash] of SHOTS) {
  if (only.length > 0 && !only.includes(name)) continue;
  // Light only: the site shows each case study's pictures in one scheme, and
  // the frame around them is what follows the reader's.
  const { ctx, page, escaped } = await openApp(browser, viewport, { hash });
  console.log(name);
  await shot(page, name);
  if (escaped() > 0) console.log("  escaped requests:", escaped());
  await ctx.close();
}
for (const [name, hash] of [
  ["phone-dashboard", "#/"],
  ["phone-budget", LAST_MONTH],
]) {
  if (only.length > 0 && !only.includes(name)) continue;
  const { ctx, page } = await openApp(browser, PHONE, { mobile: true, hash });
  console.log(name);
  await shot(page, name);
  await ctx.close();
}

await browser.close();
console.log("done");
