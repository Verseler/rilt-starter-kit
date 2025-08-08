import { User } from '@/types';

export type OrderStatus = "new" | "processing" | "shipped"  | "delivered" | "canceled";

export type Order = {
    id: number;
    or_number: string;
    total_amount: number;
    status: OrderStatus;
    customer_id: number;
    customer: User;
    shipping_address_id: number;
    created_at: string;
    updated_at: string;
};

export type OrderFilters = {
    search?: string;
};
