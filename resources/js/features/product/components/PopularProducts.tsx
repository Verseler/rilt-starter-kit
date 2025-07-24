import Product from "@/features/product/components/Product";
import { ProductsSkeleton } from "@/features/product/components/skeletons/ProductSkeleton";
import type { Product as ProductType } from "@/features/product/product.types";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

type ProductsPageProps = PageProps & {
    popularProducts?: ProductType[];
    currentPage: number;
    lastPage: number;
};

export default function PopularProducts() {
    const { props } = usePage<ProductsPageProps>();
    const products = props.popularProducts;

    if (!products) {
        return <ProductsSkeleton />;
    }

    return (
        <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 2xl:grid-cols-5">
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}
