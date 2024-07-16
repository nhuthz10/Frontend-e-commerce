"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Tippy from "@tippyjs/react/headless";
import "./adminHeader.scss";
import UserMenu from "../../components/UserMenu/UserMenu";
import { USER_MENU } from "../../utils/menu";
import { logOut } from "../../redux-toolkit/userSlice";
import Image from "next/image";

function AdminHeader() {
  const avatar = useSelector((state) => state.user.userInfo.avatar);
  const userName = useSelector((state) => state.user.userInfo.userName);
  const roleId = useSelector((state) => state.user.userInfo?.roleData?.roleId);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <div className="admin-header-container">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={35}
          height={60}
          alt="bamito"
          className="logo"
        ></Image>
      </Link>
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
        <div className="admin-info">
          <h2 className="admin-name">{userName}</h2>
          <Image
            src={avatar ? avatar : "/images/default-avatar.png"}
            alt="admin"
            height={50}
            width={50}
            className="admin-avatar"
          />
        </div>
      </Tippy>
    </div>
  );
}

export default AdminHeader;
