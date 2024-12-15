import { memo } from "react";
import { DateTime } from "./date-time";
import { Menu } from "./menu";
import SignInCtas from "./sign-in-ctas";
import { Banana } from "lucide-react";

export const Header = memo(() => {
  return (
    <header className="flex h-10 items-center justify-between border-b bg-background px-4">
      {/* <Menu /> */}
      <Banana size={20} />
      <DateTime />
    </header>
  );
});

Header.displayName = "Header";
