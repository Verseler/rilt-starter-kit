import ConfirmDeleteDialog from "@/components/AlertDialog/ConfirmDeleteDialog";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import type { Order } from "@/features/order/order.types";
import { useState } from "react";

export default function DeleteOrderButton() {
    const { order } = usePage<PageProps & { order: Order }>().props;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    function openDialog() {
        setDeleteDialogOpen(true);
    }

    function handleDeleteOrder() {
        if (order) {
            router.delete(route("orders.destroy", { order }));
        }
    }

    return (
        <>
            <Button
                disabled={!order}
                onClick={openDialog}
                variant="destructive"
            >
                Delete Order
            </Button>

            <ConfirmDeleteDialog
                open={deleteDialogOpen}
                title={`Delete Order #${order?.or_number ?? ""}?`}
                onCancel={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteOrder}
            />
        </>
    );
}
