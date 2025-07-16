import ApplicationLogo from "@/components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-20 bg-primary-50 md:pt-0 md:pb-20 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="text-gray-500 fill-current size-16" />
                </Link>
            </div>

            <div className="w-full px-6 pt-6 pb-4 overflow-hidden sm:max-w-md dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
