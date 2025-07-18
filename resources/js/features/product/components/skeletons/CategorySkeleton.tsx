import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton({ size = 5 }: { size?: number }) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {[...Array(size)].map((_, index) => (
                <CategorySkeleton key={index} />
            ))}
        </div>
    );
}

export function CategorySkeleton() {
    return (
        <Card className="p-2 border-none shadow-none md:p-6 md:pb-4 max-w-80 rounded-2xl">
            <CardContent className="p-0">
                <Skeleton className="rounded-full size-8" />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 px-1 py-2">
                <Skeleton className="w-full h-7 max-w-60" />
                <Skeleton className="w-full h-5 max-w-40" />
            </CardFooter>
        </Card>
    );
}
