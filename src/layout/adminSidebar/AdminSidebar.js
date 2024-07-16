"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import { usePathname, useRouter } from "next/navigation";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import Person4Icon from "@mui/icons-material/Person4";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BarChartIcon from "@mui/icons-material/BarChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./adminSidebar.scss";

const MENU = [
  {
    id: "default",
    value: "Tổng quan",
    icon: BusinessCenterIcon,
    path: "/admin",
  },
  {
    id: "product-parent",
    value: "Quản lý sản phẩm",
    icon: ShoppingCartIcon,
    children: [
      {
        id: "product",
        value: "Sản phẩm",
        path: "/admin/product",
      },
      {
        id: "product-type",
        value: "Loại sản phẩm",
        path: "/admin/product-type",
      },
      {
        id: "product-size",
        value: "Kích cỡ theo loại sản phẩm",
        path: "/admin/product-size",
      },
      {
        id: "product-brand",
        value: "Thương hiệu",
        path: "/admin/product-brand",
      },
    ],
  },
  {
    id: "order-parent",
    value: "Quản lý đơn hàng",
    icon: DescriptionIcon,
    children: [
      {
        id: "order-waiting",
        value: "Đợi xác nhận",
        path: "/admin/order/order-waiting",
      },
      {
        id: "order-delivery",
        value: "Đang giao",
        path: "/admin/order/order-delivery",
      },
      {
        id: "order-done",
        value: "Hoàn tất",
        path: "/admin/order/order-done",
      },
      {
        id: "order-canceled",
        value: "Đã hủy",
        path: "/admin/order/order-canceled",
      },
    ],
  },
  {
    id: "user",
    value: "Quản lý người dùng",
    icon: Person4Icon,
    path: "/admin/user",
  },
  {
    id: "voucher",
    value: "Quản lý voucher",
    icon: LocalOfferIcon,
    path: "/admin/voucher",
  },
  {
    id: "revenue",
    value: "Báo cáo doanh thu",
    icon: BarChartIcon,
    path: "/admin/revenue",
  },
];

function AdminSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const crumbs = pathname.split("/");
  const [selectedItem, setSelectedItem] = useState(crumbs[2] || "default");
  const [selectedProductItem, setSelectedProductItem] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(false);

  const handleClickMenuItem = (id, path) => {
    dispatch(handleChangePage(1));
    router.push(path);
    setSelectedItem(id);
  };

  const handleClickProductItem = () => {
    setSelectedProductItem(!selectedProductItem);
  };

  const handleClickOrderItem = () => {
    setSelectedOrderItem(!selectedOrderItem);
  };

  return (
    <div className="admin-sidebar-container">
      <div className="menu">
        {MENU.map((item) => {
          const Icon = item.icon;
          let Component = "div";
          let selectedSubItem = null;
          let props = {
            onClick: () => handleClickMenuItem(item.id, item.path),
          };
          if (item.id === "product-parent") {
            Component = "button";
            selectedSubItem = selectedProductItem;
            props = { ...props, onClick: handleClickProductItem };
          } else if (item.id === "order-parent") {
            Component = "button";
            selectedSubItem = selectedOrderItem;
            props = { ...props, onClick: handleClickOrderItem };
          }
          return (
            <div key={item.id}>
              <Component
                to={item.path}
                className={`menu-item-container ${
                  selectedItem === item.id ? "selected" : ""
                }`}
                onClick={props.onClick}
              >
                <div className="menu-item">
                  <Icon className="icon" />
                  <h3 className="text">{item.value}</h3>
                  {item.children && (
                    <KeyboardArrowDownIcon sx={{ fontSize: "3rem" }} />
                  )}
                </div>
              </Component>

              {item.children && selectedSubItem
                ? item.children.map((subItem) => {
                    return (
                      <div
                        // to={subItem.path}
                        key={subItem.id}
                        className={`sub-menu-item-container ${
                          selectedItem === subItem.id ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleClickMenuItem(subItem.id, subItem.path)
                        }
                      >
                        <h3 className="text">{subItem.value}</h3>
                      </div>
                    );
                  })
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminSidebar;
