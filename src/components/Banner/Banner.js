"use client";
import "./Banner.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--white-color)",
        position: "absolute",
        transform: "translateY(-50%)",
        top: "50%",
        right: "20px",
        height: "3.8rem",
        width: "3.8rem",
        borderRadius: "50%",
        zIndex: 10,
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        style={{ fontSize: "var(--text-fontSize)", color: "black" }}
        icon={faAngleRight}
      ></FontAwesomeIcon>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--white-color)",
        position: "absolute",
        transform: "translateY(-50%)",
        top: "50%",
        left: "20px",
        height: "3.8rem",
        width: "3.8rem",
        borderRadius: "50%",
        zIndex: 10,
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        style={{ fontSize: "var(--text-fontSize)", color: "black" }}
        icon={faAngleLeft}
      ></FontAwesomeIcon>
    </div>
  );
};

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="banner-container">
      <Slider {...settings}>
        <div className="banner-item">
          <Image
            src="/images/sl4.jpg"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="banner-item-img"
          ></Image>
        </div>
        <div className="banner-item">
          <Image
            src="/images/sl6.jpg"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="banner-item-img"
          ></Image>
        </div>
        <div className="banner-item">
          <Image
            src="/images/sl8.jpg"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="banner-item-img"
          ></Image>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
