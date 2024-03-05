import { DummyProject } from "@/components/apps/projects/dummy";
import { ProjectGroup } from "@/types";

export const PROJECTS_BY_GROUPS: ProjectGroup[] = [
  {
    id: "top-projects",
    title: "Top Projects",
    projects: [
      {
        id: "system-design-puzzles",
        title: "System design puzzles",
        content: <DummyProject />,
        tagline:
          "Prepare for your system design interview with engaging puzzles on a flexible node-based editor.",
        thumbnail: "",
        techStack: [
          { title: "Next JS" },
          { title: "TypeScript" },
          { title: "Tailwind CSS" },
          { title: "Reactflow" },
        ],
      },
    ],
  },
  {
    id: "other-projects",
    title: "Not so top Projects",
    projects: [
      {
        id: "system",
        title: "Project 1",
        content: <DummyProject />,
        tagline:
          "Deez Nuts 🥜🥜🥜🥜🥜🥜🥜🥜🥜 Deez Nuts Deez Nuts Deez Nuts Deez Nuts",
        thumbnail: "",
        techStack: [
          { title: "English" },
          { title: "Vision" },
          { title: "Senses" },
          { title: "Brain" },
        ],
      },
      {
        id: "xP2",
        title: "Project 2",
        content: <DummyProject />,
        tagline:
          "Deez Nuts 🥜🥜🥜🥜🥜🥜🥜🥜🥜 Deez Nuts Deez Nuts Deez Nuts Deez Nuts",
        thumbnail: "",
        techStack: [
          { title: "English" },
          { title: "Vision" },
          { title: "Senses" },
          { title: "Brain" },
        ],
      },
      {
        id: "xP3",
        title: "Project 3",
        content: <DummyProject />,
        tagline:
          "Deez Nuts 🥜🥜🥜🥜🥜🥜🥜🥜🥜 Deez Nuts Deez Nuts Deez Nuts Deez Nuts",
        thumbnail: "",
        techStack: [
          { title: "English" },
          { title: "Vision" },
          { title: "Senses" },
          { title: "Brain" },
        ],
      },
    ],
  },
];
