import ApplicationLogo from "@/components/ApplicationLogo";
import Container from "@/components/Container";
import LinkButton from "@/components/LinkButton";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/features/auth/components/UserAvatar";
import { useCart } from "@/features/cart/context/CartContext";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { ShoppingCartIcon } from "lucide-react";

export default function MainHeader() {
    const { productCartCount } = useCart();
    const roles = usePage<PageProps>().props?.auth?.user?.roles;

    return (
        <nav className="fixed z-10 w-full border-b bg-primary-50">
            <Container className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                    <ApplicationLogo />
                </div>

                <div className="flex items-center gap-2.5">
                    <Input />
                    <LinkButton href={route("cart")} variant="outline">
                        <ShoppingCartIcon />
                        <span className="mt-1 -ms-0.5">{productCartCount}</span>
                    </LinkButton>

                    {roles?.includes("admin") ? (
                        <LinkButton href={route("dashboard")}>
                            Dashboard
                        </LinkButton>
                    ) : (
                        <UserAvatar />
                    )}
                </div>
            </Container>
        </nav>
    );
}
