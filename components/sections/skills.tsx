import { Badge } from "@/components/ui/badge";
import { SKILL_GROUPS } from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="stack" className="border-t border-border/40 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-14 md:mb-20">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            02 — Stack
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Technologies du quotidien
          </h2>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest text-primary uppercase">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge key={item} variant="outline" className="font-mono">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
