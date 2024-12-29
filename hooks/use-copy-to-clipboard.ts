
import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import logger from "@/utils/logger";

export function useCopyToClipboard() {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(async (text: string) => {
        if (!navigator.clipboard) {
            logger.error("Clipboard API not supported.");
            toast({
                title: "Error",
                description: "Clipboard API is not supported in your browser.",
                variant: "destructive",
            });
            return false;
        }
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            toast({
                title: "Copied",
                description: "Text copied to clipboard successfully!",
                variant: "success",
            });

            setTimeout(() => setIsCopied(false), 2000);
            return true;
        } catch (error) {
            logger.error("Failed to copy text: ", error);
            toast({
                title: "Error",
                description: "Failed to copy text to clipboard.",
                variant: "destructive",
            });
            return false;
        }
    }, []);

    return { copyToClipboard, isCopied } as const;
}
