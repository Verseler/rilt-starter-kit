import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    LayoutDashboardIcon,
    ListIcon,
    ShirtIcon,
    ShoppingCartIcon,
    UsersIcon,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { cn } from "@/lib/utils";

const navMain = [
    {
        title: "Dashboard",
        path: "/admin",
        route: "dashboard",
        icon: LayoutDashboardIcon,
    },
    // {
    //     title: "Categories",
    //  path: '/admin/category',
    //     route: "category.index",
    //     icon: ListIcon,
    // },
    {
        title: "Products",
        path: "/admin/product",
        route: "product.index",
        icon: ShirtIcon,
    },
    // {
    //     title: "Orders",
    //  path: '/admin/order',
    //     route: "order.index",
    //     icon: ShoppingCartIcon,
    // },
    // {
    //     title: "Customers",
    //  path: '/admin/customer',
    //     route: "customer.index",
    //     icon: UsersIcon,
    // },
];

export function NavMain() {
    const url = usePage<PageProps>().url;

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <Link href={route(item.route)}>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    className={
                                        url === item.path
                                            ? "text-white bg-primary"
                                            : ""
                                    }
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
