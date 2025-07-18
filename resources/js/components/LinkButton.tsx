import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

type LinkButtonProps = React.ComponentProps<typeof Button> & {
    href: string;
};

export default function LinkButton({
    href,
    children,
    ...props
}: LinkButtonProps) {
    return (
        <Button asChild {...props}>
            <Link as="button" href={href} prefetch>
                {children}
            </Link>
        </Button>
    );
}
