"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactFlowProvider } from "@xyflow/react";
import { SidebarProvider } from "@/components/ui/sidebar";

interface ProvidersProps {
    defaultOpen: boolean;
    children: React.ReactNode;
}

export function Providers({ defaultOpen, children }: ProvidersProps) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnMount: false,
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: false,
                        retry: 0,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ReactFlowProvider>
                <SidebarProvider defaultOpen={defaultOpen}>
                    {children}
                </SidebarProvider>
            </ReactFlowProvider>
        </QueryClientProvider>
    );
}
