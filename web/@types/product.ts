export type Product = {
  name: string;
  slug?: string | null;
  categoryId?: string | null;
  categoryName?: string | null;
  sizeKg?: number | null;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  gallery?: string[] | null;
  featured?: boolean | null;
  available?: boolean | null;
};
