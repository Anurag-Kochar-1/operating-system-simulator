import Image from "next/image";
import React from "react";

export const PromotionWidget = () => {
  return (
    <a
      className={`flex h-min w-full select-none items-center justify-start gap-2 rounded-xl border bg-secondary p-4 shadow-lg transition-all duration-150 ease-in hover:shadow-xl md:mx-0`}
      href="https://twitter.com/anurag__kochar"
      target="_blank"
    >
      <Image
        src={`https://static.vecteezy.com/system/resources/previews/027/395/710/original/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png`}
        alt="x-logo"
        priority
        className="aspect-square w-12 "
        width={150}
        height={150}
      />
      <div className="flex flex-col items-start justify-start">
        <span className="text-base   font-semibold text-foreground">
          {" "}
          I create playful projects like this for you to explore/enjoy{" "}
        </span>
        <p className="text-sm text-secondary-foreground">
          {" "}
          Your follow on{" "}
          <span className="text-sky-600 underline hover:text-sky-700">
            Twittter
          </span>{" "}
          will be highly appreciated.{" "}
        </p>
      </div>
    </a>
  );
};
