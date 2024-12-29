import { Button } from "@/components/ui/button";
import { ChromePicker } from "react-color";
import { useState } from "react";
import { usePaintStore } from "@/stores/use-paint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ColorPicker() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const {
    color,
    actions: { setColor },
  } = usePaintStore();

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          onClick={() => setShowColorPicker(!showColorPicker)}
          size="icon"
          className="h-8 w-8"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-min p-0">
        <ChromePicker color={color} onChange={(color) => setColor(color.hex)} />
      </PopoverContent>
    </Popover>
  );
}
