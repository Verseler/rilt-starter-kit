import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getNameInitial } from "@/lib/utils";
import { PageProps, User } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";

export default function UserAvatar() {
    const { props } = usePage<PageProps>();
    const user: User | undefined = props?.auth?.user;
    const userNameInitial: string = getNameInitial(user?.name ?? "?");

    if (!user) {
        return (
            <Link
                href={route("login")}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
                Log in
            </Link>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="border">
                    <AvatarFallback className="font-bold bg-white text-neutral-600">
                        {userNameInitial}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => router.visit(route("profile.edit"))}
                >
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => router.post(route("logout"))}
                    className="text-red-500"
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
