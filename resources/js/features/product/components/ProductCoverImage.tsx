type ProductCoverImageProps = {
    src: string | undefined;
};

export default function ProductCoverImage({ src }: ProductCoverImageProps) {
    if (!src) {
        return <div className="w-full h-40 bg-primary-50 md:h-72 rounded-xl" />;
    }

    return (
        <img
            className="h-40 md:h-72 object-cover rounded-xl"
            src={src}
            alt="product cover image"
        />
    );
}
