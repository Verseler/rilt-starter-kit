import Container from "@/components/Container";
import { H1, P } from "@/components/Typography";
import Products from "@/features/product/components/Products";
import { ProductsSkeleton } from "@/features/product/components/skeletons/ProductSkeleton";
import MainLayout from "@/layouts/MainLayout";
import { Head, WhenVisible } from "@inertiajs/react";
import ProductFilter from "@/features/product/components/ProductFilter";

type ProductsPageProps = {
    totalProducts: number;
};

export default function ProductsPage({ totalProducts }: ProductsPageProps) {
    return (
        <MainLayout>
            <Head title="Products Page" />

            <Container className="mt-10">
                <H1 className="!text-4xl flex gap-2">
                    Products
                    <span>({totalProducts})</span>
                </H1>
                <P>Explore all products from around the world</P>

                <ProductFilter />

                <div className="mt-6">
                    <WhenVisible
                        always
                        data="products"
                        fallback={<ProductsSkeleton />}
                    >
                        <Products />
                    </WhenVisible>
                </div>
            </Container>
        </MainLayout>
    );
}
