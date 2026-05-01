import { PROFILE } from "@/lib/data/profile";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 py-6">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
                <span>
                    © {year} {PROFILE.name}
                </span>
                <a
                    href="https://github.com/ElitX10/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                >
                    Code source
                </a>
            </div>
        </footer>
    );
}
