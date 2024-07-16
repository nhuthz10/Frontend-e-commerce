import UserLayout from "@/layout/userLayout/UserLayout";

export const metadata = {
  title: "Trang Chủ - Cửa Hàng Đồ Cầu Lông Chính Hãng",
  description:
    "Chào mừng đến với cửa hàng đồ cầu lông chính hãng. Chúng tôi cung cấp vợt cầu lông, giày cầu lông, quần áo và phụ kiện chất lượng cao với giá tốt nhất.",
};

export default function ProductLayout({ children }) {
  return <UserLayout>{children}</UserLayout>;
}
