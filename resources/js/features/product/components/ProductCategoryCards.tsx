import ProductCategoryCard from "@/features/product/components/ProductCategoryCard";
import { CategoriesSkeleton } from "@/features/product/components/skeletons/CategorySkeleton";
import type { Category } from "@/features/product/product.types";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

type CategoryPageProps = PageProps & {
    categories?: Category[];
};

export default function ProductCategoryCards() {
    const { props } = usePage<CategoryPageProps>();
    const categories = props.categories;

    if (!categories) {
        return <CategoriesSkeleton />;
    }

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {categories.map((category) => (
                <ProductCategoryCard key={category.id} category={category} />
            ))}
        </div>
    );
}
