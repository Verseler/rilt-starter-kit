import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductsSkeleton({ size = 3 }: { size?: number }) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 2xl:grid-cols-5">
            {[...Array(size)].map((_, index) => (
                <ProductSkeleton key={index} />
            ))}
        </div>
    );
}

export function ProductSkeleton() {
    return (
        <Card className="p-2 border-none shadow-none md:p-3 max-w-80 rounded-2xl">
            <CardContent className="p-0">
                <Skeleton className="h-52 md:h-72 rounded-xl" />
            </CardContent>
            <CardFooter className="flex flex-col relative items-start gap-1.5 px-1 py-2">
                <Skeleton className="w-10 h-5" />
                <Skeleton className="w-full h-6" />
                <div className="grid grid-cols-5 gap-0.5">
                    <Skeleton className="rounded-full size-5" />
                    <Skeleton className="rounded-full size-5" />
                    <Skeleton className="rounded-full size-5" />
                    <Skeleton className="rounded-full size-5" />
                    <Skeleton className="rounded-full size-5" />
                </div>
                <Skeleton className="w-40 h-6 mb-0.5" />
                <Skeleton className="absolute rounded-full bottom-2 right-1 size-10" />
            </CardFooter>
        </Card>
    );
}
