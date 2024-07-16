"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import "./RattingForm.scss";
import { handleCreateFeedbackService } from "../../services/productService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "@/redux-toolkit/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: "white",
  borderRadius: 8,
  padding: 20,
};

const RattingForm = ({
  productData,
  setIsOpen,
  isOpen,
  getAllProductFeedBack,
}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const isLogin = useSelector((state) => state.user.login);
  const userId = useSelector((state) => state.user.userInfo.id);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const submitCommentAndRating = async () => {
    if (isLogin) {
      try {
        let res = await handleCreateFeedbackService({
          productId: productData.productId,
          userId: userId,
          description: comment,
          rating: rating,
          orderId: productData.orderId,
          sizeId: productData.sizeId,
        });
        if (res && res.errCode === 0) {
          setComment("");
          setRating(0);
          setIsOpen(false);
          getAllProductFeedBack();
          toast.success("Đánh giá sản phầm thành công");
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
    } else {
      toast.error("Vui lòng đăng nhập");
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div style={{ ...style }}>
        <div style={{ fontSize: "2.4rem", fontWeight: 600, marginBottom: 16 }}>
          ĐÁNH GIÁ SẢN PHẨM
        </div>
        <div className="comment-rating-form">
          <Rating
            name="product-rating"
            value={rating}
            defaultValue={0}
            precision={0.5}
            className="comment-rating"
            onChange={handleRatingChange}
          />
          <textarea
            className="coment-content"
            onChange={handleCommentChange}
            value={comment}
            placeholder="Viết phản hồi..."
          ></textarea>

          <div className="ctn_send_btn">
            <button
              className="contain_send_btn"
              onClick={submitCommentAndRating}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RattingForm;
