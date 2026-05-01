"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { TimelineItem } from "@/components/sections/timeline-item";
import { TIMELINE } from "@/lib/data/experiences";

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 70%", "end 60%"],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="parcours" className="border-t border-border/40 py-20 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <header className="mb-14 md:mb-20">
                    <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                        01 — Parcours
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        De la formation à aujourd&apos;hui
                    </h2>
                </header>

                <div ref={containerRef} className="relative">
                    <div
                        aria-hidden
                        className="absolute top-0 bottom-0 left-4 w-px -translate-x-px bg-border md:left-1/2"
                    />

                    <motion.div
                        aria-hidden
                        style={{ scaleY: lineScale }}
                        className="absolute top-0 bottom-0 left-4 w-px origin-top -translate-x-px bg-primary md:left-1/2"
                    />

                    <ol className="relative space-y-12 md:space-y-20">
                        {TIMELINE.map((item, index) => (
                            <li key={item.id}>
                                <TimelineItem item={item} index={index} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
