import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import type { Category } from "@/features/category/category.types";
import { router } from "@inertiajs/react";
import { ShirtIcon } from "lucide-react";

type ProductCategoryCardProps = {
    category: Category;
};

export default function ProductCategoryCard({
    category,
}: ProductCategoryCardProps) {
    function goToCategory(categoryName: string) {
        router.visit(route("customer.products.index"), {
            data: { categoryFilter: categoryName },
            preserveScroll: true,
            replace: true,
        });
    }

    return (
        <Card
            onClick={() => goToCategory(category.name)}
            className="p-2 transition-colors duration-300 group md:p-6 md:pb-4 max-w-80 rounded-2xl hover:bg-primary-600"
        >
            <CardContent className="p-0">
                <ShirtIcon className="transition-colors duration-300 size-8 group-hover:text-white" />
            </CardContent>
            <CardFooter className="flex flex-col items-start px-1 py-2">
                <CardTitle className="text-lg font-bold transition-colors duration-300 md:text-2xl text-primary-600 group-hover:text-white">
                    {category.name}
                </CardTitle>
                <CardDescription className="text-sm transition-colors duration-300 md:text-base group-hover:text-neutral-100">
                    {category.products_count} products
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
