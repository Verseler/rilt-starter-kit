import { Toaster } from "@/components/ui/sonner";
import useFlashSuccess, { useFlashError } from "@/hooks/useFlash";
import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    useFlashError();
    useFlashSuccess();

    return (
        <React.Fragment>
            {children}
            <Toaster />
        </React.Fragment>
    );
}
