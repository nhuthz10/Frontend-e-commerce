import { Inter } from "next/font/google";
import Providers from "@/Providers";
import { headers } from "next/headers";
import "./global.scss";

const inter = Inter({
  subsets: ["latin"],
});

export async function generateMetadata({ params, searchParams }, parent) {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const domain = headersList.get("host") || "";

  return {
    title: "Trang Chủ - Cửa Hàng Đồ Cầu Lông Chính Hãng",
    description:
      "Chào mừng đến với cửa hàng đồ cầu lông chính hãng. Chúng tôi cung cấp vợt cầu lông, giày cầu lông, quần áo và phụ kiện chất lượng cao với giá tốt nhất.",
    openGraph: {
      title: "Trang Chủ - Cửa Hàng Đồ Cầu Lông Chính Hãng",
      description: "The React Framework for the Web",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
