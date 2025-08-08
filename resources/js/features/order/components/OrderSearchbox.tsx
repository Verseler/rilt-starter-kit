import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useDebouncedCallback } from "use-debounce";
import type { OrderFilters } from "@/features/order/order.types";

export default function OrderSearchbox() {
    const { search } = usePage<PageProps & OrderFilters>().props;

    //form for applying search filter
    const { get, data, setData } = useForm<OrderFilters>({
        search: search ?? "",
    });

    const handleSearch = useDebouncedCallback((value: string) => {
        get(route("orders.index", { search: value }), {
            preserveScroll: true,
            preserveState: true,
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
