import { Card, CardContent } from "@/components/ui/card";
import { INTERESTS } from "@/lib/data/interests";

export function Interests() {
    return (
        <section className="border-t border-border/40 py-20 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <header className="mb-14 md:mb-20">
                    <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                        03 — Hors travail
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Quand je ne code pas
                    </h2>
                </header>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {INTERESTS.map(({ icon: Icon, label, description }) => (
                        <Card key={label} className="border-border/60">
                            <CardContent className="space-y-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
                                    <Icon className="size-5" />
                                </div>
                                <div className="space-y-1">
                                    <div className="font-medium">{label}</div>
                                    <p className="text-sm text-muted-foreground">{description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
