import type { OrderStatus } from "@/features/order/order.types";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";

type OrderTab = OrderStatus | "all";

const tabs: OrderTab[] = [
    "all",
    "new",
    "processing",
    "shipped",
    "delivered",
    "canceled",
];

export default function OrderStatusTabs() {
    const { activeTab } = usePage<PageProps & { activeTab: OrderTab }>().props;

    function selectTab(tab: OrderTab) {
        const selectedTab = tab !== "all" ? tab : "all";

        router.visit(route("orders.index", { activeTab: selectedTab }), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <div className="pt-4">
            <div className="p-1.5 border mx-auto rounded-2xl flex gap-1 max-w-max">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => selectTab(tab)}
                        className={cn(
                            "p-2 px-3 text-sm font-bold capitalize rounded-lg",
                            activeTab === tab
                                ? "text-primary-500 bg-neutral-50"
                                : "text-neutral-500 hover:bg-neutral-50"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}
