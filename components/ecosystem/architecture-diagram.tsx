import { ArrowDown, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/projects";
import type { Dictionary } from "@/lib/i18n";

function Node({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <div className="flex min-h-16 flex-col items-center justify-center gap-0.5 rounded-lg border border-border bg-muted/50 px-2 py-2 text-center">
      <span className="text-xs leading-snug font-medium wrap-break-word">{label}</span>
      {sublabel && (
        <span className="font-mono text-[0.65rem] leading-snug wrap-break-word text-muted-foreground">
          {sublabel}
        </span>
      )}
    </div>
  );
}

export function ArchitectureDiagram({ dict }: { dict: Dictionary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-base">{dict.architecture.heading}</CardTitle>
        <p className="text-sm text-muted-foreground">{dict.architecture.description}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {projects.map((project) => (
            <Node
              key={project.key}
              label={dict.projects.items[project.key].name}
              sublabel={project.ownedTables.join(", ") || undefined}
            />
          ))}
        </div>

        <div className="flex justify-center text-muted-foreground">
          <ArrowUpDown className="size-4" />
        </div>

        <Node
          label={dict.architecture.supabaseNode}
          sublabel="users, audit_logs, payments, payment_events, receipts, eve_agent_log"
        />

        <div className="flex justify-center text-muted-foreground">
          <ArrowDown className="size-4" />
        </div>

        <Node label={dict.architecture.hubNode} />
      </CardContent>
    </Card>
  );
}
