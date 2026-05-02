export type SocialLink = {
    label: string;
    href: string;
};

export type Profile = {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    location: string;
    availability: string;
    email: string;
    photo: string;
    cv: string;
    social: SocialLink[];
};

export const PROFILE: Profile = {
    name: "Thomas Le Scolan",
    title: "Ingénieur développement logiciel",

    tagline:
        "Full-stack Java + Next.js. Spécialiste de la migration de systèmes legacy vers le web.",

    // TODO: petite bio affichée dans la section "À propos" (2-3 phrases).
    bio: "TODO: 2 à 3 phrases qui résument ton parcours, tes spécialités et ce qui t'anime aujourd'hui.",

    location: "Lyon, France",
    availability: "Télétravail privilégié · jusqu'à 2j/semaine sur site",

    email: "thomas.lescolan@sfr.fr",

    // TODO: ajoute /public/profile.jpg (photo carrée, ≥ 320x320px).
    photo: "/profile.jpg",

    cv: "/cv-thomas-le-scolan.pdf",

    social: [
        {
            label: "GitHub",
            href: "https://github.com/ElitX10",
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/thomas-le-scolan-642618170/",
        },
    ],
};
