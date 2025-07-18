import type { Product } from '@/features/product/product.types';

export function getOrderTotal(products: Product[]): number {
    return products.reduce((total, currentProduct) => {
        const currentProductTotal =
            currentProduct.price * currentProduct.quantity;

        return total + currentProductTotal;
    }, 0);
}
