"use client";

import { useEffect, useState } from "react";

import { computeYearsSince } from "@/lib/format";

/**
 * Affiche le nombre d'années écoulées depuis startDate. Recalculé après
 * hydratation côté client pour rester à jour si le site n'est pas rebuildé.
 */
export function YearsSince({
    startDate,
    initialYears,
    bonusYears = 0,
}: {
    startDate: string;
    initialYears: number;
    /** Années à ajouter au calcul (ex: équivalent stages avant le début pro). */
    bonusYears?: number;
}) {
    const [years, setYears] = useState(initialYears);

    useEffect(() => {
        const fresh = computeYearsSince(startDate) + bonusYears;
        if (fresh !== years) {
            setYears(fresh);
        }
    }, [startDate, bonusYears, years]);

    return <>{years}</>;
}
