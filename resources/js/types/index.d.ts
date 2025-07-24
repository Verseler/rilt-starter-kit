export type UserRole = 'admin' | 'customer';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: UserRole[];
}

export interface Flash {
    success?: string;
    error?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: Flash
};
