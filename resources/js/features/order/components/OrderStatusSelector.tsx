import { cn } from "@/lib/utils";
import { OrderStatus } from "@/features/order/order.types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    BubblesIcon,
    CircleXIcon,
    PackageCheckIcon,
    RefreshCwIcon,
    TruckIcon,
} from "lucide-react";

export const statuses: OrderStatus[] = [
    "new",
    "processing",
    "shipped",
    "delivered",
    "canceled",
];

type OrderStatusSelectorProps = {
    status: OrderStatus;
    setStatus: (status: OrderStatus) => void;
};

export default function OrderStatusSelector({
    status,
    setStatus,
}: OrderStatusSelectorProps) {
    return (
        <div className="flex flex-wrap gap-x-3 gap-y-2">
            {statuses.map((currentStatus) => (
                <StatusButton
                    key={currentStatus}
                    status={currentStatus}
                    active={status === currentStatus}
                    onClick={() => setStatus(currentStatus)}
                />
            ))}
        </div>
    );
}

type StatusButtonProps = {
    status: OrderStatus;
    active: boolean;
    onClick: () => void;
};

function StatusButton({ status, active, onClick }: StatusButtonProps) {
    const activeStyle = {
        new: "text-white bg-blue-600 hover:bg-blue-500 hover:text-white",
        processing:
            "text-white bg-yellow-600 hover:bg-yellow-500 hover:text-white",
        shipped:
            "text-white bg-yellow-600 hover:bg-yellow-500 hover:text-white",
        delivered:
            "text-white bg-green-600 hover:bg-green-500 hover:text-white",
        canceled: "text-white bg-red-600 hover:bg-red-500 hover:text-white",
    };

    const icon = {
        new: BubblesIcon,
        processing: RefreshCwIcon,
        shipped: TruckIcon,
        delivered: PackageCheckIcon,
        canceled: CircleXIcon,
    };

    const Icon = icon[status];

    return (
        <>
            <Button
                type="button"
                variant="outline"
                className={cn(
                    "rounded-lg text-sm capitalize font-bold",
                    active ? activeStyle[status] : "text-neutral-800"
                )}
                onClick={onClick}
            >
                <Icon className="size-4" />
                <span>{status}</span>
            </Button>
        </>
    );
}
