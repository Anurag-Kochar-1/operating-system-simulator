import { BrowserContent } from "./content";
import { BrowserToolbar } from "./toolbar";

export function BrowserAppContent() {
  return (
    <div className="flex h-full flex-col w-full">
      <BrowserToolbar />
      <BrowserContent />
    </div>
  );
}
