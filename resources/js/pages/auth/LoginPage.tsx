import { InputError } from "@/components/ui/input-error";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function LoginPage({
    canResetPassword,
}: {
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label className="ms-1">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1 rounded-xl"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        invalid={Boolean(errors.email)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="password" className="ms-1">
                        Password
                    </Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1 rounded-xl"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        invalid={Boolean(errors.password)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <div className="flex items-center justify-between mt-4 mb-6">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(value) =>
                                    setData(
                                        "remember",
                                        (value || false) as false
                                    )
                                }
                            />
                            <div className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                                Remember me
                            </div>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                </div>

                <Button className="w-full" size="lg" disabled={processing}>
                    Log in
                </Button>

                <div className="grid place-content-center">
                    <Link
                        href={route("register")}
                        className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Doesn't have an account yet?
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
