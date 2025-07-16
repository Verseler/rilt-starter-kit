import ApplicationLogo from "@/components/ApplicationLogo";
import Container from "@/components/Container";
import type { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

export default function MainHeader() {
    const { props } = usePage<PageProps>();
    const auth = props.auth;

    return (
        <header>
            <nav className="fixed z-10 w-full border-b bg-primary-50">
                <Container className="flex items-center justify-between">
                    <ApplicationLogo className="size-10" />

                    <div className="flex items-center  h-16 gap-2.5">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </Container>
            </nav>
        </header>
    );
}
