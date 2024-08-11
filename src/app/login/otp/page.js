"use client"
import React, { useState, useEffect } from 'react';
import "./page.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
    logIn,
    updateFavourites,
    updateCartId,
    logOut,
} from "../../../redux-toolkit/userSlice";
import { handleCreatCartService } from "../../../services/cartService";
import Image from "next/image";
const OtpSmsPage = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const otpCode = localStorage.getItem('otpCode');
    const user = localStorage.getItem('useInfor');
    const useInfor = JSON.parse(user);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (otp.join("").length === 6) {
            validateOtp();
        }
    }, [otp]);

    const handleChange = (element, index) => {
        const value = element.value;
        if (!isNaN(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && element.nextSibling) {
                element.nextSibling.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);

            if (e.target.previousSibling) {
                e.target.previousSibling.focus();
            }
        }
    };

    const validateOtp = async () => {
        if (otp.join("") === otpCode && useInfor?.errCode === 0) {
            toast.success("Mã xác thực chính xác!");
            dispatch(logIn(useInfor?.user));
            dispatch(updateFavourites(useInfor?.favourites));
            let cartId = await handleCreatCartService({
                userId: useInfor?.user?.id,
            });
            console.log()
            dispatch(updateCartId(cartId?.data));
            toast.success("Đăng nhập thành công");
            router.push("/");
        } else {
            toast.error("Mã xác thực không đúng");
        }
    };

    return (
        <div className="otpInput-Body">
            <div className="otpInputContainer">
                <Image
                    src="/images/shield-ok-icon.png"
                    width={200}
                    height={200}
                    alt="img"
                    className="otpInput-Icon"
                />
                <h1 className="otpInput-Header">
                    VUI LÒNG NHẬP MÃ OTP 👋
                </h1>
                <div>
                    {otp.map((data, index) => (
                        <input
                            className="otpInput"
                            type="text"
                            name="otp"
maxLength="1"
                            key={index}
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            onFocus={e => e.target.select()}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OtpSmsPage;