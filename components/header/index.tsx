import { DateTime } from "./date-time";
import { Menu } from "./menu";

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-4">
      <Menu />
      <DateTime />
    </header>
  );
};
