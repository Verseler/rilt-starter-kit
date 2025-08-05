import { TrashIcon } from "lucide-react";

interface ExistingImagesGridProps {
    images: string[];
    productName: string;
    onDelete: (imagePath: string) => void;
}

export function ExistingImagesGrid({
    images,
    productName,
    onDelete,
}: ExistingImagesGridProps) {
    return (
        <div className="grid grid-cols-2 gap-2 mb-4 md:grid-cols-4">
            {images.map((imagePath, index) => (
                <div key={index} className="relative group">
                    <img
                        src={imagePath}
                        alt={`Product ${productName}`}
                        className="object-cover w-full rounded-lg h-28 md:h-24"
                    />
                    <button
                        type="button"
                        onClick={() => onDelete(imagePath)}
                        className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
