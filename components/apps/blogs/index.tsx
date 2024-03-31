import { BLOGS } from "@/config/blogs.config";
import React from "react";
import { BlogCard } from "./blog-card";

export const BlogsAppContent = () => {
  return (
    <div className="grid w-full auto-rows-auto grid-cols-12 gap-4">
      {BLOGS?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
};
