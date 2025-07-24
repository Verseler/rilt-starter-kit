import MainHeader from "@/components/MainHeader";
import { CartProvider } from "@/features/cart/context/CartContext";
import { cn } from "@/lib/utils";
import React from "react";
import Layout from "@/layouts/Layout";

type MainLayoutProps = {
    children: React.ReactNode;
    className?: string;
};

export default function MainLayout({ children, className }: MainLayoutProps) {
    return (
        <Layout>
            <CartProvider>
                <div className={cn("min-h-screen bg-primary-50", className)}>
                    <MainHeader />

                    <div className="pt-16">{children}</div>

                    <footer className="grid h-20 mt-10 text-sm border-t place-content-center">
                        <p>© 2025 Verseler. All rights reserved</p>
                    </footer>
                </div>
            </CartProvider>
        </Layout>
    );
}
