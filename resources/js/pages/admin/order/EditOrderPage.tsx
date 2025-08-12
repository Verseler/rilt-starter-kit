import LinkButton from "@/components/LinkButton";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteOrderButton from "@/features/order/components/DeleteOrderButton";
import OrderStatusSelector from "@/features/order/components/OrderStatusSelector";
import {
    EditOrderForm,
    Order,
    OrderStatus,
} from "@/features/order/order.types";
import AdminLayout from "@/layouts/AdminLayout";
import { formatDate } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export default function EditOrderPage({ order }: { order: Order }) {
    const { put, data, setData, errors } = useForm<EditOrderForm>({
        status: order.status,
        address_line: order.shipping_address.address_line,
        barangay: order.shipping_address.barangay,
        city: order.shipping_address.city,
        province: order.shipping_address.province,
        postal_code: order.shipping_address.postal_code,
        order_items: order.order_items,
    });

    function handleChangeStatus(status: OrderStatus) {
        setData("status", status);
    }

    function handleUpdateOrder(e: FormEvent) {
        e.preventDefault();

        put(route("orders.update", { order }));
    }

    return (
        <AdminLayout>
            <SiteHeader title="Edit Order" />

            <main className="flex flex-col gap-4 p-6 md:flex-row md:gap-8 2xl:px-60 md:py-16">
                <form
                    onSubmit={handleUpdateOrder}
                    className="grid w-full gap-4 md:gap-6 md:grid-cols-2"
                >
                    <h2 className="col-span-2 -mb-4 text-lg font-bold">
                        Order Details
                    </h2>
                    <div className="space-y-2">
                        <Label>OR Number</Label>
                        <Input
                            className="rounded-lg"
                            defaultValue={order.or_number}
                            disabled
                            readOnly
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Customer Name</Label>
                        <Input
                            className="capitalize rounded-lg"
                            defaultValue={order.customer.name}
                            disabled
                            readOnly
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>
                        {/* TODO */}
                        <OrderStatusSelector
                            status={data.status}
                            setStatus={handleChangeStatus}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Customer Phone #</Label>
                        <Input
                            className="rounded-lg"
                            defaultValue={order.shipping_address.phone_number}
                            disabled
                            readOnly
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Street Address</Label>
                        <Input
                            className="rounded-lg"
                            value={data.address_line}
                            onChange={(e) =>
                                setData("address_line", e.target.value)
                            }
                            invalid={!!errors.address_line}
                        />
                        <InputError>{errors.address_line}</InputError>
                    </div>

                    <div className="space-y-2">
                        <Label>Barangay</Label>
                        <Input
                            className="rounded-lg"
                            value={data.barangay}
                            onChange={(e) =>
                                setData("barangay", e.target.value)
                            }
                            invalid={!!errors.barangay}
                        />
                        <InputError>{errors.barangay}</InputError>
                    </div>

                    <div className="grid grid-cols-3 col-span-2 gap-2">
                        <div className="space-y-2">
                            <Label>City</Label>
                            <Input
                                className="rounded-lg"
                                value={data.city}
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                                invalid={!!errors.city}
                            />
                            <InputError>{errors.city}</InputError>
                        </div>

                        <div className="space-y-2">
                            <Label>State / Province</Label>
                            <Input
                                className="rounded-lg"
                                value={data.province}
                                onChange={(e) =>
                                    setData("province", e.target.value)
                                }
                                invalid={!!errors.province}
                            />
                            <InputError>{errors.province}</InputError>
                        </div>

                        <div className="space-y-2">
                            <Label>Zip / Postal code</Label>
                            <Input
                                className="rounded-lg"
                                type="number"
                                inputMode="numeric"
                                value={data.postal_code}
                                onChange={(e) =>
                                    setData(
                                        "postal_code",
                                        Number(e.target.value)
                                    )
                                }
                                invalid={!!errors.postal_code}
                            />
                            <InputError>{errors.postal_code}</InputError>
                        </div>
                    </div>

                    {/* Order Items Info */}
                    <div className="col-span-2 mt-12 space-y-3">
                        <h2 className="text-lg font-bold">Order Items</h2>

                        <Table>
                            <TableHeader className="bg-neutral-100">
                                <TableRow>
                                    <TableHead className="w-full">
                                        Product
                                    </TableHead>
                                    <TableHead className="min-w-40">
                                        Unit Price
                                    </TableHead>
                                    <TableHead className="min-w-40">
                                        Quantity
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.order_items?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Input
                                                className="rounded-lg"
                                                defaultValue={item.product.name}
                                                disabled
                                                readOnly
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                className="rounded-lg"
                                                defaultValue={
                                                    item.product.price
                                                }
                                                disabled
                                                readOnly
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                className="rounded-lg"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newQuantity =
                                                        Number(
                                                            e.target.value
                                                        ) || 0;

                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        order_items:
                                                            prevData.order_items.map(
                                                                (currentItem) =>
                                                                    currentItem.id ===
                                                                    item.id
                                                                        ? {
                                                                              ...currentItem,
                                                                              quantity:
                                                                                  newQuantity,
                                                                          }
                                                                        : currentItem
                                                            ),
                                                    }));
                                                }}
                                                invalid={!!errors.order_items}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="col-span-2 ml-auto space-x-2">
                        <LinkButton
                            variant="outline"
                            href={route("orders.index")}
                        >
                            Cancel
                        </LinkButton>
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-500"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>

                <div className="space-y-4">
                    <div className="flex justify-end">
                        <DeleteOrderButton />
                    </div>

                    <Card className="py-5 shadow-sm md:min-w-96 max-h-max">
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Created at</Label>
                                <p>{formatDate(order.created_at)}</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Last modified at</Label>
                                <p>{formatDate(order.updated_at)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </AdminLayout>
    );
}
