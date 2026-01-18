import { notFound } from "next/navigation";

import type { Product } from "../../../@types/product";
import ProductDetailPageComponent from "../../../components/product/ProductDetailPageComponent";
import { productDetailQuery } from "../../../constants/queries";
import { fetchSanityQuery } from "../../../lib/sanity.api";

type ProductDetailPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await fetchSanityQuery<Product>(productDetailQuery, {
    slug: params.slug,
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
