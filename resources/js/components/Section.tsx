import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
    children: React.ReactNode;
    className?: string;
};

export function Section({ children, className, ...props }: SectionProps) {
    return (
        <section
            className={cn("space-y-2 md:space-y-4 pb-32 md:pb-40", className)}
            {...props}
        >
            {children}
        </section>
    );
}
