"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleSendOptService } from "../../services/userService";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading/Loading";
import "./page.scss";
import { logOut } from "@/redux-toolkit/userSlice";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let handleSendOpt = async (data) => {
    setIsLoading(true);
    try {
      let res = await handleSendOptService(data.email);
      if (res && res.errCode === 0) {
        toast.success("Mã OPT đã được gửi thành công");
        router.push(`/change-password/${data.email}`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Email của bạn không tồn tại");
      } else if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Loading loading={isLoading}>
      <div className="forgot-password-container">
        <h1 className="forgot-password-title">Quên mật khẩu</h1>
        <div className="forgot-password-content">
          <div style={{ height: "10rem" }}>
            <div className="forgot-password-email">
              <FontAwesomeIcon
                className="forgot-password-email-icon"
                icon={faEnvelope}
              />
              <input
                className="forgot-password-email-input"
                placeholder="Email"
                {...register("email", {
                  required: "Nhập email của bạn",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
              ></input>
            </div>
            {errors.email && <p className="errer">{errors.email.message}</p>}
          </div>
          <button
            className="forgot-password-send"
            onClick={handleSubmit(handleSendOpt)}
          >
            Send OTP
          </button>
        </div>
      </div>
    </Loading>
  );
};

export default ForgotPassword;
