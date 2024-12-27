import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePaintStore } from "@/store/use-paint";

export function BrushSize() {
  const {
    brushSize,
    actions: { setBrushSize },
  } = usePaintStore();

  return (
    <div className="w-full md:w-48">
      <Slider
        value={[brushSize]}
        onValueChange={(value) => setBrushSize(value[0])}
        min={1}
        max={50}
        step={1}
        className="[&_[role=slider]]:left-0"
      />
    </div>
  );
}
