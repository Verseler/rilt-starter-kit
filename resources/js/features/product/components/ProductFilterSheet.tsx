import { FunnelXIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { router, useForm, usePage, WhenVisible } from "@inertiajs/react";
import type {
    ProductFilterPageProps,
    ProductFilters,
} from "@/features/product/product.types";

const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "rating_desc", label: "Best Rated" },
    { value: "reviews_desc", label: "Most Reviewed" },
];

export default function ProductFilterSheet() {
    const { categories, sort, categoryFilter } =
        usePage<ProductFilterPageProps>().props;

    const { get, data, setData } = useForm<ProductFilters>({
        sort: sort ?? "",
        categoryFilter: categoryFilter ?? "",
    });

    function handleApplyFilter() {
        get(route("customer.products.index"), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function clearFilter() {
        router.visit(route("customer.products.index"), {
            replace: true,
            preserveScroll: true,
        });
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    Filters <PlusIcon />
                </Button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filter/Sort Options</SheetTitle>
                    <SheetDescription />
                </SheetHeader>

                <div className="grid flex-1 gap-4 mt-6 auto-rows-min">
                    <div className="grid gap-3">
                        <Label htmlFor="categories">Category</Label>
                        <Select
                            value={data.categoryFilter}
                            onValueChange={(value) =>
                                setData("categoryFilter", value)
                            }
                        >
                            <SelectTrigger id="categories">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>

                            <WhenVisible
                                always
                                data="categories"
                                fallback={
                                    <SelectContent>
                                        <SelectItem value="#" disabled>
                                            Fruits
                                        </SelectItem>
                                    </SelectContent>
                                }
                            >
                                <SelectContent>
                                    {categories?.map((option) => (
                                        <SelectItem
                                            key={option.id}
                                            value={option.name}
                                        >
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </WhenVisible>
                        </Select>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="sort">Sort</Label>
                        <Select
                            value={data.sort}
                            onValueChange={(value) => setData("sort", value)}
                        >
                            <SelectTrigger id="sort">
                                <SelectValue placeholder="Select a sort option" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter className="mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="text-red-500 border-red-500"
                        onClick={clearFilter}
                    >
                        <FunnelXIcon />
                        Clear
                    </Button>

                    <SheetClose asChild>
                        <Button className="px-6" onClick={handleApplyFilter}>
                            Apply
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
