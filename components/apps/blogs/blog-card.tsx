import { Button } from "@/components/ui/button";
import { Blog } from "@/types";
import Image from "next/image";
import React from "react";

export const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <a
      href={blog.url}
      target="_blank"
      className="col-span-full flex flex-col items-start justify-start gap-2 overflow-hidden rounded-lg border-2 hover:cursor-pointer lg:col-span-6"
    >
      <Image
        src={blog.thumbnail as string}
        alt={`${blog.title}`}
        width={700}
        height={700}
        className="aspect-video h-full w-full border-b-2"
        draggable={false}
      />
      <div className="flex flex-col items-start justify-start gap-2 p-2 lg:p-4">
        <h4 className="text-lg font-bold text-foreground">{blog.title}</h4>

        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-muted-foreground"> {blog.publishedOn} </span>
          <Button variant={"secondary"} size={"sm"}>
            {" "}
            Read{" "}
          </Button>
        </div>
      </div>
    </a>
  );
};
