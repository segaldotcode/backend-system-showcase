export type ProjectKey =
  | "featureFlags"
  | "auditLog"
  | "paymentTracking"
  | "aiAdmin"
  | "branchOrigin"
  | "eveAgent";

export type Project = {
  key: ProjectKey;
  url: string;
  stack: string[];
  sharesSupabase: boolean;
};

export const projects: Project[] = [
  {
    key: "featureFlags",
    url: "https://github.com/segaldotcode/feature-flags-dashboard",
    stack: ["Next.js", "Vercel Flags SDK", "Supabase"],
    sharesSupabase: true,
  },
  {
    key: "auditLog",
    url: "https://github.com/segaldotcode/audit-log-system",
    stack: ["Next.js", "Supabase"],
    sharesSupabase: true,
  },
  {
    key: "paymentTracking",
    url: "https://github.com/segaldotcode/payment-tracking-system",
    stack: ["Next.js", "Supabase"],
    sharesSupabase: true,
  },
  {
    key: "aiAdmin",
    url: "https://github.com/segaldotcode/ai-admin-assistant",
    stack: ["Next.js", "Vercel AI Gateway", "Supabase"],
    sharesSupabase: true,
  },
  {
    key: "branchOrigin",
    url: "https://github.com/segaldotcode/branch-origin-finder",
    stack: ["Node.js", "CLI", "Next.js"],
    sharesSupabase: false,
  },
  {
    key: "eveAgent",
    url: "https://github.com/segaldotcode/eve-audit-agent",
    stack: ["eve", "Vercel Functions", "Supabase"],
    sharesSupabase: false,
  },
];
