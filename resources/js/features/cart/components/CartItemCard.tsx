import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/features/cart/context/CartContext";
import { Product } from "@/features/product/product.types";
import { formatCurrency } from "@/lib/utils";
import { XIcon } from "lucide-react";

export function CartItemCards() {
    const { productCart } = useCart();

    if (!productCart || productCart?.length <= 0) {
        return (
            <span className="flex items-center col-span-3 gap-2 text-base ms-4 text-neutral-400">
                <XIcon className="p-1 border rounded-full text-neutral-400" />
                Empty Cart
            </span>
        );
    }

    return (
        <div className="col-span-3">
            {productCart?.map((product, index) => (
                <CartItemCard key={`${product.id}${index}`} product={product} />
            ))}
        </div>
    );
}

export default function CartItemCard({ product }: { product: Product }) {
    const { removeToCart } = useCart();

    return (
        <Card
            aria-label="product"
            className="pt-6 bg-transparent border-none shadow-none"
        >
            <CardContent className="relative flex gap-6 border-b">
                <img
                    src={product?.images?.[0]?.path}
                    className="rounded-lg w-28 aspect-square"
                />
                <div className="w-full">
                    <h2 aria-label="name" className="text-xl font-bold">
                        {product?.name}
                    </h2>
                    <span
                        aria-label="category"
                        className="block text-base text-neutral-500"
                    >
                        {product?.category?.name}
                    </span>
                    <div className="flex items-end justify-between">
                        <span
                            aria-label="price"
                            className="block text-lg font-bold text-primary"
                        >
                            {formatCurrency(product?.price)}
                        </span>

                        <div
                            aria-label="quantity"
                            className="text-xs text-neutral-500"
                        >
                            Quantity: {product?.quantity}
                        </div>
                    </div>

                    <Button
                        onClick={() => removeToCart(product)}
                        size="icon"
                        className="absolute top-0 right-0"
                    >
                        <XIcon />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
