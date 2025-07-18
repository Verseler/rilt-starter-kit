import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export function H1({ children, className }: Props) {
    return (
        <h1
            className={cn(
                "text-4xl md:text-6xl text-primary font-bold max-w-2xl",
                className
            )}
        >
            {children}
        </h1>
    );
}

export function H2({ children, className }: Props) {
    return (
        <h1
            className={cn(
                "text-3xl md:text-5xl font-bold text-primary max-w-2xl",
                className
            )}
        >
            {children}
        </h1>
    );
}

export function P({ children, className }: Props) {
    return (
        <p className={cn("text-base md:text-xl text-neutral-500", className)}>
            {children}
        </p>
    );
}
