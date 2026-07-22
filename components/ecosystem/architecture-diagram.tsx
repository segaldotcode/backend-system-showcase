import { ArrowDown, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/projects";
import type { Dictionary } from "@/lib/i18n";

function Node({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <div
      className={
        muted
          ? "rounded-lg border border-dashed border-border px-3 py-2 text-center text-xs text-muted-foreground"
          : "rounded-lg border border-border bg-muted/50 px-3 py-2 text-center text-xs font-medium"
      }
    >
      {label}
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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {projects.map((project) => (
            <Node
              key={project.key}
              label={dict.projects.items[project.key].name}
              muted={!project.sharesSupabase}
            />
          ))}
        </div>

        <div className="flex justify-center text-muted-foreground">
          <ArrowUpDown className="size-4" />
        </div>

        <Node label="Supabase: audit_logs, payments, users" />

        <div className="flex justify-center text-muted-foreground">
          <ArrowDown className="size-4" />
        </div>

        <Node label="Backend System Showcase (this hub, read-only)" />
      </CardContent>
    </Card>
  );
}
