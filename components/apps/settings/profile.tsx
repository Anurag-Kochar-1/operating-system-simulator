import { GettingStarted } from "@/components/getting-started";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/stores/use-auth";
import { Loader2 } from "lucide-react";

export const ProfileSection = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);
  const isLoading = useAuth((state) => state.isLoading);
  const store = useAuth();

  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-2">
      {isLoading ? <Loader2 size={30} className="animate-spin" /> : null}
      {isAuthenticated ? (
        <div className="flex flex-col items-start justify-start gap-4">
          <span> Account type : {user?.type} </span>
          <span> User name : {user?.name} </span>
          <span> User email : {user?.email} </span>
        </div>
      ) : (
        <Alert variant={"default"} className="max-w-max">
          <AlertTitle className="mb-4">Not logged in</AlertTitle>
          <AlertDescription>
            <GettingStarted />
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
