"use client";
import React from "react";
import { toast } from "react-toastify";
import { handleDeleteService } from "@/services/userService";
import {
  fetchAllRoleRedux,
  fetchAllUserRedux,
} from "@/redux-toolkit/adminSlice";
import { useSelector, useDispatch } from "react-redux";
import { LIMIT } from "@/utils";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import GridData from "@/components/GridData/GridData";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import { logOut } from "@/redux-toolkit/userSlice";

const UserAdmin = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const totalPage = useSelector((state) => state.admin.allUser?.totalPage);

  const handleDeleteUser = async (user, isLast) => {
    try {
      dispatch(loadingAdmin(true));
      let res = await handleDeleteService(user.id);
      if (res && res.errCode === 0) {
        await dispatch(
          fetchAllUserRedux({
            limit: LIMIT,
            page: totalPage === page && isLast ? page - 1 : page,
          })
        );
        if (totalPage === page && isLast) dispatch(handleChangePage(page - 1));
        await dispatch(fetchAllRoleRedux());
        toast.success("Xóa người dùng thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Người dùng không tồn tại");
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
    { label: "TÊN", key: "userName" },
    { label: "SỐ ĐIỆN THOẠI", key: "phoneNumber" },
    { label: "EMAIL", key: "email" },
    { label: "TÌNH TRẠNG", key: "status" },
    { label: "QUYỀN HẠN" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  const getRoleString = (roleId) => {
    const roleMappings = {
      R1: "Quản trị viên",
      R2: "Khách hàng",
    };

    return roleMappings[roleId];
  };

  return (
    <GridData
      tableColumns={tableColumns}
      handleDelete={handleDeleteUser}
      getRoleString={getRoleString}
      headerString="Quản lý người dùng"
      gridType="user"
    />
  );
};

export default UserAdmin;
