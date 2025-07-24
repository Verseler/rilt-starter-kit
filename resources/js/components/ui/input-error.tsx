import { HTMLAttributes } from "react";

export function InputError({
    className = "",
    children,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return children ? (
        <p
            {...props}
            className={
                "text-sm ms-1 text-red-600 dark:text-red-400 " + className
            }
        >
            {children}
        </p>
    ) : null;
}
