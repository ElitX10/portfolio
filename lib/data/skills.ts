export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "front",
    label: "Front-end",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Angular",
      "AngularJS",
      "Ionic",
      "Bootstrap",
      "HTML",
      "Haml",
    ],
  },
  {
    id: "back",
    label: "Back-end",
    items: [
      "Java",
      "Spring",
      "Micronaut",
      "Jersey",
      "Hibernate",
      "PostgreSQL",
      "Ruby on Rails",
      "C# / .NET",
    ],
  },
  {
    id: "tests",
    label: "Tests & qualité",
    items: ["JUnit", "Mockito", "Cypress"],
  },
  {
    id: "outils",
    label: "Outils & méthodes",
    items: ["Git", "GitLab", "JIRA", "Trello", "Agile / Scrum"],
  },
  {
    id: "devops",
    label: "DevOps & infra",
    items: ["Docker", "GitLab CI", "Linux", "Raspberry Pi", "OpenMediaVault", "OpenVPN"],
  },
];
