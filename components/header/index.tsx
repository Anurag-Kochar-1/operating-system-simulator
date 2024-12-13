import { memo } from "react";
import { DateTime } from "./date-time";
import { Menu } from "./menu";

export const Header = memo(() => {
  return (
    <header className="flex items-center justify-between border-b bg-background px-4">
      <Menu />
      <DateTime />
    </header>
  );
});

Header.displayName = "Header";
