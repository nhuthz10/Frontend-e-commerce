"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleRegisterService } from "../../services/userService";
import { useRouter } from "next/navigation";
import { regex } from "../../utils";
import "./page.scss";

const Input = ({
  errors,
  register,
  label,
  type,
  name,
  validation,
  autocomplete,
}) => {
  let props = {
    ...register(name, validation),
    autoComplete: autocomplete,
  };

  return (
    <div className="register-input-wrapper">
      <label className="register-input-lable">{label}</label>
      <div className="register-input">
        <input
          style={{ fontSize: "var(--text-fontSize)" }}
          type={type}
          {...props}
        />
      </div>
      {errors && <ErrorMessage errors={errors} name={name} as="p" />}
    </div>
  );
};

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let res = await handleRegisterService({
        email: data.email,
        userName: data.userName,
        password: data.password,
        roleId: "R2",
      });

      if (res && res.errCode === 0) {
        toast.success(
          "Vui lòng kiểm tra email của bạn. Để kịch hoạt tài khoản"
        );
      }
      router.push("/login");
    } catch (err) {
      if (err.response.data.errCode === 2) {
        toast.error("Email của bạn đã tồn tại");
      } else {
        toast.error(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Loading loading={isLoading}>
      <div className="register-container">
        <div className="register-content">
          <div className="register-content-left">
            <Link href="/" className="logo-wrapper">
              <Image
                src="/images/logo.png"
                width={35}
                height={60}
                alt="logo"
              ></Image>
              <h1 className="logo-name">BAMITO</h1>
            </Link>

            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="register-form">
                <Input
                  register={register}
                  errors={errors}
                  label="Tên của bạn"
                  type="text"
                  name="userName"
                  validation={{
                    required: "Nhập tên của bạn",
                    maxLength: {
                      value: 35,
                      message: "Tối đa 35 ký tự",
                    },
                    pattern: {
                      value: regex.USERNAME,
                      message: "Tên không hợp lệ",
                    },
                  }}
                ></Input>
                <Input
                  register={register}
                  errors={errors}
                  label="Email"
                  type="text"
                  name="email"
                  validation={{
                    required: "Nhập email của bạn",
                    pattern: {
                      value: regex.EMAIL,
                      message: "Email không hợp lệ",
                    },
                  }}
                  autocomplete="username"
                ></Input>
                <Input
                  register={register}
                  errors={errors}
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  validation={{
                    required: "Nhập mật khẩu của bạn",
                    minLength: {
                      value: 8,
                      message: "Tối thiểu 8 ký tự",
                    },
                  }}
                  autocomplete="new-password"
                ></Input>
                <Input
                  register={register}
                  errors={errors}
                  label="Xác nhận mật khẩu"
                  type="password"
                  name="confirmPassword"
                  autocomplete="new-password"
                  err="Xác nhận lại mật khẩu"
                  validation={{
                    required: "Nhập lại mật khẩu của bạn",
                    validate: {
                      isConfirmPassword: (value) => {
                        if (value !== getValues("password")) {
                          return "Mật khẩu không trùng khớp";
                        }
                      },
                    },
                  }}
                ></Input>
              </div>
              <div
                className="register-actions"
                style={{ justifyContent: "flex-end" }}
              >
                <Link href="/login" className="link-had-account">
                  Đã có tài khoản!
                </Link>
              </div>
              <div className="wrapper-button-register">
                <button type="submit" className="button-register">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
          <div className="register-content-right">
            <Image
              src="/images/loginImage.png"
              width={590}
              height={760}
              alt="img"
            ></Image>
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default Register;
