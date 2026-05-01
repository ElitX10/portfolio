"use client";

import { ArrowDown, ChevronDown } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { PROFILE } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[28rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/30"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col items-start justify-center gap-6 px-4 py-24 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={itemVariants}
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Portfolio · {PROFILE.location}
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-foreground/80 sm:text-xl md:text-2xl"
        >
          {PROFILE.title}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-3">
          <Link href="#parcours" className={cn(buttonVariants({ size: "lg" }))}>
            Voir mon parcours
            <ArrowDown className="size-4" />
          </Link>
          <Link href="#contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Me contacter
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown className="size-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
