import GeneralFooterLayout from "../layouts/GeneralFooterLayout";
import GeneralHeaderLayout from "../layouts/GeneralHeaderLayout";
import { ProductCatalogSection } from "./ProductCatalogSection";
import { categoryQuery, productCatalogQuery } from "../../constants/queries";
import type { Category } from "../../@types/category";
import type { Product } from "../../@types/product";
import { fetchSanityQuery } from "../../lib/sanity.api";

type CategoryResult = {
  _id: string;
  title: string;
  slug?: string | null;
};

type CatalogPageComponentProps = {
  categoryId?: string;
  searchQuery?: string;
};

export default async function CatalogPageComponent({
  categoryId,
  searchQuery,
}: CatalogPageComponentProps) {
  const products = (await fetchSanityQuery<Product[]>(productCatalogQuery)) ?? [];
  const categoryResults =
    (await fetchSanityQuery<CategoryResult[]>(categoryQuery)) ?? [];
  const categories: Category[] = categoryResults.map((category) => ({
    id: category._id,
    title: category.title,
    slug: category.slug,
  }));

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

         <ProductCatalogSection
          products={products}
          initialSearch={searchQuery}
        />
      </main>
      <GeneralFooterLayout />
    </div>
  );
}
