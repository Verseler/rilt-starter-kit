import LinkButton from "@/components/LinkButton";
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
import { router, usePage } from "@inertiajs/react";

export default function UserAvatar() {
    const { props } = usePage<PageProps>();
    const user: User | undefined = props?.auth?.user;
    const userNameInitial: string = getNameInitial(user?.name ?? "?");

    if (!user) {
        return <LinkButton href={route("login")}>Login</LinkButton>;
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
                <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                <DropdownMenuItem disabled>Settings</DropdownMenuItem>
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
