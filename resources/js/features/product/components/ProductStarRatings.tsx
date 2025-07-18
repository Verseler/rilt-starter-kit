import { StarIcon } from "lucide-react";

type ProductStarRatingsProps = {
    rating: number;
    ratingCount?: number;
};

export default function ProductStarRatings({
    rating,
    ratingCount,
}: ProductStarRatingsProps) {
    return (
        <div className="flex gap-0.5 md:gap-1">
            {[...Array(5)].map((_, i) => {
                const filled = i + 1 <= Math.floor(rating);

                return (
                    <StarIcon
                        key={i}
                        className="size-3.5 md:size-4"
                        fill={filled ? "oklch(66.6% 0.179 58.318)" : "none"}
                        strokeWidth={filled ? 0 : 1}
                    />
                );
            })}
            {ratingCount && ratingCount < 0 ? (
                <span className="text-sm text-neutral-500">
                    ({ratingCount})
                </span>
            ) : null}
        </div>
    );
}
