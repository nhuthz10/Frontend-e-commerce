"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import "./UserLayout.scss";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
const UserLayout = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const loading = useSelector((state) => state.product?.isLoading);

  return (
    <Loading loading={loading}>
      <div className="layout-container">
        <Header />
        {!isHome ? <Breadcrumb /> : null}
        <div className="layout-content">{children}</div>
        <Footer />
      </div>
    </Loading>
  );
};

export default UserLayout;
