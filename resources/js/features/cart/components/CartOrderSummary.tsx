import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrderTotal } from "@/features/cart/cart.helper";
import { useCart } from "@/features/cart/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import React from "react";

export default function CartOrderSummary() {
    const { productCart } = useCart();
    const orderTotal = getOrderTotal(productCart);

    return (
        <Card className="col-span-2 border-none shadow-none max-h-fit bg-primary-100">
            <CardHeader className="pb-3">
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardFooter className="flex-col">
                <div className="grid w-full grid-cols-2 gap-1 text-xs text-neutral-800">
                    {productCart.map((product) => {
                        const productTotalPrice =
                            product.price * product.quantity;

                        return (
                            <React.Fragment key={product.id}>
                                <div>
                                    {product.name} x ({product.quantity})
                                </div>
                                <div className="justify-self-end">
                                    {formatCurrency(productTotalPrice)}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                <Separator className="mt-2 bg-neutral-400" />
                <div className="flex justify-between w-full py-2">
                    <span className="text-lg font-semibold">Order total</span>
                    <span className="text-lg font-semibold">
                        {formatCurrency(orderTotal)}
                    </span>
                </div>
                <Button className="w-full mt-4">Checkout</Button>
            </CardFooter>
        </Card>
    );
}
