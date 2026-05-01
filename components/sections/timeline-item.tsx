"use client";

import { Briefcase, GraduationCap, type LucideIcon, Wrench } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { TimelineItem as TimelineItemModel, TimelineItemType } from "@/lib/data/experiences";
import { formatPeriod } from "@/lib/format";
import { cn } from "@/lib/utils";

const ICON_BY_TYPE: Record<TimelineItemType, LucideIcon> = {
  formation: GraduationCap,
  experience: Briefcase,
  projet: Wrench,
};

const COLOR_BY_TYPE: Record<TimelineItemType, string> = {
  formation: "bg-emerald-400 text-zinc-950",
  experience: "bg-indigo-400 text-zinc-950",
  projet: "bg-amber-400 text-zinc-950",
};

const TYPE_LABEL: Record<TimelineItemType, string> = {
  formation: "Formation",
  experience: "Expérience",
  projet: "Projet",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function TimelineItem({ item, index }: { item: TimelineItemModel; index: number }) {
  const isLeft = index % 2 === 0;
  const Icon = ICON_BY_TYPE[item.type];

  return (
    <article className="relative">
      <div
        aria-hidden
        className={cn(
          "absolute top-1 left-4 z-10 flex size-9 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-background md:left-1/2",
          COLOR_BY_TYPE[item.type],
        )}
      >
        <Icon className="size-4" />
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        className={cn(
          "ml-14 md:ml-0 md:w-[calc(50%-2.5rem)]",
          !isLeft && "md:ml-[calc(50%+2.5rem)]",
        )}
      >
        <Card className="border-border/60 transition-colors hover:ring-primary/40">
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {TYPE_LABEL[item.type]}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {formatPeriod(item.startDate, item.endDate)}
              </span>
            </div>

            <div>
              <h3 className="text-lg leading-snug font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.organization}
                {item.contractType ? ` · ${item.contractType}` : ""}
                {item.location ? ` · ${item.location}` : ""}
              </p>
            </div>

            <p className="text-sm text-foreground/90">{item.summary}</p>

            {item.highlights && item.highlights.length > 0 ? (
              <ul className="space-y-1.5 text-sm text-foreground/85">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {item.missions && item.missions.length > 0 ? (
              <ul className="space-y-3 text-sm">
                {item.missions.map((mission) => (
                  <li key={mission.client}>
                    <div className="font-medium text-foreground">
                      {mission.client}
                      {mission.duration ? (
                        <span className="font-normal text-muted-foreground">
                          {` — ${mission.duration}`}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-foreground/85">{mission.description}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            {item.stack.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.stack.map((tech) => (
                  <Badge key={tech} variant="outline" className="font-mono">
                    {tech}
                  </Badge>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </motion.div>
    </article>
  );
}
