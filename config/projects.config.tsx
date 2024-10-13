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
            description:
              "Don't want to solve puzzles? Create an empty board for yourself.",
          },
          {
            src: "/images/project-images/system-design-puzzles/coming-soon.png",
            title: "Leaderboard (coming soon)",
            description:
              "Compete with others and boost your interview confidence.",
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
      {
        id: "offsta",
        title: "Offsta (1st startup :)",
        content: <Project id="offsta" />,
        tagline:
          "Clash of Clans + Discord + Reddit = Offsta, a platform where you can build Discoverable, Monetizable, Gamified Communities, and much more",
        thumbnail: "/images/project-images/offsta/thumbnail.png",
        images: [
          {
            src: "/images/project-images/offsta/thumbnail.png",
            title: "A Community",
            description:
              "Clash of Clans + Discord + Reddit = Offsta, a platform where you can build Discoverable, Monetizable, Gamified Communities, and much more.",
          },
          {
            src: "/images/project-images/offsta/explore-page.png",
            title: "Explore content - just like reddit but better",
          },
          {
            src: "/images/project-images/offsta/town-hall.png",
            title: "Town hall",
            description: "Command center for your community",
          },
          {
            src: "/images/project-images/offsta/bank.png",
            title: "Currency",
            description:
              "Manage your community's finances by adding a bank, currency, and rewards.",
          },
          {
            src: "/images/project-images/offsta/event-stage.png",
            title: "Events",
            description: "Host events within your community.",
          },
          {
            src: "/images/project-images/offsta/content-channel.png",
            title: "Content",
            description: "Create content in a community.",
          },
          {
            src: "/images/project-images/offsta/shop.png",
            title: "Shop",
            description: "List your affiliate products in a community's shop.",
          },
          {
            src: "/images/project-images/offsta/billboard.png",
            title: "Billboard",
            description: "Place ads on community's billboards and earn money.",
          },
          {
            src: "/images/project-images/offsta/networking-channel.png",
            title: "Networking",
            description: "Mini linkedin.",
          },
          {
            src: "/images/project-images/offsta/voice-channel.png",
            title: "Voice channel",
          },
          {
            src: "/images/project-images/offsta/text-channel.png",
            title: "Text channel",
          },
        ],
        techStack: [{ title: "Bubble" }],
        liveSiteUrl:
          "https://offsta-mvp-v2-ak-1.bubbleapps.io/version-test/place_entrance_screen/1655294587384x550707056462528500",
        sourceCodeUrl:
          "https://offsta-mvp-v2-ak-1.bubbleapps.io/version-test/place_entrance_screen/1655294587384x550707056462528500",
        features: [
          "Clash of Clans + Discord + Reddit = Offsta, a platform where you can build Discoverable, Monetizable, Gamified Communities, and much more.",
          "Build a community akin to your own city, with multiple buildings catering to specific needs.",
          "Explore content - just like reddit but better.",
          "Earn money - place billboards in your city (community).",
        ],
      },
      {
        id: "gta-6-vs-code-theme",
        title: "GTA 6 VS Code Theme",
        content: <Project id="gta-6-vs-code-theme" />,
        tagline:
          "unofficial, fan-made vscode theme based on gta 6 color palette.",
        thumbnail: "/images/project-images/gta-6-vs-code-theme/thumbnail.jpg",
        images: [
          {
            src: "/images/project-images/gta-6-vs-code-theme/thumbnail.jpg",
            title: "",
          },
          {
            src: "/images/project-images/gta-6-vs-code-theme/thumbnail.jpg",
            title: "",
          },
        ],
        techStack: [{ title: "JSON (lmao)" }],
        liveSiteUrl:
          "https://marketplace.visualstudio.com/items?itemName=GTA-6-theme.gta-6-theme",
        sourceCodeUrl: "https://github.com/Anurag-Kochar-1/GTA-6-theme",
        features: ["Its a theme bro"],
      },
      {
        id: "medium-clone-project",
        title: "Medium",
        content: <Project id="medium-clone-project" />,
        tagline: "A clone of medium.com site",
        thumbnail: "/images/project-images/medium/thumbnail.png",
        images: [
          {
            src: "/images/project-images/medium/homepage.png",
            title: "",
          },
          {
            src: "/images/project-images/medium/blog-page.png",
            title: "",
          },
          {
            src: "/images/project-images/medium/blogs-by-tag-page.png",
            title: "",
          },
          {
            src: "/images/project-images/medium/post-blog-page.png",
            title: "",
          },
        ],
        techStack: [
          { title: "Next js" },
          { title: "Sanity CMS" },
          { title: "Next Auth" },
          { title: "Typescript" },
        ],
        liveSiteUrl: "https://medium-clone-nextjs-1.vercel.app/",
        sourceCodeUrl:
          "https://github.com/Anurag-Kochar-1/medium-clone-nextjs-1",
        features: [
          "Google Sign-In for easy access",
          "Write and publish blogs",
          "Read a wide range of blogs",
          "Search blogs by tags",
          "Bookmark blogs for later reading",
        ],
      },
      {
        id: "twitter-clone",
        title: "Twitter",
        content: <Project id="twitter-clone" />,
        tagline: "A clone of x.com site",
        thumbnail: "/images/project-images/twitter/thumbnail.png",
        images: [
          {
            src: "/images/project-images/twitter/homepage.png",
            title: "",
          },
          {
            src: "/images/project-images/twitter/homepage.png",
            title: "",
          },
        ],
        techStack: [
          { title: "Next js" },
          { title: "Sanity CMS" },
          { title: "Next Auth" },
          { title: "Typescript" },
        ],
        liveSiteUrl: "https://twitter-clone-nextjs-1.netlify.app/",
        sourceCodeUrl:
          "https://github.com/Anurag-Kochar-1/twitter-clone-nextjs-1",
        features: [
          "Google Sign-In for easy access",
          "Read and publish tweets",
          "Reply to tweets",
          "Dark mode",
        ],
      },
      {
        id: "litpire",
        title: "Litpire - Search Movies / TV Shows",
        content: <Project id={"litpire"} />,
        tagline: "The Ultimate app for findiny any movie or tv show",
        thumbnail: "/images/project-images/litpire/thumbnail.png",
        images: [
          {
            src: "/images/project-images/litpire/homepage.png",
            title: "",
          },
          {
            src: "/images/project-images/litpire/moviepage.png",
            title: "",
          },
          {
            src: "/images/project-images/litpire/search-results-page.png",
            title: "",
          },
        ],
        techStack: [{ title: "React js" }, { title: "JavaScript" }],
        liveSiteUrl: "https://flimpire-clone-1-v-6.netlify.app/",
        sourceCodeUrl:
          "https://github.com/Anurag-Kochar-1/litpire-movie-app/tree/version-6",
        features: [
          "Toggle between movies and TV shows",
          "Sort by popularity, top ratings, upcoming releases, or genres",
          "View detailed information about movies and TV shows",
          "Search for specific titles easily",
        ],
      },
    ],
  },
  // {
  //   id: "old-top-projects",
  //   title: "Old top projects 😁",
  //   projects: [
  //     {
  //       id: "comm-comm",
  //       title: "CommComm Community Builder",
  //       content: <Project id="comm-comm" />,
  //       tagline:
  //         "The Ultimate Community platform for students who want to learn in a community at ZERO cost via free resources.",
  //       thumbnail:
  //         "/images/project-images/commcomm-community-builder/thumbnail.png",
  //       images: [
  //         {
  //           src: "/images/project-images/commcomm-community-builder/cover-image.png",
  //           title: "CommComm Community Builder",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_1.png",
  //           title: "Landing page",
  //           description:
  //             "It have several sections such as, sidebars for my joined & trending communities, midde container contains courses carousel and posts",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_2.png",
  //           title: "A Community",
  //           description:
  //             "It have several features such as, community posts, group chat, courses, classes, leaderboard, and about section",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_3.png",
  //           title: "Group live chat",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_4.png",
  //           title: "Course",
  //           description:
  //             "Community's own created course (from youtube playlist) which divided into paths, whereas each video from playlist is equal to a path",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_5.png",
  //           title: "Classes",
  //           description: "Each path's class",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_6.png",
  //           title: "Community leaderboard",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_7.png",
  //           title: "Explore posts / communities / courses",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_8.png",
  //           title: "User profile",
  //         },
  //         {
  //           src: "/images/project-images/commcomm-community-builder/commcomm_9.png",
  //           title: "Sign up page.",
  //         },
  //       ],
  //       techStack: [
  //         { title: "Next JS" },
  //         { title: "Redux" },
  //         { title: "Firebase" },
  //         { title: "TypeScript" },
  //       ],
  //       liveSiteUrl: "https://th3-project.vercel.app/",
  //       sourceCodeUrl:
  //         "https://github.com/Anurag-Kochar-1/CommComm-Community-Platform/tree/v2",
  //       features: [
  //         "Authentication - email & password, Google, and Facebook.",
  //         "Community - create in 3 steps - Name, Category, and Subcategory",
  //         "Content - upload videos, images, and captions posts in a community",
  //         "Group Chat - real-time chat in a community.",
  //         "Courses -  community owner can create a course via YT ID, each course will have several paths depending on the course duration. Each Path has the option to claim coins.",
  //         "Classes - community owner can create a class for a specific path",
  //         "Explore - communities, posts, and courses",
  //         "Gamification - users can earn coins by creating an account, attending more classes, and building communities.",
  //         "Community Leaderboard - users can climb the global or community leaderboard by having more coins",
  //         "User Profile page",
  //       ],
  //     },
  //   ],
  // },
];
