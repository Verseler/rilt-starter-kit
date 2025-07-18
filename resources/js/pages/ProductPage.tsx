import Container from "@/components/Container";
import { H1, P } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/features/cart/context/CartContext";
import ProductGallery from "@/features/product/components/ProductGallery";
import ProductStarRatings from "@/features/product/components/ProductStarRatings";
import ProductPageSkeleton from "@/features/product/components/skeletons/ProductPageSkeleton";
import { Product } from "@/features/product/product.types";
import MainLayout from "@/layouts/MainLayout";
import { formatCurrency } from "@/lib/utils";
import { Head, WhenVisible } from "@inertiajs/react";
import { ShoppingCartIcon } from "lucide-react";

type ProductPageProps = {
    product: Product;
};

export default function ProductPage({ product }: ProductPageProps) {
    return (
        <MainLayout>
            <Head title="Product page" />

            <Container className="md:py-12 md:px-40">
                <WhenVisible data="product" fallback={<ProductPageSkeleton />}>
                    <div className="grid gap-8 md:grid-cols-2">
                        <ProductGallery
                            images={product?.product_images ?? []}
                        />

                        <div
                            aria-label="product-description"
                            className="pb-4 space-y-2"
                        >
                            <H1
                                aria-label="name"
                                className="!text-4xl text-black"
                            >
                                {product.name}
                            </H1>
                            <span
                                aria-label="price"
                                className="block text-2xl font-bold text-primary"
                            >
                                {formatCurrency(product.price)}
                            </span>
                            <ProductStarRatings
                                rating={product.average_rating}
                                ratingCount={product.rating_count}
                            />

                            <div className="py-2">
                                <Separator />
                            </div>

                            <Label className="text-lg font-medium">
                                Description:
                            </Label>
                            <P aria-label="description" className="pb-4">
                                {product.description}
                            </P>

                            <AddCartButton product={product} />
                        </div>
                    </div>
                </WhenVisible>
            </Container>
        </MainLayout>
    );
}

function AddCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <Button onClick={() => addToCart(product)}>
            Add to Cart <ShoppingCartIcon />
        </Button>
    );
}
