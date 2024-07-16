"use client";
import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./DisplayFeedbacks.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import {
  handleAllFeedbackService,
  handleDeleteFeedbackService,
} from "../../services/productService";
import EditFeedback from "../EditFeedback/EditFeedback";
import Image from "next/image";
import { logOut } from "@/redux-toolkit/userSlice";

const formatDate = (date) => {
  const dateTime = dayjs(date);
  const formattedTime = dateTime.format("DD/MM/YYYY HH:mm:ss");
  return formattedTime;
};

const DisplayFeedbacks = ({ productId }) => {
  const [allFeedback, setAllFeeddack] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const userId = useSelector((state) => state.user.userInfo.id);

  let getAllDataFeedback = async () => {
    try {
      let res = await handleAllFeedbackService(productId);
      if (res && res.errCode === 0) {
        let result = res?.data?.map((item) => {
          item.userId === userId
            ? (item.myReview = true)
            : (item.myReview = false);
          return item;
        });
        setAllFeeddack(result);
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
    getAllDataFeedback();
  }, [userId]);

  let handleUpdateFeedback = (description, rating, id) => {
    setCurrentFeedback({
      id: id,
      description: description,
      rating: rating,
    });
    setIsOpen(true);
  };

  let handleDeleteFeedback = async (id) => {
    try {
      let res = await handleDeleteFeedbackService(id, userId);
      if (res && res.errCode === 0) {
        getAllDataFeedback();
        toast.success("Xóa đánh giá thành công");
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

  return (
    <div className="feedback-product-container">
      <div className="comment-rating-form">
        {allFeedback &&
          allFeedback.length > 0 &&
          allFeedback.map((review, index) => (
            <div key={index} className="review-item">
              <div className="user-info">
                <Image
                  src={
                    review.avatar ? review.avatar : "/images/default-avatar.png"
                  }
                  alt="Avatar"
                  height={60}
                  width={60}
                  className="user-avatar"
                />
                <div className="wrap-user-name">
                  <div className="user-name">{review.userName}</div>
                  <div className="timestamp">
                    {formatDate(review.updatedAt)}
                  </div>
                </div>
              </div>
              <Rating
                name={`rating-${index}`}
                style={{ fontSize: "3.675rem", margin: "10px 0" }}
                value={review.rating}
                precision={0.5}
                readOnly
              />
              <div className="user-comment">{review.description}</div>
              {review.myReview ? (
                <div className="edit-feedback">
                  <div
                    className="edit-feedback-btn"
                    style={{ marginLeft: "auto" }}
                    onClick={() =>
                      handleUpdateFeedback(
                        review.description,
                        review.rating,
                        review.id
                      )
                    }
                  >
                    Chỉnh sửa
                  </div>
                  <div
                    className="edit-feedback-btn"
                    onClick={() => handleDeleteFeedback(review.id)}
                  >
                    Xóa
                  </div>
                </div>
              ) : null}
            </div>
          ))}
      </div>
      <EditFeedback
        setIsOpen={setIsOpen}
        data={currentFeedback}
        isOpen={isOpen}
        getAllDataFeedback={getAllDataFeedback}
      ></EditFeedback>
    </div>
  );
};

export default DisplayFeedbacks;
