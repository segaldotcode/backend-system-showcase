import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/projects";
import type { Dictionary } from "@/lib/i18n";

export function ProjectCard({ project, dict }: { project: Project; dict: Dictionary }) {
  const copy = dict.projects.items[project.key];

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="font-heading text-base">{copy.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <p className="text-sm text-muted-foreground">{copy.role}</p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono text-xs font-normal">
                {tech}
              </Badge>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cuelume-hover
            data-cuelume-press
            className="inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {dict.projects.viewRepo}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
