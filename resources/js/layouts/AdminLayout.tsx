import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import Layout from "@/layouts/Layout";

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <Layout>
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </Layout>
    );
}
