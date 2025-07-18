import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { Layers2Icon } from "lucide-react";
import React from "react";

type ApplicationLogoProps = React.ComponentProps<"div"> & {
    className?: string;
    logoOnly?: boolean;
};

export default function ApplicationLogo({
    className,
    logoOnly = false,
    ...props
}: ApplicationLogoProps) {
    if (logoOnly) {
        return (
            <Link href="/">
                <div
                    className={cn("flex items-center gap-2", className)}
                    {...props}
                >
                    <Layers2Icon className="size-14" />
                </div>
            </Link>
        );
    }

    return (
        <Link href="/">
            <div
                className={cn("flex items-center gap-2", className)}
                {...props}
            >
                <Layers2Icon />
                <span className="text-lg font-bold">Thriftly</span>
            </div>
        </Link>
    );
}
