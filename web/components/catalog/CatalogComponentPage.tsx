import GeneralFooterLayout from "../layouts/GeneralFooterLayout";
import GeneralHeaderLayout from "../layouts/GeneralHeaderLayout";
import { ProductCard } from "../product/ProductCard";
import { productCatalogQuery } from "../../constants/queries";
import type { Product } from "../../@types/product";
import { fetchSanityQuery } from "../../lib/sanity.api";

const formatPrice = (price?: number | null) => {
  if (!price) {
    return "Contact for price";
  }

  return `₱${price.toLocaleString("en-PH")}`;
};

export default async function CatalogPageComponent() {
  const products = (await fetchSanityQuery<Product[]>(productCatalogQuery)) ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <GeneralHeaderLayout />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 pb-32 pt-12">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Catalog
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Browse LPG essentials, refills, and accessories
          </h1>
          <p className="text-lg text-slate-600">
            Explore our full range of cylinders, regulators, and bundles to
            keep your home or business running efficiently.
          </p>
        </section>

        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Latest catalog items
              </p>
            </div>
          </div>
          {products.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.slug ?? product.name}
                  name={product.name}
                  description={product.description ?? undefined}
                  price={formatPrice(product.price)}
                  image={product.imageUrl}
                  badge={product.featured ? "Featured" : undefined}
                  actionLabel="Add to cart"
                  actionHref={
                    product.slug ? `/catalog/${product.slug}` : "/#support"
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No products are available right now. Please check back soon.
            </p>
          )}
        </section>
      </main>
      <GeneralFooterLayout />
    </div>
  );
}
