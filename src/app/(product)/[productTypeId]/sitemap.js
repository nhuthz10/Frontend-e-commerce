import { handleGetAllProductService } from "@/services/productService";
import { convertSlugUrl } from "@/utils/serverUtils";

const getAllProduct = async () => {
  let res = await handleGetAllProductService(0, 1, "");
  if (res && res.errCode === 0) {
    console.log(res.data)
    return res.data;
  }
};

export default async function sitemap() {
  const products = await getAllProduct();

  const productURL = products.map((product) => ({
    url: `${process.env.VERCEL_URL}/${convertSlugUrl(
      product.productTypeData.productTypeName
    )}-${product.productTypeData.productTypeId.toLowerCase()}/${convertSlugUrl(
      product.name
    )}-${product.productId.toLowerCase()}`,
    lastModified: new Date(),
    priority: 1,
  }));
  return [...productURL];
}
