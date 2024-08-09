"use client";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import RemoveIcon from "@mui/icons-material/Remove";
import "./page.scss";
import { loadingProduct } from "@/redux-toolkit/productSlice";
import { hadnleAddProductToCart } from "@/services/cartService";
import { handleGetProductService } from "@/services/productService";
import DisplayFeedbacks from "@/components/DisplayFeedbacks/DisplayFeedbacks";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllProductCart } from "@/redux-toolkit/cartSlice";
import Image from "next/image";
import { logOut } from "@/redux-toolkit/userSlice";
import { InlineShareButtons } from "sharethis-reactjs";

const Line = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 3,
      margin: "2rem 0",
    }}
  />
);

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function ProductDetail({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [checkComponent, setCheckComponent] = useState(true);
  const [sizeData, setSizeData] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(null);
  const isLogin = useSelector((state) => state.user.login);
  const userId = useSelector((state) => state.user.userInfo.id);
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  const temp = params?.productId?.split(".html") ?? [];
  const temp1 = temp[0]?.split("-") ?? [];
  const productId = temp1[temp1.length - 1];

  let getInfoProdut = async () => {
    try {
      dispatch(loadingProduct(true));
      let res = await handleGetProductService(productId);
      if (res && res.errCode === 0) {
        setProduct(res?.data);
        setSizeData(res?.data?.SizeData);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  useEffect(() => {
    getInfoProdut();
  }, [params.productId]);

  const handleClickSize = (sizeId) => {
    let data = sizeData.map((size) => {
      size.sizeId === sizeId ? (size.selected = true) : (size.selected = false);
      return size;
    });
    let currentSize = data.find((size) => size.sizeId === sizeId);
    setSizeData(data);
    setStockQuantity(currentSize.quantity);
    setSizeSelected(sizeId);
    setQuantity(1);
  };

  const handleCheckComponent = () => {
    setCheckComponent(!checkComponent);
  };

  const handleDecrement = () => {
    if (!sizeSelected) {
      toast.error("Vui lòng chọn kích cỡ sản phẩm");
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleIncrement = () => {
    if (!sizeSelected) {
      toast.error("Vui lòng chọn kích cỡ sản phẩm");
    } else {
      if (quantity < stockQuantity) {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleClickAddCart = async () => {
    if (isLogin) {
      if (!sizeSelected) {
        toast.error("Vui lòng chọn kích cỡ sản phẩm");
      } else {
        try {
          let res = await hadnleAddProductToCart({
            userId: userId,
            productId: productId,
            sizeId: sizeSelected,
            quantity: quantity,
            totalPrice:
              quantity *
              (product.price - (product.price * product.discount) / 100),
          });
          if (res && res.errCode === 0) {
            dispatch(fetchAllProductCart({ userId: userId }));
            toast.success("Thêm sản phẩm vào giỏ hàng thành công");
          }
        } catch (error) {
          if (error.response.data.errCode === 2) {
            toast.error("Sản phẩm đã có trong giỏ hàng");
          } else {
            console.log(error);
            if (error?.response?.data?.errCode === -4) {
              toast.error("Phiên bản đăng nhập hết hạn");
              dispatch(logOut());
            } else {
              toast.error(error?.response?.data?.message);
            }
          }
        }
      }
    } else {
      toast.error("Vui lòng đăng nhập để tiếp tục mua hàng");
    }
  };

  return (
    <div className="product_detail_container">
      {/*this code below is use for purpose Microformats SEO */}
      <div className="h-product">
        <h6 className="p-name"></h6>
        <img className="u-photo" alt="" />
        <p className="p-description"></p>
      </div>

      <div className="img_inf_product">
        {product.image && (
          <Image
            src={product.image}
            priority
            height={0}
            width={0}
            className="img_product"
            sizes="100vw"
            alt="product"
          />
        )}

        <div className="info_product">
          <h1 className="product-name">{product.name}</h1>

          <div className="star_sold">
            <Rating
              style={{ fontSize: "3.875rem" }}
              name="read-only"
              value={product.rating ? product.rating : 0}
              readOnly
              precision={0.5}
              size="large"
            />
            <span style={{ fontSize: "3rem", fontWeight: 600, marginLeft: 6 }}>
              {product.rating}/5
            </span>
          </div>

          <div className="price_product">
            <p
              style={{
                color:
                  product.discount !== 0
                    ? "rgba(0,0,0,.54)"
                    : "var(--primary-color)",
                textDecoration: product.discount !== 0 ? "line-through" : "",
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

          <Line color="var(--gray-color)" />

          <div className="size_product">
            <p>Size</p>
            <div>
              {sizeData?.length > 0 &&
                sizeData.map((size) => (
                  <button
                    key={size.sizeId}
                    onClick={() => handleClickSize(size.sizeId)}
                    className={size.selected ? "selected" : null}
                  >
                    {size.sizeName}
                  </button>
                ))}
            </div>
          </div>

          <Line color="var(--gray-color)" />

          <div className="product_number">
            <div className="number">
              <h5>Số lượng</h5>
            </div>

            <div className="quantity-stock">
              <div className="quantity-btn-wrapper">
                <button className="subtract-btn" onClick={handleDecrement}>
                  <RemoveIcon className="icon" />
                </button>
                <p>{quantity}</p>
                <button className="add-btn" onClick={handleIncrement}>
                  <AddTwoToneIcon className="icon" />
                </button>
              </div>

              {stockQuantity > 0 ? (
                <p className="stock_product">{stockQuantity} sản phẩm có sẵn</p>
              ) : stockQuantity === 0 ? (
                <p className="stock_product">Sản phẩm đã hết hàng</p>
              ) : null}
            </div>
          </div>

          <Line color="var(--gray-color)" />

          <button className="cart-btn" onClick={handleClickAddCart}>
            {/* <i className="fas fa-shopping-cart"></i> */}
            <h3>Thêm vào giỏ hàng</h3>
          </button>
        </div>
      </div>

      <div className="share_this">
        <InlineShareButtons
          config={{
            alignment: "left", // alignment of buttons (left, center, right)
            color: "social", // set the color of buttons (social, white)
            enabled: true, // show/hide buttons (true, false)
            font_size: 16, // font size for the buttons
            labels: "cta", // button labels (cta, counts, null)
            language: "en", // which language to use (see LANGUAGES)
            networks: [
              // which networks to include (see SHARING NETWORKS)
              "messenger",
              "facebook",
              "twitter",
            ],
            padding: 12, // padding within buttons (INTEGER)
            radius: 4, // the corner radius on each button (INTEGER)
            // show_total: true,
            size: 40, // the size of each button (INTEGER)

            // OPTIONAL PARAMETERS

            // min_count: 10,                    // (threshold for total share count to be displayed)
            // url: 'https://e-commerce-xi-sepia.vercel.app', // (defaults to current url)
            // image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            // description: 'custom text',       // (defaults to og:description or twitter:description)
            // title: 'custom title',            // (defaults to og:title or twitter:title)
            // message: 'custom email text',     // (only for email sharing)
            // subject: 'custom email subject',  // (only for email sharing)
            // username: 'custom twitter handle' // (only for twitter sharing)
          }}
        />
      </div>

      <div className="description_review_wrapper">
        <div className="des-review-btn-wrapper">
          <div className="des-review-btn">
            <button
              className={!checkComponent ? "no-focus" : null}
              onClick={handleCheckComponent}
            >
              <h4>Mô tả sản phẩm</h4>
            </button>
            <Line color={!checkComponent ? "rgba(0, 0, 0, 0.1)" : "black"} />
          </div>
          <div className="des-review-btn">
            <button
              className={checkComponent ? "no-focus" : null}
              onClick={handleCheckComponent}
            >
              <h4>Phản hồi và Đánh giá</h4>
            </button>
            <Line color={checkComponent ? "rgba(0, 0, 0, 0.1)" : "black"} />
          </div>
        </div>
        {checkComponent ? (
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHTML,
            }}
          ></div>
        ) : (
          <DisplayFeedbacks productId={productId} />
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
