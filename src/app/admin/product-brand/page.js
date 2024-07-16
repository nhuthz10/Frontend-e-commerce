"use client";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleDeleteBrandService } from "@/services/productService";
import { fetchAllBrandRedux, loadingAdmin } from "@/redux-toolkit/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import GridData from "@/components/GridData/GridData";
import { LIMIT } from "@/utils";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { logOut } from "@/redux-toolkit/userSlice";

function BrandAdmin() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const totalPage = useSelector((state) => state.admin.allBrand?.totalPage);

  const handleDeleteBrand = async (brand, isLast) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteBrandService(brand.id);
      if (res && res.errCode === 0) {
        await dispatch(
          fetchAllBrandRedux({
            limit: LIMIT,
            page: totalPage === page && isLast ? page - 1 : page,
            pagination: true,
          })
        );
        if (totalPage === page && isLast) dispatch(handleChangePage(page - 1));
        toast.success("Xóa thương hiệu thành công");
      }
    } catch (err) {
      if (err.response.data.errCode === 2) {
        toast.error("Thương hiệu không tồn tại");
      } else if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  const tableColumns = [
    {
      label: "STT",
      key: "",
      style: { borderTopLeftRadius: 15, paddingLeft: "2rem" },
    },
    { label: "MÃ THƯƠNG HIỆU", key: "brandId" },
    { label: "TÊN THƯƠNG HIỆU", key: "brandName" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      headerString="Quản lý thương hiệu"
      handleDelete={handleDeleteBrand}
      tableColumns={tableColumns}
      gridType={"product-brand"}
    />
  );
}

export default BrandAdmin;
