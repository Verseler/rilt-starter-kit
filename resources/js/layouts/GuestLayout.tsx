import ApplicationLogo from "@/components/ApplicationLogo";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-20 bg-primary-50 md:pt-0 md:pb-20 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <ApplicationLogo logoOnly className="text-neutral-600" />
            </div>

            <div className="w-full px-6 pt-6 pb-4 overflow-hidden sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
