import CatalogPageComponent from "../../components/catalog/CatalogPageComponent";

type CatalogPageProps = {
  searchParams?: Promise<{
    category?: string;
    q?: string;
  }>;
};

export default function CatalogPage({ searchParams }: CatalogPageProps) {
  return <CatalogPageComponent searchQuery={searchParams?.q ?? ""} />;
}
