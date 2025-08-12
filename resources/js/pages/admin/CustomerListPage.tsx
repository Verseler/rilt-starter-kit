import { SiteHeader } from "@/components/SiteHeader";
import CustomerSearchbox from "@/features/customer/components/CustomerSearchbox";
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
import type { Pagination, User } from "@/types";
import { PaginationControls } from "@/components/PaginationControls";
import { formatDate } from "@/lib/utils";

type CustomerListProps = {
    customers: Pagination<User>;
};

export default function CustomerListPage({ customers }: CustomerListProps) {
    return (
        <AdminLayout>
            <SiteHeader title="Customers" />

            <main className="py-4 md:gap-6 md:py-6">
                <div className="p-4 space-y-4 md:p-6">
                    <CustomerSearchbox />

                    <Table>
                        <TableHeader className="bg-neutral-100">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date Joined</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <CustomerDataRows customers={customers.data} />
                        </TableBody>
                    </Table>

                    <PaginationControls
                        currentPage={customers.current_page}
                        lastPage={customers.last_page}
                        prevPageUrl={customers.prev_page_url}
                        nextPageUrl={customers.next_page_url}
                    />
                </div>
            </main>
        </AdminLayout>
    );
}

type CustomerDataRowsProps = {
    customers: User[] | undefined;
};

function CustomerDataRows({ customers }: CustomerDataRowsProps) {
    if (!customers || customers?.length === 0) {
        return (
            <TableRow>
                <TableDataEmpty colSpan={4}>No customers found.</TableDataEmpty>
            </TableRow>
        );
    }

    return customers.map((customer) => (
        <TableRow key={customer.id} className="h-12">
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{formatDate(customer.created_at)}</TableCell>
        </TableRow>
    ));
}
