export type TimelineItemType = "formation" | "experience" | "projet";

export type ContractType = "Stage" | "CDI" | "Temps plein" | "Projet personnel";

export type Mission = {
    client: string;
    duration?: string;
    description: string;
};

export type TimelineItem = {
    id: string;
    type: TimelineItemType;
    title: string;
    organization: string;
    contractType?: ContractType;
    location?: string;
    /** Format ISO YYYY-MM */
    startDate: string;
    /** Format ISO YYYY-MM, ou null si l'item est en cours */
    endDate: string | null;
    summary: string;
    highlights?: string[];
    missions?: Mission[];
    stack: string[];
};

/**
 * Items affichés dans la chronologie, ordre antichronologique (le plus récent
 * en premier). C'est cet ordre qui est utilisé tel quel par le composant
 * Timeline.
 */
export const TIMELINE: TimelineItem[] = [
    {
        id: "pwa-assurance",
        type: "experience",
        title: "Ingénieur développement logiciel",
        organization: "PWA Assurance",
        contractType: "CDI",
        location: "Lyon, Auvergne-Rhône-Alpes",
        startDate: "2022-09",
        endDate: null,
        summary:
            "Migration d'un client lourd Java 8 de gestion d'assurance vers une application web moderne (AngularJS puis Next.js) avec back-end Java. Implication transverse sur le code, les tests, le DevOps, l'agilité et l'outillage.",
        highlights: [
            "Migration et équivalence fonctionnelle entre le client lourd legacy et la nouvelle application web.",
            "Montée en compétence sur des modules complexes : moteur d'algorithme de tarification, génération et gestion documentaire.",
            "Refonte complète de la gestion des tâches (modèle, front-end et back-end).",
            "Refonte complète de la gestion des emails (nouveau système de génération et migration vers le nouveau back-end).",
            "Mise en place de l'infrastructure de tests : unitaires (JUnit, Mockito) et end-to-end (Cypress) sur le front Next.js.",
            "Diagnostic d'incidents en production et déploiements sur les environnements de recette internes.",
            "Mise en place de pipelines GitLab CI orientés tests.",
            "Introduction de pratiques agiles pour accompagner la croissance de l'équipe.",
            "Participation à l'introduction de Claude Code dans l'entreprise.",
        ],
        stack: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "AngularJS",
            "Java",
            "Jersey",
            "Hibernate",
            "PostgreSQL",
            "JUnit",
            "Mockito",
            "Cypress",
            "Docker",
            "GitLab CI",
            "Git",
        ],
    },

    {
        id: "nas-raspberry-pi",
        type: "projet",
        title: "NAS auto-hébergé sur Raspberry Pi",
        organization: "Projet personnel",
        startDate: "2020-01",
        endDate: null,
        summary:
            "Mise en place d'un serveur NAS auto-hébergé sur Raspberry Pi avec OpenMediaVault, accessible à distance via OpenVPN.",
        highlights: [
            "Installation et configuration d'OpenMediaVault sur Raspberry Pi.",
            "Mise en place d'un serveur OpenVPN pour l'accès distant sécurisé.",
            "Configuration réseau, gestion des partages et stratégie de sauvegarde.",
        ],
        stack: ["Raspberry Pi", "OpenMediaVault", "OpenVPN", "Linux"],
    },

    {
        id: "solutec",
        type: "experience",
        title: "Consultant en ingénierie logicielle",
        organization: "SOLUTEC",
        contractType: "Temps plein",
        location: "Villeurbanne, Auvergne-Rhône-Alpes",
        startDate: "2019-09",
        endDate: "2022-07",
        summary:
            "Quatre missions client successives sur des stacks variées, du back-end .NET au front-end Angular en passant par les architectures micro-frontends.",
        missions: [
            {
                client: "Volvo Truck",
                duration: "1 mois",
                description:
                    "Finalisation et livraison d'une application back-office .NET de gestion de pièces de camion. Adaptation rapide pour respecter un délai de livraison serré.",
            },
            {
                client: "Refonte service d'océrisation",
                duration: "3 mois",
                description:
                    "Migration d'un service back-end .NET d'océrisation de PDF vers un moteur d'OCR plus performant. Analyse de la documentation technique pour calibrer les paramètres au contexte métier.",
            },
            {
                client: "PWA Assurance",
                duration: "1 an",
                description:
                    "Migration d'un client lourd Java 8 de paramétrage d'une application de gestion vers une application web AngularJS.",
            },
            {
                client: "Groupama",
                description:
                    "Création d'un extranet courtier en Angular 12 / 13 / 14 (architecture micro-frontends), back-end microservices Java Spring puis migré vers Micronaut. Gestion de projet en agile.",
            },
        ],
        stack: [
            "Angular",
            "TypeScript",
            "Java",
            "Spring",
            "Micronaut",
            "Hibernate",
            "C# / .NET",
            "Bootstrap",
            "Git",
            "JIRA",
            "Trello",
        ],
    },

    {
        id: "aubay",
        type: "experience",
        title: "Ingénieur stagiaire",
        organization: "Aubay France",
        contractType: "Stage",
        location: "Boulogne-Billancourt, Île-de-France",
        startDate: "2019-02",
        endDate: "2019-07",
        summary:
            "Conception et développement d'une application intranet en Angular 7 puis 8 avec back-end TypeScript.",
        highlights: [
            "Création de composants visuels avancés : carrousel à effet 3D, carte de contact interactive, etc.",
            "Migration de l'application d'Angular 7 vers Angular 8.",
        ],
        stack: ["Angular", "TypeScript", "Ionic", "HTML", "Git", "Trello"],
    },

    {
        id: "eutech",
        type: "experience",
        title: "Développeur web — stagiaire",
        organization: "EUTECH SSII",
        contractType: "Stage",
        location: "Troyes, Grand Est",
        startDate: "2018-01",
        endDate: "2018-07",
        summary:
            "Développement complet d'une application web back-office de gestion d'entités en Ruby on Rails, sur l'ensemble du cycle projet.",
        highlights: [
            "Rédaction du cahier des charges.",
            "Développement de l'application.",
            "Mise en place des tests fonctionnels et de sécurité.",
            "Mise en production de l'application.",
        ],
        stack: ["Ruby on Rails", "HTML", "Haml", "Bootstrap"],
    },

    {
        id: "formation-ingenieur",
        type: "formation",
        title: "Diplôme d'ingénieur en Informatique et Systèmes d'Information",
        organization: "Université de Technologie de Troyes (UTT)",
        startDate: "2014-09",
        endDate: "2018-06",
        summary: "Spécialisation en management de projet logiciel.",
        highlights: [
            "Conception centrée usage des systèmes interactifs",
            "Prototypage rapide de logiciels",
            "Méthode « Agiles » et qualité du logiciel",
            "Architecture orientée services",
            "Plateformes numériques et économie collaborative",
        ],
        stack: [],
    },
];
