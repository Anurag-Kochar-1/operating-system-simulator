import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useBrowserStore } from "@/stores/use-browser-app";

export const BrowserContent = () => {
  const currentUrl = useBrowserStore((state) => state.getCurrentUrl());
  const { isLoading, error } = useBrowserStore((state) => state.status);
  const setStatus = useBrowserStore((state) => state.setStatus);

  if (error) {
    return (
      <div className="flex-1 p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-4">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <iframe
        src={currentUrl}
        className="h-full w-full border-none"
        onError={() =>
          setStatus({ isLoading: false, error: "Failed to load the webpage" })
        }
        onLoad={() => setStatus({ isLoading: false, error: null })}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};
