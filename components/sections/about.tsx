import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TIMELINE } from "@/lib/data/experiences";
import { PROFILE } from "@/lib/data/profile";
import { computeYearsSince } from "@/lib/format";

const PROFESSIONAL_EXPERIENCES = TIMELINE.filter((item) => item.type === "experience");

const EARLIEST_EXPERIENCE_START =
  PROFESSIONAL_EXPERIENCES.reduce<string | null>(
    (earliest, item) =>
      earliest === null || item.startDate < earliest ? item.startDate : earliest,
    null,
  ) ?? "2018-01";

const UNIQUE_TECHNOLOGIES = new Set(TIMELINE.flatMap((item) => item.stack)).size;

const initials = PROFILE.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function About() {
  const yearsOfExperience = computeYearsSince(EARLIEST_EXPERIENCE_START);

  const stats: Array<{ value: string; label: string }> = [
    { value: `${yearsOfExperience}+ ans`, label: "d'expérience" },
    {
      value: String(PROFESSIONAL_EXPERIENCES.length),
      label: "expériences professionnelles",
    },
    { value: `${UNIQUE_TECHNOLOGIES}+`, label: "technologies maîtrisées" },
  ];

  return (
    <section className="border-t border-border/40 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <Avatar className="size-32 md:size-40">
            <AvatarImage src={PROFILE.photo} alt={PROFILE.name} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>

          <div className="space-y-4">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              À propos
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Quelques mots sur moi</h2>
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">{PROFILE.bio}</p>
            <p className="text-sm text-muted-foreground">
              {PROFILE.location}
              {" · "}
              <a
                href={`mailto:${PROFILE.email}`}
                className="transition-colors hover:text-foreground"
              >
                {PROFILE.email}
              </a>
            </p>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border/40 pt-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
