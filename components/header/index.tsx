"use client";
import { memo } from "react";
import { Banana } from "lucide-react";
import Link from "next/link";
import { UserInfo } from "./user-info";

export const Header = memo(() => {
  return (
    <header className="flex h-10 items-center justify-between border-b bg-background px-4">
      {/* <Menu /> */}
      <Banana size={20} />
      {/* <DateTime /> */}

      <Link href={`/register`}>register </Link>
      <Link href={`/login`}>login </Link>

      <UserInfo />
    </header>
  );
});

Header.displayName = "Header";
