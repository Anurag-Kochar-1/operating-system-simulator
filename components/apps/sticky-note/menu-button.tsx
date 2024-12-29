import { Button } from "@/components/ui/button";

export const MenuButton = ({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean | undefined;
  children: JSX.Element;
}) => (
  <Button
    variant="ghost"
    size="icon"
    className={`h-8 w-8 hover:bg-foreground/30 ${
      isActive ? "bg-foreground text-background" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </Button>
);
