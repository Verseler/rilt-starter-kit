import Container from "@/components/Container";
import { H1, P } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import Products from "@/features/product/components/Products";
import { ProductsSkeleton } from "@/features/product/components/skeletons/ProductSkeleton";
import MainLayout from "@/layouts/MainLayout";
import { Head, WhenVisible } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

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
                    <WhenVisible always data="totalProducts" fallback={<></>}>
                        <span>({totalProducts})</span>
                    </WhenVisible>
                </H1>
                <P>Explore all products from around the world</P>
                <Button className="mt-8">
                    Filters <PlusIcon />
                </Button>

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
