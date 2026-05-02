import { ArrowDown, ChevronDown } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { PROFILE } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

const ENTRY_CLASSES = "animate-in fade-in-0 slide-in-from-bottom-2 duration-700 fill-mode-both";

export function Hero() {
    return (
        <section className="relative isolate overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[28rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/30"
            />

            <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col items-start justify-center gap-6 px-4 py-24 sm:px-6 lg:px-8">
                <div className={cn(ENTRY_CLASSES)} style={{ animationDelay: "100ms" }}>
                    <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                        Portfolio · {PROFILE.location}
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{PROFILE.availability}</p>
                </div>

                <h1
                    className={cn(
                        ENTRY_CLASSES,
                        "text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl",
                    )}
                    style={{ animationDelay: "200ms" }}
                >
                    {PROFILE.name}
                </h1>

                <p
                    className={cn(
                        ENTRY_CLASSES,
                        "text-lg text-foreground/80 sm:text-xl md:text-2xl",
                    )}
                    style={{ animationDelay: "300ms" }}
                >
                    {PROFILE.title}
                </p>

                <p
                    className={cn(
                        ENTRY_CLASSES,
                        "max-w-xl text-base text-muted-foreground sm:text-lg",
                    )}
                    style={{ animationDelay: "400ms" }}
                >
                    {PROFILE.tagline}
                </p>

                <div
                    className={cn(ENTRY_CLASSES, "mt-4 flex flex-wrap gap-3")}
                    style={{ animationDelay: "500ms" }}
                >
                    <Link href="#parcours" className={cn(buttonVariants({ size: "lg" }))}>
                        Voir mon parcours
                        <ArrowDown className="size-4" />
                    </Link>
                    <Link
                        href="#contact"
                        className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                    >
                        Me contacter
                    </Link>
                </div>
            </div>

            <div
                aria-hidden
                className="animate-in fade-in-0 fill-mode-both absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground duration-1000"
                style={{ animationDelay: "1000ms" }}
            >
                <ChevronDown className="size-5 animate-bounce" />
            </div>
        </section>
    );
}
