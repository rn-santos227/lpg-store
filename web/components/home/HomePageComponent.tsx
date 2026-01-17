"use client";

import GeneralFooterLayout from "../layouts/GeneralFooterLayout";
import GeneralHeaderLayout from "../layouts/GeneralHeaderLayout";
import { ProductCard } from "../product/ProductCardComponent";
import { ServiceCard } from "../services/ServiceCardComponent";
import { Button } from "../ui/Button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/Card";
import { Spinner } from "../ui/Spinner";
import { useHomeContent } from "./hooks/useHomeContent";

const formatPrice = (price?: number | null) => {
  if (!price) {
    return "Contact for price";
  }

  return `₱${price.toLocaleString("en-PH")}`;
};

export default function HomePageComponent() {
  const {
    promotion,
    categories,
    services,
    featuredProducts,
    isLoading,
  } = useHomeContent();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <GeneralHeaderLayout />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-40 pt-12">
        <section
          className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]"
          id="marketplace"
        >
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              A4R LPG Trading
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Marketplace for LPG essentials, promos, and trusted
              services.
            </h1>
            <p className="text-lg text-slate-600">
              Discover verified LPG refills, accessory bundles, and services that
              keep homes and small businesses running safely and efficiently.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/catalog">Shop featured products</Button>
              <Button href="/services" variant="secondary">
                Explore services
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <Card className="border-emerald-100">
                <CardContent className="space-y-3 pt-6">
                  <Spinner label="Loading promotion" />
                </CardContent>
              </Card>
            ) : promotion ? (
              <Card className="border-emerald-100">
                <CardContent className="space-y-3 pt-6">
                  <CardTitle>{promotion.title}</CardTitle>
                  {promotion.subtitle ? (
                    <CardDescription>{promotion.subtitle}</CardDescription>
                  ) : null}
                  <Button
                    variant="secondary"
                    href={promotion.ctaLink ?? "#support"}
                  >
                    {promotion.ctaLabel ?? "Learn more"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-emerald-100">
                <CardContent className="space-y-3 pt-6">
                  <CardTitle>No promotions available</CardTitle>
                  <CardDescription>
                    Check back soon for the latest LPG bundles and delivery
                    offers.
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section className="space-y-8" id="catalog">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Categories
              </p>
            </div>
          </div>
          {isLoading ? (
            <Spinner label="Loading categories" />
          ) : categories.length ? (
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
                  variant="ghost"
                  href={
                    category.slug ? `/categories/${category.slug}` : "#support"
                  }
                >
                  {category.title}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No categories available.</p>
          )}
        </section>

        <section className="space-y-8" id="services">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Services
            </p>
          </div>
          {isLoading ? (
            <Spinner label="Loading services" />
          ) : services.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  summary={service.summary}
                  feeLabel={service.fee ? formatPrice(service.fee) : null}
                  imageUrl={service.imageUrl}
                  href={service.slug ? `/services/${service.slug}` : "#support"}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">no service available</p>
          )}
        </section>

        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Featured products
              </p>
            </div>
            <Button variant="secondary" href="/catalog">
              See Deals
            </Button>
          </div>
          {isLoading ? (
            <Spinner label="Loading featured products" />
          ) : featuredProducts.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.slug ?? product.name}
                  name={product.name}
                  description={product.description ?? undefined}
                  price={formatPrice(product.price)}
                  image={product.imageUrl}
                  badge={product.featured ? "Featured" : undefined}
                  actionLabel="Add to cart"
                  actionHref={
                    product.slug ? `/catalog/${product.slug}` : "#support"
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">no products available</p>
          )}
        </section>

        <section className="space-y-8" id="support">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  Customer care
                </p>
                <h2 className="text-3xl font-semibold text-slate-900">
                  Talk to our LPG experts anytime
                </h2>
                <p className="text-base text-slate-600">
                  Get help with safety tips, delivery coverage, and business
                  contracts in one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="tel:+639001234567">Call hotline</Button>
                <Button variant="secondary" href="mailto:care@lpgstore.com">
                  Email support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <GeneralFooterLayout />
    </div>
  );
}
