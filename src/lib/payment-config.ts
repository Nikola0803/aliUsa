/**
 * Manual payment gateway handles, shown at checkout once a customer picks
 * CashApp / Zelle / Venmo. Matches the peptides-crm-app Order schema, which
 * models paymentMethod as "zelle" | "cashapp" | "venmo" with a paymentMemo
 * field, so this checkout flow lines up with what the real CRM expects.
 */
export const PAYMENT_HANDLES = {
  cashapp: process.env.NEXT_PUBLIC_CASHAPP_HANDLE || "Not configured",
  zelle: process.env.NEXT_PUBLIC_ZELLE_HANDLE || "Not configured",
  venmo: process.env.NEXT_PUBLIC_VENMO_HANDLE || "Not configured",
};

export const PAYMENT_PROCESSOR_NOTE =
  "Payment details are provided after the store's payment accounts are configured.";

const DEMO_HANDLES = {
  cashapp: "Not configured",
  zelle: "Not configured",
  venmo: "Not configured",
};

export type PaymentGatewayId = "cashapp" | "zelle" | "venmo";

export function getEffectiveHandle(gateway: PaymentGatewayId): { handle: string; isDemo: boolean } {
  const real = PAYMENT_HANDLES[gateway];
  return real ? { handle: real, isDemo: false } : { handle: DEMO_HANDLES[gateway], isDemo: true };
}

/**
 * Venmo and Cash App both support real "pay this exact amount" deep links.
 * Zelle has no equivalent, it's direct bank-to-bank with no public payment-
 * request URL scheme, so there's nothing to build a working link/QR to; the
 * best we can honestly offer is a QR that encodes the handle/amount/memo as
 * plain text, to save re-typing, not a one-tap payment.
 */
export function buildQuickPayTarget(
  gateway: PaymentGatewayId,
  amount: number,
  memo: string
): { kind: "payLink"; url: string } | { kind: "infoText"; text: string } {
  const { handle } = getEffectiveHandle(gateway);
  const amountStr = amount.toFixed(2);

  if (gateway === "venmo") {
    const clean = handle.replace(/^@/, "");
    return { kind: "payLink", url: `https://venmo.com/${clean}?txn=pay&amount=${amountStr}&note=${encodeURIComponent(memo)}` };
  }
  if (gateway === "cashapp") {
    const clean = handle.startsWith("$") ? handle.slice(1) : handle;
    return { kind: "payLink", url: `https://cash.app/$${clean}/${amountStr}` };
  }
  return { kind: "infoText", text: `Zelle\nTo: ${handle}\nAmount: $${amountStr}\nMemo: ${memo}` };
}

export const PAYMENT_GATEWAYS: {
  id: PaymentGatewayId;
  label: string;
  icon: string;
  handle: string;
  handleNote: string;
}[] = [
  {
    id: "cashapp",
    label: "Cash App",
    icon: "ri-money-dollar-circle-line",
    handle: PAYMENT_HANDLES.cashapp,
    handleNote: "Include only the ALI USA order memo shown below so your payment can be matched quickly.",
  },
  {
    id: "zelle",
    label: "Zelle",
    icon: "ri-bank-line",
    handle: PAYMENT_HANDLES.zelle,
    handleNote: "Use the configured recipient and include only the order memo shown below.",
  },
  {
    id: "venmo",
    label: "Venmo",
    icon: "ri-smartphone-line",
    handle: PAYMENT_HANDLES.venmo,
    handleNote: "Include only the ALI USA order memo shown below so your payment can be matched quickly.",
  },
];
