import { api } from "@/lib/axios";
import { useAuth } from "@/store/use-auth";
import { StickyNote } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";


interface StickyNotesResponse {
    data: StickyNote[];
    statusMessage: string;
}
export function useGetAllStickyNotes() {
    const userId = useAuth((state) => state.user?.id);
    return useQuery<StickyNotesResponse, Error>({
        queryKey: ['sticky-notes', { userId }],
        queryFn: async () => {
            const response = await api.get<StickyNotesResponse>('/sticky-notes');
            return response.data;
        },
        enabled: !!userId
    });
}



export function useUpdateStickyNote() {
    return useMutation({
        mutationFn: async (data: { id: string, content?: string, theme?:string }) => {
            const response = await api.patch<StickyNote>(`/sticky-notes/${data.id}`, data);
            return response.data;
        },
    });
}