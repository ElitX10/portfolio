import { Briefcase, ChevronDown, GraduationCap, type LucideIcon, Wrench } from "lucide-react";
import { type MotionValue, motion, useTransform } from "motion/react";

import { TimelinePeriod } from "@/components/sections/timeline-period";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { TimelineItem as TimelineItemModel, TimelineItemType } from "@/lib/data/experiences";
import { formatPeriod } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Largeur de la fenêtre de fondu du ring autour de chaque dot. */
const RING_FADE_RANGE = 0.08;

const ICON_BY_TYPE: Record<TimelineItemType, LucideIcon> = {
    formation: GraduationCap,
    experience: Briefcase,
    projet: Wrench,
};

const TYPE_LABEL: Record<TimelineItemType, string> = {
    formation: "Formation",
    experience: "Expérience",
    projet: "Projet",
};

/**
 * Couleur de la pastille — les stages reprennent la couleur formation
 * (vert émeraude) pour les distinguer visuellement des expériences en CDI/CDD.
 */
function getColorClass(item: TimelineItemModel): string {
    if (item.type === "formation") return "bg-emerald-400 text-zinc-950";
    if (item.type === "projet") return "bg-amber-400 text-zinc-950";
    if (item.contractType === "Stage") return "bg-emerald-400 text-zinc-950";
    return "bg-indigo-400 text-zinc-950";
}

/**
 * Lueur diffuse derrière la card, alignée sur la couleur du dot. En mode
 * clair l'opacité est plus forte car les pastels sur fond blanc passent
 * vite inaperçus ; le mode sombre garde une intensité plus mesurée.
 */
function getGlowClass(item: TimelineItemModel): string {
    if (item.type === "formation") return "bg-emerald-500/50 dark:bg-emerald-500/25";
    if (item.type === "projet") return "bg-amber-500/30 dark:bg-amber-500/25";
    if (item.contractType === "Stage") return "bg-emerald-500/50 dark:bg-emerald-500/25";
    return "bg-indigo-500/30 dark:bg-indigo-500/25";
}

export function TimelineItem({
    item,
    index,
    total,
    progress,
    isExpanded,
    onToggle,
}: {
    item: TimelineItemModel;
    index: number;
    total: number;
    progress: MotionValue<number>;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const isLeft = index % 2 === 0;
    const Icon = ICON_BY_TYPE[item.type];
    const showDuration = item.type !== "projet";
    const initialPeriodText = formatPeriod(item.startDate, item.endDate, { showDuration });
    const detailsId = `timeline-details-${item.id}`;

    const hasHighlights = item.highlights && item.highlights.length > 0;
    const hasMissions = item.missions && item.missions.length > 0;
    const hasStack = item.stack.length > 0;
    const hasDetails = hasHighlights || hasMissions || hasStack;

    /**
     * Le ring autour du dot s'éclaire en couleur primaire (indigo) au moment
     * où la barre de progression de la timeline passe sur l'icône. Le seuil
     * est réparti uniformément en fonction de l'index ; la transition se fait
     * sur RING_FADE_RANGE pour un fondu doux.
     */
    const threshold = (index + 0.5) / total;
    const ringShadow = useTransform(progress, (p) => {
        const start = threshold - RING_FADE_RANGE / 2;
        const opacity = Math.min(1, Math.max(0, (p - start) / RING_FADE_RANGE));
        return `0 0 0 2px color-mix(in srgb, var(--foreground) ${(opacity * 100).toFixed(0)}%, transparent)`;
    });

    return (
        <article className="relative">
            <motion.div
                aria-hidden
                style={{ boxShadow: ringShadow }}
                className={cn(
                    "absolute top-1 left-4 z-10 flex size-9 -translate-x-1/2 items-center justify-center rounded-full md:left-1/2",
                    getColorClass(item),
                )}
            >
                <Icon className="size-4" />
            </motion.div>

            <div
                className={cn(
                    "relative ml-14 md:ml-0 md:w-[calc(50%-2.5rem)]",
                    !isLeft && "md:ml-[calc(50%+2.5rem)]",
                )}
            >
                <div
                    aria-hidden
                    className={cn(
                        "pointer-events-none absolute -inset-4 -z-10 rounded-3xl blur-2xl",
                        getGlowClass(item),
                    )}
                />
                <Card className="border-border/60 transition-colors hover:ring-primary/40">
                    <CardContent className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                                {TYPE_LABEL[item.type]}
                            </Badge>
                            <TimelinePeriod
                                initialText={initialPeriodText}
                                startDate={item.startDate}
                                endDate={item.endDate}
                                showDuration={showDuration}
                            />
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

                        {hasDetails ? (
                            <>
                                <button
                                    type="button"
                                    onClick={onToggle}
                                    aria-expanded={isExpanded}
                                    aria-controls={detailsId}
                                    className="-mx-1 inline-flex items-center gap-1.5 self-start rounded-md px-1 py-0.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    {isExpanded ? "Masquer le détail" : "Voir le détail"}
                                    <ChevronDown
                                        aria-hidden
                                        className={cn(
                                            "size-4 transition-transform duration-300",
                                            isExpanded && "rotate-180",
                                        )}
                                    />
                                </button>

                                <div
                                    id={detailsId}
                                    aria-hidden={!isExpanded}
                                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                                    style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
                                >
                                    <div className="overflow-hidden">
                                        <div className="space-y-3">
                                            {hasHighlights ? (
                                                <ul className="space-y-1.5 text-sm text-foreground/85">
                                                    {item.highlights?.map((highlight) => (
                                                        <li key={highlight} className="flex gap-2">
                                                            <span
                                                                aria-hidden
                                                                className="mt-1.5 size-1 shrink-0 rounded-full bg-primary"
                                                            />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : null}

                                            {hasMissions ? (
                                                <ul className="space-y-3 text-sm">
                                                    {item.missions?.map((mission) => (
                                                        <li key={mission.client}>
                                                            <div className="font-medium text-foreground">
                                                                {mission.client}
                                                                {mission.duration ? (
                                                                    <span className="font-normal text-muted-foreground">
                                                                        {` — ${mission.duration}`}
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                            <p className="text-foreground/85">
                                                                {mission.description}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : null}

                                            {hasStack ? (
                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {item.stack.map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="outline"
                                                            className="font-mono"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        </article>
    );
}
