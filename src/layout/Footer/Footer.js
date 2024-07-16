import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="col-footer">
          <h1>THÔNG TIN CHUNG</h1>
          <p className="logo-footer">
            <span>BMT</span> là hệ thống cửa hàng cầu lông với hơn 50 chi nhánh
            trên toàn quốc, cung cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ
            phong trào tới chuyên nghiệp
          </p>
          <i className="fab fa-facebook"></i>
          <i className="fas fa-globe-americas"></i>
          <i className="fab fa-tiktok"></i>
        </div>

        <div className="col-footer">
          <h1>THÔNG TIN LIÊN HỆ</h1>
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
          <h1>CHÍNH SÁCH</h1>

          <p>Chính sách đổi trả, hoàn tiền</p>
          <p>Chính sách xử lý, khiếu nại</p>
          <p>Chính sách bảo hành</p>
          <p>Chính sách vận chuyển</p>
        </div>
      </div>
      <script type="text/javascript">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6696b87132dca6db2cb0d2a9/1i2uc0ut4';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
    `}
      </script>
    </>
  );
}

export default Footer;
