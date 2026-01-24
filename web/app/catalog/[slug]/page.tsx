import { notFound } from "next/navigation";

import type { Product } from "../../../@types/product";
import ProductDetailPageComponent from "../../../components/product/ProductDetailPageComponent";
import { productDetailQuery } from "../../../constants/queries";
import { fetchSanityQuery } from "../../../lib/sanity.api";

type ProductDetailPageProps = {
  params?: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = (await params) ?? { slug: "" };
  const slug = resolvedParams.slug
    ? decodeURIComponent(resolvedParams.slug)
    : "";

  if (!slug) {
    notFound();
  }

  const product = await fetchSanityQuery<Product>(productDetailQuery, {
    slug,
  });

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailPageComponent
      product={product}
      reviews={[]}
    />
  );
}
