import MainHeader from "@/components/MainHeader";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import React from "react";

type MainLayoutProps = {
    children: React.ReactNode;
    className?: string;
};

export default function MainLayout({ children, className }: MainLayoutProps) {
    return (
        <div className={cn("min-h-screen bg-primary-50", className)}>
            <MainHeader />

            <div className="pt-16">{children}</div>

            <footer className="grid h-20 text-sm border-t place-content-center">
                <p>© 2025 Verseler. All rights reserved</p>
            </footer>

            <Toaster />
        </div>
    );
}
