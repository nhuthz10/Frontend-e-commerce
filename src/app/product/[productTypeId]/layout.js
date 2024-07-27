import { handleGetProductTypeService } from "@/services/productService";
import { headers } from "next/headers";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const temp = params?.productTypeId?.split('.html') ?? [];
  const temp1 = temp[0]?.split('-') ?? [];
  const id = temp1[temp1.length - 1];

  const headersList = headers();
  const domain = headersList.get('host') || "";

  const header_url = headersList.get('x-url') || "";

  console.log(header_url);

  // fetch data
  let res;
  try {
    res = await handleGetProductTypeService(id);
  } catch (error) {
    console.log(error);
  }

  return {
    title: res?.data?.productTypeName,
    description: res?.data?.productTypeName,
    openGraph: {
      title: res?.data?.productTypeName,
      description: res?.data?.productTypeName,
      url: header_url,
      siteName: domain,
      images: [
        {
          url: "https://res.cloudinary.com/daphxc3ye/image/upload/v1719301372/Badminton/home_page_vpq2yc.png",
        },
      ],
    },
  };
}

export default function ProductTypeLayout({ children }) {
  return <>{children}</>;
}
