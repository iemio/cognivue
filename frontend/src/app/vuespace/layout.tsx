import { AppSidebar } from "@/components/vuespace/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Cognivue | Vuespace",
    description: "Room for creativity",
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Persisting the sidebar state in the cookie.
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
    return (
        // <KBar>
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset className="">
                {/* page main content */}
                {children}

                {/* page main content ends */}
            </SidebarInset>
        </SidebarProvider>
        // </KBar>
    );
}
