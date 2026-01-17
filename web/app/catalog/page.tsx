import CatalogPageComponent from "../../components/catalog/CatalogComponentPage";

type CatalogPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default function CatalogPage({ searchParams }: CatalogPageProps) {
  return <CatalogPageComponent searchQuery={searchParams?.q ?? ""} />;
}
