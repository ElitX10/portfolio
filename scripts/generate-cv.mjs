import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
    AlignmentType,
    BorderStyle,
    Document,
    LevelFormat,
    Packer,
    Paragraph,
    ShadingType,
    Tab,
    Table,
    TableCell,
    TableLayoutType,
    TableRow,
    TabStopPosition,
    TabStopType,
    TextRun,
    WidthType,
} from "docx";

// ============================================================================
// DONNÉES COMPACTES (à éditer si le contenu doit changer)
// ============================================================================

const PROFILE = {
    name: "Thomas Le Scolan",
    title: "Ingénieur développement logiciel",
    location: "Lyon, France",
    availability: "Télétravail privilégié · 2j/semaine sur site max",
    email: "thomas.lescolan@sfr.fr",
    github: "github.com/ElitX10",
    linkedin: "linkedin.com/in/thomas-le-scolan-642618170",
};

const PROFIL_SYNTHESE =
    "Ingénieur full-stack ~7 ans d'expérience (Java/Spring & Next.js/React). Spécialisé dans la migration de systèmes legacy vers le web et la mise en place de stratégies de tests automatisés. À l'aise sur le cycle complet : conception, dev, tests, CI/CD, mise en production.";

const SKILLS = [
    { label: "Front-end", items: "Next.js, React, TypeScript, Tailwind CSS, Angular, AngularJS" },
    {
        label: "Back-end",
        items: "Java, Spring, Micronaut, Jersey, Hibernate, PostgreSQL, C# / .NET",
    },
    {
        label: "Tests & DevOps",
        items: "JUnit, Mockito, Cypress, Docker, GitLab CI, Git, Linux",
    },
];

const EXPERIENCES = [
    {
        period: "Sept. 2022 – aujourd'hui",
        title: "Ingénieur développement logiciel",
        organization: "PWA Assurance",
        contract: "CDI",
        location: "Lyon",
        bullets: [
            "Migré un client lourd Java 8 de gestion d'assurance vers une application web (AngularJS puis Next.js) avec back-end Java.",
            "Refondu intégralement les modules « gestion des tâches » et « gestion des emails » sur le full-stack.",
            "Industrialisé la stratégie de tests : unitaires (JUnit, Mockito) et end-to-end (Cypress), pipelines GitLab CI dédiés.",
            "Diagnostiqué les incidents de production, déployé sur les environnements de recette, accompagné l'introduction de Claude Code dans l'équipe.",
        ],
        stack: "Next.js · React · TypeScript · Java · Jersey · Hibernate · PostgreSQL · Cypress · Docker · GitLab CI",
    },
    {
        period: "Sept. 2019 – Juil. 2022",
        title: "Consultant en ingénierie logicielle",
        organization: "SOLUTEC",
        contract: "Temps plein",
        location: "Villeurbanne",
        bullets: [
            "Groupama : développé un extranet courtier en Angular 12-14 (architecture micro-frontends), back-end microservices Spring puis Micronaut.",
            "PWA Assurance (1 an) : migré un client lourd Java 8 de paramétrage vers une application AngularJS.",
            "Volvo Truck & refonte OCR : finalisé une application back-office .NET, migré un service d'océrisation PDF vers un moteur plus performant.",
        ],
        stack: "Angular · TypeScript · Java · Spring · Micronaut · Hibernate · C# / .NET",
    },
    {
        period: "Févr. – Juil. 2019",
        title: "Ingénieur stagiaire",
        organization: "Aubay France",
        contract: "Stage",
        location: "Boulogne-Billancourt",
        bullets: [
            "Conçu une application intranet Angular 7 puis 8 ; développé des composants visuels avancés (carrousel 3D, carte de contact interactive).",
        ],
        stack: "Angular · TypeScript · Ionic",
    },
    {
        period: "Janv. – Juil. 2018",
        title: "Développeur web",
        organization: "EUTECH SSII",
        contract: "Stage",
        location: "Troyes",
        bullets: [
            "Développé en autonomie une application web back-office en Ruby on Rails, du cahier des charges à la mise en production.",
        ],
        stack: "Ruby on Rails · HTML · Haml",
    },
];

const FORMATION = {
    period: "2014 – 2018",
    title: "Diplôme d'ingénieur en Informatique et Systèmes d'Information",
    organization: "Université de Technologie de Troyes (UTT)",
    summary:
        "Spécialisation management de projet logiciel · Conception centrée usage · Architecture orientée services · Méthodes agiles & qualité",
};

const PROJET_PERSO_LINE =
    "NAS auto-hébergé sur Raspberry Pi (depuis 2020) — OpenMediaVault, OpenVPN, Linux.";
const INTERESTS_LINE = "Ultimate frisbee · Dessin · Cinéma & séries · Jeux vidéo";

// ============================================================================
// HELPERS
// ============================================================================

function run(text, opts = {}) {
    return new TextRun({ text, ...opts });
}

/** Paragraphe avec un titre à gauche et une date alignée à droite via tab. */
function titleAndRightDate(titleRuns, dateText, opts = {}) {
    return new Paragraph({
        ...opts,
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
            ...titleRuns,
            new TextRun({ children: [new Tab()] }),
            new TextRun({ text: dateText, italics: true, color: "555555", size: 18 }),
        ],
    });
}

const A4 = {
    page: {
        size: { width: 11906, height: 16838 }, // A4 in twips
        margin: { top: 720, bottom: 720, left: 1000, right: 1000 },
    },
};

const numbering = {
    config: [
        {
            reference: "cv-bullets",
            levels: [
                {
                    level: 0,
                    format: LevelFormat.BULLET,
                    text: "•",
                    alignment: AlignmentType.LEFT,
                    style: {
                        paragraph: { indent: { left: 280, hanging: 200 } },
                    },
                },
            ],
        },
    ],
};

// ============================================================================
// STYLE 1 — CLASSIQUE (sobriété, accent bleu nuit, dates alignées à droite)
// ============================================================================

function styleClassique() {
    const ACCENT = "1E3A8A"; // indigo / bleu nuit
    const MUTED = "555555";
    const children = [];

    // En-tête centré
    children.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [run(PROFILE.name.toUpperCase(), { bold: true, size: 36, color: ACCENT })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [run(PROFILE.title, { size: 22, italics: true, color: MUTED })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [run(`${PROFILE.location}  ·  ${PROFILE.email}`, { size: 18 })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 },
            border: {
                bottom: { color: ACCENT, size: 6, style: BorderStyle.SINGLE, space: 6 },
            },
            children: [
                run(`${PROFILE.linkedin}  ·  ${PROFILE.github}  ·  ${PROFILE.availability}`, {
                    size: 18,
                    color: MUTED,
                }),
            ],
        }),
    );

    function sectionHeader(text) {
        return new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [run(text.toUpperCase(), { bold: true, size: 22, color: ACCENT })],
        });
    }

    // Profil
    children.push(
        sectionHeader("Profil"),
        new Paragraph({
            spacing: { after: 80 },
            children: [run(PROFIL_SYNTHESE, { size: 19 })],
        }),
    );

    // Compétences (juste après le profil — recommandation tech)
    children.push(sectionHeader("Compétences"));
    for (const group of SKILLS) {
        children.push(
            new Paragraph({
                spacing: { after: 30 },
                children: [
                    run(`${group.label} : `, { bold: true, size: 18, color: ACCENT }),
                    run(group.items, { size: 18 }),
                ],
            }),
        );
    }

    // Expériences
    children.push(sectionHeader("Expérience professionnelle"));
    for (const exp of EXPERIENCES) {
        children.push(
            titleAndRightDate(
                [
                    run(`${exp.title}`, { bold: true, size: 20 }),
                    run(`  —  ${exp.organization}`, { size: 20, color: ACCENT, bold: true }),
                ],
                exp.period,
                { spacing: { before: 140, after: 20 } },
            ),
            new Paragraph({
                spacing: { after: 60 },
                children: [
                    run(`${exp.contract} · ${exp.location}`, {
                        size: 17,
                        italics: true,
                        color: MUTED,
                    }),
                ],
            }),
        );

        for (const b of exp.bullets) {
            children.push(
                new Paragraph({
                    numbering: { reference: "cv-bullets", level: 0 },
                    spacing: { after: 30 },
                    children: [run(b, { size: 18 })],
                }),
            );
        }

        children.push(
            new Paragraph({
                spacing: { before: 40, after: 40 },
                children: [
                    run("Stack : ", { bold: true, size: 17, color: ACCENT }),
                    run(exp.stack, { size: 17, color: MUTED }),
                ],
            }),
        );
    }

    // Formation
    children.push(
        sectionHeader("Formation"),
        titleAndRightDate(
            [
                run(FORMATION.title, { bold: true, size: 20 }),
                run(`  —  ${FORMATION.organization}`, { size: 20, color: ACCENT, bold: true }),
            ],
            FORMATION.period,
            { spacing: { before: 60, after: 20 } },
        ),
        new Paragraph({
            spacing: { after: 60 },
            children: [run(FORMATION.summary, { size: 17, italics: true, color: MUTED })],
        }),
    );

    // Projet perso + centres d'intérêt sur une seule ligne
    children.push(
        sectionHeader("Projet perso & centres d'intérêt"),
        new Paragraph({
            spacing: { after: 30 },
            children: [
                run("Projet : ", { bold: true, size: 18, color: ACCENT }),
                run(PROJET_PERSO_LINE, { size: 18 }),
            ],
        }),
        new Paragraph({
            spacing: { after: 30 },
            children: [
                run("Hors travail : ", { bold: true, size: 18, color: ACCENT }),
                run(INTERESTS_LINE, { size: 18 }),
            ],
        }),
    );

    return new Document({
        creator: PROFILE.name,
        title: `CV ${PROFILE.name}`,
        styles: { default: { document: { run: { font: "Calibri" } } } },
        numbering,
        sections: [{ properties: A4, children }],
    });
}

// ============================================================================
// STYLE 2 — MODERNE (sidebar bleu nuit + colonne principale)
// ============================================================================

function styleModerne() {
    const SIDEBAR_BG = "1E3A8A"; // indigo / bleu nuit
    const SIDEBAR_TEXT = "FFFFFF";
    const SIDEBAR_MUTED = "C7D2FE"; // indigo-200
    const ACCENT = "1E3A8A";
    const MUTED = "555555";

    // ---------- SIDEBAR ----------
    const sidebar = [];

    sidebar.push(
        new Paragraph({
            spacing: { after: 80 },
            children: [
                run(PROFILE.name.split(" ").slice(0, -2).join(" ") || "Thomas", {
                    bold: true,
                    size: 32,
                    color: SIDEBAR_TEXT,
                }),
            ],
        }),
        new Paragraph({
            spacing: { after: 240 },
            children: [
                run(PROFILE.name.split(" ").slice(-2).join(" "), {
                    bold: true,
                    size: 32,
                    color: SIDEBAR_TEXT,
                }),
            ],
        }),
    );

    function sidebarTitle(text) {
        return new Paragraph({
            spacing: { before: 140, after: 80 },
            border: {
                bottom: {
                    color: SIDEBAR_MUTED,
                    size: 4,
                    style: BorderStyle.SINGLE,
                    space: 4,
                },
            },
            children: [
                run(text.toUpperCase(), {
                    bold: true,
                    size: 18,
                    color: SIDEBAR_TEXT,
                }),
            ],
        });
    }

    function sidebarLine(label, value) {
        return [
            new Paragraph({
                spacing: { after: 10 },
                children: [run(label, { size: 14, color: SIDEBAR_MUTED, bold: true })],
            }),
            new Paragraph({
                spacing: { after: 80 },
                children: [run(value, { size: 16, color: SIDEBAR_TEXT })],
            }),
        ];
    }

    sidebar.push(
        sidebarTitle("Contact"),
        ...sidebarLine("EMAIL", PROFILE.email),
        ...sidebarLine("LIEU", PROFILE.location),
        ...sidebarLine("LINKEDIN", PROFILE.linkedin),
        ...sidebarLine("GITHUB", PROFILE.github),
        ...sidebarLine("DISPONIBILITÉ", PROFILE.availability),
    );

    sidebar.push(sidebarTitle("Compétences"));
    for (const group of SKILLS) {
        sidebar.push(
            new Paragraph({
                spacing: { before: 60, after: 10 },
                children: [
                    run(group.label.toUpperCase(), { bold: true, size: 14, color: SIDEBAR_MUTED }),
                ],
            }),
            new Paragraph({
                spacing: { after: 80 },
                children: [run(group.items, { size: 16, color: SIDEBAR_TEXT })],
            }),
        );
    }

    sidebar.push(sidebarTitle("Centres d'intérêt"));
    sidebar.push(
        new Paragraph({
            spacing: { after: 80 },
            children: [run(INTERESTS_LINE, { size: 16, color: SIDEBAR_TEXT })],
        }),
    );

    // ---------- COLONNE PRINCIPALE ----------
    const main = [];

    main.push(
        new Paragraph({
            spacing: { after: 60 },
            children: [run(PROFILE.title, { size: 28, bold: true, color: "111111" })],
        }),
        new Paragraph({
            spacing: { after: 240 },
            border: {
                bottom: { color: ACCENT, size: 12, style: BorderStyle.SINGLE, space: 4 },
            },
            children: [
                run("INGÉNIEUR FULL-STACK · LYON", {
                    size: 16,
                    color: ACCENT,
                    bold: true,
                }),
            ],
        }),
    );

    function mainSection(text) {
        return new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [run(text.toUpperCase(), { bold: true, size: 20, color: ACCENT })],
        });
    }

    main.push(
        mainSection("Profil"),
        new Paragraph({
            spacing: { after: 100 },
            children: [run(PROFIL_SYNTHESE, { size: 18 })],
        }),
    );

    main.push(mainSection("Expérience"));
    for (const exp of EXPERIENCES) {
        main.push(
            titleAndRightDate([run(exp.title, { bold: true, size: 20 })], exp.period, {
                spacing: { before: 120, after: 20 },
            }),
            new Paragraph({
                spacing: { after: 60 },
                children: [
                    run(`${exp.organization}  ·  ${exp.contract}  ·  ${exp.location}`, {
                        size: 17,
                        color: ACCENT,
                        bold: true,
                    }),
                ],
            }),
        );
        for (const b of exp.bullets) {
            main.push(
                new Paragraph({
                    numbering: { reference: "cv-bullets", level: 0 },
                    spacing: { after: 30 },
                    children: [run(b, { size: 17 })],
                }),
            );
        }
        main.push(
            new Paragraph({
                spacing: { before: 30, after: 60 },
                children: [run(exp.stack, { size: 16, italics: true, color: MUTED })],
            }),
        );
    }

    main.push(
        mainSection("Formation"),
        titleAndRightDate([run(FORMATION.title, { bold: true, size: 20 })], FORMATION.period, {
            spacing: { before: 60, after: 20 },
        }),
        new Paragraph({
            spacing: { after: 60 },
            children: [run(FORMATION.organization, { size: 17, color: ACCENT, bold: true })],
        }),
        new Paragraph({
            spacing: { after: 40 },
            children: [run(FORMATION.summary, { size: 16, italics: true, color: MUTED })],
        }),
    );

    main.push(
        mainSection("Projet personnel"),
        new Paragraph({
            spacing: { after: 40 },
            children: [run(PROJET_PERSO_LINE, { size: 18 })],
        }),
    );

    // ---------- TABLE WRAP ----------
    const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    const borders = {
        top: noBorder,
        bottom: noBorder,
        left: noBorder,
        right: noBorder,
        insideHorizontal: noBorder,
        insideVertical: noBorder,
    };

    const sidebarShading = { type: ShadingType.CLEAR, color: "auto", fill: SIDEBAR_BG };

    const table = new Table({
        layout: TableLayoutType.FIXED,
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders,
        rows: [
            new TableRow({
                cantSplit: true,
                children: [
                    new TableCell({
                        width: { size: 32, type: WidthType.PERCENTAGE },
                        margins: { top: 600, bottom: 600, left: 360, right: 360 },
                        shading: sidebarShading,
                        children: sidebar,
                    }),
                    new TableCell({
                        width: { size: 68, type: WidthType.PERCENTAGE },
                        margins: { top: 600, bottom: 600, left: 480, right: 360 },
                        children: main,
                    }),
                ],
            }),
        ],
    });

    return new Document({
        creator: PROFILE.name,
        title: `CV ${PROFILE.name}`,
        styles: { default: { document: { run: { font: "Calibri" } } } },
        numbering,
        sections: [
            {
                properties: {
                    page: {
                        size: { width: 11906, height: 16838 },
                        margin: { top: 0, bottom: 0, left: 0, right: 0 },
                    },
                },
                children: [table],
            },
        ],
    });
}

// ============================================================================
// STYLE 3 — MINIMALISTE TECH (barre d'accent en haut, mono sur les sections)
// ============================================================================

function styleMinimaliste() {
    const ACCENT = "0F766E"; // teal-700, neutre tech
    const MUTED = "555555";
    const FAINT = "888888";
    const MONO = "Consolas";

    const children = [];

    // Barre d'accent en haut (paragraphe vide avec shading)
    children.push(
        new Paragraph({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: ACCENT },
            spacing: { after: 200 },
            children: [run(" ", { size: 4 })],
        }),
        // En-tête compact : nom + titre sur une ligne
        new Paragraph({
            spacing: { after: 30 },
            children: [
                run(PROFILE.name, { bold: true, size: 32 }),
                run(`   ${PROFILE.title}`, { size: 18, color: MUTED }),
            ],
        }),
        // Contact en mono, ligne unique
        new Paragraph({
            spacing: { after: 60 },
            border: {
                bottom: { color: "DDDDDD", size: 4, style: BorderStyle.SINGLE, space: 4 },
            },
            children: [
                run(
                    `${PROFILE.email}  /  ${PROFILE.location}  /  ${PROFILE.linkedin}  /  ${PROFILE.github}  /  ${PROFILE.availability}`,
                    { size: 14, font: MONO, color: FAINT },
                ),
            ],
        }),
    );

    function sectionHeader(text) {
        return new Paragraph({
            spacing: { before: 240, after: 100 },
            children: [
                run("// ", { size: 18, font: MONO, color: ACCENT, bold: true }),
                run(text, { size: 18, font: MONO, color: ACCENT, bold: true }),
            ],
        });
    }

    children.push(
        sectionHeader("profil"),
        new Paragraph({
            spacing: { after: 60 },
            children: [run(PROFIL_SYNTHESE, { size: 17 })],
        }),
    );

    children.push(sectionHeader("compétences"));
    for (const group of SKILLS) {
        children.push(
            new Paragraph({
                spacing: { after: 30 },
                children: [
                    run(`${group.label.padEnd(18)}  `, { size: 16, font: MONO, color: ACCENT }),
                    run(group.items, { size: 16 }),
                ],
            }),
        );
    }

    children.push(sectionHeader("expérience"));
    for (const exp of EXPERIENCES) {
        children.push(
            titleAndRightDate(
                [
                    run(exp.title, { bold: true, size: 19 }),
                    run(`  @ ${exp.organization}`, { size: 17, color: ACCENT }),
                ],
                exp.period,
                { spacing: { before: 140, after: 20 } },
            ),
            new Paragraph({
                spacing: { after: 60 },
                children: [
                    run(`${exp.contract} · ${exp.location}`, {
                        size: 14,
                        color: FAINT,
                        font: MONO,
                    }),
                ],
            }),
        );
        for (const b of exp.bullets) {
            children.push(
                new Paragraph({
                    spacing: { after: 30 },
                    indent: { left: 200 },
                    children: [run("→ ", { size: 17, color: ACCENT }), run(b, { size: 17 })],
                }),
            );
        }
        children.push(
            new Paragraph({
                spacing: { before: 30, after: 30 },
                indent: { left: 200 },
                children: [run(exp.stack, { size: 14, font: MONO, color: FAINT })],
            }),
        );
    }

    children.push(
        sectionHeader("formation"),
        titleAndRightDate(
            [
                run(FORMATION.title, { bold: true, size: 19 }),
                run(`  @ ${FORMATION.organization}`, { size: 17, color: ACCENT }),
            ],
            FORMATION.period,
            { spacing: { before: 60, after: 30 } },
        ),
        new Paragraph({
            spacing: { after: 30 },
            indent: { left: 200 },
            children: [run(FORMATION.summary, { size: 14, font: MONO, color: FAINT })],
        }),
    );

    children.push(
        sectionHeader("projet & hobbies"),
        new Paragraph({
            spacing: { after: 20 },
            children: [
                run("→ ", { size: 17, color: ACCENT }),
                run(PROJET_PERSO_LINE, { size: 17 }),
            ],
        }),
        new Paragraph({
            spacing: { after: 20 },
            children: [run("→ ", { size: 17, color: ACCENT }), run(INTERESTS_LINE, { size: 17 })],
        }),
    );

    return new Document({
        creator: PROFILE.name,
        title: `CV ${PROFILE.name}`,
        styles: { default: { document: { run: { font: "Calibri" } } } },
        numbering,
        sections: [{ properties: A4, children }],
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
