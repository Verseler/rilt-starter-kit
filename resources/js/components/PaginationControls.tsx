import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Props = {
    currentPage: number;
    lastPage: number;
    prevPageUrl: string | null;
    nextPageUrl: string | null;
};

export function PaginationControls({
    currentPage,
    lastPage,
    nextPageUrl,
    prevPageUrl,
}: Props) {
    return (
        <div className="flex items-center justify-end gap-2 mt-4 mr-4">
            <span className="px-4 text-sm">{`Page ${currentPage} of ${lastPage}`}</span>

            <Button
                onClick={() => router.visit(prevPageUrl ?? "")}
                disabled={currentPage <= 1}
                variant="outline"
                size="icon"
                className="size-8"
            >
                <ChevronLeftIcon />
            </Button>
            <Button
                onClick={() => router.visit(nextPageUrl ?? "")}
                disabled={currentPage >= lastPage}
                variant="outline"
                className="size-8"
            >
                <ChevronRightIcon />
            </Button>
        </div>
    );
}
