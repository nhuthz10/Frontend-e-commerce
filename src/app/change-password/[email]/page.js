"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleChangePasswordService } from "@/services/userService";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import "./page.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "@/redux-toolkit/userSlice";

const ChangePassword = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let handleSendOpt = async (data) => {
    setIsLoading(true);
    try {
      let res = await handleChangePasswordService({
        email: decodeURIComponent(params.email),
        otpCode: data.otp,
        password: data.password,
      });
      if (res && res.errCode === 0) {
        toast.success("Đổi mật khẩu thành công");
        router.push(`/login`);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Mã OTP của bạn không chính xác");
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Mã OTP của bạn đã hết hạn");
      } else if (err?.response?.data?.errCode === 4) {
        toast.error("Người dùng không tồn tại");
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
      <div className="change-password-container">
        <h1 className="change-password-title">Đổi mật khẩu</h1>
        <div className="change-password-content">
          <div className="change-password-wrap-password">
            <label htmlFor="OTPInput" className="change-password-label">
              Mã OTP
            </label>
            <div className="change-password-password">
              <input
                className="change-password-input"
                id="OTPInput"
                type="text"
                placeholder="Nhập mã OTP"
                {...register("otp", {
                  required: "Nhập mã OTP của bạn",
                })}
              ></input>
            </div>
            {errors.otp && <p className="errer">{errors.otp.message}</p>}
          </div>
          <div className="change-password-wrap-password">
            <label htmlFor="passwordInput" className="change-password-label">
              Mật khẩu
            </label>
            <div className="change-password-password">
              <input
                className="change-password-input"
                id="passwordInput"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                {...register("password", {
                  required: "Nhập mật khẩu của bạn",
                  minLength: {
                    value: 8,
                    message: "Tối thiểu 8 ký tự",
                  },
                })}
              ></input>
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="change-password-icon"
                onClick={handleShowPassword}
              ></FontAwesomeIcon>
            </div>
            {errors.password && (
              <p className="errer">{errors.password.message}</p>
            )}
          </div>
          <button
            className="change-password-send"
            onClick={handleSubmit(handleSendOpt)}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </Loading>
  );
};

export default ChangePassword;
