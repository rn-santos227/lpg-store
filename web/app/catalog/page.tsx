import CatalogPageComponent from "../../components/catalog/CatalogPageComponent";

type CatalogPageProps = {
  searchParams?: Promise<{
    category?: string;
    q?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  return (
    <CatalogPageComponent
      categoryId={resolvedSearchParams.category ?? ""}
      searchQuery={resolvedSearchParams.q ?? ""}
    />
  );
}
