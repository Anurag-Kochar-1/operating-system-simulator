"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBrowserStore } from "@/stores/use-browser-app";
import { cn } from "@/lib/utils";

const normalizeUrl = (url: string): string => {
  let normalizedUrl = url.trim();

  if (
    !normalizedUrl.startsWith("http://") &&
    !normalizedUrl.startsWith("https://")
  ) {
    normalizedUrl = `https://www.${normalizedUrl}`;
  }
  normalizedUrl = normalizedUrl.replace(/\/+$/, "");

  return normalizedUrl;
};
const urlSchema = z.object({
  url: z
    .string()
    .transform(normalizeUrl)
    .refine((url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }, "Please enter a valid URL"),
});

type UrlFormData = z.infer<typeof urlSchema>;
export const BrowserToolbar = () => {
  const { goBack, goForward, goHome, setStatus, addToHistory } =
    useBrowserStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const currentUrl = useBrowserStore((state) => state.getCurrentUrl());

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: currentUrl,
    },
  });

  useEffect(() => {
    setValue("url", currentUrl);
  }, [currentUrl, setValue]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setStatus({ isLoading: true, error: null });
    setTimeout(() => {
      setIsRefreshing(false);
      setStatus({ isLoading: false, error: null });
    }, 1000);
  };

  const onSubmit = (data: UrlFormData) => {
    addToHistory({ url: data.url, title: "New Page" });
    setValue("url", data.url);
  };

  return (
    <div className="flex items-center gap-2 border-b p-2">
      <Button
        variant="outline"
        size="icon"
        onClick={goBack}
        className={cn("h-8 w-8", {
          "opacity-50": history.length === 1,
        })}
        disabled={history.length === 1}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={goForward}
        className="h-8 w-8"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          goHome(() => {
            setValue("url", "https://www.anuragkochar.com");
          })
        }
        className="h-8 w-8"
      >
        <Home className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleRefresh}
        className={`h-8 w-8 `}
      >
        <RotateCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
        <Input
          {...register("url")}
          placeholder="Enter URL"
          className={`w-full ${errors.url ? "border-red-500" : ""}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
        />
      </form>
    </div>
  );
};
