import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { EcosystemStatus, PaymentStatus } from "@/lib/supabase/ecosystem";
import { translateAction, translatePaymentStatus, type Dictionary, type Locale } from "@/lib/i18n";

const PAYMENT_STATUSES: PaymentStatus[] = [
  "pending",
  "processing",
  "success",
  "failed",
  "refunded",
];

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-4">
      <span className="text-2xl font-semibold tabular-nums font-heading">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function formatRelativeTime(iso: string, locale: Locale) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (Math.abs(diffMinutes) < 60) return formatter.format(-diffMinutes, "minute");
  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) return formatter.format(-diffHours, "hour");
  const diffDays = Math.round(diffHours / 24);
  return formatter.format(-diffDays, "day");
}

export function StatusPanel({
  status,
  dict,
  locale,
}: {
  status: EcosystemStatus | null;
  dict: Dictionary;
  locale: Locale;
}) {
  const isEmpty =
    status !== null &&
    status.auditLogsCount === 0 &&
    status.paymentsCount === 0 &&
    status.usersCount === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-base">{dict.status.heading}</CardTitle>
        <p className="text-sm text-muted-foreground">{dict.status.description}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {status === null && (
          <p className="text-sm text-muted-foreground">{dict.status.unavailable}</p>
        )}

        {status !== null && isEmpty && (
          <p className="text-sm text-muted-foreground">{dict.status.empty}</p>
        )}

        {status !== null && !isEmpty && (
          <>
            <div className="grid grid-cols-3 gap-3">
              <StatTile label={dict.status.auditEvents} value={status.auditLogsCount} />
              <StatTile label={dict.status.payments} value={status.paymentsCount} />
              <StatTile label={dict.status.users} value={status.usersCount} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">{dict.status.byStatus}</span>
              <div className="flex flex-wrap gap-1.5">
                {PAYMENT_STATUSES.map((paymentStatus) => (
                  <Badge key={paymentStatus} variant="outline" className="font-normal">
                    {translatePaymentStatus(paymentStatus, dict)}
                    <span className="ml-1.5 tabular-nums text-muted-foreground">
                      {status.paymentsByStatus[paymentStatus]}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">{dict.status.recentActivity}</span>
              <ul className="flex flex-col gap-2">
                {status.recentAuditLogs.map((log) => (
                  <li
                    key={log.id}
                    data-cuelume-hover="tick"
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span>{translateAction(log.action, dict)}</span>
                    <span className="shrink-0 text-muted-foreground">
                      {formatRelativeTime(log.createdAt, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
