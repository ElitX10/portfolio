import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { PROFILE } from "@/lib/data/profile";

const NAV_ITEMS = [
    { href: "#parcours", label: "Parcours" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="#" className="text-sm font-medium tracking-tight">
                    {PROFILE.name}
                </Link>
                <nav className="hidden gap-6 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <ThemeToggle />
            </div>
        </header>
    );
}
