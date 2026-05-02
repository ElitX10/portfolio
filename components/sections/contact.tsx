import { ArrowUpRight, FileText, Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { PROFILE } from "@/lib/data/profile";

type IconComponent = ComponentType<{ className?: string }>;

function GithubIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <title>GitHub</title>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.92 10.92 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.7 5.37-5.27 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
        </svg>
    );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <title>LinkedIn</title>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zM8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    );
}

type ContactLink = {
    label: string;
    value: string;
    href: string;
    icon: IconComponent;
    download?: boolean;
};

const SOCIAL_ICONS: Record<string, IconComponent> = {
    GitHub: GithubIcon,
    LinkedIn: LinkedinIcon,
};

const CONTACT_LINKS: ContactLink[] = [
    {
        label: "Email",
        value: PROFILE.email,
        href: `mailto:${PROFILE.email}`,
        icon: Mail,
    },
    ...PROFILE.social.map((social) => ({
        label: social.label,
        value: social.href.replace(/^https?:\/\/(www\.)?/, ""),
        href: social.href,
        icon: SOCIAL_ICONS[social.label] ?? ArrowUpRight,
    })),
    {
        label: "CV",
        value: "Télécharger en PDF",
        href: PROFILE.cv,
        icon: FileText,
        download: true,
    },
];

export function Contact() {
    return (
        <section id="contact" className="border-t border-border/40 py-20 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <header className="mb-14 md:mb-20">
                    <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                        04 — Contact
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        On se rencontre ?
                    </h2>
                    <p className="mt-4 max-w-xl text-base text-muted-foreground">
                        Toujours partant pour discuter d&apos;un nouveau projet, d&apos;une
                        opportunité ou simplement échanger sur la tech.
                    </p>
                </header>

                <div className="grid gap-3 sm:grid-cols-2">
                    {CONTACT_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isExternal = link.href.startsWith("http");
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                download={link.download}
                                className="group block"
                            >
                                <Card className="h-full border-border/60 transition-colors group-hover:ring-primary/40">
                                    <CardContent className="flex items-center gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <Icon className="size-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-medium">{link.label}</div>
                                            <div className="truncate text-sm text-muted-foreground">
                                                {link.value}
                                            </div>
                                        </div>
                                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                                    </CardContent>
                                </Card>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
