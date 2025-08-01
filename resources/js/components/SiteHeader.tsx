import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getRouteName } from "@/lib/utils";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";

export function SiteHeader({ title }: { title?: string }) {
    const pageUrl = usePage<PageProps>().url;
    const routeName = getRouteName(pageUrl);
    const titleValue = title ?? routeName;

    return (
        <>
            <Head title={title} />
            <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
                <div className="flex items-center w-full gap-1 px-4 lg:gap-2 lg:px-6">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    />
                    <h1 className="text-base font-medium capitalize">
                        {titleValue}
                    </h1>
                </div>
            </header>
        </>
    );
}
