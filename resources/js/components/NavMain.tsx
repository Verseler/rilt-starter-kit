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
import { Link } from "@inertiajs/react";

const navMain = [
    {
        title: "Dashboard",
        route: "dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Categories",
        route: "categories.index",
        icon: ListIcon,
    },
    {
        title: "Products",
        route: "products.index",
        icon: ShirtIcon,
    },
    {
        title: "Orders",
        route: "orders.index",
        icon: ShoppingCartIcon,
    },
    {
        title: "Customers",
        route: "customers.index",
        icon: UsersIcon,
    },
];

export function NavMain() {
    const currentRoute = route().current();
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
                                        currentRoute === item.route
                                            ? "text-white bg-primary hover:bg-primary hover:text-white"
                                            : "hover:bg-neutral-100"
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
