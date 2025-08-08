import { SiteHeader } from "@/components/SiteHeader";
import AdminLayout from "@/layouts/AdminLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableDataEmpty,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CategorySearchbox from "@/features/category/components/CategorySearchbox";
import type { Pagination } from "@/types";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { PaginationControls } from "@/components/PaginationControls";
import ConfirmDeleteDialog from "@/components/AlertDialog/ConfirmDeleteDialog";
import { EllipsisVerticalIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order } from "@/features/order/order.types";
import OrderStatsCard from "@/features/order/components/OrderStatsCard";
import OrderStatusTabs from "@/features/order/components/OrderStatusTabs";
import OrderStatusBadge from "@/features/order/components/OrderStatusBadge";
import OrderSearchbox from '@/features/order/components/OrderSearchbox';

type OrderListProps = {
    orders: Pagination<Order>;
    ordersCount: number;
    newOrdersCount: number;
    processingOrdersCount: number;
    shippedOrdersCount: number;
};

export default function OrderListPage({
    orders,
    ordersCount,
    newOrdersCount,
    processingOrdersCount,
    shippedOrdersCount,
}: OrderListProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

    function openDialog(order: Order) {
        setDeleteDialogOpen(true);
        setOrderToDelete(order);
    }

    function handleDeleteConfirm() {
        if (orderToDelete) {
            router.delete(route("orders.destroy", orderToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setOrderToDelete(null);
                },
            });
        }
    }

    return (
        <AdminLayout>
            <SiteHeader title="Order" />

            <main className="py-4 md:gap-6 md:py-6">
                <div className="p-4 space-y-4 md:p-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <OrderStatsCard title="Orders" value={ordersCount} />
                        <OrderStatsCard
                            title="New Orders"
                            value={newOrdersCount}
                        />
                        <OrderStatsCard
                            title="Processing Orders"
                            value={processingOrdersCount}
                        />
                        <OrderStatsCard
                            title="Shipped Orders"
                            value={shippedOrdersCount}
                        />
                    </div>

                    <OrderStatusTabs />

                    <OrderSearchbox />

                    <Table className="border">
                        <TableHeader className="bg-neutral-100">
                            <TableRow>
                                <TableHead>OR Number</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Total Price</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <OrderDataRows
                                orders={orders.data}
                                onDelete={openDialog}
                            />
                        </TableBody>
                    </Table>

                    <PaginationControls
                        currentPage={orders.current_page}
                        lastPage={orders.last_page}
                        prevPageUrl={orders.prev_page_url}
                        nextPageUrl={orders.next_page_url}
                    />
                </div>

                <ConfirmDeleteDialog
                    open={deleteDialogOpen}
                    title={`Delete ${orderToDelete?.or_number ?? ""}?`}
                    onCancel={() => setDeleteDialogOpen(false)}
                    onConfirm={handleDeleteConfirm}
                />
            </main>
        </AdminLayout>
    );
}

type OrderDataRowsProps = {
    orders: Order[] | undefined;
    onDelete: (order: Order) => void;
};

function OrderDataRows({ orders, onDelete }: OrderDataRowsProps) {
    if (!orders || orders?.length === 0) {
        return (
            <TableRow>
                <TableDataEmpty colSpan={4}>No orders found.</TableDataEmpty>
            </TableRow>
        );
    }

    return orders.map((order) => (
        <TableRow key={order.id} className="h-12">
            <TableCell>{order.or_number}</TableCell>
            <TableCell>{order?.customer?.name}</TableCell>
            <TableCell>
                <OrderStatusBadge status={order.status} />
            </TableCell>
            <TableCell>{formatCurrency(order.total_amount)}</TableCell>
            <TableCell>{formatDate(order.created_at)}</TableCell>
            {/* Action Button */}
            <TableCell align="center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8">
                            <EllipsisVerticalIcon className="text-neutral-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32" align="end">
                        <DropdownMenuGroup>
                            <Link href={route("orders.edit", order)}>
                                <DropdownMenuItem>
                                    <PencilIcon />
                                    Edit
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    ));
}
