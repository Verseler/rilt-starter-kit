import { User } from '@/types';
import { Product } from '@/features/product/product.types';

export type ShippingAddress = {
    id: number;
    phone_number : number;
    address_line : string;
    barangay : string;
    city : string;
    province : string;
    postal_code : number;
    user_id : number;
    user: User;
}

export type OrderStatus = "new" | "processing" | "shipped"  | "delivered" | "canceled";

export type OrderItem = {
    id: number;
    quantity: number;
    product_id: number;
    product: Product;
}

export type Order = {
    id: number;
    or_number: string;
    total_amount: number;
    status: OrderStatus;
    customer_id: number;
    customer: User;
    shipping_address_id: number;
    shipping_address: ShippingAddress;
    order_items: OrderItem[];
    created_at: string;
    updated_at: string;
};

export type OrderFilters = {
    search?: string;
};

export type EditOrderForm = Pick<Order, 'status'> &
    Omit<ShippingAddress, 'id' | 'user_id' | 'user' | 'phone_number'> & {
        order_items: OrderItem[];
    }

