export const categoryQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const categorySearchQuery = `
  *[_type == "category" && title match $term]
  | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const promotionQuery = `
  *[_type == "promotion" && isActive == true]
  | order(priority desc, _createdAt desc)[0]{
    title,
    subtitle,
    ctaLabel,
    ctaLink,
    "imageUrl": image.asset->url
  }
`;

export const featuredProductsQuery = `
  *[_type == "product" && featured == true]
  | order(_createdAt desc)[0..4]{
    _id,
    name,
    "slug": slug.current,
    "categoryId": category->_id,
    sizeKg,
    price,
    description,
    "imageUrl": coalesce(primaryImage.asset->url, image.asset->url),
    featured,
    available
  }
`;

export const servicesQuery = `
  *[_type == "service" && isActive == true]
  | order(_createdAt desc)[0..4]{
    _id,
    title,
    "slug": slug.current,
    summary,
    fee,
    "imageUrl": image.asset->url
  }
`;

export const productSearchQuery = `
  *[_type == "product" && (name match $term || description match $term)]
  | order(name asc){
    _id,
    name,
    "slug": slug.current,
    description
  }
`;

export const productCatalogQuery = `
  *[_type == "product"]
  | order(_createdAt desc){
    _id,
    name,
    "slug": slug.current,
    "categoryId": category->_id,
    sizeKg,
    price,
    description,
    "imageUrl": coalesce(primaryImage.asset->url, image.asset->url),
    featured,
    available
  }
`;

export const productIdQuery = `
  *[_type == "product" && slug.current == $slug][0]{
    _id
  }
`;

export const productDetailQuery = `
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    "categoryId": category->_id,
    sizeKg,
    price,
    description,
    "imageUrl": coalesce(primaryImage.asset->url, image.asset->url),
    "gallery": gallery[].asset->url,
    featured,
    available
  }
`;

export const productReviewsQuery = `
  *[_type == "review" && product->slug.current == $slug && status == "approved"]
  | order(createdAt desc){
    "id": _id,
    rating,
    comment,
    createdAt,
    "customerName": coalesce(customer->name, "Verified customer")
  }
`;

export const servicesCatalogQuery = `
  *[_type == "service" && isActive == true]
  | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    summary,
    fee,
    "imageUrl": image.asset->url
  }
`;
