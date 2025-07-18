import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageSkeleton() {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 aspect-square bg-yellow-50">
                <Skeleton className="rounded-lg size-full" />

                <div className="grid grid-cols-4 gap-2">
                    <Skeleton className="h-36" />
                    <Skeleton className="h-36" />
                    <Skeleton className="h-36" />
                    <Skeleton className="h-36" />
                </div>
            </div>

            <div className="space-y-2.5">
                <Skeleton className="h-10 w-80" />
                <Skeleton className="w-40 h-6" />
                <div className="grid grid-cols-5 w-40 gap-0.5">
                    <Skeleton className="rounded-full size-5" />
                    <Skeleton className="rounded-full size-5" />
                    <Skeleton className="rounded-full size-5" />
                    <Skeleton className="rounded-full size-5" />
                    <Skeleton className="rounded-full size-5" />
                </div>

                <div className="py-1.5">
                    <Separator />
                </div>

                <Skeleton className="w-20 h-6" />
                <div className="pt-2 space-y-2">
                    <Skeleton className="h-7 w-96" />
                    <Skeleton className="h-7 w-96" />
                    <Skeleton className="h-7 w-60" />
                </div>

                <div className="pt-3 pb-4">
                    <Skeleton className="w-32 h-10 rounded-full" />
                </div>
            </div>
        </div>
    );
}
