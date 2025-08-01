import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ProductFilters } from "@/features/product/product.types";
import { useDebouncedCallback } from "use-debounce";

export default function ProductSearchbox() {
    const { search } = usePage<PageProps & ProductFilters>().props;

    //form for applying search filter
    const { get, data, setData } = useForm<ProductFilters>({
        search: search ?? "",
    });

    const handleSearch = useDebouncedCallback((value: string) => {
        get(route("products.index", { search: value }), {
            preserveState: true,
            preserveScroll: true,
        });
    }, 500);

    return (
        <div className="relative ml-auto max-w-60">
            <SearchIcon className="absolute top-3 left-2 size-4 text-neutral-500" />
            <Input
                value={data.search}
                onChange={(e) => {
                    const value = e.target.value;
                    setData("search", value);
                    handleSearch(value); // ← Trigger search
                }}
                className="pl-8 rounded-md"
            />
        </div>
    );
}
