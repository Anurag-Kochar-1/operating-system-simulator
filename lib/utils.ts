import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import sampleSize from "lodash.samplesize";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colors = {
  tomato: {
    bg: "red",
    hue: "blue",
  },
  crimson: {
    bg: "green",
    hue: "pink",
  },
  // pink: {
  //   bg: "var(--colors-pink9)",
  //   hue: "var(--colors-pink7)",
  // },
  // plum: {
  //   bg: "var(--colors-plum9)",
  //   hue: "var(--colors-plum7)",
  // },
  // indigo: {
  //   bg: "var(--colors-indigo9)",
  //   hue: "var(--colors-indigo7)",
  // },
  // blue: {
  //   bg: "var(--colors-blue9)",
  //   hue: "var(--colors-blue7)",
  // },
  // cyan: {
  //   bg: "var(--colors-cyan9)",
  //   hue: "var(--colors-cyan7)",
  // },
  // green: {
  //   bg: "var(--colors-green9)",
  //   hue: "var(--colors-green7)",
  // },
  // orange: {
  //   bg: "var(--colors-orange9)",
  //   hue: "var(--colors-orange7)",
  // },
};

export const getRandomUniqueColor = (currentColors: string[]) => {
  const colorNames = Object.values(colors).map((col) => col.bg);
  const uniqueColors = colorNames.filter(
    (color: string) => !currentColors.includes(color),
  );
  const uniqueColor =
    uniqueColors[Math.floor(Math.random() * uniqueColors.length)];
  const uniqueColorSet = Object.values(colors).find(
    (color) => color.bg === uniqueColor,
  );
  return uniqueColorSet || getRandomColor();
};

export const getRandomColors = (qty: number) => {
  return sampleSize(Object.values(colors), qty);
};

export const getRandomColor = () => {
  return Object.values(colors)[
    Math.floor(Math.random() * Object.values(colors).length)
  ];
};


export function sendLog(message: string) {
  console.log(message)
}
