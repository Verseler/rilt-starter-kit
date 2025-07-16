import ApplicationLogo from "@/components/ApplicationLogo";
import Container from "@/components/Container";
import NavLink from "@/components/NavLink";
import UserAvatar from "@/components/UserAvatar";
import { Link } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <Container className="py-0">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center shrink-0">
                                <Link href="/">
                                    <ApplicationLogo className="h-10" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <UserAvatar />
                        </div>
                    </div>
                </Container>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <Container>{header}</Container>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
