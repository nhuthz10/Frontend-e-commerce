"use client";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { handleGetAllVoucherUserService } from "../../services/productService";
import "./Voucher.scss";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "@/redux-toolkit/userSlice";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function Voucher({ setVoucherSelect, setVoucherPrice, setVoucherId }) {
  const [allVoucher, setAllVoucher] = useState([]);

  let getAllVoucer = async () => {
    try {
      let res = await handleGetAllVoucherUserService();
      if (res && res.errCode === 0) {
        setAllVoucher(res?.data);
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
    getAllVoucer();
  }, []);

  const renderTime = (timeEnd) => {
    const currentDate = new Date();
    const endDate = new Date(+timeEnd);
    const timeRemaining = endDate - currentDate;
    const hours = Math.ceil(timeRemaining / (60 * 60 * 1000));
    let message;

    if (hours > 24) {
      const daysRemaining = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000));
      message = `Hết hạn trong ${daysRemaining} ngày nữa`;
    } else {
      message = `Hết hạn trong ${hours} giờ nữa`;
    }
    return <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>;
  };

  return (
    <div className="voucher-container">
      <div className="voucher-title">
        <button onClick={() => setVoucherSelect(false)}>
          <ArrowBackIosIcon className="back-icon" />
        </button>
        <h2>Voucher của bạn</h2>
      </div>
      <div className="voucher-content">
        {allVoucher &&
          allVoucher?.length > 0 &&
          allVoucher.map((item, index) => {
            return (
              <button
                className="voucher"
                key={index}
                onClick={() => {
                  setVoucherPrice(item.voucherPrice);
                  setVoucherId(item.voucherId);
                  setVoucherSelect(false);
                }}
              >
                <Image
                  src={item.image}
                  alt="v"
                  width={120}
                  height={120}
                  className="voucher-image"
                ></Image>
                <div className="voucher-info">
                  <p>
                    {currencyFormatter.format(item.voucherPrice)}
                    <span
                      style={{
                        textDecoration: "underline",
                        marginLeft: 2,
                      }}
                    >
                      đ
                    </span>
                  </p>
                  {renderTime(item.timeEnd)}
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default Voucher;
