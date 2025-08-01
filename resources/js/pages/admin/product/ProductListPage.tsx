import LinkButton from "@/components/LinkButton";
import { SiteHeader } from "@/components/SiteHeader";
import type { Product } from "@/features/product/product.types";
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
import { PaginationControls } from "@/components/PaginationControls";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import ProductSearchbox from "@/features/product/components/ProductSearchbox";
import type { Pagination } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import ConfirmDeleteDialog from "@/components/AlertDialog/ConfirmDeleteDialog";

type ProductListProps = {
    products: Pagination<Product>;
};

export default function ProductListPage({ products }: ProductListProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(
        null
    );

    function openDialog(product: Product) {
        setDeleteDialogOpen(true);
        setProductToDelete(product);
    }

    function handleDeleteConfirm() {
        if (productToDelete) {
            router.delete(route("products.destroy", productToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setProductToDelete(null);
                },
            });
        }
    }

    return (
        <AdminLayout>
            <SiteHeader title="Product" />

            <main className="py-4 md:gap-6 md:py-6">
                <div className="grid px-6 mb-2 place-content-end">
                    <LinkButton
                        href={route("products.create")}
                        className="max-w-40"
                    >
                        Create Product
                    </LinkButton>
                </div>

                <div className="p-4 space-y-4 md:p-6">
                    <ProductSearchbox />

                    <Table className="border">
                        <TableHeader className="bg-neutral-100">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Avg. Rating</TableHead>
                                <TableHead>Total Reviews</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <ProductDataRows
                                products={products.data}
                                onDelete={openDialog}
                            />

                            {products.data?.length === 0 && (
                                <TableRow>
                                    <TableDataEmpty colSpan={8}>
                                        No products found.
                                    </TableDataEmpty>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <PaginationControls
                        currentPage={products.current_page}
                        lastPage={products.last_page}
                        prevPageUrl={products.prev_page_url}
                        nextPageUrl={products.next_page_url}
                    />
                </div>

                <ConfirmDeleteDialog
                    open={deleteDialogOpen}
                    title={`Delete ${productToDelete?.name ?? ""}?`}
                    onCancel={() => setDeleteDialogOpen(false)}
                    onConfirm={handleDeleteConfirm}
                />
            </main>
        </AdminLayout>
    );
}

type ProductDataRows = {
    products: Product[];
    onDelete: (product: Product) => void;
};

function ProductDataRows({ products, onDelete }: ProductDataRows) {
    return products.map((product) => (
        <TableRow key={product.id} className="h-12">
            <TableCell>{product.name}</TableCell>
            <TableCell className="max-w-prose line-clamp-2">
                <p className="h-9">{product.description}</p>
            </TableCell>
            <TableCell>
                <Badge variant="outline" className="text-neutral-500">
                    {product.category?.name}
                </Badge>
            </TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>{product.stock_quantity}</TableCell>
            <TableCell>{product.average_rating}</TableCell>
            <TableCell>{product.reviews_count}</TableCell>
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
                            <Link href={route("products.edit", product)}>
                                <DropdownMenuItem>
                                    <PencilIcon />
                                    Edit
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                onClick={() => onDelete(product)}
                                className="text-red-500"
                            >
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    ));
}
