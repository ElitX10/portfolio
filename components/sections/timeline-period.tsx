"use client";

import { useEffect, useState } from "react";

import { formatPeriod } from "@/lib/format";

/**
 * Affiche la période d'un item de la timeline. Pour les items en cours
 * (endDate === null), recalcule la chaîne après hydratation côté client afin
 * que la durée ("3 ans 9 mois") reste à jour même quand le site n'est pas
 * rebuildé chaque jour.
 */
export function TimelinePeriod({
    initialText,
    startDate,
    endDate,
    showDuration = true,
}: {
    initialText: string;
    startDate: string;
    endDate: string | null;
    showDuration?: boolean;
}) {
    const [text, setText] = useState(initialText);

    useEffect(() => {
        if (endDate !== null) {
            const fresh = formatPeriod(startDate, endDate, { showDuration });
            if (fresh !== text) {
                setText(fresh);
            }
        }
    }, [startDate, endDate, showDuration, text]);

    return <span className="font-mono text-xs text-muted-foreground">{text}</span>;
}
