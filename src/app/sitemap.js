import { handleGetAllProductTypeService } from "@/services/productService";
import { convertSlugUrl } from "@/utils/serverUtils";

let getAllProductType = async () => {
  try {
    let res = await handleGetAllProductTypeService("", "", "", false);
    if (res && res.errCode === 0) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const URL = "https://e-commerce-xi-sepia.vercel.app";

export default async function sitemap() {
  const productTypes = await getAllProductType();
  const productTypesURL = productTypes.map((product) => ({
    url: `${URL}/${convertSlugUrl(
      product.productTypeName
    )}-${product.productTypeId.toLowerCase()}/sitemap.xml`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [
    // {
    //   url: process.env.VERCEL_URL ?? "http://localhost:3000",
    //   lastModified: new Date(),
    //   priority: 1,
    // },
    ...productTypesURL,
  ];
}
