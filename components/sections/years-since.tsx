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
}: {
    startDate: string;
    initialYears: number;
}) {
    const [years, setYears] = useState(initialYears);

    useEffect(() => {
        const fresh = computeYearsSince(startDate);
        if (fresh !== years) {
            setYears(fresh);
        }
    }, [startDate, years]);

    return <>{years}</>;
}
