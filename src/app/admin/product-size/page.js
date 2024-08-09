"use client";
import React from "react";
import { handleDeleteSizeService } from "@/services/productService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSizeRedux,
  fetchAllProductTypeRedux,
  loadingAdmin,
} from "@/redux-toolkit/adminSlice";
import { toast } from "react-toastify";
import GridData from "@/components/GridData/GridData";
import { LIMIT } from "@/utils";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { logOut } from "@/redux-toolkit/userSlice";

function SizeAdmin() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const totalPage = useSelector((state) => state.admin.allSize?.totalPage);

  const handleDeleteSize = async (sizeData, isLast) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteSizeService(sizeData.id);
      if (res && res.errCode === 0) {
        await dispatch(
          fetchAllSizeRedux({
            limit: LIMIT,
            page: totalPage === page && isLast ? page - 1 : page,
          })
        );
        await dispatch(
          fetchAllProductTypeRedux({
            pagination: false,
          })
        );
        if (totalPage === page && isLast) dispatch(handleChangePage(page - 1));
        toast.success("Xóa size thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Size không tồn tại");
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
    { label: "MÃ SIZE", key: "sizeId" },
    { label: "TÊN SIZE", key: "sizeName" },
    { label: "TÊN LOẠI SẢN PHẨM", key: "productTypeSizeData" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      handleDelete={handleDeleteSize}
      headerString="Quản lý size"
      tableColumns={tableColumns}
      gridType="product-size"
    />
  );
}

export default SizeAdmin;
