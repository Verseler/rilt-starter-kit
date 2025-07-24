import type { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

// Display flash success message as sonner or toast
export function useFlashError() {
    const page = usePage<PageProps>();
    const error = page.props.flash?.error;

    useEffect(() => {
        if (error) {
            toast(error, {
                position: "top-center",
                className: "!border !border-red-500 !bg-red-50 !text-red-700",
            });
        }
    }, [error]);
}

// Display flash success message as sonner or toast
export default function useFlashSuccess() {
    const page = usePage<PageProps>();
    const success = page.props.flash?.success;

    useEffect(() => {
        if (success) {
            toast(success, {
                position: "top-center",
                className:
                    "!border !border-green-500 !bg-green-50 !text-green-700",
            });
        }
    }, [success]);
}
