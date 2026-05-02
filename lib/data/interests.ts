import type { LucideIcon } from "lucide-react";
import { Disc, Film, Gamepad2, Palette } from "lucide-react";

export type Interest = {
    label: string;
    description: string;
    icon: LucideIcon;
};

export const INTERESTS: Interest[] = [
    {
        label: "Ultimate frisbee",
        description: "Pour l'esprit fair-play et l'auto-arbitrage.",
        icon: Disc,
    },
    {
        label: "Dessin",
        description: "L'occasion d'exercer un autre type de créativité.",
        icon: Palette,
    },
    {
        label: "Cinéma et séries",
        description: "Tout ce qui se raconte en images, à voir et discuter.",
        icon: Film,
    },
    {
        label: "Jeux vidéo",
        description: "Pour explorer des univers et décompresser.",
        icon: Gamepad2,
    },
];
