export type ProjectKey =
  | "featureFlags"
  | "auditLog"
  | "paymentTracking"
  | "aiAdmin"
  | "eveAgent";

export type Project = {
  key: ProjectKey;
  url: string;
  liveUrl: string;
  stack: string[];
  /** Tables this project owns (writes to) in the shared Supabase project. Empty when it only reads. */
  ownedTables: string[];
};

export const projects: Project[] = [
  {
    key: "featureFlags",
    url: "https://github.com/segaldotcode/feature-flags-dashboard",
    liveUrl: "https://feature-flags-dashboard-six.vercel.app",
    stack: ["Next.js", "Vercel Flags SDK", "Supabase"],
    ownedTables: ["users"],
  },
  {
    key: "auditLog",
    url: "https://github.com/segaldotcode/audit-log-system",
    liveUrl: "https://audit-log-system.vercel.app",
    stack: ["Next.js", "Supabase"],
    ownedTables: ["audit_logs"],
  },
  {
    key: "paymentTracking",
    url: "https://github.com/segaldotcode/payment-tracking-system",
    liveUrl: "https://payment-tracking-system-olive.vercel.app",
    stack: ["Next.js", "Supabase"],
    ownedTables: ["payments", "payment_events", "receipts"],
  },
  {
    key: "aiAdmin",
    url: "https://github.com/segaldotcode/ai-admin-assistant",
    liveUrl: "https://ai-admin-assistant.vercel.app",
    stack: ["Next.js", "Vercel AI Gateway", "Supabase"],
    ownedTables: [],
  },
  {
    key: "eveAgent",
    url: "https://github.com/segaldotcode/eve-audit-agent",
    liveUrl: "https://eve-audit-agent.vercel.app",
    stack: ["eve", "Vercel Functions", "Supabase"],
    ownedTables: ["eve_agent_log"],
  },
];
