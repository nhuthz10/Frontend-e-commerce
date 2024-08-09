"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  handleGetOrderDetailService,
  handleDeliveringOrderService,
  handleSucceedOrderService,
  handleDeleteOrderService,
} from "@/services/orderService";
import "./page.scss";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { logOut } from "@/redux-toolkit/userSlice";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const OrderPost = ({ params }) => {
  const [orderDetailData, setOrderDetailData] = useState({});
  const userId = useSelector((state) => state.user.userInfo?.id);

  const dispatch = useDispatch();
  const router = useRouter();
  let getOrderDeatil = async () => {
    try {
      let res = await handleGetOrderDetailService(params.orderId, userId);
      if (res && res.errCode === 0) {
        setOrderDetailData(res?.data);
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
    getOrderDeatil(params.orderId);
  }, [params.orderId]);

  let handleDeliveringOrder = async () => {
    try {
      let res = await handleDeliveringOrderService({
        userId: userId,
        orderId: params.orderId,
      });
      if (res && res.errCode === 0) {
        toast.success("Xác nhận đơn hàng thành công");
        dispatch(handleChangePage(1));

        router.push("/admin/order/order-waiting");
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

  let handleSucceedOrder = async () => {
    try {
      let res = await handleSucceedOrderService({
        userId: userId,
        orderId: params.orderId,
      });
      if (res && res.errCode === 0) {
        toast.success("Xác nhận đơn hàng đã giao thành công");
        dispatch(handleChangePage(1));

        router.push("/admin/order/order-delivery");
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

  let handleDeleteOrder = async () => {
    try {
      let res = await handleDeleteOrderService(params.orderId);
      if (res && res.errCode === 0) {
        toast.success("Xóa đơn hàng thành công");
        dispatch(handleChangePage(1));

        router.push("/admin/order/order-canceled");
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

  const formatterDate = (date) => {
    const dateObject = new Date(date);
    const formattedTime = dayjs(dateObject).format("DD/MM/YYYY");
    return formattedTime;
  };

  return (
    <div style={{ marginBottom: 50, padding: 20, minWidth: 1280 }}>
      <div className="order-post-detail">
        <div className="information">
          <h4 style={{ marginBottom: 6 }}>
            Mã đơn hàng: {orderDetailData?.orderId}
          </h4>
          <h4 style={{ marginBottom: 6 }}>
            Ngày đặt hàng: {formatterDate(orderDetailData?.createdAt)}
          </h4>
          <h4 style={{ marginBottom: 6 }}>Tình trạng đơn hàng: Chờ xác nhận</h4>
        </div>

        <div className="information">
          <h4 style={{ marginBottom: 6 }}>
            Người nhận: {orderDetailData?.UserData?.userName}
          </h4>
          <h4 style={{ marginBottom: 6 }}>
            Số điện thoại: {orderDetailData?.UserData?.phoneNumber}
          </h4>
          <h4 style={{ marginBottom: 6 }}>
            Địa chỉ nhận hàng: {orderDetailData?.deliveryAddress}
          </h4>
        </div>

        <div className="information">
          <h4 style={{ marginBottom: 6 }}>Phương thức thanh toán:</h4>
          {orderDetailData?.payment === "COD" ? (
            <h4>Thanh toán khi nhận hàng (COD)</h4>
          ) : orderDetailData?.payment === "PAYPAL" ? (
            <h4>Thanh toán bằng Paypal</h4>
          ) : (
            <h4>Thanh toán bằng VNPAY</h4>
          )}
        </div>
      </div>

      <Grid container spacing={5} className="products">
        {orderDetailData?.orderDetail?.length > 0 &&
          orderDetailData?.orderDetail?.map((item, index) => (
            <Grid item sm={10} md={5} key={index}>
              <Box className="productDetailAdmin">
                <img src={item.image} alt="thumb" className="thumbnail"></img>
                <div className="info">
                  <div>{item.name}</div>
                  <div style={{ display: "flex", margin: "8px 0" }}>
                    <div
                      style={{
                        color: item.discount !== 0 ? "rgba(0,0,0,.54)" : "",
                        textDecoration:
                          item.discount !== 0 ? "line-through" : "",
                        marginRight: 10,
                      }}
                    >
                      {currencyFormatter.format(item.price)}
                      <span
                        style={{
                          textDecoration: "underline",
                          marginLeft: 2,
                        }}
                      >
                        đ
                      </span>
                    </div>
                    {item.discount !== 0 ? (
                      <div>
                        {currencyFormatter.format(
                          item.price - (item.price * item.discount) / 100
                        )}
                        <span
                          style={{
                            textDecoration: "underline",
                            marginLeft: 2,
                          }}
                        >
                          đ
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    Kích cỡ: {item.sizeName}
                  </div>
                  <div>Số lượng: {item.quantity}</div>
                  <p style={{ color: "red" }}>
                    {currencyFormatter.format(item.totalPrice)}
                    <span
                      style={{
                        textDecoration: "underline",
                        marginLeft: 2,
                      }}
                    >
                      đ
                    </span>
                  </p>
                </div>
              </Box>
            </Grid>
          ))}
      </Grid>

      <div className="pay-contact-container">
        <div className="pay-contact">
          <div className="pay_discount">
            <div className="pay">
              <p className="txt_price">Tổng cộng:</p>
              <div className="price">
                {orderDetailData?.VoucherData?.voucherId
                  ? currencyFormatter.format(
                      orderDetailData?.totalPrice -
                        30000 +
                        orderDetailData?.VoucherData?.voucherPrice
                    )
                  : currencyFormatter.format(
                      orderDetailData?.totalPrice - 30000
                    )}
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

            <div className="pay">
              <p className="txt_price">Phí vận chuyển</p>
              <p className="price">
                {currencyFormatter.format(30000)}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </p>
            </div>

            {orderDetailData?.VoucherData?.voucherId ? (
              <div className="pay">
                <p className="txt_price">Giảm giá: </p>
                <p className="price_discount">
                  {currencyFormatter.format(
                    orderDetailData?.VoucherData?.voucherPrice
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
              </div>
            ) : null}

            <div className="pay">
              <p className="txt_pay">Phải trả</p>
              <p className="price">
                {currencyFormatter.format(orderDetailData?.totalPrice)}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </p>
            </div>
          </div>

          {orderDetailData?.status === 1 ? (
            <div className="btn_contact">
              <button onClick={handleDeliveringOrder}>Xác nhận</button>
            </div>
          ) : orderDetailData?.status === 2 ? (
            <div className="btn_contact">
              <button onClick={handleSucceedOrder}>Giao hàng thành công</button>
            </div>
          ) : orderDetailData?.status === 0 ? (
            <div className="btn_contact">
              <button onClick={handleDeleteOrder}>Xóa đơn hàng</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default OrderPost;
