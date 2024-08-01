import { handleGetProductService } from "@/services/productService";
import { headers } from "next/headers";

function truncateString(str, num) {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + "...";
}

//product response
var res;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: res?.data?.name,
  image: res?.data?.image,
  description: res?.data?.name,
};

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const temp = params?.productId?.split("-") ?? [];
  const id = temp[temp.length - 1];

  const headersList = headers();
  const domain = headersList.get("host") || "";

  const header_url = headersList.get("x-url") || "";

  // fetch data
  // let res;
  try {
    res = await handleGetProductService(id);
  } catch (error) {
    console.log(error);
  }

  return {
    title: `${res?.data?.name} | Bamito`,
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
      type: "website",
      locale: "vn",
    },
  };
}

export default function ProductTypeLayout({ children }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
