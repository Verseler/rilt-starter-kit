import type { ProductImage } from "@/features/product/product.types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
    const [selectedImage, setSelectedImage] = useState(
        images?.[0] ?? undefined
    );

    return (
        <div className="space-y-4 aspect-square bg-yellow-50">
            <img
                className="object-cover rounded-lg size-full"
                src={selectedImage?.image_src}
                alt="product sample image"
            />

            <div className="grid grid-cols-4 gap-2">
                {images &&
                    images.length > 0 &&
                    images.map((image) => (
                        <button
                            onClick={() => setSelectedImage(image)}
                            key={image?.id}
                        >
                            <img
                                className={cn(
                                    "object-cover rounded-lg h-36 aspect-square border-2",
                                    selectedImage?.id === image?.id
                                        ? "border-black"
                                        : "border-primary-50"
                                )}
                                src={image?.image_src}
                                alt="product sample image"
                            />
                        </button>
                    ))}
            </div>
        </div>
    );
}
