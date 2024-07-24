"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import {
  faChevronDown,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.scss";
import { logOut } from "../../redux-toolkit/userSlice";
import { handleGetAllProductTypeService } from "../../services/productService";
import UserMenu from "../../components/UserMenu/UserMenu";
import Search from "../../components/Search/Search";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import { USER_MENU } from "../../utils/menu";
import TippyCart from "../../components/TippyCart/TippyCart";
import { convertSlugUrl } from "@/utils/commonUtils";

const ProductTypesMenu = () => {
  const [productTypes, setProductTypes] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  let getAllProductType = async () => {
    try {
      let res = await handleGetAllProductTypeService();
      if (res && res.errCode === 0) {
        setProductTypes(res?.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllProductType();
  }, []);

  const handleChangProductType = (productTypeId, productTypeName) => {
    dispatch(handleChangePage(1));
    router.push(`/product/${convertSlugUrl(productTypeName)}-${productTypeId}.html`);
    // router.push(`/product/${productTypeId}`);
  };

  return (
    <>
      {productTypes.map((item, index) => {
        return (
          <div
            key={index}
            className="product-type-wrapper"
            onClick={() => handleChangProductType(item.productTypeId, item.productTypeName)}
          >
            <p>{item.productTypeName}</p>
          </div>
        );
      })}
    </>
  );
};

function Header() {
  const [isTippyOn, setIsTippyOn] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const login = useSelector((state) => state.user.login);
  const avatarUser = useSelector((state) => state.user.userInfo?.avatar);
  const roleId = useSelector((state) => state.user.userInfo?.roleData?.roleId);
  const productCountInCart = useSelector((state) => state.cart?.totalProduct);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleClickCart = () => {
    router.push("/user/cart");
  };

  let handleClickSaleOff = () => {
    dispatch(handleChangePage(1));
    router.push("/product/sale-off");
  };

  return (
    <div className="header-container">
      <Link href="/">
        <Image src="/images/logo1.png" alt="logo" height={50} width={100} />
      </Link>

      <Tippy
        onShow={() => {
          setIsTippyOn(true);
        }}
        onHide={() => {
          setIsTippyOn(false);
        }}
        placement="bottom"
        interactive
        delay={[0, 500]}
        offset={[0, 3]}
        render={(attrs) => (
          <div className="drop-down-menu" tabIndex="-1" {...attrs}>
            <ProductTypesMenu />
          </div>
        )}
      >
        <div className="drop-down-product">
          <span className={`text ${isTippyOn ? "is-tippy-on" : null}`}>
            SẢN PHẨM
          </span>
          <FontAwesomeIcon
            className={`icon ${isTippyOn ? "is-tippy-on" : null}`}
            icon={faChevronDown}
          />
        </div>
      </Tippy>

      <div onClick={handleClickSaleOff} className="btn-sale-off">
        SALE OFF
      </div>

      <Search></Search>

      <div className="header-wrap-cart-actions">
        {login ? (
          <Tippy
            placement="bottom-end"
            interactive
            delay={[0, 100]}
            offset={[-26, 5]}
            render={(attrs) => (
              <div
                className="drop-down-menu"
                tabIndex="-1"
                {...attrs}
                style={{ width: 550, borderRadius: 5 }}
              >
                <TippyCart></TippyCart>
              </div>
            )}
          >
            <div className="header-cart" onClick={handleClickCart}>
              <ShoppingCartOutlinedIcon className="header-cart-icon"></ShoppingCartOutlinedIcon>
              <span className="header-cart-notification">
                {productCountInCart}
              </span>
            </div>
          </Tippy>
        ) : null}

        {login ? (
          <div className="header-actions">
            <Tippy
              interactive
              placement="bottom-end"
              delay={[0, 300]}
              render={(attrs) => (
                <UserMenu
                  attrs={attrs}
                  handleLogOut={handleLogOut}
                  menu={USER_MENU}
                  roleId={roleId}
                />
              )}
            >
              <button className="header-action-btn">
                <Image
                  src={avatarUser ? avatarUser : "/images/default-avatar.png"}
                  alt="avt"
                  height={50}
                  width={50}
                  className="action-avatar"
                  style={{ border: "1px solid var(--primary-color)" }}
                />
              </button>
            </Tippy>
          </div>
        ) : (
          <div className="header-action-btn">
            <Link href="/login" className="login-btn">
              <FontAwesomeIcon icon={faRightToBracket} />
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
