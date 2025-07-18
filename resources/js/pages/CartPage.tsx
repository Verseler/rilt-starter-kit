import Container from "@/components/Container";
import { H1 } from "@/components/Typography";
import { CartItemCards } from "@/features/cart/components/CartItemCard";
import CartOrderSummary from "@/features/cart/components/CartOrderSummary";
import MainLayout from "@/layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function CartPage() {
    return (
        <MainLayout>
            <Head title="Cart page" />

            <Container className="md:py-12 md:px-40">
                <H1 className="!text-4xl">Shopping Cart</H1>

                <div className="grid gap-8 md:grid-cols-5">
                    <CartItemCards />

                    <CartOrderSummary />
                </div>
            </Container>
        </MainLayout>
    );
}
