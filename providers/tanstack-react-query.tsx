"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const TanstackReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children} 
      {/* <ReactQueryDevtools initialIsOpen={false} />{" "} */}
    </QueryClientProvider>
  );
};

export default TanstackReactQueryProvider;
