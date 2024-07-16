"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RattingForm from "@/components/RatingForm/RatingForm";
import { useSelector } from "react-redux";
import { handleGetAllProductFeedback } from "@/services/productService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./page.scss";
import { logOut } from "@/redux-toolkit/userSlice";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const FeedBack = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  const userId = useSelector((state) => state.user.userInfo.id);

  const getAllProductFeedBack = async () => {
    try {
      let res = await handleGetAllProductFeedback(userId);
      if (res && res.errCode === 0) {
        setAllData(res?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getAllProductFeedBack();
    }
  }, [userId]);

  const hadnleClickFeedBack = (productId) => {
    setIsOpen(true);
    setCurrentProduct(productId);
  };

  return (
    <div className="feedback-container">
      {allData && allData?.length > 0 ? (
        allData.map((product, index) => {
          return (
            <div className="feedback-product" key={index}>
              <Image
                src={product.image}
                width={150}
                height={150}
                alt=""
                className="feedback-product-img"
              ></Image>
              <div className="feedback-product-content">
                <div className="product-name">{product.name}</div>
                <div className="product-price">
                  <p
                    style={{
                      color:
                        product.discount !== 0
                          ? "rgba(0,0,0,.54)"
                          : "var(--primary-color)",
                      textDecoration:
                        product.discount !== 0 ? "line-through" : "",
                      marginRight: 16,
                    }}
                  >
                    {currencyFormatter.format(product.price)}
                    <span
                      style={{
                        textDecoration: "underline",
                        marginLeft: 2,
                      }}
                    >
                      đ
                    </span>
                  </p>
                  {product.discount !== 0 ? (
                    <p>
                      {currencyFormatter.format(
                        product.price - (product.price * product.discount) / 100
                      )}
                      <span
                        style={{
                          textDecoration: "underline",
                          marginLeft: 2,
                        }}
                      >
                        đ
                      </span>
                    </p>
                  ) : null}
                </div>
                <div className="product-size">Kích cỡ: {product.sizeName}</div>
                <div className="product-quantity">
                  Số lượng: {product.quantity}
                </div>
                <div className="product-total-price">
                  {currencyFormatter.format(product.totalPrice)}
                  <span
                    style={{
                      textDecoration: "underline",
                      marginLeft: 2,
                    }}
                  >
                    đ
                  </span>
                </div>
              </div>
              <div
                className="feedback-btn"
                onClick={() => hadnleClickFeedBack(product)}
              >
                Đánh giá
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-product">
          <h1>Không có sản phẩm nào để đánh giá</h1>
          <Image
            src="/images/noProduct.png"
            height={315}
            width={315}
            sizes="100vw"
            alt=":(("
          />
        </div>
      )}

      <RattingForm
        productData={currentProduct}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        getAllProductFeedBack={getAllProductFeedBack}
      ></RattingForm>
    </div>
  );
};

export default FeedBack;
