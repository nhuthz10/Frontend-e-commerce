import { Inter } from "next/font/google";
import Providers from "@/Providers";
import "./global.scss";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Trang Chủ - Cửa Hàng Đồ Cầu Lông Chính Hãng",
  description:
    "Chào mừng đến với cửa hàng đồ cầu lông chính hãng. Chúng tôi cung cấp vợt cầu lông, giày cầu lông, quần áo và phụ kiện chất lượng cao với giá tốt nhất.",
  openGraph: {
    title: "Trang Chủ - Cửa Hàng Đồ Cầu Lông Chính Hãng",
    description: "The React Framework for the Web",
    url: "https://nextjs.org",
    siteName: "Next.js",
    images: [
      {
        url: "https://res.cloudinary.com/daphxc3ye/image/upload/v1719301372/Badminton/home_page_vpq2yc.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
