export type Category = {
    id: number;
    name: string;
    products_count: number;
    created_at: string;
    updated_at: string;
};

export type CategoryFilters = {
    search?: string;
};

