import { createClient } from "@/lib/supabase/server";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "success"
  | "failed"
  | "refunded";

export type RecentAuditLog = {
  id: string;
  action: string;
  createdAt: string;
};

export type EcosystemStatus = {
  auditLogsCount: number;
  paymentsCount: number;
  usersCount: number;
  paymentsByStatus: Record<PaymentStatus, number>;
  recentAuditLogs: RecentAuditLog[];
};

const EMPTY_STATUS_COUNTS: Record<PaymentStatus, number> = {
  pending: 0,
  processing: 0,
  success: 0,
  failed: 0,
  refunded: 0,
};

export async function getEcosystemStatus(): Promise<EcosystemStatus | null> {
  try {
    const supabase = await createClient();

    const [auditLogsHead, paymentsHead, usersHead, paymentStatusRows, recentAuditLogRows] =
      await Promise.all([
        supabase.from("audit_logs").select("*", { count: "exact", head: true }),
        supabase.from("payments").select("*", { count: "exact", head: true }),
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("payments").select("status"),
        supabase
          .from("audit_logs")
          .select("id, action, created_at")
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

    const paymentsByStatus = { ...EMPTY_STATUS_COUNTS };
    for (const row of paymentStatusRows.data ?? []) {
      const status = row.status as PaymentStatus;
      if (status in paymentsByStatus) paymentsByStatus[status] += 1;
    }

    return {
      auditLogsCount: auditLogsHead.count ?? 0,
      paymentsCount: paymentsHead.count ?? 0,
      usersCount: usersHead.count ?? 0,
      paymentsByStatus,
      recentAuditLogs: (recentAuditLogRows.data ?? []).map((row) => ({
        id: row.id as string,
        action: row.action as string,
        createdAt: row.created_at as string,
      })),
    };
  } catch {
    return null;
  }
}
