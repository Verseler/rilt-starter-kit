import LinkButton from "@/components/LinkButton";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import type { Category } from "@/features/category/category.types";
import AdminLayout from "@/layouts/AdminLayout";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type CreateCategoryForm = Pick<Category, "name">;

export default function CreateCategoryPage() {
    const { data, setData, post, errors } = useForm<CreateCategoryForm>({
        name: "",
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        setData("name", e.target.value);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        post(route("categories.store"));
    }

    return (
        <AdminLayout>
            <SiteHeader title="Create Category" />

            <main className="p-4 md:gap-6 md:py-16">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto space-y-6"
                >
                    <h2 className="font-semibold text-gray-900 text-base/7">
                        Create Category Form
                    </h2>

                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            className="rounded-lg border-neutral-300"
                            value={data.name}
                            onChange={handleInputChange}
                            invalid={!!errors.name}
                        />
                        <InputError>{errors.name}</InputError>
                    </div>

                    <div className="flex items-center justify-end mt-6 gap-x-2">
                        <LinkButton
                            type="button"
                            href={route("categories.index")}
                            variant="outline"
                            className="px-4"
                        >
                            Cancel
                        </LinkButton>
                        <Button type="submit" className="px-6">
                            Save
                        </Button>
                    </div>
                </form>
            </main>
        </AdminLayout>
    );
}
