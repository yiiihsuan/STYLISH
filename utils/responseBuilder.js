export function buildProductResponse(product, colors, sizes, images,variants) {
  return {
    id: product.id,
    category: product.category,
    title: product.title,
    description: product.description,
    price: product.price,
    texture: product.texture,
    wash: product.wash,
    place: product.place,
    note: product.note,
    story: product.story,
    colors: colors,
    sizes: sizes,
    variants: variants,
    main_image: product.main_image,
    images: images,
  };
}
