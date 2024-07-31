"use client";
import { useState } from "react";
import "./Footer.scss";
import Script from "next/script";
import { toast } from "react-toastify";
import Loading from "@/components/Loading/Loading";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();

    console.log(data);

    if(data?.status == 'subscribed') {
      toast.success("Đăng ký thành công");
    } else if(data?.status == 400) {
      toast.error("Email đã được đăng ký");
    } else {
      toast.error("Đăng ký không thành công");
    }

    setIsLoading(false);
    setEmail("");
  };

  return (
    <Loading loading={isLoading}>
      <div className="footer">
        <div className="col-footer">
          <h2>THÔNG TIN CHUNG</h2>
          <p className="logo-footer">
            <span>BMT</span> là hệ thống cửa hàng cầu lông với hơn 50 chi nhánh
            trên toàn quốc, cung cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ
            phong trào tới chuyên nghiệp
          </p>
        </div>

        <div className="col-footer">
          <h2>THÔNG TIN LIÊN HỆ</h2>
          <p>
            Hệ thống cửa hàng: <span>58 cửa hàng trên toàn quốc</span>
          </p>
          <p>
            Hotline: <span>0989585858, 0969696969 </span>
          </p>
          <p>
            Hotline bán sỉ: <span>0989585858</span>
          </p>
          <p>
            Email: <span>info@shopbmt.com</span>
          </p>
        </div>

        <div className="policy col-footer">
          <h2>CHÍNH SÁCH</h2>

          <p>Chính sách đổi trả, hoàn tiền</p>
          <p>Chính sách xử lý, khiếu nại</p>
          <p>Chính sách bảo hành</p>
          <p>Chính sách vận chuyển</p>
        </div>

        <div className="col-footer">
          <h2>ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI</h2>
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                type="submit"
                onSubmit={handleSubmit}
              >
                Đăng kí
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="zalo-chat-widget"
        data-oaid="3862560322634134508"
        data-welcome-message="Rất vui khi được hỗ trợ bạn!"
        data-autopopup="30"
        data-width=""
        data-height=""
      ></div>
      <Script
        strategy="lazyOnload"
        src="https://sp.zalo.me/plugins/sdk.js"
      ></Script>
      <Script
        strategy="lazyOnload"
        src="https://embed.tawk.to/6696b87132dca6db2cb0d2a9/1i2uc0ut4"
      />
    </Loading>
  );
};

export default Footer;
