import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/features/cart/context/CartContext";
import ProductCoverImage from "@/features/product/components/ProductCoverImage";
import ProductStarRatings from "@/features/product/components/ProductStarRatings";
import type { Product as ProductType } from "@/features/product/product.types";
import { formatCurrency } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ShoppingCartIcon } from "lucide-react";
import React from "react";

export default function Product({ product }: { product: ProductType }) {
    const { addToCart } = useCart();
    const coverImage = product?.product_images?.[0]?.image_src;

    function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();

        addToCart(product);
    }

    return (
        <Link href={route("product.show", { product: product })}>
            <Card className="p-2 transition-shadow md:p-3 max-w-80 rounded-2xl hover:shadow-xl">
                <CardContent className="p-0">
                    <ProductCoverImage src={coverImage} />
                </CardContent>
                <CardFooter className="flex flex-col items-start px-1 py-2">
                    <CardDescription className="text-sm md:text-base">
                        {product.category.name}
                    </CardDescription>
                    <CardTitle className="text-base md:text-lg">
                        {product.name}
                    </CardTitle>
                    <ProductStarRatings rating={product.average_rating} />
                    <div className="flex items-center justify-between w-full">
                        <p className="text-sm font-bold md:text-base text-primary">
                            {formatCurrency(product.price)}
                        </p>
                        <Button
                            onClick={handleAddToCart}
                            size="icon"
                            className="border shadow-xl size-8 md:size-10 border-primary-600 text-primary-600 bg-primary-100"
                        >
                            <ShoppingCartIcon />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
