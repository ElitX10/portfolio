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

    bio: "Au-delà du code, ce qui m'anime c'est de résoudre des problèmes — qu'ils soient purement techniques ou liés au métier. Mon parcours, du stage Ruby on Rails à la migration d'un client lourd Java vers Next.js chez PWA Assurance, m'a fait toucher à toutes les briques : back-end, front-end, tests, DevOps. La constante : partir du besoin réel avant de choisir une solution technique.",

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
