export type Category = {
    id: number;
    name: string;
    products_count: number;
    created_at: string;
    updated_at: string;
};

export type ProductImage = {
    id: number;
    path: string;
    product_id: number;
    created_at: string;
    updated_at: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    average_rating: number;
    rating_count: number;
    reviews_count: number;
    stock_quantity: number;
    category_id: number;
    category: Category;
    quantity: number;
    images?: ProductImage[];
    created_at: string;
    updated_at: string;
};

export type ProductFilters = {
    search?: string;
};
