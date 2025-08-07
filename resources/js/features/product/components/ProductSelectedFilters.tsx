import { Badge } from "@/components/ui/badge";
import { router, usePage } from "@inertiajs/react";
import type { ProductFilterPageProps } from "@/features/product/product.types";
import { Button } from "@/components/ui/button";
import { FunnelXIcon } from "lucide-react";

export default function ProductSelectedFilters() {
    const { categoryFilter, sort } = usePage<ProductFilterPageProps>().props;
    const hasFilters = categoryFilter || sort;

    function clearFilter() {
        router.visit(route("customer.products.index"), {
            replace: true,
            preserveScroll: true,
        });
    }

    return (
        <>
            {sort && (
                <Badge
                    variant="outline"
                    className="h-10 px-4 py-2 text-sm rounded-full cursor-default text-neutral-600"
                >
                    Sort: {sort}
                </Badge>
            )}

            {categoryFilter && (
                <Badge
                    variant="outline"
                    className="h-10 px-4 py-2 text-sm rounded-full cursor-default text-neutral-600"
                >
                    Filter: {categoryFilter}
                </Badge>
            )}

            {hasFilters && (
                <Button variant="destructive" onClick={clearFilter}>
                    <FunnelXIcon />
                </Button>
            )}
        </>
    );
}
