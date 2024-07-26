import { handleGetProductService } from "@/services/productService";
import { headers } from "next/headers";

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const temp = params?.productId?.split(".html") ?? [];
  const temp1 = temp[0]?.split("-") ?? [];
  const id = temp1[temp1.length - 1];

  const headersList = headers();
  const domain = headersList.get("host") || "";

  const header_url = headersList.get('x-url') || "";

  // fetch data
  let res;
  try {
    res = await handleGetProductService(id);
  } catch (error) {
    console.log(error);
  }

  return {
    title: res?.data?.name,
    description: truncateString(res?.data?.descriptionContent, 250),
    openGraph: {
      title: res?.data?.name,
      description: res?.data?.name + " " + res?.data?.price + "vnd",
      url: header_url,
      siteName: domain,
      images: [
        {
          url: res?.data?.image,
        },
      ],
    },
  };
}

export default function ProductTypeLayout({ children }) {
  return <>{children}</>;
}
