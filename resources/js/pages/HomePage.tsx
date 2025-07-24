import Container from "@/components/Container";
import HeroWaveSvg from "@/components/HeroWaveSvg";
import LinkButton from "@/components/LinkButton";
import { Section } from "@/components/Section";
import { H1, H2, P } from "@/components/Typography";
import PopularProducts from "@/features/product/components/PopularProducts";
import ProductCategoryCards from "@/features/product/components/ProductCategoryCards";
import { CategoriesSkeleton } from "@/features/product/components/skeletons/CategorySkeleton";
import { ProductsSkeleton } from "@/features/product/components/skeletons/ProductSkeleton";
import MainLayout from "@/layouts/MainLayout";
import { Head, WhenVisible } from "@inertiajs/react";
import { ArrowRightIcon } from "lucide-react";
import Cover from "../../../public/images/thriftly-cover.png";

export default function HomePage() {
    return (
        <MainLayout className="relative">
            <Head title="Home Page" />

            <HeroWaveSvg />

            <Container className="isolate">
                <Section
                    aria-label="hero section"
                    className="relative flex gap-20 pt-48"
                >
                    <div className="space-y-4">
                        <H1>
                            <span className="text-black">
                                Discover One-of-a-Kind Vintage Finds at
                            </span>{" "}
                            Thriftly
                        </H1>
                        <P className="max-w-3xl text-lg md:text-2xl">
                            Curated thrifted treasures and timeless pieces —
                            shop pre-loved fashion with ease.
                        </P>

                        <div className="flex gap-4 pt-8">
                            <LinkButton href={route("customer.product.index")}>
                                View Products
                            </LinkButton>
                            <LinkButton href={route("cart")} variant="outline">
                                View Carts
                            </LinkButton>
                        </div>
                    </div>
                    <img
                        src={Cover}
                        className="object-cover hidden md:block size-[25rem]"
                        alt="sample thrift t-shirt"
                    />
                </Section>

                <Section aria-label="featured categories section">
                    <H2>Featured Categories</H2>

                    <div className="flex flex-col justify-between w-full md:flex-row">
                        <P>
                            Explore unique vintage styles, from retro tees to
                            classic denim — from trusted seller.
                        </P>
                        <LinkButton
                            href={route("customer.product.index")}
                            variant="link"
                            className="text-base"
                        >
                            Shop the collection <ArrowRightIcon />
                        </LinkButton>
                    </div>

                    <WhenVisible
                        data="categories"
                        fallback={<CategoriesSkeleton />}
                    >
                        <ProductCategoryCards />
                    </WhenVisible>
                </Section>

                <Section aria-label="featured categories section">
                    <H2>Popular Products</H2>
                    <div className="flex flex-col justify-between w-full md:flex-row">
                        <P>
                            Browse our most-loved thrifted items handpicked by
                            the community.
                        </P>
                        <LinkButton
                            href={route("customer.product.index")}
                            variant="link"
                            className="text-base"
                        >
                            Shop the collection <ArrowRightIcon />
                        </LinkButton>
                    </div>

                    <WhenVisible
                        data="products"
                        fallback={<ProductsSkeleton />}
                    >
                        <PopularProducts />
                    </WhenVisible>

                    <div className="grid place-content-center">
                        <LinkButton href={route("customer.product.index")}>
                            View all products <ArrowRightIcon />
                        </LinkButton>
                    </div>
                </Section>
            </Container>
        </MainLayout>
    );
}
