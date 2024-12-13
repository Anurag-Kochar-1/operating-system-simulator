import prisma from "@/lib/db";
import React from "react";

const Page = async () => {
  const users = await prisma.user.findMany();
  const wallpapers = await prisma.wallpaper.findMany();
  const settings = await prisma.settings.findMany();
  return (
    <div className="p-10">
      {JSON.stringify(users)}
      <br />
      <br />
      {JSON.stringify(wallpapers)}
      <br />
      <br />
      {JSON.stringify(settings)}
    </div>
  );
};

export default Page;
