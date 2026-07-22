import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { ProjectCard } from "@/components/ecosystem/project-card";
import { StatusPanel } from "@/components/ecosystem/status-panel";
import { ArchitectureDiagram } from "@/components/ecosystem/architecture-diagram";
import { getEcosystemStatus } from "@/lib/supabase/ecosystem";
import { getDictionary, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";

interface HomeProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const locale: Locale = params.lang === "fr" ? "fr" : "en";
  const dict = getDictionary(locale);

  const status = await getEcosystemStatus();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">{dict.title}</h1>
          <p className="text-muted-foreground">{dict.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle locale={locale} />
        </div>
      </header>

      <p className="text-sm leading-relaxed text-muted-foreground">{dict.intro}</p>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-medium">{dict.projects.heading}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.key} project={project} dict={dict} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatusPanel status={status} dict={dict} locale={locale} />
        <ArchitectureDiagram dict={dict} />
      </section>
    </div>
  );
}
