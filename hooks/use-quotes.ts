import { api } from "@/lib/axios";
import { ApiResponse } from "@/utils/api-response";
import { Quote } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useGetAllQuotes() {
    return useQuery({
        queryKey: ['quotes'],
        queryFn: async () => {
            const response = await api.get<ApiResponse<Quote[]>>('/quotes');
            return response.data;
        },
        refetchInterval: 5000,
    });
}   