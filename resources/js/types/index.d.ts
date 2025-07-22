export type UserRole = 'admin' | 'customer';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: UserRole[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
