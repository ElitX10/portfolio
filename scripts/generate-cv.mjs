import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
    AlignmentType,
    BorderStyle,
    Document,
    Packer,
    Paragraph,
    ShadingType,
    Table,
    TableCell,
    TableLayoutType,
    TableRow,
    TextRun,
    WidthType,
} from "docx";

// ============================================================================
// DONNÉES (recopiées depuis lib/data — à mettre à jour si le portfolio change)
// ============================================================================

const PROFILE = {
    name: "Thomas Le Scolan",
    title: "Ingénieur développement logiciel",
    location: "Lyon, France",
    availability: "Télétravail privilégié · jusqu'à 2j/semaine sur site",
    email: "thomas.lescolan@sfr.fr",
    github: "github.com/ElitX10",
    linkedin: "linkedin.com/in/thomas-le-scolan-642618170",
};

// Petit profil de synthèse basé sur l'expérience réelle (à éditer dans Word).
const PROFIL_SYNTHESE =
    "Ingénieur en développement logiciel avec ~7 ans d'expérience, principalement chez PWA Assurance sur la migration d'un client lourd Java vers une application web moderne (AngularJS puis Next.js). Profil polyvalent : back-end Java/Spring, front-end React/Angular, tests automatisés et DevOps. Diplômé de l'UTT en management de projet logiciel.";

const TIMELINE = [
    {
        type: "experience",
        title: "Ingénieur développement logiciel",
        organization: "PWA Assurance",
        contractType: "CDI",
        location: "Lyon",
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
        type: "experience",
        title: "Consultant en ingénierie logicielle",
        organization: "SOLUTEC",
        contractType: "Temps plein",
        location: "Villeurbanne",
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
                    "Création d'un extranet courtier en Angular 12/13/14 (architecture micro-frontends), back-end microservices Java Spring puis migré vers Micronaut. Gestion de projet en agile.",
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
        type: "experience",
        title: "Ingénieur stagiaire",
        organization: "Aubay France",
        contractType: "Stage",
        location: "Boulogne-Billancourt",
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
        type: "experience",
        title: "Développeur web — stagiaire",
        organization: "EUTECH SSII",
        contractType: "Stage",
        location: "Troyes",
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
];

const FORMATION = {
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
};

const PROJET_PERSO = {
    title: "NAS auto-hébergé sur Raspberry Pi",
    startDate: "2020-01",
    summary:
        "Mise en place d'un serveur NAS auto-hébergé sur Raspberry Pi avec OpenMediaVault, accessible à distance via OpenVPN.",
    stack: ["Raspberry Pi", "OpenMediaVault", "OpenVPN", "Linux"],
};

const SKILL_GROUPS = [
    {
        label: "Front-end",
        items: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Angular",
            "AngularJS",
            "Bootstrap",
        ],
    },
    {
        label: "Back-end",
        items: ["Java", "Spring", "Micronaut", "Jersey", "Hibernate", "PostgreSQL", "C# / .NET"],
    },
    { label: "Tests & qualité", items: ["JUnit", "Mockito", "Cypress"] },
    { label: "Outils & méthodes", items: ["Git", "GitLab", "JIRA", "Trello", "Agile / Scrum"] },
    { label: "DevOps & infra", items: ["Docker", "GitLab CI", "Linux", "Raspberry Pi"] },
];

const INTERESTS = [
    { label: "Ultimate frisbee", description: "Pour l'esprit fair-play et l'auto-arbitrage." },
    { label: "Dessin", description: "L'occasion d'exercer un autre type de créativité." },
    { label: "Cinéma & séries", description: "Tout ce qui se raconte en images." },
    { label: "Jeux vidéo", description: "Pour explorer des univers et décompresser." },
];

// ============================================================================
// HELPERS
// ============================================================================

const MONTHS_FR = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
];

function formatYearMonth(ym) {
    const [y, m] = ym.split("-").map(Number);
    return `${MONTHS_FR[m - 1]} ${y}`;
}

function formatPeriod(start, end) {
    const startStr = formatYearMonth(start);
    const endStr = end ? formatYearMonth(end) : "aujourd'hui";
    return `${startStr} – ${endStr}`;
}

const INDIGO = "4F46E5"; // primary accent

// ============================================================================
// STYLE 1 — CLASSIQUE
// ============================================================================

function styleClassique() {
    const children = [];

    // En-tête
    children.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [new TextRun({ text: PROFILE.name.toUpperCase(), bold: true, size: 40 })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [new TextRun({ text: PROFILE.title, size: 24, italics: true })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [
                new TextRun({
                    text: `${PROFILE.location}  ·  ${PROFILE.availability}`,
                    size: 20,
                }),
            ],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
                new TextRun({
                    text: `${PROFILE.email}  ·  ${PROFILE.linkedin}  ·  ${PROFILE.github}`,
                    size: 20,
                }),
            ],
        }),
    );

    function sectionTitle(text) {
        return new Paragraph({
            spacing: { before: 200, after: 120 },
            border: {
                bottom: { color: "000000", size: 6, style: BorderStyle.SINGLE, space: 4 },
            },
            children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 24 })],
        });
    }

    // Profil
    children.push(
        sectionTitle("Profil"),
        new Paragraph({
            spacing: { after: 120 },
            children: [new TextRun({ text: PROFIL_SYNTHESE, size: 22 })],
        }),
    );

    // Expériences
    children.push(sectionTitle("Expérience professionnelle"));
    for (const exp of TIMELINE) {
        children.push(
            new Paragraph({
                spacing: { before: 160, after: 40 },
                children: [
                    new TextRun({
                        text: `${exp.title} — ${exp.organization}`,
                        bold: true,
                        size: 22,
                    }),
                ],
            }),
            new Paragraph({
                spacing: { after: 80 },
                children: [
                    new TextRun({
                        text: `${formatPeriod(exp.startDate, exp.endDate)}  ·  ${exp.contractType}${exp.location ? `  ·  ${exp.location}` : ""}`,
                        size: 20,
                        italics: true,
                        color: "555555",
                    }),
                ],
            }),
            new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({ text: exp.summary, size: 22 })],
            }),
        );

        if (exp.missions) {
            for (const mission of exp.missions) {
                children.push(
                    new Paragraph({
                        spacing: { before: 60, after: 20 },
                        indent: { left: 360 },
                        children: [
                            new TextRun({
                                text: `${mission.client}${mission.duration ? ` — ${mission.duration}` : ""}`,
                                bold: true,
                                size: 20,
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: 60 },
                        indent: { left: 360 },
                        children: [new TextRun({ text: mission.description, size: 20 })],
                    }),
                );
            }
        } else if (exp.highlights) {
            for (const h of exp.highlights) {
                children.push(
                    new Paragraph({
                        bullet: { level: 0 },
                        spacing: { after: 40 },
                        children: [new TextRun({ text: h, size: 20 })],
                    }),
                );
            }
        }

        children.push(
            new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [
                    new TextRun({ text: "Stack : ", bold: true, size: 20 }),
                    new TextRun({ text: exp.stack.join(" · "), size: 20 }),
                ],
            }),
        );
    }

    // Formation
    children.push(
        sectionTitle("Formation"),
        new Paragraph({
            spacing: { before: 120, after: 40 },
            children: [
                new TextRun({
                    text: `${FORMATION.title} — ${FORMATION.organization}`,
                    bold: true,
                    size: 22,
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 80 },
            children: [
                new TextRun({
                    text: formatPeriod(FORMATION.startDate, FORMATION.endDate),
                    size: 20,
                    italics: true,
                    color: "555555",
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: FORMATION.summary, size: 22 })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [new TextRun({ text: "Enseignements spécifiques :", bold: true, size: 20 })],
        }),
    );
    for (const h of FORMATION.highlights) {
        children.push(
            new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 40 },
                children: [new TextRun({ text: h, size: 20 })],
            }),
        );
    }

    // Compétences
    children.push(sectionTitle("Compétences"));
    for (const group of SKILL_GROUPS) {
        children.push(
            new Paragraph({
                spacing: { before: 60, after: 40 },
                children: [
                    new TextRun({ text: `${group.label} : `, bold: true, size: 20 }),
                    new TextRun({ text: group.items.join(", "), size: 20 }),
                ],
            }),
        );
    }

    // Projet personnel
    children.push(
        sectionTitle("Projet personnel"),
        new Paragraph({
            spacing: { before: 120, after: 40 },
            children: [
                new TextRun({
                    text: `${PROJET_PERSO.title}  ·  depuis ${formatYearMonth(PROJET_PERSO.startDate)}`,
                    bold: true,
                    size: 22,
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: PROJET_PERSO.summary, size: 22 })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [
                new TextRun({ text: "Stack : ", bold: true, size: 20 }),
                new TextRun({ text: PROJET_PERSO.stack.join(" · "), size: 20 }),
            ],
        }),
    );

    // Centres d'intérêt
    children.push(sectionTitle("Centres d'intérêt"));
    children.push(
        new Paragraph({
            spacing: { after: 60 },
            children: [
                new TextRun({
                    text: INTERESTS.map(
                        (i) => `${i.label} (${i.description.toLowerCase().replace(/\.$/, "")})`,
                    ).join(" · "),
                    size: 22,
                }),
            ],
        }),
    );

    return new Document({
        creator: PROFILE.name,
        title: `CV ${PROFILE.name}`,
        styles: { default: { document: { run: { font: "Calibri" } } } },
        sections: [
            {
                properties: {
                    page: { margin: { top: 720, bottom: 720, left: 1080, right: 1080 } },
                },
                children,
            },
        ],
    });
}

// ============================================================================
// STYLE 2 — MODERNE 2 COLONNES (avec sidebar)
// ============================================================================

function styleModerne() {
    const sidebarChildren = [];
    const mainChildren = [];

    // ----- SIDEBAR -----

    sidebarChildren.push(
        new Paragraph({
            spacing: { after: 120 },
            children: [new TextRun({ text: "CONTACT", bold: true, size: 22, color: INDIGO })],
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: PROFILE.email, size: 18 })],
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: PROFILE.location, size: 18 })],
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: PROFILE.availability, size: 18, italics: true })],
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: PROFILE.linkedin, size: 18 })],
        }),
        new Paragraph({
            spacing: { after: 240 },
            children: [new TextRun({ text: PROFILE.github, size: 18 })],
        }),

        new Paragraph({
            spacing: { after: 120 },
            children: [new TextRun({ text: "COMPÉTENCES", bold: true, size: 22, color: INDIGO })],
        }),
    );

    for (const group of SKILL_GROUPS) {
        sidebarChildren.push(
            new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [new TextRun({ text: group.label, bold: true, size: 18 })],
            }),
            new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({ text: group.items.join(", "), size: 18 })],
            }),
        );
    }

    sidebarChildren.push(
        new Paragraph({
            spacing: { before: 240, after: 120 },
            children: [
                new TextRun({ text: "CENTRES D'INTÉRÊT", bold: true, size: 22, color: INDIGO }),
            ],
        }),
    );

    for (const i of INTERESTS) {
        sidebarChildren.push(
            new Paragraph({
                spacing: { after: 40 },
                children: [
                    new TextRun({ text: `• ${i.label} `, bold: true, size: 18 }),
                    new TextRun({ text: `— ${i.description}`, size: 18, italics: true }),
                ],
            }),
        );
    }

    // ----- MAIN COLUMN -----

    mainChildren.push(
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: PROFILE.name, bold: true, size: 44, color: INDIGO })],
        }),
        new Paragraph({
            spacing: { after: 240 },
            children: [new TextRun({ text: PROFILE.title.toUpperCase(), size: 22 })],
        }),

        new Paragraph({
            spacing: { after: 100 },
            children: [new TextRun({ text: "PROFIL", bold: true, size: 22, color: INDIGO })],
        }),
        new Paragraph({
            spacing: { after: 240 },
            children: [new TextRun({ text: PROFIL_SYNTHESE, size: 20 })],
        }),

        new Paragraph({
            spacing: { after: 100 },
            children: [new TextRun({ text: "EXPÉRIENCE", bold: true, size: 22, color: INDIGO })],
        }),
    );

    for (const exp of TIMELINE) {
        mainChildren.push(
            new Paragraph({
                spacing: { before: 120, after: 20 },
                children: [new TextRun({ text: exp.title, bold: true, size: 22 })],
            }),
            new Paragraph({
                spacing: { after: 40 },
                children: [
                    new TextRun({
                        text: `${exp.organization} · ${exp.contractType}${exp.location ? ` · ${exp.location}` : ""}`,
                        size: 18,
                        color: INDIGO,
                    }),
                    new TextRun({
                        text: `   ${formatPeriod(exp.startDate, exp.endDate)}`,
                        size: 18,
                        italics: true,
                        color: "777777",
                    }),
                ],
            }),
            new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: exp.summary, size: 20 })],
            }),
        );

        if (exp.missions) {
            for (const mission of exp.missions) {
                mainChildren.push(
                    new Paragraph({
                        bullet: { level: 0 },
                        spacing: { after: 40 },
                        children: [
                            new TextRun({
                                text: `${mission.client}${mission.duration ? ` (${mission.duration})` : ""} : `,
                                bold: true,
                                size: 19,
                            }),
                            new TextRun({ text: mission.description, size: 19 }),
                        ],
                    }),
                );
            }
        } else if (exp.highlights) {
            for (const h of exp.highlights) {
                mainChildren.push(
                    new Paragraph({
                        bullet: { level: 0 },
                        spacing: { after: 40 },
                        children: [new TextRun({ text: h, size: 19 })],
                    }),
                );
            }
        }

        mainChildren.push(
            new Paragraph({
                spacing: { before: 60, after: 80 },
                children: [
                    new TextRun({
                        text: exp.stack.join(" · "),
                        size: 18,
                        italics: true,
                        color: "666666",
                    }),
                ],
            }),
        );
    }

    mainChildren.push(
        new Paragraph({
            spacing: { before: 240, after: 100 },
            children: [new TextRun({ text: "FORMATION", bold: true, size: 22, color: INDIGO })],
        }),
        new Paragraph({
            spacing: { before: 60, after: 20 },
            children: [new TextRun({ text: FORMATION.title, bold: true, size: 22 })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [
                new TextRun({ text: FORMATION.organization, size: 18, color: INDIGO }),
                new TextRun({
                    text: `   ${formatPeriod(FORMATION.startDate, FORMATION.endDate)}`,
                    size: 18,
                    italics: true,
                    color: "777777",
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: FORMATION.summary, size: 20 })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [
                new TextRun({
                    text: `Enseignements : ${FORMATION.highlights.join(", ")}.`,
                    size: 19,
                    italics: true,
                }),
            ],
        }),

        new Paragraph({
            spacing: { before: 240, after: 100 },
            children: [
                new TextRun({ text: "PROJET PERSONNEL", bold: true, size: 22, color: INDIGO }),
            ],
        }),
        new Paragraph({
            spacing: { before: 60, after: 20 },
            children: [
                new TextRun({ text: PROJET_PERSO.title, bold: true, size: 22 }),
                new TextRun({
                    text: `   depuis ${formatYearMonth(PROJET_PERSO.startDate)}`,
                    size: 18,
                    italics: true,
                    color: "777777",
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [new TextRun({ text: PROJET_PERSO.summary, size: 20 })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [
                new TextRun({
                    text: PROJET_PERSO.stack.join(" · "),
                    size: 18,
                    italics: true,
                    color: "666666",
                }),
            ],
        }),
    );

    // ----- TABLE WRAP -----

    const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    const borders = {
        top: noBorder,
        bottom: noBorder,
        left: noBorder,
        right: noBorder,
        insideHorizontal: noBorder,
        insideVertical: noBorder,
    };

    const sidebarShading = { type: ShadingType.CLEAR, color: "auto", fill: "F5F5F7" };

    const table = new Table({
        layout: TableLayoutType.FIXED,
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders,
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 32, type: WidthType.PERCENTAGE },
                        margins: { top: 240, bottom: 240, left: 240, right: 240 },
                        shading: sidebarShading,
                        children: sidebarChildren,
                    }),
                    new TableCell({
                        width: { size: 68, type: WidthType.PERCENTAGE },
                        margins: { top: 240, bottom: 240, left: 360, right: 240 },
                        children: mainChildren,
                    }),
                ],
            }),
        ],
    });

    return new Document({
        creator: PROFILE.name,
        title: `CV ${PROFILE.name}`,
        styles: { default: { document: { run: { font: "Calibri" } } } },
        sections: [
            {
                properties: {
                    page: { margin: { top: 0, bottom: 0, left: 0, right: 0 } },
                },
                children: [table],
            },
        ],
    });
}

// ============================================================================
// STYLE 3 — MINIMALISTE TECH
// ============================================================================

function styleMinimaliste() {
    const children = [];

    // En-tête compact
    children.push(
        new Paragraph({
            spacing: { after: 40 },
            children: [new TextRun({ text: PROFILE.name, bold: true, size: 36 })],
        }),
        new Paragraph({
            spacing: { after: 80 },
            children: [new TextRun({ text: PROFILE.title, size: 22, color: "555555" })],
        }),
        new Paragraph({
            border: {
                bottom: { color: "DDDDDD", size: 6, style: BorderStyle.SINGLE, space: 4 },
            },
            spacing: { after: 200 },
            children: [
                new TextRun({
                    text: `${PROFILE.location}  /  ${PROFILE.availability}  /  ${PROFILE.email}  /  ${PROFILE.linkedin}  /  ${PROFILE.github}`,
                    size: 18,
                    color: "666666",
                }),
            ],
        }),
    );

    function sectionTitle(text) {
        return new Paragraph({
            spacing: { before: 280, after: 120 },
            children: [
                new TextRun({
                    text: text,
                    bold: true,
                    size: 22,
                    font: "Consolas",
                    color: "333333",
                }),
            ],
        });
    }

    children.push(
        sectionTitle("// Profil"),
        new Paragraph({
            spacing: { after: 100 },
            children: [new TextRun({ text: PROFIL_SYNTHESE, size: 20 })],
        }),
    );

    children.push(sectionTitle("// Expériences"));

    for (const exp of TIMELINE) {
        children.push(
            new Paragraph({
                spacing: { before: 160, after: 30 },
                children: [
                    new TextRun({
                        text: formatPeriod(exp.startDate, exp.endDate),
                        font: "Consolas",
                        size: 18,
                        color: "888888",
                    }),
                ],
            }),
            new Paragraph({
                spacing: { after: 30 },
                children: [
                    new TextRun({ text: exp.title, bold: true, size: 22 }),
                    new TextRun({
                        text: `   @ ${exp.organization} · ${exp.contractType}`,
                        size: 20,
                        color: "555555",
                    }),
                ],
            }),
            new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: exp.summary, size: 20 })],
            }),
        );

        if (exp.missions) {
            for (const mission of exp.missions) {
                children.push(
                    new Paragraph({
                        spacing: { after: 30 },
                        children: [
                            new TextRun({ text: "→ ", color: "888888", size: 19 }),
                            new TextRun({
                                text: `${mission.client}${mission.duration ? ` (${mission.duration})` : ""} — `,
                                bold: true,
                                size: 19,
                            }),
                            new TextRun({ text: mission.description, size: 19 }),
                        ],
                    }),
                );
            }
        } else if (exp.highlights) {
            for (const h of exp.highlights) {
                children.push(
                    new Paragraph({
                        spacing: { after: 30 },
                        children: [
                            new TextRun({ text: "→ ", color: "888888", size: 19 }),
                            new TextRun({ text: h, size: 19 }),
                        ],
                    }),
                );
            }
        }

        children.push(
            new Paragraph({
                spacing: { before: 60, after: 40 },
                children: [
                    new TextRun({
                        text: exp.stack.join(" · "),
                        font: "Consolas",
                        size: 17,
                        color: "777777",
                    }),
                ],
            }),
        );
    }

    children.push(
        sectionTitle("// Formation"),
        new Paragraph({
            spacing: { after: 30 },
            children: [
                new TextRun({
                    text: formatPeriod(FORMATION.startDate, FORMATION.endDate),
                    font: "Consolas",
                    size: 18,
                    color: "888888",
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 30 },
            children: [
                new TextRun({ text: FORMATION.title, bold: true, size: 22 }),
                new TextRun({
                    text: `   @ ${FORMATION.organization}`,
                    size: 20,
                    color: "555555",
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: FORMATION.summary, size: 20 })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [
                new TextRun({
                    text: `Enseignements : ${FORMATION.highlights.join(" · ")}`,
                    font: "Consolas",
                    size: 17,
                    color: "777777",
                }),
            ],
        }),
    );

    children.push(sectionTitle("// Stack"));
    for (const group of SKILL_GROUPS) {
        children.push(
            new Paragraph({
                spacing: { after: 30 },
                children: [
                    new TextRun({
                        text: `${group.label.padEnd(22)}`,
                        font: "Consolas",
                        size: 17,
                        color: "888888",
                    }),
                    new TextRun({
                        text: group.items.join(", "),
                        font: "Consolas",
                        size: 17,
                    }),
                ],
            }),
        );
    }

    children.push(
        sectionTitle("// Projet personnel"),
        new Paragraph({
            spacing: { after: 30 },
            children: [
                new TextRun({
                    text: `depuis ${formatYearMonth(PROJET_PERSO.startDate)}`,
                    font: "Consolas",
                    size: 18,
                    color: "888888",
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: PROJET_PERSO.title, bold: true, size: 22 })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [new TextRun({ text: PROJET_PERSO.summary, size: 20 })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [
                new TextRun({
                    text: PROJET_PERSO.stack.join(" · "),
                    font: "Consolas",
                    size: 17,
                    color: "777777",
                }),
            ],
        }),
    );

    children.push(sectionTitle("// Hors travail"));
    children.push(
        new Paragraph({
            spacing: { after: 60 },
            children: [
                new TextRun({
                    text: INTERESTS.map((i) => i.label).join("  ·  "),
                    size: 20,
                }),
            ],
        }),
    );

    return new Document({
        creator: PROFILE.name,
        title: `CV ${PROFILE.name}`,
        styles: { default: { document: { run: { font: "Calibri" } } } },
        sections: [
            {
                properties: {
                    page: { margin: { top: 720, bottom: 720, left: 1080, right: 1080 } },
                },
                children,
            },
        ],
    });
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
    const outDir = resolve(process.cwd(), "cv");
    await mkdir(outDir, { recursive: true });

    const variants = [
        ["classique", styleClassique()],
        ["moderne", styleModerne()],
        ["minimaliste", styleMinimaliste()],
    ];

    for (const [name, doc] of variants) {
        const buffer = await Packer.toBuffer(doc);
        const path = resolve(outDir, `cv-thomas-le-scolan-${name}.docx`);
        await writeFile(path, buffer);
        console.log(`✓ ${path}`);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
