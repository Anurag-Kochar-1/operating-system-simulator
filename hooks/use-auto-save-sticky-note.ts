import moment from 'moment';
import { api } from "@/lib/axios";
import { StickyNote } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

interface StickyNoteData {
    id: string;
    content: string;
}

interface UseAutoSaveStickyNoteProps {
    initialData: StickyNoteData | null;
    enabled?: boolean;
    onError?: (error: Error) => void;
    interval?: number;
}

export function useAutoSaveStickyNote({
    initialData,
    enabled = true,
    onError,
    interval = 2500,
}: UseAutoSaveStickyNoteProps) {
    const [pendingData, setPendingData] = useState<StickyNoteData | null>(initialData);
    const lastSavedAtRef = useRef<Date | undefined>(undefined);
    const [lastSavedAt, setLastSavedAt] = useState<string | undefined>(undefined);
    const lastSavedContentRef = useRef<string | null>(initialData?.content ?? null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const initialDataRef = useRef(initialData);
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        if (!lastSavedAtRef.current) return;
        setLastSavedAt(moment(lastSavedAtRef.current).fromNow());

        const interval = setInterval(() => {
            const timeDiff = moment().diff(lastSavedAtRef.current, 'minutes');

            if (timeDiff < 1) {
                setLastSavedAt(moment(lastSavedAtRef.current).fromNow());
            } else {
                setLastSavedAt(moment(lastSavedAtRef.current).fromNow());
                clearInterval(interval);
                setForceUpdate(prev => prev + 1)
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lastSavedAtRef.current, forceUpdate]);

    useEffect(() => {
        if (JSON.stringify(initialDataRef.current) !== JSON.stringify(initialData)) {
            initialDataRef.current = initialData;
            setPendingData(initialData);
            lastSavedContentRef.current = initialData?.content ?? null;
        }
    }, [initialData]);

    const mutation = useMutation({
        mutationFn: async (data: StickyNoteData) => {
            console.log('Making API call with data:', data);
            const response = await api.patch<StickyNote>(`/sticky-notes/${data.id}`, data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            console.log('Save successful');
            lastSavedContentRef.current = variables.content;
            lastSavedAtRef.current = new Date();
            setLastSavedAt(moment(lastSavedAtRef.current).fromNow());
        },
        onError,
    });

    useEffect(() => {
        if (!enabled || !pendingData || !pendingData.id) return;

        const hasChanges = pendingData.content !== lastSavedContentRef.current;
        if (!hasChanges) return;

        console.log('Content changed, scheduling save');

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            console.log('Executing save after timeout');
            if (!mutation.isPending) {
                mutation.mutate(pendingData);
            }
        }, interval);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [pendingData?.content, enabled, interval]);

    const updateData = useCallback((newData: Partial<StickyNoteData>) => {
        if (!enabled || !pendingData?.id) return;

        console.log('Updating data:', newData);
        setPendingData(prev => prev ? {
            ...prev,
            ...newData,
        } : null);
    }, [enabled, pendingData?.id]);

    const saveNow = useCallback(() => {
        if (!enabled || !pendingData?.id) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (!mutation.isPending && pendingData.content !== lastSavedContentRef.current) {
            console.log('Forcing immediate save');
            mutation.mutate(pendingData);
        }
    }, [enabled, pendingData, mutation]);

    return {
        updateData,
        saveNow,
        isSaving: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        pendingData,
        lastSavedAt,
    };
}