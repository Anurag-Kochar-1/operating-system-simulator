import { Project } from "@/components/apps/projects/project";
import { ProjectGroup } from "@/types";

export const PROJECTS_BY_GROUPS: ProjectGroup[] = [
  {
    id: "top-projects",
    title: "Top Projects 💪😎",
    projects: [
      {
        id: "system-design-puzzles",
        title: "System design puzzles",
        content: <Project id="system-design-puzzles" />,
        tagline:
          "Prepare for your system design interview with engaging puzzles on a flexible node-based editor.",
        thumbnail: "/images/project-images/system-design-puzzles/thumbnail.png",
        images: [
          {
            src: "/images/project-images/system-design-puzzles/example-puzzle-board.jpeg",
            title: "Puzzle Board",
            description: "An Interactive node-based editor.",
          },
          {
            src: "/images/project-images/system-design-puzzles/dock-item-opened.png",
            title: "Add block with ease",
            description: "Drag and drop block or just search.",
          },
          {
            src: "/images/project-images/system-design-puzzles/puzzles-list.jpeg",
            title: "Explore several puzzles",
          },
          {
            src: "/images/project-images/system-design-puzzles/coming-soon.png",
            title: "Powered by AI (coming soon)",
          },
          {
            src: "/images/project-images/system-design-puzzles/coming-soon.png",
            title: "Brainstorming (coming soon)",
            description: "Don't want to solve puzzles? Create an empty board for yourself."
          },
          {
            src: "/images/project-images/system-design-puzzles/coming-soon.png",
            title: "Leaderboard (coming soon)",
            description: "Compete with others and boost your interview confidence."
          },
        ],
        techStack: [
          { title: "Next JS" },
          { title: "TypeScript" },
          { title: "Tailwind CSS" },
          { title: "Reactflow" },
        ],
        liveSiteUrl: "https://system-design-puzzles.vercel.app/",
        sourceCodeUrl: "https://github.com/Anurag-Kochar-1/System-design-board",
        features: [
          "Puzzle Board - An Interactive node-based editor.",
          "Solve Puzzles - Solve system design puzzles to prepare.",
          "Powered by AI - Get suggestions and help from our AI (coming soon).",
          "Brainstorming - Don't want to solve puzzles? Create an empty board for yourself.",
          "Leaderboard - Compete with others and boost your interview confidence.",
        ],
      },
    ],
  },
  {
    id: "other-projects",
    title: "Not so top projects 😁",
    projects: [
      {
        id: "comm-comm",
        title: "CommComm Community Builder",
        content: <Project id="comm-comm" />,
        tagline:
          "The Ultimate Community platform for students who want to learn in a community at ZERO cost via free resources.",
        thumbnail:
          "/images/project-images/commcomm-community-builder/thumbnail.png",
        images: [
          {
            src: "/images/project-images/commcomm-community-builder/cover-image.png",
            title: "CommComm Community Builder",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_1.png",
            title: "Landing page",
            description:
              "It have several sections such as, sidebars for my joined & trending communities, midde container contains courses carousel and posts",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_2.png",
            title: "A Community",
            description:
              "It have several features such as, community posts, group chat, courses, classes, leaderboard, and about section",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_3.png",
            title: "Group live chat",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_4.png",
            title: "Course",
            description:
              "Community's own created course (from youtube playlist) which divided into paths, whereas each video from playlist is equal to a path",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_5.png",
            title: "Classes",
            description: "Each path's class",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_6.png",
            title: "Community leaderboard",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_7.png",
            title: "Explore posts / communities / courses",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_8.png",
            title: "User profile",
          },
          {
            src: "/images/project-images/commcomm-community-builder/commcomm_9.png",
            title: "Sign up page.",
          },
        ],
        techStack: [
          { title: "Next JS" },
          { title: "Redux" },
          { title: "Firebase" },
          { title: "TypeScript" },
        ],
        liveSiteUrl: "https://th3-project.vercel.app/",
        sourceCodeUrl:
          "https://github.com/Anurag-Kochar-1/CommComm-Community-Platform/tree/v2",
        features: [
          "Authentication - email & password, Google, and Facebook.",
          "Community - create in 3 steps - Name, Category, and Subcategory",
          "Content - upload videos, images, and captions posts in a community",
          "Group Chat - real-time chat in a community.",
          "Courses -  community owner can create a course via YT ID, each course will have several paths depending on the course duration. Each Path has the option to claim coins.",
          "Classes - community owner can create a class for a specific path",
          "Explore - communities, posts, and courses",
          "Gamification - users can earn coins by creating an account, attending more classes, and building communities.",
          "Community Leaderboard - users can climb the global or community leaderboard by having more coins",
          "User Profile page",
        ],
      },
    ],
  },
];
