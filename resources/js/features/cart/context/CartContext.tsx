import type { Product } from "@/features/product/product.types";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { toast } from "sonner";

type CartContextType = {
    productCart: Product[];
    productCartCount: number;
    addToCart: (product: Product) => void;
    removeToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function getCartFromStorage(): Product[] {
    try {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
        return [];
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [productCart, setProductCart] =
        useState<Product[]>(getCartFromStorage);
    const productCartCount = productCart?.length || 0;

    function isProductExist(productId: number): boolean {
        return productCart.some((product) => product.id === productId);
    }

    function addToCart(product: Product) {
        if (isProductExist(product.id)) {
            setProductCart((prev) =>
                prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                )
            );
        } else {
            product.quantity = 1;
            setProductCart((prev) => [...prev, product]);
        }

        toast(`Successfully added ${product.name} to cart`, {
            position: "top-center",
            className: "!border !border-green-500 !bg-green-50 !text-green-700",
        });
    }

    function removeToCart(product: Product) {
        setProductCart((prev) => prev.filter((p) => p.id !== product.id));

        toast(`Successfully removed ${product.name} from cart`, {
            position: "top-center",
            className: "!border !border-green-500 !bg-green-50 !text-green-700",
        });
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(productCart));
    }, [productCart]);

    return (
        <CartContext.Provider
            value={{ productCart, productCartCount, addToCart, removeToCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
