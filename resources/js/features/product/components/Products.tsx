import Product from "@/features/product/components/Product";
import { ProductsSkeleton } from "@/features/product/components/skeletons/ProductSkeleton";
import type { Product as ProductType } from "@/features/product/product.types";
import { PageProps } from "@/types";
import { usePage, WhenVisible } from "@inertiajs/react";

type ProductsPageProps = PageProps & {
    products?: ProductType[];
    currentPage: number;
    lastPage: number;
};

export default function Products() {
    const { props } = usePage<ProductsPageProps>();
    const products = props.products;

    if (!products) {
        return <ProductsSkeleton />;
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 2xl:grid-cols-5">
                {products.map((product, index) => (
                    <Product key={`${product.id}${index}`} product={product} />
                ))}
            </div>

            {/* Infinite Scroll */}
            {props.currentPage < props.lastPage && (
                <WhenVisible
                    always
                    params={{
                        data: {
                            page: props.currentPage + 1,
                        },
                        only: ["products", "currentPage"],
                        preserveUrl: true,
                    }}
                    fallback={<ProductsSkeleton size={10} />}
                >
                    <ProductsSkeleton size={10} />
                </WhenVisible>
            )}
        </div>
    );
}
