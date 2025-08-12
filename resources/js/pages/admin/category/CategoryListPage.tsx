import LinkButton from "@/components/LinkButton";
import { SiteHeader } from "@/components/SiteHeader";
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
import AdminLayout from "@/layouts/AdminLayout";
import type { Category } from "@/features/category/category.types";
import type { Pagination } from "@/types";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { PaginationControls } from "@/components/PaginationControls";
import ConfirmDeleteDialog from "@/components/AlertDialog/ConfirmDeleteDialog";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

type CategoryListProps = {
    categories: Pagination<Category>;
};

export default function CategoryListPage({ categories }: CategoryListProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null
    );

    function openDialog(category: Category) {
        setDeleteDialogOpen(true);
        setCategoryToDelete(category);
    }

    function handleDeleteConfirm() {
        if (categoryToDelete) {
            router.delete(route("categories.destroy", categoryToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setCategoryToDelete(null);
                },
            });
        }
    }

    return (
        <AdminLayout>
            <SiteHeader title="Category" />

            <main className="py-4 md:gap-6 md:py-6">
                <div className="grid px-6 mb-2 place-content-end">
                    <LinkButton
                        href={route("categories.create")}
                        className="max-w-40"
                    >
                        Create Category
                    </LinkButton>
                </div>

                <div className="p-4 space-y-4 md:p-6">
                    <CategorySearchbox />

                    <Table>
                        <TableHeader className="bg-neutral-100">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Total Associated Products</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <CategoryDataRows
                                categories={categories.data}
                                onDelete={openDialog}
                            />
                        </TableBody>
                    </Table>

                    <PaginationControls
                        currentPage={categories.current_page}
                        lastPage={categories.last_page}
                        prevPageUrl={categories.prev_page_url}
                        nextPageUrl={categories.next_page_url}
                    />
                </div>

                <ConfirmDeleteDialog
                    open={deleteDialogOpen}
                    title={`Delete ${categoryToDelete?.name ?? ""}?`}
                    onCancel={() => setDeleteDialogOpen(false)}
                    onConfirm={handleDeleteConfirm}
                />
            </main>
        </AdminLayout>
    );
}

type CategoryDataRowsProps = {
    categories: Category[] | undefined;
    onDelete: (category: Category) => void;
};

function CategoryDataRows({ categories, onDelete }: CategoryDataRowsProps) {
    if (!categories || categories?.length === 0) {
        return (
            <TableRow>
                <TableDataEmpty colSpan={4}>
                    No categories found.
                </TableDataEmpty>
            </TableRow>
        );
    }

    return categories.map((category) => (
        <TableRow key={category.id} className="h-12">
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.products_count}</TableCell>
            <TableCell>{formatDate(category.created_at)}</TableCell>
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
                            <Link href={route("categories.edit", category)}>
                                <DropdownMenuItem>
                                    <PencilIcon />
                                    Edit
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                onClick={() => onDelete(category)}
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
