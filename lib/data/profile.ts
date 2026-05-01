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
  email: string;
  photo: string;
  cv: string;
  social: SocialLink[];
};

export const PROFILE: Profile = {
  name: "Thomas Le Scolan",
  title: "Ingénieur développement logiciel",

  // TODO: phrase d'accroche affichée sous le titre dans le Hero (1 ligne).
  tagline: "TODO: une phrase d'accroche qui te ressemble.",

  // TODO: petite bio affichée dans la section "À propos" (2-3 phrases).
  bio: "TODO: 2 à 3 phrases qui résument ton parcours, tes spécialités et ce qui t'anime aujourd'hui.",

  location: "Lyon, France",

  // TODO: ton adresse mail (utilisée pour le lien mailto).
  email: "TODO@example.com",

  // TODO: ajoute /public/profile.jpg (photo carrée, ≥ 320x320px).
  photo: "/profile.jpg",

  // TODO: ajoute /public/cv-thomas-le-scolan.pdf
  cv: "/cv-thomas-le-scolan.pdf",

  social: [
    {
      label: "GitHub",
      href: "https://github.com/ElitX10",
    },
    {
      // TODO: remplace par l'URL exacte de ton profil LinkedIn.
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/TODO/",
    },
  ],
};
