import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const SettingsAboutSection = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <span className="text-lg font-medium">About this</span>
      <p className="text-secondary-foreground">
        This is just a web-based operating system simulator (somewhat) that I
        made for fun. It&apos;s not perfect, but it&apos;s a start.
      </p>
      <div className="flex gap-4 mt-4">
        <Link
          href={"https://github.com/Anurag-Kochar-1/operating-system-simulator"}
          target="_blank"
          className={buttonVariants({
            variant: "secondary",
          })}
        >
          {" "}
          GitHub{" "}
        </Link>
        <Link
          href={"https://x.com/anurag__kochar/"}
          target="_blank"
          className={buttonVariants({
            variant: "secondary",
          })}
        >
          {" "}
          Twitter{" "}
        </Link>
      </div>
    </div>
  );
};
