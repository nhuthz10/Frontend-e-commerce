"use client";
import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductSizeRedux,
  fetchAllProductSizeOfTheProductTypeRedux,
  loadingAdmin,
} from "@/redux-toolkit/adminSlice";
import { handleDeleteProductSizeService } from "@/services/productService";
import GridData from "@/components/GridData/GridData";
import { LIMIT } from "@/utils";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { logOut } from "@/redux-toolkit/userSlice";

const ProductSizeAdmin = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.admin?.productData);
  const page = useSelector((state) => state.pagination.page);
  const totalPage = useSelector(
    (state) => state.admin.allProductSize?.totalPage
  );

  const handleDeleteProductSize = async (productSize, isLast) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteProductSizeService(productSize.id);
      if (res && res.errCode === 0) {
        await dispatch(
          fetchAllProductSizeRedux({
            productId: productData?.productId,
            limit: LIMIT,
            page: totalPage === page && isLast ? page - 1 : page,
          })
        );
        await dispatch(
          fetchAllProductSizeOfTheProductTypeRedux(
            productData?.productTypeData?.productTypeId
          )
        );
        if (totalPage === page && isLast) dispatch(handleChangePage(page - 1));
        toast.success("Xóa kích cỡ sản phẩm thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Kích cỡ sản phẩm không tồn tại");
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
    { label: "TÊN SẢN PHẨM", key: "ProductSizeData" },
    { label: "KÍCH CỠ", key: "SizeData" },
    { label: "SỐ LƯỢNG", key: "quantity" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      tableColumns={tableColumns}
      handleDelete={handleDeleteProductSize}
      headerString="Kích cỡ theo sản phẩm"
      gridType="productSize"
    />
  );
};

export default ProductSizeAdmin;
