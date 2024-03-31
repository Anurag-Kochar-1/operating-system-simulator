import React from "react";

export const ContactAppContent = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-6 overflow-y-auto px-4 py-12">
      <p className="text-center text-lg font-medium">
        DM{" "}
        <a
          href="https://twitter.com/anurag__kochar"
          target="_blank"
          className="text-sky-600 underline hover:text-red-700"
        >
          @anurag__kochar
        </a>{" "}
        or mail on 📧 anuragmarketing101@gmail.com
      </p>
    </div>
  );
};
