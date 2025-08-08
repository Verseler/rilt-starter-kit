import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/features/order/order.types";
import { cn } from "@/lib/utils";
import {
    BubblesIcon,
    CircleXIcon,
    PackageCheckIcon,
    RefreshCwIcon,
    TruckIcon,
} from "lucide-react";

const badgeStatusVariant = {
    new: {
        style: "text-blue-600 bg-blue-50 border-blue-300",
        icon: BubblesIcon,
    },
    processing: {
        style: "text-yellow-600 bg-yellow-50 border-yellow-300",
        icon: RefreshCwIcon,
    },
    shipped: {
        style: "text-green-600 bg-green-50 border-green-300",
        icon: TruckIcon,
    },
    delivered: {
        style: "text-green-600 bg-green-50 border-green-300",
        icon: PackageCheckIcon,
    },
    canceled: {
        style: "text-red-600 bg-red-50 border-red-300",
        icon: CircleXIcon,
    },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const style = badgeStatusVariant[status].style;
    const Icon = badgeStatusVariant[status].icon;

    return (
        <Badge
            variant="outline"
            className={cn("space-x-1 py-1 capitalize", style)}
        >
            <Icon className="size-4" />
            <span>{status}</span>
        </Badge>
    );
}
