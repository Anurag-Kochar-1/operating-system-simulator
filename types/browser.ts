export type BrowserHistoryEntry = {
    url: string;
    title: string;
};

export type BrowserStatus = {
    isLoading: boolean;
    error: string | null;
};
