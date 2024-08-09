import { Inter } from "next/font/google";
import Providers from "@/Providers";
import { headers } from "next/headers";
import ZaloChat from "@/components/ZaloChat/ZaloChat";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./global.scss";
import Head from "next/head";

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
    alternates: {
      canonical: "./",
    },
    // metadataBase: new URL(process.env.VERCEL_URL ?? 'http://localhost:3000'),
    metadataBase: "https://e-commerce-xi-sepia.vercel.app",
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
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TB2BPBVJ');`,
          }}
        />
      </Head>
      <body className={inter.className}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TB2BPBVJ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <GoogleAnalytics gaId="G-25SHY31GSE" />
        <Providers>{children}</Providers>
        <ZaloChat />
      </body>
    </html>
  );
}
