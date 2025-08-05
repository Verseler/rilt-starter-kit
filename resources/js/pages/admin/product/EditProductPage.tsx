import { SiteHeader } from "@/components/SiteHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import type { Product } from "@/features/product/product.types";
import type { Category } from "@/features/category/category.types";
import React, { FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LinkButton from "@/components/LinkButton";
import FileUploadField from "@/components/FileUploadField";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { InputError } from "@/components/ui/input-error";
import { ExistingImagesGrid } from "@/components/ImageThumbnailsGrid";

type EditProductForm = Pick<
    Product,
    "name" | "description" | "price" | "stock_quantity"
> & {
    category_id: number | undefined;
    new_images: File[] | null;
    existing_images: string[]; // Array of image paths to keep
    deleted_images: string[]; // Array of image paths to delete
    product_id: number;
};

type EditProductPageProps = {
    categories: Category[];
    product: Product;
};

export default function EditProductPage({
    categories,
    product,
}: EditProductPageProps) {
    const { data, setData, post, errors } = useForm<EditProductForm>({
        product_id: product?.id,
        name: product?.name || "",
        description: product?.description || "",
        category_id: product?.category_id,
        price: product?.price || 0,
        stock_quantity: product?.stock_quantity || 0,
        new_images: null,
        existing_images: product?.images?.map((img) => img.path) || [],
        deleted_images: [],
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        setData((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
    }

    function handleDeleteExistingImage(imagePath: string) {
        setData((prev) => ({
            ...prev,
            existing_images: prev.existing_images.filter(
                (path) => path !== imagePath
            ),
            deleted_images: [...prev.deleted_images, imagePath],
        }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        router.post(route("products.update", product), {
            _method: "put",
            product_id: data.product_id,
            name: data.name,
            description: data.description,
            category_id: data.category_id,
            price: data.price,
            stock_quantity: data.stock_quantity,
            new_images: data.new_images,
            existing_images: data.existing_images,
            deleted_images: data.deleted_images,
        });
    }

    return (
        <AdminLayout>
            <SiteHeader title="Edit Product" />

            <main className="p-4 md:gap-6 md:py-16">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto space-y-6"
                >
                    <h2 className="font-semibold text-gray-900 text-base/7">
                        Edit Product Form
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

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={data.description}
                            onChange={(e) =>
                                setData((prevData) => {
                                    return {
                                        ...prevData,
                                        description: e.target.value,
                                    };
                                })
                            }
                            invalid={!!errors.description}
                        />
                        {errors.description ? (
                            <InputError>{errors.description}</InputError>
                        ) : (
                            <p className="mt-3 text-gray-600 text-sm/6">
                                Write a few sentences about the product.
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={String(data.category_id)}
                            onValueChange={(value) =>
                                setData((prevData) => {
                                    return {
                                        ...prevData,
                                        category_id: Number(value),
                                    };
                                })
                            }
                        >
                            <SelectTrigger invalid={!!errors.category_id}>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent id="category">
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories?.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={String(category.id)}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                            <InputError>{errors.category_id}</InputError>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                inputMode="numeric"
                                className="rounded-lg border-neutral-300"
                                value={data.price}
                                onChange={handleInputChange}
                                invalid={!!errors.price}
                            />
                            <InputError>{errors.price}</InputError>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock_quantity">Quantity</Label>
                            <Input
                                id="stock_quantity"
                                name="stock_quantity"
                                type="number"
                                inputMode="numeric"
                                className="rounded-lg border-neutral-300"
                                value={data.stock_quantity}
                                onChange={handleInputChange}
                                invalid={!!errors.stock_quantity}
                            />
                            <InputError>{errors.stock_quantity}</InputError>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="images">Images</Label>

                        {/* Display existing images */}
                        <ExistingImagesGrid
                            images={data.existing_images}
                            productName={product.name}
                            onDelete={handleDeleteExistingImage}
                        />

                        {/* Upload new images */}
                        <FileUploadField
                            files={data.new_images}
                            setFiles={(value) =>
                                setData((prevData) => {
                                    return { ...prevData, new_images: value };
                                })
                            }
                            error={errors.new_images}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-6 gap-x-2">
                        <LinkButton
                            type="button"
                            href={route("products.index")}
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
